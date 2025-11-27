import mongoose from 'mongoose';
import { Pool } from 'pg';

declare global {
  var pgPool: Pool | undefined;
}

export const connectDB = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/musika';
    await mongoose.connect(mongoURI);
    console.log('📦 MongoDB connected successfully');

    // Connect to PostgreSQL
    const pgConfig = {
      host: process.env.PG_HOST || 'localhost',
      port: parseInt(process.env.PG_PORT || '5432'),
      database: process.env.PG_DATABASE || 'musika',
      user: process.env.PG_USER || 'postgres',
      password: process.env.PG_PASSWORD || 'password',
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    };

    // Use global variable to prevent multiple connections in development
    if (!global.pgPool) {
      global.pgPool = new Pool(pgConfig);

      global.pgPool.on('connect', () => {
        console.log('🗄️  PostgreSQL connected successfully');
      });

      global.pgPool.on('error', (err) => {
        console.error('PostgreSQL pool error:', err);
      });
    }

  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

export const getPgPool = () => {
  if (!global.pgPool) {
    throw new Error('PostgreSQL pool not initialized');
  }
  return global.pgPool;
};

export default mongoose;
