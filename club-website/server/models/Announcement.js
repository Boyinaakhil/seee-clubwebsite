const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
title: {
type: String,
required: true,
trim: true
},
content: {
type: String,
required: true
},
category: {
type: String,
enum: ['general', 'event', 'important', 'update'],
default: 'general'
},
date: {
type: Date,
default: Date.now
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

announcementSchema.pre('save', function(next) {
this.updatedAt = Date.now();
next();
});

module.exports = mongoose.model('Announcement', announcementSchema);