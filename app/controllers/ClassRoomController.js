let ClassRoom = require('../models/ClassRoom');

const createAndSaveClassRoom = (classRoomName, done) => {
    const classRoom = new ClassRoom({classRoomName: classRoomName});
    classRoom.save((err, data) => {
        if(err) return res.status(500).send({ message: err });
        done(null, data);
    });
};

const retrieveAllClassRoomNames = (done) => {
    ClassRoom.find({}, (err, data) => {
        if(err) return res.status(500).send({ message: err });
        done(null, data.map(classRoom => classRoom.classRoomName));
    })
}

const addStudentToClassRoomByName = (classRoomName, studentID, done) => {
    ClassRoom.findOne({classRoomName: classRoomName}, (err, data) => {
        if(err) return res.status(500).send({ message: err });
        ClassRoom.findByIdAndUpdate(data.id, {studentsIDs: data.studentsIDs.concat(studentID)}, (err, data) => {
            if(err) return res.status(500).send({ message: err });
            done(null, data);
        })
    })
}

const getAllClassRooms = (done) => {
    ClassRoom.find({}, (err, data) => {
        if(err) return res.status(500).send({ message: err });
        done(null, data);
    })
  };

const classRoomController = {
    createAndSaveClassRoom,
    retrieveAllClassRoomNames,
    addStudentToClassRoomByName,
    getAllClassRooms,
    ClassRoom
};

module.exports = classRoomController