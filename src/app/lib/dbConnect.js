// db.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads in development.
 * Do not import this file in client-side code.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // If already connected, return the cached connection
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection promise is not already stored, create one
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Additional options can be added here
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
