import mongoose from 'mongoose';
import { mongoUrl } from '../../secret';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to database");
  } catch (error) {
    console.error('Error connecting to the database', error);
    process.exit(1);
  }
};

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({}); // Remove all documents in the collection
  }
};

export const disconnectFromDatabase = async () => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from the database');
  } catch (error) {
    console.error('Error disconnecting from the database', error);
  }
};
