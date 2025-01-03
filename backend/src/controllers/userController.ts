import { Request, Response } from 'express';
const bcrypt = require('bcryptjs')
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/user';
import { JWT_SECRET } from '../secret';
import { removeHashedPassword } from '../utils/transformation/removeHashedPassword';
import { validatePassword } from '../utils/security/validatePassword';
import { checkExistsInUser } from '../utils/validation/checkExistsInUser';
import { decryptPassword } from '../utils/security/rsaUtils';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const decryptedPassword = decryptPassword(req.body.password);
    const combinedString = `${decryptedPassword}${req.body.username}`;
    const hashedPassword = await bcrypt.hash(combinedString, 10);

    const user: IUser = new User({
      ...req.body,
      password: undefined,
      hashedPassword: hashedPassword
    });

    await user.save();
    const sanitizedUser = removeHashedPassword(user);

    res.status(201).send(sanitizedUser);
  } catch (err) {
    res.status(400).send(err);
  }
};


export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await User.find();
    const sanitizedUsers = users.map(removeHashedPassword);
    res.status(200).json(sanitizedUsers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve users', error });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser | null = await User.findById(req.params.id);

    if (!user) {
      res.status(404).send();
      return;
    }
    const santiizedUser = removeHashedPassword(user)

    res.status(200).send(santiizedUser);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { password, oldPassword, ...updateData } = req.body;

    const user: IUser | null = await User.findById(id);

    if (!user) {
      res.status(404).send();
      return;
    }

    // If password is being updated, validate the old password first
    if (password) {
      if (!oldPassword) {
        res.status(400).json({ message: 'Previous password is required' });
        return;
      }

      const isPasswordValid = await validatePassword(oldPassword, user.hashedPassword);

      if (!isPasswordValid) {
        res.status(400).json({ message: 'Invalid previous password' });
        return;
      }

      // Hash the new password
      updateData.hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update the user
    const updatedUser: IUser | null = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!updatedUser) {
      res.status(404).send();
      return;
    }

    const sanitizedUser = removeHashedPassword(updatedUser);
    res.status(200).send(sanitizedUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser | null = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send();
      return;
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const isUsernameAvailable = async (req: Request, res: Response) => {
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ error: 'Username query parameter is required' });
    }

    const exists = await checkExistsInUser("username", username as string);

    if (exists) {
      return res.status(409).json({ available: false, error: 'Username already taken' });
    }

    return res.status(200).json({ available: true });
  } catch (error) {
    console.error('Error checking username availability:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { identifier, password } = req.body;

    // Decrypt the password received from the client
    const decryptedPassword = decryptPassword(password);

    // Find the user by either email or username
    const user: IUser | null = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });
    if (!user) {
      res.status(400).json({ message: 'Invalid username/email or password' });
      return;
    }

    // Combine username with the decrypted password
    const combinedString = `${decryptedPassword}${user.username}`;

    // Validate the combined string
    const isPasswordValid = await bcrypt.compare(combinedString, user.hashedPassword);
    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid username/email or password' });
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    // Set the token in an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    const sanitizedUser = removeHashedPassword(user);
    res.status(200).json({
      message: 'Login successful',
      user: sanitizedUser,
      loggedIn: true
    });

  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: 'Internal server error', error: err.message });
    } else {
      res.status(500).json({ message: 'Internal server error', error: String(err) });
    }
  }
};

export const validateSession = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ loggedIn: false, message: 'Not authenticated' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ loggedIn: false, message: 'Invalid session' });
    }

    res.status(200).json({ loggedIn: true, user: { id: user.id, username: user.username } });
  } catch (error) {
    res.status(401).json({ loggedIn: false, message: 'Session validation failed' });
  }
};

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'strict' });
    res.status(200).json({ message: 'Logged out successfully' });
  }
  catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: 'Internal server error', error: err.message });
    } else {
      res.status(500).json({ message: 'Internal server error', error: String(err) });
    }
  }

}