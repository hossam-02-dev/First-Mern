
import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import Generatetoken from "../jwt.js";


export const Registeruser = asyncHandler(async (req, res) => {
  const { password, email, username } = req.body;

  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  const existingUser = await User.findOne({ email : trimmedEmail });

  if (existingUser) {
    return res.status(400).json({ succes: false, message: "Utilisateur déjà existant" });
  }


  const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

  const createUser = await User.create({
    email: trimmedEmail,
    username,
    password: hashedPassword,
    role: "employe",
  });

  
  const token = Generatetoken(createUser);

  res.status(201).json({
    succes: true,
    message: "Utilisateur créé avec succès",
    data: createUser,
    token,
  });
});


export const Loginuser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  const loginUser = await User.findOne({ email: trimmedEmail });
  if (!loginUser) {
    return res.status(401).json({ succes: false, message: "Utilisateur non trouvé" });
  }

  const isMatch = await bcrypt.compare(trimmedPassword, loginUser.password);
  if (!isMatch) {
    return res.status(401).json({ succes: false, message: "Mot de passe incorrect" });
  }

  const token = Generatetoken(loginUser);

  res.status(200).json({
    succes: true,
    message: "Connexion réussie",
    data: loginUser,
    token,
  });
});
