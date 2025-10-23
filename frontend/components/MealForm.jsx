import React, { useState, useEffect } from "react";

const MealForm = ({ onSubmit, onUpdate, editingMeal }) => {
  const [name, setName] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {
    if (editingMeal) {
      setName(editingMeal.name || "");
      setDay(editingMeal.day || "");
    } else {
      setName("");
      setDay("");
    }
  }, [editingMeal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !day) return console.log("Informations invalides");

    const mealData = { name, day };

    if (editingMeal) onUpdate(editingMeal._id, mealData);
    else onSubmit(mealData);

    setName("");
    setDay("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom du repas"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Jour"
        value={day}
        onChange={(e) => setDay(e.target.value)}
      />
      <button type="submit">
        {editingMeal ? "Modifier le repas" : "Créer un repas"}
      </button>
    </form>
  );
};

export default MealForm;
