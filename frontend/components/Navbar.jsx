import { ChefHat, Utensils, LayoutDashboard, LogOut, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TokenContext } from "../context/AuthContext";

const Navbar = () => {
  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    navigate("/");
  };

  return (
    <nav className="w-full bg-gray-800 shadow-lg px-8 py-8 flex justify-between items-center">
      
    
      <Link 
        to="/" 
        className="flex items-center gap-4 text-2xl font-bold text-white"
      >
        <div className="p-3 bg-white/15 rounded-2xl">
          <ChefHat className="w-8 h-8" />
        </div>
        <span>Bouffe Digitale</span>
      </Link>

    
      <div className="flex items-center gap-12">
        <Link 
          to="/" 
          className="flex items-center gap-3 px-6 py-3 text-white text-lg font-medium"
        >
          <Utensils className="w-6 h-6" />
          <span>Accueil</span>
        </Link>

        {token && (
          <Link
            to={userRole === "rh" ? "/dashboard/rh" : "/dashboard/employe"}
            className="flex items-center gap-3 px-6 py-3 text-white text-lg font-medium"
          >
            <LayoutDashboard className="w-6 h-6" />
            <span>Dashboard</span>
            {userRole === "rh" && (
              <span className="ml-3 px-3 py-1 bg-blue-600 text-white text-sm  font-semibold">
              
              </span>
            )}
          </Link>
        )}
      </div>

    
      <div className="flex items-center">
        {token ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-8 py-4 bg-red-600 text-black rounded-2xl font-semibold text-lg shadow-md"
          >
            <LogOut className="w-6 h-6" />
            <span>Déconnexion</span>
          </button>
        ) : (
          <Link
            to="/loginform"
            className="flex items-center gap-3 px-8 py-4  text-white rounded-2xl font-semibold text-lg shadow-md"
          >
            <LogIn className="w-6 h-6" />
            <span>Connexion</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;