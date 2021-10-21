var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var NotesSchema = new Schema({
  note: {
    type: Map,
    // required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  lastModified: {
    type: Date,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  sharedWith: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
});

NotesSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Notes = mongoose.model("Notes", NotesSchema);

module.exports = Notes;
