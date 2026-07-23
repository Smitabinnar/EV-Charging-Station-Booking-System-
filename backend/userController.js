const userModel = require("../models/userModel");

const getUsers = (req, res) => {

    userModel.getAllUsers((err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

module.exports = {
    getUsers
};