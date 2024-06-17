import mongoose from "mongoose";

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.DB_URI as string,{

        });
    }catch (err){
        process.exit(1);
    }
}
export default connectDb;