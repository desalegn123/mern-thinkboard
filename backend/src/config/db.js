import mongoose from 'mongoose';
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI
      
    );
    console.log('mongodb database is connected succussfully');
  } catch (error) {
    console.log('please it is failed to connect database', error);
  }
};
