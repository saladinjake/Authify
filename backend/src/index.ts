import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { db, initDb } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'authify-super-secret-key';



// Start Server
initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`\n Authify Enterprise Backend running on http://localhost:${PORT}`);
        console.log(`Default Dev Tenant API Key: dev_api_key_123`);
    });
});
