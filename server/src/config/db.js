import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connIns = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `MongoDB connected successfully! HOST: ${connIns.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB Connection Error!", error);
    process.exit(1);
  }
};

export default connectDB;
