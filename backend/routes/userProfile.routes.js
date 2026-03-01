const express = require('express');
const router = express.Router();
// const db = require('../models');
// const UserProfile = db.UserProfile;
const jwt = require('jsonwebtoken');

// In-memory storage for testing (replace with database later)
const userProfiles = [];

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // No token

  jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret', (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = user;
    next();
  });
};

// Create or Update User Profile
router.post('/', authenticateToken, async (req, res) => {
  const { name, age, sex, height, weight, activityLevel, goal } = req.body;
  const userId = req.user.id;

  // Basic BMR/TDEE calculation (simplified for now)
  let bmr = 0;
  if (sex === 'male') {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else if (sex === 'female') {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }

  let tdee = bmr;
  switch (activityLevel) {
    case 'sedentary': tdee *= 1.2; break;
    case 'lightly_active': tdee *= 1.375; break;
    case 'moderately_active': tdee *= 1.55; break;
    case 'very_active': tdee *= 1.725; break;
    case 'super_active': tdee *= 1.9; break;
  }

  let calorieTarget = tdee;
  let proteinTarget = 0;
  let carbsTarget = 0;
  let fatsTarget = 0;

  if (goal === 'cutting') {
    calorieTarget -= 500; // Deficit
  } else if (goal === 'bulking') {
    calorieTarget += 500; // Surplus
  } // Recomposition keeps it around TDEE

  // Macro split (example ratios)
  proteinTarget = calorieTarget * 0.30 / 4; // 30% calories from protein (4 cal/g)
  carbsTarget = calorieTarget * 0.40 / 4; // 40% calories from carbs (4 cal/g)
  fatsTarget = calorieTarget * 0.30 / 9; // 30% calories from fats (9 cal/g)

  try {
    // Find existing profile or create new one
    let userProfile = userProfiles.find(p => p.userId === userId);
    
    if (userProfile) {
      // Update existing profile
      Object.assign(userProfile, {
        name, age, sex, height, weight, activityLevel, goal, bmr, tdee, calorieTarget, proteinTarget, carbsTarget, fatsTarget
      });
    } else {
      // Create new profile
      userProfile = {
        id: userProfiles.length + 1,
        userId,
        name, age, sex, height, weight, activityLevel, goal, bmr, tdee, calorieTarget, proteinTarget, carbsTarget, fatsTarget,
        createdAt: new Date()
      };
      userProfiles.push(userProfile);
    }

    res.status(200).json({ message: 'User profile saved successfully', userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving user profile' });
  }
});

// Get User Profile
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const userProfile = userProfiles.find(p => p.userId === userId);

    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    res.status(200).json({ userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

module.exports = router;


