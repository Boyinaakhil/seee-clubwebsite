const BoardMember = require('../models/BoardMember');

const getAllBoardMembers = async (req, res) => {
try {
const boardMembers = await BoardMember.find().sort({ createdAt: -1 });
res.json(boardMembers);
} catch (error) {
console.error('Get board members error:', error);
res.status(500).json({ message: 'Server error' });
}
};

const createBoardMember = async (req, res) => {
try {
const { name, position, department, email } = req.body;
const boardMember = new BoardMember({
  name,
  position,
  department,
  email
});

await boardMember.save();
res.status(201).json(boardMember);
} catch (error) {
console.error('Create board member error:', error);
res.status(500).json({ message: 'Server error' });
}
};

const updateBoardMember = async (req, res) => {
try {
const { id } = req.params;
const { name, position, department, email } = req.body;
const boardMember = await BoardMember.findByIdAndUpdate(
  id,
  { name, position, department, email },
  { new: true, runValidators: true }
);

if (!boardMember) {
  return res.status(404).json({ message: 'Board member not found' });
}

res.json(boardMember);
} catch (error) {
console.error('Update board member error:', error);
res.status(500).json({ message: 'Server error' });
}
};

const deleteBoardMember = async (req, res) => {
try {
const { id } = req.params;const boardMember = await BoardMember.findByIdAndDelete(id);
if (!boardMember) {
  return res.status(404).json({ message: 'Board member not found' });
}

res.json({ message: 'Board member deleted successfully' });


} catch (error) {
console.error('Delete board member error:', error);
res.status(500).json({ message: 'Server error' });
}
};

module.exports = {
getAllBoardMembers,
createBoardMember,
updateBoardMember,
deleteBoardMember
};