// middleware/authmiddle.js
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

// Middleware d'authentification
const authmiddle = asyncHandler(async (req, res, next) => {
  // 1️⃣ Vérifier si un header Authorization existe et commence par "Bearer"
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ succes: false, message: "Accès refusé, aucun token fourni" });
  }

  // 2️⃣ Extraire le token après "Bearer "
  const token = authHeader.split(" ")[1];

  try {
    // 3️⃣ Vérifier le token avec la clé secrète
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Attacher le payload décodé (id, role) à la requête
    req.user = decoded; 
    // exemple : { _id: "66f0a5...", role: "employe", iat: ..., exp: ... }

    // 5️⃣ Passer au contrôleur suivant
    next();
  } catch (error) {
    return res.status(401).json({ succes: false, message: "Token invalide ou expiré" });
  }
});

export default authmiddle;
