// verify-all-admins.js - Verify ALL admin credentials in database
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI;

async function verifyAllAdmins() {
  console.log('==========================================');
  console.log('   ADMIN CREDENTIALS VERIFICATION TOOL');
  console.log('==========================================\n');
  
  try {
    // Connect to MongoDB Atlas
    console.log('🔌 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB Atlas\n');
    
    // Load the Admin model
    const Admin = require('./models/Admin');
    
    // Get ALL admins from database
    const admins = await Admin.find({});
    
    if (admins.length === 0) {
      console.log('❌ No admins found in database!');
      console.log('\n💡 Run: node create-default-admin.js');
      await mongoose.connection.close();
      process.exit(1);
    }
    
    console.log(`📊 Found ${admins.length} admin(s) in database:\n`);
    
    let passedTests = 0;
    let failedTests = 0;
    
    // Test each admin
    for (let i = 0; i < admins.length; i++) {
      const admin = admins[i];
      
      console.log(`🔍 Testing Admin #${i + 1}:`);
      console.log('   Username:', admin.username);
      console.log('   Role:', admin.role);
      console.log('   Created:', admin.createdAt.toLocaleDateString());
      console.log('   Password hash:', admin.password.substring(0, 30) + '...');
      
      // We need to test with possible passwords
      // Common passwords to try
      const testPasswords = [
        'admin123',        // Default
        'password123',
        'admin',
        'password',
        '123456',
        admin.username,    // Try username as password
        admin.username + '123',
        admin.username + '1234',
        admin.username + '12345'
      ];
      
      let passwordFound = false;
      let foundPassword = null;
      
      console.log('   🔑 Testing common passwords:');
      
      // Try each password
      for (const testPassword of testPasswords) {
        try {
          const isMatch = await bcrypt.compare(testPassword, admin.password);
          if (isMatch) {
            passwordFound = true;
            foundPassword = testPassword;
            console.log(`     ✅ Found: "${testPassword}"`);
            break;
          } else {
            console.log(`     ❌ Not: "${testPassword}"`);
          }
        } catch (error) {
          console.log(`     ⚠️  Error testing "${testPassword}":`, error.message);
        }
      }
      
      if (passwordFound) {
        console.log(`   🎉 PASSWORD VERIFIED: "${foundPassword}"`);
        passedTests++;
        
        // Test login via API
        console.log('   🌐 Testing API login...');
        try {
          const axios = require('axios');
          const response = await axios.post('https://seee-clubwebsite.onrender.com/api/auth/login', {
            username: admin.username,
            password: foundPassword
          }, { timeout: 5000 });
          
          if (response.data.token) {
            console.log('   ✅ API Login: SUCCESS');
            console.log('      Token:', response.data.token.substring(0, 30) + '...');
            console.log('      User ID:', response.data.user.id);
          } else {
            console.log('   ❌ API Login: NO TOKEN');
          }
        } catch (apiError) {
          console.log('   ❌ API Login: FAILED');
          if (apiError.response) {
            console.log('      Status:', apiError.response.status);
            console.log('      Message:', apiError.response.data?.message);
          } else {
            console.log('      Error:', apiError.message);
          }
        }
      } else {
        console.log('   ❓ PASSWORD UNKNOWN - Not in common password list');
        failedTests++;
        
        // Check hash format
        console.log('   🔧 Hash analysis:');
        console.log('      Is bcrypt hash?', admin.password.startsWith('$2a$') || admin.password.startsWith('$2b$'));
        console.log('      Hash length:', admin.password.length);
        console.log('      Cost factor:', admin.password.split('$')[2]);
      }
      
      console.log('   ──────────────────────────\n');
    }
    
    // Summary
    console.log('==========================================');
    console.log('              TEST SUMMARY');
    console.log('==========================================');
    console.log(`✅ Passed: ${passedTests}/${admins.length}`);
    console.log(`❌ Failed: ${failedTests}/${admins.length}`);
    
    if (passedTests > 0) {
      console.log('\n💡 Working credentials:');
      admins.forEach((admin, index) => {
        console.log(`   ${index + 1}. ${admin.username} - Role: ${admin.role}`);
      });
      
      console.log('\n🌐 Test login at: http://localhost:5173/admin/login');
    } else {
      console.log('\n⚠️  No working credentials found!');
      console.log('💡 Create new admin: node create-default-admin.js');
    }
    
    // Database info
    console.log('\n📊 DATABASE INFO:');
    console.log('   Connection:', mongoose.connection.host);
    console.log('   Database:', mongoose.connection.name);
    console.log('   Collection:', 'admins');
    
    await mongoose.connection.close();
    console.log('\n🔌 Connection closed');
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 TROUBLESHOOTING:');
      console.log('1. Check MongoDB Atlas connection string');
      console.log('2. Check internet connection');
      console.log('3. Check IP whitelist in MongoDB Atlas');
      console.log('4. Make sure database "SEEE" exists');
    }
    
    process.exit(1);
  }
}

// Run verification
verifyAllAdmins();