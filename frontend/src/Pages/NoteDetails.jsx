import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router';
import api from '../lib/axios';

const NoteDetails = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this note')) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success('note is deleted successfully');
      navigate('/');
    } catch (error) {
      console.log('This note is not deleted');
      toast.error('failed to delete this note');
    }
  };
  const handleSaving = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error('please add title or contents');
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success('notes updated successfully');
      navigate('/');
    } catch (error) {
      console.log('This note is not deleted');
      toast.error('failed to delete this note');
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error('Failed to fetch note');
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center ">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="w-5 h-5" />
              Back To Note
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-primary btn-outline"
            >
              <Trash2Icon className="w-5 h-5" />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordred"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="write your content"
                  className="input input-bordred"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSaving}
                >
                  {saving ? 'Saving...' : 'Save changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetails;
