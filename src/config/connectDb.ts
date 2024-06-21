import { connect } from 'mongoose'

const connectDb = async (uri: string, dbName: string) => {
  try {
    await connect(uri, { dbName });
    console.log(`Connected to database: ${dbName}`);
  } catch (err) {
    console.error("Error connecting to DB", err);
    process.exit(1);
  }
};
export default connectDb;
