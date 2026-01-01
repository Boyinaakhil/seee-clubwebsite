const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

async function deleteAdmin(username) {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    const Admin = mongoose.model('Admin', new mongoose.Schema({
      username: String,
      password: String
    }));
    
    const result = await Admin.deleteOne({ username });
    
    if (result.deletedCount === 0) {
      console.log(`❌ Admin "${username}" not found`);
    } else {
      console.log(`✅ Admin "${username}" deleted successfully`);
    }
    
    // List remaining admins
    const admins = await Admin.find({});
    console.log('\n👥 Remaining admins:');
    admins.forEach((admin, i) => {
      console.log(`   ${i + 1}. ${admin.username}`);
    });
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

const username = process.argv[2];
if (!username) {
  console.log('Usage: node delete-admin.js <username>');
  console.log('Example: node delete-admin.js testuser');
  process.exit(1);
}

deleteAdmin(username);