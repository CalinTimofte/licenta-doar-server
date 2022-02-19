let User = require('../models/User');

const createAndSaveUser = (userName, password, priviledge, done) => {
    const user = new User({userName: userName, password: password, priviledge: priviledge});
    user.save((err, data) => {
        if (err) return done(err, null);
        done(null, data);
    });
};

const deleteAllUsers = (done) => {
    User.deleteMany(null,(err, data) => {
        if (err) return console.error(err);
        done(null, data);
    });
};

const getAllUsers = (done) => {
    User.find({},(err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
  };

const findUserById = (id, done) => {
User.findById(id,(err, data) => {
    if (err) return console.error(err);
    done(null, data);
});
};

const findUserByUserName = (userName, done) => {
    User.find({userName: userName},(err, data) => {
        if(err) return res.status(500).send({ message: err });
        done(null, data);
    });
  };

  const findUserByUserNameAndPassword = (userName, password, done) => {
    User.find({userName: userName, password: password},(err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
  };

const findUserByUserNameAndUpdate = (oldUserName, newUserName, newPassword, done) => {
    findUserByUserName(oldUserName, (err, data) => {
        User.findByIdAndUpdate(data[0].id, {userName: newUserName, password: newPassword}, (err, data)=> {
            if (err) return console.err(err);
            done(null, data);
        });
    });
}

const findUserByUserNameAndPasswordAndUpdate = (oldUserName, newUserName, oldPassword, newPassword, done) => {
    findUserByUserNameAndPassword(oldUserName, oldPassword, (err, data) => {
        User.findByIdAndUpdate(data[0].id, {userName: newUserName, password: newPassword}, (err, data)=> {
            if (err) return console.err(err);
            done(null, data);
        });
    });
}

const authTestFactory = (message) => ((req, res) => {
    res.status(200).send(message);
})

const allAccess = authTestFactory("Public content");
const studentBoard = authTestFactory("Student content");
const professorBoard = authTestFactory("Professor content");
const adminBoard = authTestFactory("Admin content");

const userController = {
    User,
    createAndSaveUser: createAndSaveUser,
    deleteAllUsers: deleteAllUsers,
    getAllUsers: getAllUsers,
    findUserById: findUserById,
    findUserByUserName: findUserByUserName,
    findUserByUserNameAndUpdate: findUserByUserNameAndUpdate,
    findUserByUserNameAndPasswordAndUpdate: findUserByUserNameAndPasswordAndUpdate,
    allAccess,
    studentBoard,
    professorBoard,
    adminBoard
}

module.exports = userController;