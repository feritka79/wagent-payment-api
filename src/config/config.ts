import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI as string, {});
  } catch (err) {
    console.log("Error connecting to DB");

    process.exit(1);
  }
};
export default connectDb;
