import mongoose from "mongoose";


let db = process.env.APP_DATABASE

async function dbConnect(){
   await mongoose.connect(db)
}

export default dbConnect
