import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { TokenContext } from "../context/AuthContext";

const DashboardEmploye = () => {
  const { token } = useContext(TokenContext);
  const [meals, setMeals] = useState([]);
  const [selections, setSelections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedDay, setSelectedDay] = useState(""); 

  useEffect(() => {
    if (!token) return;

    const fetchMeals = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/Meals", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = Array.isArray(res.data.data) ? res.data.data : [];
        setMeals(data);

        
        const jours = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
        const today = new Date();
        const todayName = jours[today.getDay()];
        setSelectedDay(todayName);
      } catch (err) {
        console.error("Erreur lors du chargement des repas", err);
        setMeals([]);
      }
    };

    const fetchSelections = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/selection/mine", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSelections(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err) {
        console.error("Erreur lors du chargement des sélections", err.response?.data || err.message);
        setSelections([]);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await fetchMeals();
      await fetchSelections();
      setLoading(false);
    };

    fetchData();
  }, [token]);

  const chooseMeal = async (mealId) => {
    try {
      const alreadySelected = selections.some((sel) => sel.meal?._id === mealId);
      if (alreadySelected) {
        setMessage("Vous avez déjà choisi ce repas.");
        return;
      }

      const res = await axios.post(
        "http://localhost:4000/api/selection",
        { mealId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newSel = res.data.data;
      setSelections((prev) => [...prev, newSel]);
      const selectedMeal = meals.find((meal) => meal._id === mealId);
      setMessage(`Repas "${selectedMeal?.name || ''}" sélectionné avec succès !`);
    } catch (err) {
      console.error("Erreur lors de la sélection du repas", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Impossible de sélectionner le repas.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 animate-pulse">Chargement...</p>
      </div>
    );

  
  const mealsOfDay = meals.filter(
    meal => meal.day && meal.day.trim().toLowerCase() === selectedDay.trim().toLowerCase()
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Bienvenue sur votre tableau de bord employé
      </h2>

      {selectedDay && (
        <div className="mb-4 text-lg font-semibold text-gray-700">
          Menu du jour : <span className="text-black">{selectedDay}</span>
        </div>
      )}

      {message && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-700 border border-green-300">
          {message}
        </div>
      )}

  
     <section className="mb-10">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">🍽️ Repas disponibles</h3>
       {mealsOfDay.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mealsOfDay.map((meal) => {
            const alreadySelected = selections.some((sel) => sel.meal?._id === meal._id);
            return (
                <li
                  key={meal._id}
                  className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center hover:shadow-lg transition"
                >
                  <div>
                    <h4 className="font-semibold text-gray-800">{meal.name}</h4>
                    <p className="text-sm text-gray-500">{meal.day}</p>
                  </div>
                  <button
                    onClick={() => chooseMeal(meal._id)}
                    disabled={alreadySelected}
                    className="px-6 py-3 bg-white text-black rounded-lg shadow-md border border-gray-300 hover:bg-gray-100 transition font-semibold"
                  >
                    {alreadySelected ? "✅ Choisi" : "Choisir"}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-500">Aucun repas disponible pour ce jour.</p>
        )}
      </section>
    </div>
  );
};

export default DashboardEmploye;
