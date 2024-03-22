// auth.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/Users');

const createUser = async (name, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, 'TIME');

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      created_at: newUser.createdAt,
      token: token,
    };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create user');
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email: email } });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch user by email');
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch user by ID');
  }
};

const login = async (email, password) => {
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, 'TIME');

    return { ...user.toJSON(), token };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to log in');
  }
};

module.exports = { createUser, getUserByEmail, login, getUserById };
