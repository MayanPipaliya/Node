require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  const existing = await User.findOne({ username: 'admin' });
  if (existing) { console.log('Admin exists'); process.exit(0); }
  const admin = new User({ username: 'admin', password: 'adminpass', role: 'admin' });
  await admin.save();
  console.log('Admin created: admin / adminpass');
  process.exit(0);
}
seed().catch(e => console.error(e));
