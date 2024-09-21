import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: `${__dirname}/.env.local` });

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
};

async function connectToDatabase() {
  try {
    const client = new MongoClient(uri, options);
    await client.connect();
    const db = client.db("salesai");

    console.log('Connected to MongoDB successfully!');

    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));

    // Create a test user
    const usersCollection = db.collection("users");
    const testUser = {
      email: "test@example.com",
      name: "Test User",
      password: "hashedpassword", // In a real scenario, this should be hashed
      userType: "Introducer",
      createdAt: new Date(),
      updatedAt: new Date(),
      expertise: ["Sales", "Marketing"],
      industries: ["Technology", "Finance"],
      successfulIntroductions: 0
    };

    const result = await usersCollection.insertOne(testUser);
    console.log(`Inserted test user with ID: ${result.insertedId}`);

    const userCount = await usersCollection.countDocuments();
    console.log('Number of users:', userCount);

    await client.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

connectToDatabase();