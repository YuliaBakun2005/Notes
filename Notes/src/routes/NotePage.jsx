import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from "../components/UserContextProvider";
import { Home } from './Home';

export function NotePage() {
  const navigate = useNavigate();
  const { notes, loading, setNotes } = useContext(UserContext);
  const { noteId } = useParams();

  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`http://localhost:5001/notes/${noteId}`);
        if (response.ok) {
          const noteData = await response.json();
          setNote(noteData);
        } else {
          throw new Error('Failed to fetch note');
        }
      } catch (error) {
        console.error('Error fetching note:', error);
        navigate('/error');
      }
    };

    fetchNote();
  }, [noteId]);


  const handleDeleteNote = () => {
    fetch(`http://localhost:5001/notes/${noteId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          const updatedNotes = notes.filter(note => note.id !== noteId);
          setNotes(updatedNotes);
          navigate('/notes');
        }
      })
      .catch(error => {
        console.error('Error deleting note:', error);
        navigate('/error');
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!note) {
    return <div>Note not found.</div>;
  }

  return (
    <div>
      <Home />
      <div className="max-w-lg mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <Link to="/notes" className="text-1xl bg-lime-500">
            Back
          </Link>
          <h1 className="text-2xl font-bold text-center mb-2">
          <div className="flex items-center justify-center">
            {note.title}
          </div>
        </h1>
          <div>
            <button>
              <Link to={`/notes/${note.id}/edit`} className="mr-4">
                ✍️ 
              </Link>
            </button>
            <button onClick={handleDeleteNote}>
              🗑️ 
            </button>
          </div>
        </div>
        <div className="max-w-lg mx-auto bg-gray-100 p-4 rounded-lg shadow">
          <p className="text-gray-700 mb-4 overflow-auto max-h-48">{note.text}</p>
        </div>
      </div>
    </div>
  );
}