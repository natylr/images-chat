import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/user';
import { checkUsernameExists } from '../utils/checkUsernameExists';
import { JWT_SECRET } from '../secret';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user with the hashed password
    const user: IUser = new User({
      ...req.body,
      password: hashedPassword
    });

    // Save the user to the database
    await user.save();

    // Respond with the created user (excluding the password)
    const userResponse = { ...user.toObject(), password: undefined };
    res.status(201).send(userResponse);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser | null = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send();
      return;
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser | null = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      res.status(404).send();
      return;
    }
    res.status(200).send(user);
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
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  const exists = await checkUsernameExists(username as string); 

  if (exists) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  return res.status(200).json({ message: 'Username is available' });
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user: IUser | null = await User.findOne({ username });
    if (!user) {
      res.status(400).send({ message: 'Invalid username or password' });
      return;
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      res.status(400).send({ message: 'Invalid username or password' });
      return;
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    // Respond with the token
    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send(err);
  }
};