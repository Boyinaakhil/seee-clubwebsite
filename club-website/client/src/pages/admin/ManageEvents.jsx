import { useState, useEffect, useRef } from 'react';
import api from '../../services/api';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    detailedDescription: '',
    date: '',
    time: '',
    venue: '',
    category: 'other',
    registrationLink: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/events');
      setEvents(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setError('Only JPG, PNG, GIF, and WebP images are allowed');
        return;
      }
      
      setSelectedImage(file);
      setError('');
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewImage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validate required fields
    if (!formData.title || !formData.description || !formData.date || !formData.time || !formData.venue) {
      setError('Please fill all required fields (*)');
      return;
    }
    
    setUploading(true);
    
    try {
      const data = new FormData();
      
      // Append form data
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('detailedDescription', formData.detailedDescription);
      data.append('date', formData.date);
      data.append('time', formData.time);
      data.append('venue', formData.venue);
      data.append('category', formData.category);
      data.append('registrationLink', formData.registrationLink);
      
      // Append image if selected
      if (selectedImage) {
        data.append('image', selectedImage);
      }
      
      let response;
      if (editingId) {
        response = await api.put(`/events/${editingId}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setSuccess('Event updated successfully!');
      } else {
        response = await api.post('/events', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setSuccess('Event created successfully!');
      }
      
      console.log('Event saved:', response.data);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        detailedDescription: '',
        date: '',
        time: '',
        venue: '',
        category: 'other',
        registrationLink: ''
      });
      setSelectedImage(null);
      setPreviewImage('');
      setEditingId(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Refresh events list
      fetchEvents();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
      
    } catch (error) {
      console.error('Error saving event:', error);
      setError(error.response?.data?.message || 'Failed to save event. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (event) => {
    setFormData({
      title: event.title,
      description: event.description,
      detailedDescription: event.detailedDescription || event.description,
      date: event.date.split('T')[0],
      time: event.time,
      venue: event.venue,
      category: event.category || 'other',
      registrationLink: event.registrationLink || ''
    });
    
    // Set preview for existing image
    if (event.imageUrl) {
      setPreviewImage(event.imageUrl);
    } else {
      setPreviewImage('');
    }
    
    setSelectedImage(null);
    setEditingId(event._id);
    setError('');
    setSuccess('');
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    
    try {
      await api.delete(`/events/${id}`);
      setSuccess('Event deleted successfully!');
      fetchEvents();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error deleting event:', error);
      setError('Failed to delete event');
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>Loading events...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Manage Events</h1>
      
      {error && (
        <div className="card" style={{ 
          backgroundColor: '#fee', 
          borderColor: '#fcc',
          marginBottom: '1rem'
        }}>
          <p style={{ color: '#c33', margin: 0 }}>❌ {error}</p>
        </div>
      )}
      
      {success && (
        <div className="card" style={{ 
          backgroundColor: '#efe', 
          borderColor: '#cfc',
          marginBottom: '1rem'
        }}>
          <p style={{ color: '#393', margin: 0 }}>✅ {success}</p>
        </div>
      )}
      
      <div className="card">
        <h3>{editingId ? '✏️ Edit Event' : '➕ Add New Event'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              Event Title <span style={{ color: '#e74c3c' }}>*</span>
            </label>
            <input
              type="text"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter event title"
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">
                Date <span style={{ color: '#e74c3c' }}>*</span>
              </label>
              <input
                type="date"
                name="date"
                className="form-input"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">
                Time <span style={{ color: '#e74c3c' }}>*</span>
              </label>
              <input
                type="time"
                name="time"
                className="form-input"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">
              Venue <span style={{ color: '#e74c3c' }}>*</span>
            </label>
            <input
              type="text"
              name="venue"
              className="form-input"
              value={formData.venue}
              onChange={handleChange}
              required
              placeholder="Enter event venue"
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                name="category"
                className="form-input"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="workshop">🎓 Workshop</option>
                <option value="seminar">🎤 Seminar</option>
                <option value="hackathon">💻 Hackathon</option>
                <option value="competition">🏆 Competition</option>
                <option value="social">🎉 Social Event</option>
                <option value="other">📋 Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Registration Link (Optional)</label>
              <input
                type="url"
                name="registrationLink"
                className="form-input"
                value={formData.registrationLink}
                onChange={handleChange}
                placeholder="https://example.com/register"
              />
            </div>
          </div>
          
          {/* Image Upload Section */}
          <div className="form-group">
            <label className="form-label">
              Event Image <span style={{ color: '#666', fontSize: '0.9rem' }}>(Optional - Max 5MB)</span>
            </label>
            <div style={{ 
              border: '2px dashed #ddd', 
              borderRadius: '8px', 
              padding: '2rem', 
              textAlign: 'center',
              marginBottom: '1rem',
              backgroundColor: previewImage ? 'transparent' : '#f8f9fa',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onClick={() => fileInputRef.current.click()}
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.style.backgroundColor = '#e8f4fc';
              e.currentTarget.style.borderColor = '#6a11cb';
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.currentTarget.style.backgroundColor = previewImage ? 'transparent' : '#f8f9fa';
              e.currentTarget.style.borderColor = '#ddd';
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.style.backgroundColor = previewImage ? 'transparent' : '#f8f9fa';
              e.currentTarget.style.borderColor = '#ddd';
              
              if (e.dataTransfer.files.length > 0) {
                const file = e.dataTransfer.files[0];
                const event = { target: { files: [file] } };
                handleImageChange(event);
              }
            }}>
              {previewImage ? (
                <div>
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '300px', 
                      borderRadius: '8px',
                      marginBottom: '1rem',
                      border: '1px solid #ddd'
                    }} 
                  />
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current.click();
                      }}
                      className="btn btn-primary"
                    >
                      Change Image
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage();
                      }}
                      className="btn btn-danger"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: '3rem', color: '#666', marginBottom: '1rem' }}>
                    📷
                  </div>
                  <p style={{ marginBottom: '0.5rem', color: '#666', fontSize: '1.1rem' }}>
                    Click to upload or drag & drop
                  </p>
                  <p style={{ fontSize: '0.9rem', color: '#999' }}>
                    JPG, PNG, GIF, WebP • Max 5MB
                  </p>
                  <p style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '0.5rem' }}>
                    Recommended: 1200×800 pixels
                  </p>
                </div>
              )}
              <input
                type="file"
                name="image"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>
            {selectedImage && (
              <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                Selected: {selectedImage.name} ({(selectedImage.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>
          
          <div className="form-group">
            <label className="form-label">
              Short Description <span style={{ color: '#e74c3c' }}>*</span>
            </label>
            <textarea
              name="description"
              className="form-input"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Brief description for event cards"
            ></textarea>
          </div>
          
          <div className="form-group">
            <label className="form-label">
              Detailed Description <span style={{ color: '#e74c3c' }}>*</span>
            </label>
            <textarea
              name="detailedDescription"
              className="form-input"
              rows="6"
              value={formData.detailedDescription}
              onChange={handleChange}
              required
              placeholder="Complete event details, agenda, speakers, etc."
            ></textarea>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={uploading}
              style={{ minWidth: '150px' }}
            >
              {uploading ? '⏳ Saving...' : (editingId ? '📝 Update Event' : '➕ Add Event')}
            </button>
            
            {editingId && (
              <button 
                type="button"
                className="btn"
                onClick={() => {
                  setFormData({
                    title: '',
                    description: '',
                    detailedDescription: '',
                    date: '',
                    time: '',
                    venue: '',
                    category: 'other',
                    registrationLink: ''
                  });
                  setSelectedImage(null);
                  setPreviewImage('');
                  setEditingId(null);
                  setError('');
                  setSuccess('');
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                disabled={uploading}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>
      
      <div className="card" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0 }}>All Events ({events.length})</h3>
          <button 
            onClick={fetchEvents}
            className="btn"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            🔄 Refresh
          </button>
        </div>
        
        {events.length > 0 ? (
          <div className="card-grid" style={{ marginTop: '1rem' }}>
            {events.map((event) => (
              <div key={event._id} className="card" style={{ padding: '1rem' }}>
                <div style={{
                  height: '150px',
                  backgroundImage: `url('${event.imageUrl}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  position: 'relative'
                }}>
                  <span style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    textTransform: 'capitalize'
                  }}>
                    {event.category}
                  </span>
                </div>
                
                <h4 style={{ marginBottom: '0.5rem' }}>{event.title}</h4>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                  📅 {new Date(event.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                  🕒 {event.time} | 📍 {event.venue}
                </p>
                
                <div style={{ 
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontSize: '0.9rem',
                  color: '#555',
                  marginBottom: '1rem'
                }}>
                  {event.description}
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                  <a 
                    href={`/events/${event._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                  >
                    👁️ View
                  </a>
                  <button 
                    onClick={() => handleEdit(event)}
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(event._id)}
                    className="btn btn-danger"
                    style={{ flex: 1 }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>No events found.</p>
            <p style={{ color: '#999' }}>Create your first event using the form above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageEvents;