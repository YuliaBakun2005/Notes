import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Home } from './Home';
import { UserContext } from "../components/UserContextProvider";
import { useContext } from 'react';

const noteSchema = z.object({
  id: z.number(),
  authorId: z.string(),
  title: z.string().min(1, 'Name cant be empty'),
  text: z.string(),
  createdAt: z.string(),
});

export function CreateNote() {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleCreateNote = async () => {
    const id = Date.now();
    const createdAt = new Date().toLocaleDateString();
    const noteData = {
      id,
      authorId: user.id,
      title,
      text,
      createdAt,
    };

    try {
      const validatedNote = noteSchema.parse(noteData);
      const response = await fetch('http://localhost:5001/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedNote),
      });

      if (response.ok) {
        const { id } = await response.json();
        navigate(`/notes/${id}`);
      } else {
        throw new Error('Failed to create note');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors = error.errors.map((err) => err.message);
        setErrors(validationErrors);
      } else {
        console.error('Error creating note:', error);
      }
    }
  };
  return (
    <div className="text-center">
      <Home />
      <div className="flex justify-between items-center">
      <Link to="/notes" className="bg-lime-500 ml-4 text-2xl font-medium">
        Back
      </Link>
      <div className="flex-grow"></div>
      <h1 className="text-3xl font-bold">Create new note</h1>
      <div className="flex-grow"></div>
    </div>
      <div className="mt-8">
        <input
          type="text"
          id="title"
          placeholder="Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none"
        />
        {errors.includes('Name cant be empty') && (
          <p className="text-red-500 mt-2">Name cant be empty</p>
        )}
      </div>
      <div className="mt-4">
        <textarea
          id="text"
          placeholder="Note text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none"
        />
      </div>
      <button
        onClick={handleCreateNote}
        className="mt-8 bg-lime-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Create
      </button>
    </div>
  );
}