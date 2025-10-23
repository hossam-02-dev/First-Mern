import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import MealForm from "../components/MealForm";
import MealList from "../components/MealList";
import EmployeForm from "../components/EmployeForm";
import EmployeList from "../components/EmployeList";
import { TokenContext } from "../context/AuthContext";

const DashboardRH = () => {
  const { token } = useContext(TokenContext);

 
  const [activeTab, setActiveTab] = useState("meals");
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);


  const [meals, setMeals] = useState([]);
  const [editingMeal, setEditingMeal] = useState(null);
  const [showMealForm, setShowMealForm] = useState(false);

 
  const [employes, setEmployes] = useState([]);
  const [editingEmploye, setEditingEmploye] = useState(null);
  const [showEmployeForm, setShowEmployeForm] = useState(false);

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };


  const addNotification = (message, type = "success") => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(notif => notif.id !== id));
    }, 4000);
  };

 
  const fetchMeals = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/api/Meals", axiosConfig);
      setMeals(res.data.data || []);
    } catch (err) {
      console.error("Erreur fetch meals:", err.response?.data || err.message);
      addNotification("Erreur lors du chargement des repas", "error");
    } finally {
      setLoading(false);
    }
  };

  const createMeal = async (mealData) => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:4000/api/Meals", mealData, axiosConfig);
      setMeals((prev) => [...prev, res.data.data]);
      setShowMealForm(false);
      addNotification("Repas créé avec succès");
    } catch (err) {
      console.error("Erreur création repas:", err.response?.data || err.message);
      addNotification("Erreur lors de la création du repas", "error");
    } finally {
      setLoading(false);
    }
  };

  const updateMeal = async (id, mealData) => {
    try {
      setLoading(true);
      const res = await axios.put(`http://localhost:4000/api/Meals/${id}`, mealData, axiosConfig);
      setMeals((prev) => prev.map((m) => (m._id === id ? res.data.data : m)));
      setEditingMeal(null);
      setShowMealForm(false);
      addNotification("Repas modifié avec succès");
    } catch (err) {
      console.error("Erreur update repas:", err.response?.data || err.message);
      addNotification("Erreur lors de la modification du repas", "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteMeal = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce repas ?")) {
      return;
    }
    
    try {
      setLoading(true);
      await axios.delete(`http://localhost:4000/api/Meals/${id}`, axiosConfig);
      setMeals((prev) => prev.filter((m) => m._id !== id));
      addNotification("Repas supprimé avec succès");
    } catch (err) {
      console.error("Erreur suppression repas:", err.response?.data || err.message);
      addNotification("Erreur lors de la suppression du repas", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditMeal = (meal) => {
    setEditingMeal(meal);
    setShowMealForm(true);
  };

 
  const fetchEmployes = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/api/Employes", axiosConfig);
      setEmployes(res.data.data || []);
    } catch (err) {
      console.error("Erreur fetch employes:", err.response?.data || err.message);
      addNotification("Erreur lors du chargement des employés", "error");
    } finally {
      setLoading(false);
    }
  };

  const createEmploye = async (emplData) => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:4000/api/Employes", emplData, axiosConfig);
      setEmployes((prev) => [...prev, res.data.data]);
      setShowEmployeForm(false);
      addNotification("Employé créé avec succès");
    } catch (err) {
      console.error("Erreur création employé:", err.response?.data || err.message);
      addNotification("Erreur lors de la création de l'employé", "error");
    } finally {
      setLoading(false);
    }
  };

  const updateEmploye = async (id, emplData) => {
    try {
      setLoading(true);
      const res = await axios.put(`http://localhost:4000/api/Employes/${id}`, emplData, axiosConfig);
      setEmployes((prev) => prev.map((e) => (e._id === id ? res.data.data : e)));
      setEditingEmploye(null);
      setShowEmployeForm(false);
      addNotification("Employé modifié avec succès");
    } catch (err) {
      console.error("Erreur update employé:", err.response?.data || err.message);
      addNotification("Erreur lors de la modification de l'employé", "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteEmploye = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet employé ?")) {
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`http://localhost:4000/api/Employes/${id}`, axiosConfig);
      setEmployes((prev) => prev.filter((e) => e._id !== id));
      addNotification("Employé supprimé avec succès");
    } catch (err) {
      console.error("Erreur suppression employé:", err.response?.data || err.message);
      addNotification("Erreur lors de la suppression de l'employé", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditEmploye = (employe) => {
    setEditingEmploye(employe);
    setShowEmployeForm(true);
  };

  
  useEffect(() => {
    fetchMeals();
    fetchEmployes();
  }, []);

  
  const cancelMealForm = () => {
    setShowMealForm(false);
    setEditingMeal(null);
  };

  const cancelEmployeForm = () => {
    setShowEmployeForm(false);
    setEditingEmploye(null);
  };

  return (
    <div className="dashboard">
      
      <header className="header">
        <h1>Dashboard RH</h1>
        <div className="stats">
          <div className="stat">
            <span className="stat-value">{meals.length}</span>
            <span className="stat-label">Repas</span>
          </div>
          <div className="stat">
            <span className="stat-value">{employes.length}</span>
            <span className="stat-label">Employés</span>
          </div>
        </div>
      </header>

     
      <div className="notifications">
        {notifications.map(notif => (
          <div key={notif.id} className={`notification ${notif.type}`}>
            {notif.message}
          </div>
        ))}
      </div>

     
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      )}

      <nav className="nav">
        <button
          className={`nav-item ${activeTab === "meals" ? "active" : ""}`}
          onClick={() => setActiveTab("meals")}
        >
          Repas
        </button>
        <button
          className={`nav-item ${activeTab === "employees" ? "active" : ""}`}
          onClick={() => setActiveTab("employees")}
        >
          Employés
        </button>
      </nav>

    
      <main className="main">
        {activeTab === "meals" && (
          <div className="section">
            <div className="section-header">
              <h2>Repas</h2>
              <button
                className="btn btn-primary"
                onClick={() => setShowMealForm(true)}
                disabled={loading}
              >
                + Ajouter
              </button>
            </div>

            <div className="list-wrapper">
              <MealList 
                meals={meals} 
                onEdit={handleEditMeal} 
                onDelete={deleteMeal}
                loading={loading}
              />
            </div>
          </div>
        )}

        {activeTab === "employees" && (
          <div className="section">
            <div className="section-header">
              <h2>Employés</h2>
              <button
                className="btn btn-primary"
                onClick={() => setShowEmployeForm(true)}
                disabled={loading}
              >
                + Ajouter
              </button>
            </div>

            <div className="list-wrapper">
              <EmployeList 
                employes={employes} 
                DeleteEmpl={deleteEmploye}
                onEdit={handleEditEmploye}
                loading={loading}
              />
            </div>
          </div>
        )}
      </main>

    
      {showMealForm && (
        <div className="modal" onClick={(e) => e.target === e.currentTarget && cancelMealForm()}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingMeal ? "Modifier le repas" : "Nouveau repas"}</h3>
              <button className="close-btn" onClick={cancelMealForm}>×</button>
            </div>
            <div className="modal-body">
              <MealForm
                onSubmit={createMeal}
                onUpdate={updateMeal}
                editingMeal={editingMeal}
              />
            </div>
          </div>
        </div>
      )}

      {showEmployeForm && (
        <div className="modal" onClick={(e) => e.target === e.currentTarget && cancelEmployeForm()}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingEmploye ? "Modifier l'employé" : "Nouvel employé"}</h3>
              <button className="close-btn" onClick={cancelEmployeForm}>×</button>
            </div>
            <div className="modal-body">
              <EmployeForm
                onSubmit={createEmploye}
                onUpdate={updateEmploye}
                editingEmploye={editingEmploye}
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dashboard {
          min-height: 100vh;
          width: 100vw;
          background-color: #fafafa;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          color: #1f2937;
        }

        .header {
          width: 100%;
          background: white;
          border-bottom: 1px solid #e5e7eb;
          padding: 24px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .header h1 {
          font-size: 24px;
          font-weight: 600;
          margin: 0;
          color: #111827;
        }

        .stats {
          display: flex;
          gap: 24px;
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .stat-value {
          font-size: 28px;
          font-weight: 700;
          color: #1f2937;
          line-height: 1;
        }

        .stat-label {
          font-size: 12px;
          color: #6b7280;
          text-transform: uppercase;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .notifications {
          position: fixed;
          top: 16px;
          right: 16px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .notification {
          background: white;
          padding: 12px 16px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          font-size: 14px;
          font-weight: 500;
          border-left: 4px solid;
          animation: slideIn 0.3s ease-out;
        }

        .notification.success {
          border-left-color: #10b981;
          color: #065f46;
        }

        .notification.error {
          border-left-color: #ef4444;
          color: #991b1b;
        }

        .loading {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }

        .spinner {
          width: 32px;
          height: 32px;
          border: 3px solid #e5e7eb;
          border-top: 3px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .nav {
          width: 100%;
          background: white;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          padding: 0 32px;
          width: 100%;
        }

        .nav-item {
          background: none;
          border: none;
          padding: 16px 24px;
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
        }

        .nav-item:hover {
          color: #374151;
        }

        .nav-item.active {
          color: #3b82f6;
          border-bottom-color: #3b82f6;
        }

        .main {
          width: 100%;
          padding: 32px;

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .section-header h2 {
          font-size: 20px;
          font-weight: 600;
          margin: 0;
          color: #111827;
        }

        .btn {
          border: none;
          padding: 10px 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-primary {
          background: #3b82f6;
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background: #2563eb;
        }

        .list-wrapper {
          background: white;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 16px;
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow: hidden;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .modal-header h3 {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
          color: #111827;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          color: #6b7280;
          cursor: pointer;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: #f3f4f6;
          color: #374151;
        }

        .modal-body {
          padding: 24px;
          overflow-y: auto;
          max-height: calc(90vh - 200px);
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            gap: 16px;
            padding: 20px 16px;
          }

          .main {
            padding: 20px 16px;
          }

          .section-header {
            flex-direction: column;
            gap: 16px;
            align-items: stretch;
          }

          .nav {
            padding: 0 16px;
          }

          .stats {
            justify-content: center;
          }

          .modal {
            padding: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardRH;