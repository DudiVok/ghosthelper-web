import mongoose from 'mongoose';

const evidenceSchema = mongoose.Schema(
  {
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },  
    evidenceName: {
      type: String,
      required: true,
    },
    evidenceNameFull: {
      type: String,
      required: true,
    },
  }
);
  
  const evidence = mongoose.model('Evidence', evidenceSchema);
  
  export default evidence;