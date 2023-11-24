import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const id = localStorage.getItem("userId");
    if (id) {
      fetch(`http://localhost:5001/users?id=${id}`)
        .then((r) => r.json())
        .then((users) => users[0])
        .then((user) => {
          setUser(user);
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem("userId", user.id);
      fetch(`http://localhost:5001/notes?authorId=${user.id}`)
        .then((r) => r.json())
        .then((notes) => setNotes(notes));
    }
  }, [user?.id]);

  return (
    <UserContext.Provider value={{ user, onChange: setUser,setNotes, notes, loading }}>
      {children}
    </UserContext.Provider>
  );
}