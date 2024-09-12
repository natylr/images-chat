import express, { Application } from 'express';
import { connectToDatabase } from './utils/database/db';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import chatRoomRoutes from './routes/chatRoomRoutes';
import messageRoutes from './routes/messageRoutes';
import chatRoomMemberRoutes from './routes/chatRoomMemberRoutes';
import userRoleRoutes from './routes/userRoleRoutes';
import userStatusRoutes from './routes/userStatusRoutes';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

const corsOptions = {
  origin: 'https://imageschatserver.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

connectToDatabase();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define the destination folder for uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Define how uploaded files are named
  },
});

const upload = multer({ storage: storage }); // Pass the storage configuration to Multer

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', userRoutes);
app.use('/api', chatRoomRoutes);
app.use('/api', messageRoutes);
app.use('/api', chatRoomMemberRoutes);
app.use('/api', userRoleRoutes);
app.use('/api', userStatusRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
