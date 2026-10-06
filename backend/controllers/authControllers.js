import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;
export const Register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userRole = role || 'user';
    const result = await pool.query('INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING id,name,email,role',
      [name, email, hashedPassword, userRole]
    );
    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    if (err.code === '23505') {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    if (result.rows.length === 0) return res.status(400).json({ message: 'User not found' });

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message || 'Server error' });
  }
};


export const GetAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

export const UpateProfile = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    // 🔹 Prevent duplicate email
    const emailCheck = await pool.query(
      'SELECT id FROM users WHERE email=$1 AND id != $2',
      [email, req.user.id]
    );

    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const result = await pool.query(
      `
      UPDATE users
      SET name=$1, email=$2
      WHERE id=$3
      RETURNING id, name, email, role
      `,
      [name, email, req.user.id]
    );

    res.json({
      message: 'Profile updated successfully',
      user: result.rows[0],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
}