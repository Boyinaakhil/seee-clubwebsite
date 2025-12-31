const Announcement = require('../models/Announcement');

const getAllAnnouncements = async (req, res) => {
try {
const announcements = await Announcement.find().sort({ date: -1 });
res.json(announcements);
} catch (error) {
console.error('Get announcements error:', error);
res.status(500).json({ message: 'Server error' });
}
};

const createAnnouncement = async (req, res) => {
try {
const { title, content, category } = req.body;
const announcement = new Announcement({
  title,
  content,
  category
});

await announcement.save();
res.status(201).json(announcement);
} catch (error) {
console.error('Create announcement error:', error);
res.status(500).json({ message: 'Server error' });
}
};

const updateAnnouncement = async (req, res) => {
try {
const { id } = req.params;
const { title, content, category } = req.body;
const announcement = await Announcement.findByIdAndUpdate(
  id,
  { title, content, category },
  { new: true, runValidators: true }
);

if (!announcement) {
  return res.status(404).json({ message: 'Announcement not found' });
}

res.json(announcement);
} catch (error) {
console.error('Update announcement error:', error);
res.status(500).json({ message: 'Server error' });
}
};

const deleteAnnouncement = async (req, res) => {
try {
const { id } = req.params;
const announcement = await Announcement.findByIdAndDelete(id);
if (!announcement) {
  return res.status(404).json({ message: 'Announcement not found' });
}

res.json({ message: 'Announcement deleted successfully' });
} catch (error) {
console.error('Delete announcement error:', error);
res.status(500).json({ message: 'Server error' });
}
};

module.exports = {
getAllAnnouncements,
createAnnouncement,
updateAnnouncement,
deleteAnnouncement
};