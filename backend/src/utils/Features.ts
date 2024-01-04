import mongoose from "mongoose"


export const connectDB = ()=> {
    mongoose.connect("mongodb://0.0.0.0:27017",{
        dbName: "Ecommerce",
    }).then(connect => console.log(`DataBase Connected to ${connect.connection.host}`)).catch(e=> console.log(e));
}