import asyncHandler from "express-async-handler";
import Selection from "../models/SelectionModel.js";
import Meal from "../models/MealModel.js";

// -------------------- Créer une sélection --------------------
export const Createselection = asyncHandler(async (req, res) => {
  try {
    const { mealId } = req.body;
    if (!mealId) {
      return res.status(400).json({ succes: false, message: "mealId requis" });
    }

    const meal = await Meal.findById(mealId);
    if (!meal) {
      return res.status(404).json({ succes: false, message: "Repas introuvable" });
    }

    // Vérifier si l'utilisateur a déjà choisi ce repas
    const alreadySelected = await Selection.findOne({ user: req.user._id, meal: mealId });
    if (alreadySelected) {
      return res.status(400).json({ succes: false, message: "Vous avez déjà choisi ce repas" });
    }

    const newSelection = await Selection.create({
      meal: mealId,
      user: req.user._id,       // on passe juste l'id, pas ObjectId
      employeId: req.user._id,  // idem
    });

    res.status(201).json({
      succes: true,
      message: "Sélection créée avec succès",
      data: newSelection,
    });
  } catch (error) {
    res.status(500).json({ succes: false, message: error.message });
  }
});

// -------------------- Sélections de l’employé connecté --------------------
export const GetMySelections = asyncHandler(async (req, res) => {
  try {
    const mySelections = await Selection.find({ user: req.user._id }).populate("meal");
    res.status(200).json({
      succes: true,
      message: "Voici vos sélections",
      data: mySelections,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: "Erreur lors du chargement de vos sélections",
    });
  }
});

// -------------------- Toutes les sélections (RH) --------------------
export const Getallselections = asyncHandler(async (req, res) => {
  const allSelections = await Selection.find({}).populate("meal user");
  if (allSelections.length > 0) {
    res.status(200).json({ succes: true, message: "Toutes les sélections listées", data: allSelections });
  } else {
    res.status(404).json({ succes: false, message: "Aucune sélection trouvée" });
  }
});

// -------------------- Sélection par ID --------------------
export const Getaselection = asyncHandler(async (req, res) => {
  const selection = await Selection.findById(req.params.id).populate("meal user");
  if (selection) {
    res.status(200).json({ succes: true, message: "Sélection trouvée", data: selection });
  } else {
    res.status(404).json({ succes: false, message: "Sélection introuvable" });
  }
});

// -------------------- Modifier une sélection (RH) --------------------
export const Editselection = asyncHandler(async (req, res) => {
  const updatedSelection = await Selection.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (updatedSelection) {
    res.status(200).json({ succes: true, message: "Sélection mise à jour", data: updatedSelection });
  } else {
    res.status(404).json({ succes: false, message: "Impossible de mettre à jour la sélection" });
  }
});

// -------------------- Supprimer une sélection (RH) --------------------
export const Deleteselection = asyncHandler(async (req, res) => {
  const deletedSelection = await Selection.findByIdAndDelete(req.params.id);
  if (deletedSelection) {
    res.status(200).json({ succes: true, message: "Sélection supprimée", data: deletedSelection });
  } else {
    res.status(404).json({ succes: false, message: "Impossible de supprimer la sélection" });
  }
});
