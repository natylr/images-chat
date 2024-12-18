import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.get('/public-key', (req, res) => {
  const publicKeyPath = path.resolve(__dirname, '../secrets/public_key.pem');
  const publicKey = fs.readFileSync(publicKeyPath, 'utf8');
  res.send({ publicKey });
});

export default router;
