// ALIS MAREDIA - 101381860

const User = require('../models/user');
const jwt = require('jsonwebtoken');

const userResolvers = {
  Query: {
    loginUser: async (_, { username, password }) => {
      try {
        const user = await User.findOne({ username, password });
        if (!user) {
          throw new Error('Invalid username or password');
        }

        const token = jwt.sign({ userId: user._id }, 'your_secret_key');
        return { token, user };
      } catch (error) {
        throw new Error('Failed to login');
      }
    }
  },
  Mutation: {
    signupUser: async (_, { username, email, password }) => {
      try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
          throw new Error('Username or email already exists');
        }

        const newUser = await User.create({ username, email, password });
        return newUser;
      } catch (error) {
        throw new Error('Failed to signup user');
      }
    }
  }
};

module.exports = userResolvers;
