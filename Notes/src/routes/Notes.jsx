import { useContext,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../components/UserContextProvider";
import { Home } from './Home';

export function Notes() {
  const { user, notes, loading, setNotes } = useContext(UserContext); 

  const userNotes = notes.filter(note => note.authorId === user.id);
  userNotes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  useEffect(()=>{
    fetch('http://localhost:5001/notes').then(res => res.json()).then(setNotes);
  },[])


  const handleDeleteNote = (noteId) => {
    fetch(`http://localhost:5001/notes/${noteId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
            const updatedNotes = notes.filter(note => note.id !== noteId);
            setNotes(updatedNotes);
          }
      })
      .catch(error => {
        console.error('Error deleting note:', error);
        navigate('/error');
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="text-center">
      <Home />
      <h1 className="text-3xl font-bold mt-8">Notes</h1>
      <button className="mt-4">
        <Link to="/notes/create" className=" bg-lime-500 hover:bg-lime-600 py-2 px-4 rounded">
          Add new note
        </Link>
      </button>
      {userNotes.map((note) => (
        <div key={note.id} className="mt-8 mb-4 flex items-center h-12 bg-lime-100">
          <Link to={`/notes/${note.id}`} className="flex items-center w-full">
            <h2 className="text-xl font-bold">
              {note.title}
            </h2>
            <p className="text-gray-500 ml-4">{note.createdAt}</p>
          </Link>
          <Link to={`/notes/${note.id}/edit`} className="mr-4">
              ✍️
            </Link>
            <button
              onClick={() => handleDeleteNote(note.id)}
              className="text-red-500 mr-4 hover:text-red-700"
            >
              🗑️
            </button>
        </div>
      ))}
    </div>
  );
}