import express from 'express';
import asyncHandler from 'express-async-handler';
import Evidence from '../models/evidenceModel.js';

const router = express.Router();

// @desc    Fetch all ghosts
// @route   GET /api/ghosts
// @access  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const evidence = await Evidence.find({});
    res.json(evidence);
  })
);

// @desc    Fetch a single ghost
// @route   GET /api/ghosts/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const evidence = await Evidence.findById(req.params.id);
    if (evidence) {
      res.json(evidence);
    } else {
      req.status(404).json({ message: 'Evidence not found' });
    }
  })
);

export default router;