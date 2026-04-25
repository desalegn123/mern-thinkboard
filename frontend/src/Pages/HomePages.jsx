import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import RateLimitedUi from '../Components/RateLimitedUi';
import NoteNotFound from '../Components/NoteNotFound';

import axios from 'axios';
import toast from 'react-hot-toast';
import NoteCard from '../Components/NoteCard';
import api from '../lib/axios';

const HomePages = () => {
  const [isRateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes');
        setNotes(res.data);
        setRateLimited(false);
        console.log(res.data);
      } catch (error) {
        console.log('Error fetching notes');
        if (error.response.status === 429) {
          setRateLimited(true);
        } else {
          toast.error('falied to load note');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div>
      <Navbar />
      {isRateLimited && <RateLimitedUi />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading Notes...</div>
          
          
        )}
        {notes.length===0 && !isRateLimited && <NoteNotFound/>}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePages;
