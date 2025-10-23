import { useState, useEffect } from "react";

const EmployeForm = ({ onSubmit, onUpdate, editingEmploye }) => {
    const [formData, setFormData] = useState({
        name: "",
        employeId: "",
        role: "employe",
    });

  
    useEffect(() => {
        if (editingEmploye) {
            setFormData(editingEmploye);
        } else {
           
            setFormData({
                name: "",
                employeId: "",
                role: "employe",
            });
        }
    }, [editingEmploye]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleemploye = (e) => {
        e.preventDefault();
        
        if (editingEmploye) {
          
            onUpdate(editingEmploye._id, formData);
        } else {
           
            onSubmit(formData);
        }
        
        
        setFormData({ name: "", employeId: "", role: "employe" });
    };

    return (
        <form onSubmit={handleemploye}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nom de l'employé"
            />
            <input
                type="text"
                name="employeId"
                value={formData.employeId}
                onChange={handleChange}
                placeholder="ID de l'employé"
            />
            <select name="role" value={formData.role} onChange={handleChange}>
                <option value="employe">Employé</option>
                <option value="rh">RH</option>
            </select>
            <button type="submit">
                {editingEmploye ? "Mettre à jour l'employé" : "Créer un employé"}
            </button>
        </form>
    );
};

export default EmployeForm;