import axios from 'axios';
import { ArrowLeftIcon } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import api from '../lib/axios';

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('All content are required');
      return;
    }
    setLoading(true);
    try {
      await api.post('/notes', {
        title,
        content,
      });
      toast.success('Notes Created successfully');
      navigate('/');
    } catch (error) {
      console.log('error when to create note', error);
      if (error.response.status === 429) {
        toast.error("Slow Down!, You're creating  notes too fast", {
          duration: 4000,
        });
      } else {
        toast.error('failed to create note');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-2xl mx-auto">
          <Link to={'/'} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Notes</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                    <input
                      type="text"
                      className="input input-bordered"
                      value={title}
                      placeholder="Enter your note"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </label>
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                    <textarea
                      className="textarea textarea-bordered h-32"
                      value={content}
                      placeholder="write your note here"
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </label>
                </div>
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Creating...' : 'Create Note'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
