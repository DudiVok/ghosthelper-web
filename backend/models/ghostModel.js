import mongoose from 'mongoose';

const ghostSchema = mongoose.Schema(
  {
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },  
    ghostName: {
      type: String,
      required: true,
    },
    ghostDots: {
      type: Boolean,
      required: true,
    },
    ghostEmf: {
        type: Boolean,
        required: true,
    },
    ghostFinger: {
        type: Boolean,
        required: true,
    },
    ghostFreezing: {
        type: Boolean,
        required: true,
    },
    ghostOrb: {
        type: Boolean,
        required: true,
    },
    ghostWriting: {
        type: Boolean,
        required: true,
    },
    ghostBox: {
        type: Boolean,
        required: true,
    },
  }
);
  
  const phasmo = mongoose.model('Ghost', ghostSchema);
  
  export default phasmo;