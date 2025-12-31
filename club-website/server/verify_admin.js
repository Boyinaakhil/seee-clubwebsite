// verify-admin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function verifyAdmin() {
  try {
    // Connect to MongoDB Atlas
    await mongoose.connect('mongodb+srv://akhilboyina:akhilboyina@cluster0.0hrayz5.mongodb.net/SEEE', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB Atlas');
    
    // Load your Admin model
    const Admin = require('./models/Admin');
    
    // Find the admin
    const admin = await Admin.findOne({ username: 'admin' });
    
    if (!admin) {
      console.log('❌ No admin found in database');
      return;
    }
    
    console.log('✅ Admin found:');
    console.log('   Username:', admin.username);
    console.log('   Password hash:', admin.password);
    console.log('   Role:', admin.role);
    console.log('   Created:', admin.createdAt);
    
    // Test password comparison
    console.log('\n🔑 Testing password "admin123":');
    const isMatch = await bcrypt.compare('admin123', admin.password);
    console.log('   Result:', isMatch ? '✅ CORRECT PASSWORD' : '❌ WRONG PASSWORD');
    
    // Test with wrong password
    console.log('\n🔑 Testing password "wrongpassword":');
    const isWrongMatch = await bcrypt.compare('wrongpassword', admin.password);
    console.log('   Result:', isWrongMatch ? '❌ (Should be false)' : '✅ Correctly false');
    
    // Test using your Admin model's comparePassword method
    console.log('\n🔑 Using comparePassword method:');
    const modelMatch = await admin.comparePassword('admin123');
    console.log('   Result:', modelMatch ? '✅ WORKS CORRECTLY' : '❌ METHOD FAILED');
    
    if (!modelMatch) {
      console.log('\n⚠️  Problem detected: comparePassword method not working');
      console.log('   Checking hash format...');
      console.log('   Hash starts with $2a$?:', admin.password.startsWith('$2a$'));
      console.log('   Hash starts with $2b$?:', admin.password.startsWith('$2b$'));
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

verifyAdmin();