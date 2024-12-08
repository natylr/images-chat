import { Request, Response } from 'express';
const bcrypt = require('bcryptjs')
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/user';
import { JWT_SECRET } from '../secret';
import { removeHashedPassword } from '../utils/transformation/removeHashedPassword';
import { validatePassword } from '../utils/security/validatePassword';
import { checkExistsInUser } from '../utils/validation/checkExistsInUser';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user with the hashed password
    const user: IUser = new User({
      ...req.body,
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
    const { email, username, password } = req.body;

    // Find the user by email or username
    const user: IUser | null = await User.findOne({ $or: [{ email }, { username }] });
    console.log(user);
    if (!user) {
      res.status(400).json({ message: 'Invalid username/email or password' });
    }
    else {

      // Validate password
      const isPasswordValid = await validatePassword(password, user.hashedPassword);
      if (!isPasswordValid) {
        res.status(400).json({ message: 'Invalid username/email or password' });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

      // Set the token in an HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true, // Prevent JavaScript access
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 60 * 60 * 1000, // 1 hour
      });

      // Return sanitized user object and message
      const sanitizedUser = removeHashedPassword(user);
      res.status(200).json({ message: 'Login successful', user: sanitizedUser });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: 'Internal server error', error: err.message });
    } else {
      res.status(500).json({ message: 'Internal server error', error: String(err) });
    }
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