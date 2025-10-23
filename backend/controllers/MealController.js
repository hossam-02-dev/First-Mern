import asyncHandler from "express-async-handler";
import Meal from "../models/MealModel.js";

export const Getallmeals = asyncHandler (async (req,res) => {
const allmeals = await Meal.find();
if (allmeals.length > 0 ) {
return  res.status(200).json({succes : true , message : "Touts les repas sont listés" , data : allmeals});
}
else {
    res.status(404).json({succes : false , message : "Les repas ne sont pas listés"});
}
 

})


export const Getameal = asyncHandler(async (req,res)=> {

    const meal = await Meal.findById(req.params.id);
    if (meal ) {
   return  res.status(200).json({succes : true , message : `Voici , le repas ayant l'd ${req.params.id}` , data : meal});
    }  else {
      res.status(404).json({succes : false , message : " le repas est introuvable"});
    }
 


})
export const Addmeal = asyncHandler(async (req,res) => {

    const addmeal = await Meal.create(req.body);

    if (addmeal) {
return    res.status(201).json({succes : true , message : "Le repas est créé!" , data : addmeal});
    } else {
        res.status(404).json({succes : false , message : "Echec de création d'un nouveau Repas" });
    }


})

export const Editmeal= asyncHandler(async (req,res)=> {
    const editmeal = await Meal.findByIdAndUpdate(req.params.id , req.body , {new : true})
if (editmeal) {
return  res.status(200).json({succes : true , message : `Le repas ayant l'd ${req.params.id} est modifié!` , data : editmeal});
}  else {
    res.status(404).json({succes : false , message : "Echec de modification de repas"});
}

})

export const Deletemeal= asyncHandler(async (req,res)=> {
const deletemeal = await Meal.findByIdAndDelete(req.params.id);
if (deletemeal) {
return    res.status(200).json({succes : true , message :`Le repas ayant l'd ${req.params.id} est supprimé!` , data : deletemeal });

} else {
    res.status(404).json({succes : false , message : "Echec de suppression de repas" });
}


})

