import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);


export const connectDb = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.MONGO_URI}/mern-course`);
    console.log("MongoDb connected Successfully!!");
  } catch (error) {
    console.log(`MongoDb connection Error : `, error.message);
    process.exit(1);
  }                       
};
