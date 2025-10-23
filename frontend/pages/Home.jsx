import React from "react";
import { Cookie } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const seconnecter = useNavigate();

  return (
    <>
    
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          width: 100%;
        }

        .home-container {
          width: 100vw;
          min-height: 100vh;
          overflow-x: hidden;
        }
      `}</style>

      <div className="home-container min-h-screen bg-gradient-to-br from-slate-500 via-gray-600 to-slate-700 flex items-center justify-center">
        
        <div className="bg-white/95 backdrop-blur-sm w-full h-screen flex flex-col items-center justify-center">
          
      
          <div className="flex items-center gap-3 mb-6">
            <Cookie className="w-10 h-10 text-gray-700" />
            <h2 className="text-3xl font-bold text-gray-900">Bouffe Digitale</h2>
          </div>

       
          <div className="max-w-xl text-center text-gray-700 mb-8 leading-relaxed">
            <p className="mb-4">
              Votre solution numérique pour gérer et sélectionner vos repas en toute
              simplicité.
            </p>
            <p>
              Faites vos choix et gérez vos repas, le tout en quelques clics.
            </p>
          </div>

       
          <button
            onClick={() => seconnecter("/loginform")}
            className="px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:shadow-xl"
          >
            Se connecter
          </button>
          
        </div>
      </div>
    </>
  );
};

export default Home;