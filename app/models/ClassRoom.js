const mongoose = require("mongoose");
const { Schema } = mongoose;

const classRoomSchema = new Schema({
    classRoomName: {type: String, required: true, unique: true},
    proffesorID: {type: Schema.Types.ObjectId, ref: 'User'},
    studentsIDs: [{type: Schema.Types.ObjectID, ref: 'Student'}]
})

module.exports = mongoose.model("ClassRoom", classRoomSchema);