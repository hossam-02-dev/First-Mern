import React, { useState } from "react";

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-500 via-gray-600 to-slate-700 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm border border-white/20 shadow-2xl rounded-3xl p-12 w-full max-w-md min-h-[500px] flex flex-col justify-center relative">
        
       
        <div className="absolute -top-2 -left-2 w-20 h-20 bg-gradient-to-br from-gray-400/30 to-transparent rounded-full blur-xl"></div>
        <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-tl from-gray-500/20 to-transparent rounded-full blur-lg"></div>
        
       
        <div className="text-center mb-8 relative z-10">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Connexion
          </h2>
          <p className="text-gray-600 text-sm font-medium">
            Connectez-vous à votre compte
          </p>
        </div>

        <div className="space-y-6 relative z-10">
        
          <div className="relative group">
            <input
              autoComplete="off"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre email"
              className="w-full px-5 py-4 bg-gray-50/80 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-gray-700 placeholder-gray-400 transition-all duration-300 hover:bg-white/90 focus:bg-white focus:shadow-lg focus:-translate-y-0.5"
            />
          </div>

         
          <div className="relative group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
              className="w-full px-5 py-4 bg-gray-50/80 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-gray-700 placeholder-gray-400 transition-all duration-300 hover:bg-white/90 focus:bg-white focus:shadow-lg focus:-translate-y-0.5"
            />
          </div>

        
          <button
            onClick={handleLogin}
            className="w-full py-4 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-semibold text-lg rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl active:scale-98 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 relative overflow-hidden group"
          >
            <span className="relative z-10">Connexion</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>

        
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;