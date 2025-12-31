// create-default-admin.js - Create default admin immediately
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://akhilboyina:akhilboyina@cluster0.0hrayz5.mongodb.net/SEEE';

async function createDefaultAdmin() {
  try {
    console.log('Creating default admin...');
    
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    const Admin = require('./models/Admin');
    
    // Delete if exists
    await Admin.deleteOne({ username: 'admin' });
    
    // Create with plain password - model will hash it
    const admin = new Admin({
      username: 'admin',
      password: 'admin123', // Plain text
      role: 'admin'
    });
    
    await admin.save();
    
    console.log('\n✅ DEFAULT ADMIN CREATED!');
    console.log('Username: admin');
    console.log('Password: admin123');
    
    // Verify
    const savedAdmin = await Admin.findOne({ username: 'admin' });
    const isMatch = await savedAdmin.comparePassword('admin123');
    console.log('Password test:', isMatch ? '✅ WORKS' : '❌ FAILED');
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createDefaultAdmin();