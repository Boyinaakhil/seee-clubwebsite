const Event = require('../models/Event');
const fs = require('fs');
const path = require('path');

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    console.error('Get event by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createEvent = async (req, res) => {
  try {
    console.log('Creating event with data:', req.body);
    console.log('Uploaded file:', req.file);
    
    const { 
      title, 
      description, 
      detailedDescription, 
      date, 
      time, 
      venue, 
      category, 
      registrationLink 
    } = req.body;
    
    // Validate required fields
    if (!title || !description || !date || !time || !venue) {
      return res.status(400).json({ 
        message: 'Title, description, date, time, and venue are required' 
      });
    }
    
    let imageUrl = 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80';
    
    // If file was uploaded
    if (req.file) {
      imageUrl = `/uploads/events/${req.file.filename}`;
      console.log('Using uploaded image:', imageUrl);
    }
    
    const event = new Event({
      title,
      description,
      detailedDescription: detailedDescription || description,
      date,
      time,
      venue,
      imageUrl,
      category: category || 'other',
      registrationLink: registrationLink || ''
    });

    const savedEvent = await event.save();
    console.log('Event created successfully:', savedEvent._id);
    
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    console.log('Updating event:', req.params.id);
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);
    
    const { id } = req.params;
    const { 
      title, 
      description, 
      detailedDescription, 
      date, 
      time, 
      venue, 
      category, 
      registrationLink 
    } = req.body;

    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Update basic fields
    event.title = title;
    event.description = description;
    event.detailedDescription = detailedDescription || description;
    event.date = date;
    event.time = time;
    event.venue = venue;
    event.category = category || 'other';
    event.registrationLink = registrationLink || '';
    
    // If new file was uploaded
    if (req.file) {
      // Delete old image file if it exists locally
      if (event.imageUrl && event.imageUrl.startsWith('/uploads/')) {
        const oldImagePath = path.join(__dirname, '..', '..', 'public', event.imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          console.log('Deleted old image:', oldImagePath);
        }
      }
      
      // Update with new image
      event.imageUrl = `/uploads/events/${req.file.filename}`;
      console.log('Updated with new image:', event.imageUrl);
    }

    event.updatedAt = Date.now();
    await event.save();
    
    console.log('Event updated successfully:', event._id);
    res.json(event);
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Delete image file if it exists locally
    if (event.imageUrl && event.imageUrl.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, '..', '..', 'public', event.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log('Deleted image file:', imagePath);
      }
    }

    // Delete event from database
    await Event.findByIdAndDelete(id);

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};