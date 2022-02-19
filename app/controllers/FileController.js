let File = require('../models/File');

const createAndSaveFile = (exerciseNumber, studentID, solution, done) => {
    const file = new File({exerciseNumber: exerciseNumber, data: solution, studentID: studentID});
    file.save((err, data) => {
        if (err) return console.error(err);
        done(null, data);
    });
};

const findFileById = (id, done) => {
    File.findById(id,(err, data) => {
        if (err) return console.error(err);
        done(null, data);
    });
    };

const deleteAllFiles = (done) => {
    File.deleteMany(null,(err, data) => {
        if (err) return console.error(err);
        done(null, data);
    });
};

const fileController = {
    File,
    createAndSaveFile: createAndSaveFile,
    findFileById: findFileById,
    deleteAllFiles: deleteAllFiles
};

module.exports = fileController;