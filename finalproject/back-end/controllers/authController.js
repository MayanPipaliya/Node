const User = require('../models/User');
const jwt = require('jsonwebtoken');

function signToken(user) {
  return jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

// register
exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) return res.status(400).json({ error: 'Missing fields' });
    if (await User.findOne({ username })) return res.status(400).json({ error: 'Username exists' });
    const user = new User({ username, password, role: 'user' });
    await user.save();
    const token = signToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 7*24*60*60*1000,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production'
    });
    res.json({ ok: true, user: { id: user._id, username: user.username, role: user.role } });
  } catch(err) {
    console.error(err); res.status(500).json({ error: 'Server error' });
  }
};

// login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const match = await user.comparePassword(password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });
    const token = signToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 7*24*60*60*1000,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production'
    });
    res.json({ ok: true, user: { id: user._id, username: user.username, role: user.role } });
  } catch(err) {
    console.error(err); res.status(500).json({ error: 'Server error' });
  }
};

// logout
exports.logout = (req, res) => {
  res.clearCookie('token', {
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production'
  });
  res.json({ ok: true });
};
