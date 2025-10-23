import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import axios from 'axios';
import { TokenContext } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { setToken, setRole } = useContext(TokenContext);

  const handleSubmit = async (loginData) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/auth/login',
        loginData
      );

      console.log("Réponse login :", response.data);

      const isSuccess = response.data.success || response.data.succes;

      if (isSuccess) {
        const token = response.data.token;
        const userRole = response.data.data.role;

 
        localStorage.setItem('token', token);
        localStorage.setItem('role', userRole);

      
        setToken(token);
        setRole(userRole);

        
        if (userRole === 'rh') {
          navigate('/dashboard/rh');
        } else {
          navigate('/dashboard/employe');
        }
      } else {
        console.error("Échec de connexion :", response.data.message);
      }
    } catch (error) {
      console.error('Erreur de connexion', error);
    }
  };

  return (
    <div>
      
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Login;

