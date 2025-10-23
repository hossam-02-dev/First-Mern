import mongoose from "mongoose";
const connectDB = async () => {
try {
const conn = await mongoose.connect (process.env.MONGO_URI );
console.log(`MongoDB est connecté :    ${conn.connection.host} , ${conn.connection.name}  `);

} catch (error) {
console.error("la base de donnée n'est pas connécté")
process.exit(1);
}




}
export default connectDB ;