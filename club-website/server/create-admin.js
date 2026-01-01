require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const readline = require('readline');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is missing. Check your .env file');
  process.exit(1);
}


// Create interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function createNewAdmin() {
  console.log('==========================================');
  console.log('    ADMIN CREDENTIALS CREATION TOOL');
  console.log('==========================================\n');
  
  try {
    // Connect to MongoDB Atlas
    console.log('🔌 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB Atlas\n');
    
    // Get username
    rl.question('Enter username: ', async (username) => {
      if (!username.trim()) {
        console.log('❌ Username cannot be empty');
        rl.close();
        return;
      }
      
      // Get password
      rl.question('Enter password: ', async (password) => {
        if (!password.trim()) {
          console.log('❌ Password cannot be empty');
          rl.close();
          return;
        }
        
        // Get role
        rl.question('Enter role (default: admin): ', async (roleInput) => {
          const role = roleInput.trim() || 'admin';
          
          try {
            console.log('\n⏳ Processing...');
            await createAdminWithDetails(username, password, role);
          } catch (error) {
            console.error('❌ Error:', error.message);
            rl.close();
            await mongoose.connection.close();
          }
        });
      });
    });
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    rl.close();
  }
}

async function createAdminWithDetails(username, password, role) {
  try {
    // Load the REAL Admin model (not creating a new one)
    const Admin = require('./models/Admin');
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log(`⚠️  Admin "${username}" already exists!`);
      
      rl.question('Overwrite? (y/N): ', async (overwrite) => {
        if (overwrite.toLowerCase() !== 'y') {
          console.log('❌ Operation cancelled');
          rl.close();
          await mongoose.connection.close();
          return;
        }
        
        // Delete existing admin
        await Admin.deleteOne({ username });
        console.log('🗑️  Deleted existing admin');
        await createAndSaveAdmin(username, password, role);
      });
    } else {
      await createAndSaveAdmin(username, password, role);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    rl.close();
    await mongoose.connection.close();
  }
}

async function createAndSaveAdmin(username, password, role) {
  try {
    const Admin = require('./models/Admin');
    
    // Create admin with PLAIN TEXT password
    // The Admin model's pre-save hook will hash it automatically
    const admin = new Admin({
      username,
      password, // Plain text - model will hash it
      role
    });
    
    // Save to database
    await admin.save();
    
    console.log('\n✅ ADMIN CREATED SUCCESSFULLY!');
    console.log('==========================================');
    console.log('📋 Username:', username);
    console.log('🔐 Password:', password);
    console.log('👤 Role:', role);
    console.log('💾 Saved to MongoDB Atlas');
    console.log('📅 Created at:', new Date().toLocaleString());
    console.log('==========================================\n');
    
    // Verify the admin was saved
    const savedAdmin = await Admin.findOne({ username });
    console.log('🔍 Verification:');
    console.log('   Found in DB:', savedAdmin ? '✅ YES' : '❌ NO');
    
    if (savedAdmin) {
      // Test password using the model's method
      const isMatch = await savedAdmin.comparePassword(password);
      console.log('   Password works:', isMatch ? '✅ YES' : '❌ NO');
      
      // Show hash
      console.log('   Password hash:', savedAdmin.password);
    }
    
    // List all admins
    const allAdmins = await Admin.find({});
    console.log('\n👥 All admins in database:');
    allAdmins.forEach((admin, index) => {
      console.log(`   ${index + 1}. ${admin.username} (${admin.role}) - ${admin.createdAt.toLocaleDateString()}`);
    });
    
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
  } finally {
    rl.close();
    await mongoose.connection.close();
    console.log('\n🔌 Connection closed');
    process.exit(0);
  }
}

// Handle Ctrl+C
rl.on('SIGINT', () => {
  console.log('\n\n❌ Operation cancelled by user');
  rl.close();
  mongoose.connection.close();
  process.exit(0);
});

// Start the program
createNewAdmin();