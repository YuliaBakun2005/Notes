import { Link } from 'react-router-dom';
import { UserContext } from "../components/UserContextProvider";
import { useContext } from 'react';

export function NotFound() {
  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-center">404</h1>
      <h1 className="text-2xl font-semibold mb-2 text-center">Page Not Found</h1>
      <p className="text-lg text-center">
        {user ? (
          <Link
            to="/"
            className="text-black-500 hover:text-lime-500"
          >
            Go to Home
          </Link>
        ) : (
          <Link
            to="/login"
            className="text-black-500 hover:text-lime-500"
          >
            Go to Login
          </Link>
        )}
      </p>
    </div>
  );
}