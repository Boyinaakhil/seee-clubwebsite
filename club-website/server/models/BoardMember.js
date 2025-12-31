const mongoose = require('mongoose');

const boardMemberSchema = new mongoose.Schema({
name: {
type: String,
required: true,
trim: true
},
position: {
type: String,
required: true
},
department: {
type: String,
required: true
},
email: {
type: String,
required: true,
trim: true,
lowercase: true
},
createdAt: {
type: Date,
default: Date.now
},
updatedAt: {
type: Date,
default: Date.now
}
});

boardMemberSchema.pre('save', function(next) {
this.updatedAt = Date.now();
next();
});

module.exports = mongoose.model('BoardMember', boardMemberSchema);