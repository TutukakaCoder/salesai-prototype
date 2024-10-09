import { config } from 'dotenv';
import dbConnect from './lib/dbConnect';

config();

async function testDatabaseConnection() {
  try {
    await dbConnect();
    console.log('Successfully connected to the database');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
}

testDatabaseConnection();