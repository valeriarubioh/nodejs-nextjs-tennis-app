const db = require("../models");
const User = db.user;


exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.modifyUserDetails = async (req, res) => {
  const userId = req.userId;
  const { gender, birthdate, country, contact_number } = req.body;

  try {
    const user = await User.findByPk(userId, { include: [db.userDetail] });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const userDetails = user.userDetail;

    if (!userDetails) {
      return res.status(404).send({ message: "User details not found." });
    }

    if (gender) {
      userDetails.gender = gender;
    }

    if (birthdate) {
      userDetails.birthdate = birthdate;
    }

    if (country) {
      userDetails.country = country;
    }

    if (contact_number) {
      userDetails.contact_number = contact_number;
    }

    await userDetails.save();

    res.status(200).send({ message: "User details updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error updating user details." });
  }
};
