// middleware/rolemiddle.js
import asyncHandler from "express-async-handler";

// Middleware de contrôle des rôles
// roles => tableau de rôles autorisés (par ex: ["rh"], ["employe", "rh"])
const rolemiddle = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    // 1️⃣ Vérifier que l'utilisateur est attaché à req.user
    if (!req.user) {
      return res.status(401).json({ succes: false, message: "Utilisateur non authentifié" });
    }

    // 2️⃣ Vérifier si le rôle de l'utilisateur est dans la liste des rôles autorisés
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ succes: false, message: "Accès interdit : rôle insuffisant" });
    }

    // 3️⃣ Tout est ok → continuer
    next();
  });
};

export default rolemiddle;
