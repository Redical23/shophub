import mongoose from 'mongoose';

const constitutionsSchema = new mongoose.Schema({
  applicationNo: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  bench: {
    type: String,
    required: true,
  },
  alsoKnownAs: {
    type: String,
  },
  keyIssue: {
    type: String,
    required: true,
  },
  judgment: {
    type: [String],
    required: true,
  },
  Importance: {
    type: [String],
    required: true,
  },
  "Equivalent citations": {
    type: String,
    default: "",
  },
  fileddate: {
    type: String,
    default: () => new Date().toISOString().split("T")[0],
  },
  courtNo: {
    type: String,
    default: "N/A",
  },
  inWhichCourt: {
    type: String,
    default: "Supreme Court",
  },
});

const Constitution =
  mongoose.models.Constitution || mongoose.model('Constitution', constitutionsSchema);

export default Constitution;
