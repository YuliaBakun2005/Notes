import { UserContext } from "../components/UserContextProvider";
import { useContext} from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export function Home() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <h1 className="mr-8 font-bold">Hello {user.email}</h1>
        <nav className="flex gap-8">
          <NavLink
            to="/about"
            className={location.pathname === "/about" ? "font-bold" : ""}
          >
            About
          </NavLink>
          <NavLink
            to="/notes"
            className={location.pathname === "/notes" ? "font-bold" : ""}
          >
            Notes
          </NavLink>
          <NavLink
            to="/login"
            className={location.pathname === "/login" ? "font-bold" : ""}
          >
            Log out
          </NavLink>
        </nav>
      </div>
    </div>
  );
}