import { UserContext } from "../components/UserContextProvider";
import { useContext } from 'react';
import { Home } from './Home';
import { Link } from 'react-router-dom';

export function About() {
  const { user } = useContext(UserContext);

  return (
    <div className="text-center">
      <Home />
      <h1 className="text-3xl font-bold mt-8">About me</h1>
      <h1 className="text-lg mt-4" >Email: {user.email}</h1>
      <h1 className="text-lg mt-2 mb-4">Date sign up: {user.createdAt}</h1>
      <button className="mt-4">
        <Link to="/notes" className=" bg-lime-500 hover:bg-lime-600 py-2 px-4 rounded">
          Go to Notes
        </Link>
      </button>
    </div>
  );
}