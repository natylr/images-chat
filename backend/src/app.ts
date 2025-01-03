import express, { Application } from 'express';
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
import { connect } from './utils/database/databaseManager';
import publicKeyRoute from './routes/publicKeyRoute';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(',') || '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

connect();

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
app.use('/api', publicKeyRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
