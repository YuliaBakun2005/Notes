import { useState, useContext} from 'react';
import { User } from '../util/validation';
import { UserContext } from '../components/UserContextProvider';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogin() {
    const query = new URLSearchParams({
      email,
      password,
    }).toString();

    fetch(`http://localhost:5001/users?${query}`)
      .then((r) => r.json())
      .then((users) => users[0])
      .then((user) => {
        if (user) {
          userContext.onChange(user);
          navigate('/');
        } else {
          setErrors({ general: 'Invalid user' });
        }
      });
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <input
        className="mb-6 w-80 py-2 px-3 border rounded focus:outline-none focus:shadow-outline"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {errors.email && <div className="text-red-400">{errors.email}</div>}
      <input
        className="w-80 py-2 px-3 border rounded focus:outline-none focus:shadow-outline"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {errors.password && (
        <div className="text-red-400">{errors.password}</div>
      )}
      <button
        className="bg-lime-500 hover:bg-lime-600 mt-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleLogin}
      >
        Login
      </button>
      {errors.general && <div className="text-red-400">{errors.general}</div>}
    </div>
  );
}