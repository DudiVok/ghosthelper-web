import express from 'express';
import asyncHandler from 'express-async-handler';
import Ghost from '../models/ghostModel.js';

const router = express.Router();

// @desc    Fetch all ghosts
// @route   GET /api/ghosts
// @access  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const phasmo = await Ghost.find({});
    res.json(phasmo);
  })
);

// @desc    Fetch a single ghost
// @route   GET /api/ghosts/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const phasmo = await Ghost.findById(req.params.id);
    if (phasmo) {
      res.json(phasmo);
    } else {
      req.status(404).json({ message: 'Ghost not found' });
    }
  })
);

export default router;