import React from "react";
import { Users, Trash2, Mail, User } from "lucide-react";

const EmployeList = ({ employes, DeleteEmpl }) => {
 
  if (!Array.isArray(employes)) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-lg">
        <div className="text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Aucun employé à afficher.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-md">
          <Users className="w-8 h-8 text-gray-700" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Liste des Employés
        </h2>
      </div>

   
      {employes.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-600 text-lg mb-2">Aucun employé enregistré</p>
          <p className="text-gray-500">Commencez par ajouter des employés</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {employes.map((employe) => (
            <div
              key={employe._id}
              className="bg-gray-50/80 border border-gray-200 rounded-xl p-6 hover:bg-white hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                {/* Employee Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="space-y-2">
                    {/* Employee name */}
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900">
                        {employe.name}
                      </h3>
                    </div>
                    
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{employe.email}</span>
                    </div>
                  </div>
                </div>

             
                <div className="flex items-center">
                  <button
                    onClick={() => DeleteEmpl(employe._id)}
                    className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-all duration-200 hover:scale-105"
                    title="Supprimer l'employé"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      
      {employes.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center">
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              <span className="text-sm text-gray-600">
                Total: <span className="font-semibold text-gray-800">{employes.length}</span> employés
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeList;