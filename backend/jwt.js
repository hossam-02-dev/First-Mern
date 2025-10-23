import pkg from "jsonwebtoken";
const {sign } = pkg;

const Generatetoken = (user) => {
    const accestoken = sign({ _id : user._id  , role : user.role} , process.env.JWT_SECRET , ({
    expiresIn :process.env.JWT_EXPIRES,
    }) )
    return accestoken;


   
}
export default Generatetoken;