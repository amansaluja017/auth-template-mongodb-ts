import mongoose from "mongoose";
import ApiError from "../utils/api-error.ts"

const mongodburi = process.env.MONGODB_URI;

if (!mongodburi) throw ApiError.connectionRefuse("mongodb uri must be a valid string");

const connectToDb = async () => {
  try {
    const response = await mongoose.connect(mongodburi);
    console.log("Db connection successfull", response.connection.host);
  } catch(error: any) {
    console.error(error.message);
    process.exit(1);
  }
}

export default connectToDb;
