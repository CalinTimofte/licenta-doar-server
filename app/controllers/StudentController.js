let Student = require('../models/Student');

const createAndSaveStudent = (userID, classRoomName, done) => {
    const student = new Student({userID: userID, classRoomName: classRoomName});
    student.save((err, data) => {
        if (err) return console.error(err);
        done(null, data);
    });
};

const deleteAllStudents = (done) => {
    Student.deleteMany(null,(err, data) => {
        if (err) return console.error(err);
        done(null, data);
    });
};

const getAllStudents = (done) => {
    Student.find({},(err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
  };

const getStudentByUserId = (userID, done) => {
    Student.findOne({userID: userID}, (err, data) => {
        console.log(data);
        if (err) return console.error(err);
        done(null, data)
    })
}

const findStudentByUserIdAndUpdateEnv = (userID, newEnv, done) => {
    Student.findOne({userID: userID}, (err, data) => {
        if (err) return console.err(err);

        Student.updateOne({_id: data.id}, {env: newEnv}, (err, data)=> {
            if (err) return console.err(err);
            // console.log(data);
            done(null, data);
        });
    });
}

const studentController = {
    Student,
    createAndSaveStudent: createAndSaveStudent,
    deleteAllStudents: deleteAllStudents,
    getAllStudents: getAllStudents,
    getStudentByUserId,
    findStudentByUserIdAndUpdateEnv
}

module.exports = studentController;