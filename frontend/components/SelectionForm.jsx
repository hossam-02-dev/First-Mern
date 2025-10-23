import React, { useState, useEffect } from "react";

const SelectionForm = ({ meals, onSubmit, userId, employeId }) => {
  const [selectedMeal, setSelectedMeal] = useState("");
  const [date, setDate] = useState("");

  const handleSelection = (e) => {
    e.preventDefault();
    if (!selectedMeal || !date) {
      console.log("Informations invalides !");
      return;
    }

    const selectionData = {
      user: userId,
      employeId,
      meal: selectedMeal,
      date
    };

    onSubmit(selectionData);

    setSelectedMeal("");
    setDate("");
  };

  return (
    <form onSubmit={handleSelection}>
      <select
        value={selectedMeal}
        onChange={(e) => setSelectedMeal(e.target.value)}
      >
        <option value="">-- Choisir un repas --</option>
        {meals.map((meal) => (
          <option key={meal._id} value={meal._id}>
            {meal.name} - {meal.day}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button type="submit">Valider la sélection</button>
    </form>
  );
};

export default SelectionForm;
