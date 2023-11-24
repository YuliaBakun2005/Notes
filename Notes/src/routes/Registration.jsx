import React, { useState } from 'react';
import { User } from '../util/validation';
import { useNavigate } from 'react-router-dom';
import Chance from 'chance';

const chance = new Chance();

export function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate=useNavigate();

  function handleRegister() {
    try {
      const id = chance.guid();
      const createdAt = new Date().toLocaleString();
      const userInput = {
        id,
        email,
        password,
        confirmPassword,
        createdAt,
      };
  
      User.parse(userInput);
      setErrors({});
      const user = {
        id,
        email,
        password,
        createdAt,
      };
  
      saveUserToDatabase(user);
    } catch (err) {
      console.error(err);
      const fieldErrors = {};
  
      if (err.message.includes('Invalid email address')) {
        fieldErrors.email = 'Invalid email address';
      }
  
      if (err.message.includes('Length should be more or equal 8')) {
        fieldErrors.password = 'Length should be more or equal 8';
      }
  
      if (password !== confirmPassword)  {
        fieldErrors.confirmPassword = 'Passwords do not match';
      }
  
      setErrors(fieldErrors);
      console.log(fieldErrors);
    }
  }

  async function saveUserToDatabase(user) {
    try {
      const response = await fetch('http://localhost:5001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        console.log('User saved successfully');
        navigate('/login');
      } else {
        console.error('Failed to save user');
      }
    } catch (error) {
      console.error('Error:', error);
      console.log(errors);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mt-3 mb-6">Sign up</h2>
            <form className="w-96 bg-lime-100 p-8 rounded-lg shadow-lg"><div className="mb-4">
          <input
            className="w-full py-2 px-3 text-gray-700 border rounded focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <input
            className="w-full py-2 px-3 text-gray-700 border rounded focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        <div className="mb-4">
          <input
            className="w-full py-2 px-3 text-gray-700 border rounded focus:outline-none focus:shadow-outline"
            placeholder="Repeat password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
        </div>
       
        <button type="button" onClick={handleRegister} className="w-full bg-lime-500 hover:bg-lime-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Sign up
        </button>
      </form>
    </div>
  );
}