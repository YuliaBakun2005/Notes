import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from "../components/UserContextProvider";
import { Home } from './Home';

export function EditNote() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { notes, setNotes } = useContext(UserContext);
  const { noteId } = useParams();
  const [createdAt, setCreatedAt] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`http://localhost:5001/notes/${noteId}`);
        if (response.ok) {
          const noteData = await response.json();
          setTitle(noteData.title);
          setText(noteData.text);
          setCreatedAt(noteData.createdAt);
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

  const handleEditNote = () => {
    const newErrors = [];

    if (title.trim() === '') {
      newErrors.push('Title cannot be empty');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const updatedNote = {
        id: noteId,
        authorId: user.id,
        title: title,
        text: text,
        createdAt: createdAt,
      };

      fetch(`http://localhost:5001/notes/${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedNote)
      })
        .then(response => {
          if (response.ok) {
            setNotes(notes.map(note =>
              note.id === noteId ? updatedNote : note
            ));
            navigate('/notes');
          } else {
            throw new Error('Failed to update note');
          }
        })
        .catch(error => {
          console.error('Error saving note:', error);
          setErrors(['Error with saving note']);
        });
    } catch (error) {
      console.error('Error saving note:', error);
      navigate('/error');
    }
  };

  return (
    <div>
      <Home/>
      <div className="max-w-lg mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <Link to="/notes" className="text-1xl bg-lime-500">
            Back
          </Link>
          <h1 className="text-2xl font-bold text-center mb-2">
            Edit Note
          </h1>
          <div></div>
        </div>
        <div className="max-w-lg mx-auto bg-gray-100 p-4 rounded-lg shadow">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none"
          />
          {errors.includes('Title cannot be empty') && (
            <p className="text-red-500">Title cannot be empty</p>
          )}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none"
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleEditNote}
            className="mt-4 bg-lime-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}