import React from "react";

const SelectionList = ({ selections, onDelete, onEdit, userRole }) => {
  if (!Array.isArray(selections)) {
    return <p>Aucune sélection à afficher.</p>;
  }

  return (
    <div>
      <h3>Liste des Sélections</h3>
      {selections.length === 0 ? (
        <p>Aucune sélection pour le moment.</p>
      ) : (
        <ul>
          {selections.map((sel) => (
            <li key={sel._id}>
              {sel.meal?.name} - {sel.employeId} -{" "}
              {sel.date ? new Date(sel.date).toLocaleDateString() : "Date inconnue"}

              {userRole === "rh" && (
                <button onClick={() => onEdit(sel)}>Modifier</button>
              )}

              <button onClick={() => onDelete(sel._id)}>
                {userRole === "rh" ? "Supprimer" : "Annuler"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectionList;
