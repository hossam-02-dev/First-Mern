import asyncHandler from "express-async-handler";
import Employe from "../models/EmployeModel.js"
export const Getallemployes = asyncHandler(async(req,res) => {
  const employes = await Employe.find({});
if (employes.length > 0) {
return  res.status(200).json({succes : true , message : `touts les employés sont listés` , data : employes})
}
else {

res.status(404).json({succes : false ,  message :  " Les Employés ne sont pas listés "});
}
})

export const Getemploye = asyncHandler(async(req,res) => {
    const employe = await Employe.findById(req.params.id);
    if (employe) {
return   res.status(200).json({succes : true  , message:`L'employé ayant l'd ${req.params.id} est listé ` , data : employe});
    } else {

       res.status(404).json({succes : false ,  message :  " Employé non trouvé "});
    }


})
export const Createemploye = asyncHandler(async (req,res)=> {
const createemploye = await Employe.create(req.body);
if (createemploye) {
return  res.status(201).json({succes : true , message : "Création d'un nouveau employé" , data : createemploye});
} else {
  res.status(404).json({succes : false , message : "Echec de creation d'un nouveau employé"})
}
})

export const Editemploye = asyncHandler(async (req,res)=> {
const editemploye = await Employe.findByIdAndUpdate(req.params.id , req.body  , {new :true});
if (editemploye) {
return   res.status(200).json({succes : true , message : `l'employé ayant l'id ${req.params.id} est modifié ! ` , data : editemploye});
} else {
  res.status(404).json({succes : false , message : "l'employé n'est pas modifié" })
}

})

export const Deleteemploye = asyncHandler(async (req, res) => {
  console.log("ID reçu :", req.params.id);

  const employe = await Employe.findById(req.params.id);
  console.log("Employé trouvé :", employe);

  if (!employe) {
    return res.status(404).json({
      succes: false,
      message: `Aucun employé trouvé avec l'id ${req.params.id}`,
    });
  }

  const deleteemploye = await Employe.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    succes: true,
    message: `L'employé ayant l'id ${req.params.id} est supprimé`,
    data: deleteemploye,
  });
});
