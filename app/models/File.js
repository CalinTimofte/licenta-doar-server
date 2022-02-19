const mongoose = require("mongoose");
const { Schema } = mongoose;

const fileSchema = new Schema({
    exerciseNumber: {type: Number, required: true},
    data: {type: Buffer, required: true},
    studentID: {type: Schema.Types.ObjectID, ref: 'Student', required: true}
})

module.exports = mongoose.model("File", fileSchema);