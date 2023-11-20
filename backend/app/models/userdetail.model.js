module.exports = (sequelize, Sequelize) => {
  const UserDetail = sequelize.define("usersDetails", {
    gender: {
      type: Sequelize.STRING
    },
    birthdate: {
      type: Sequelize.DATEONLY
    },
    country: {
      type: Sequelize.STRING
    },
    contact_number: {
      type: Sequelize.STRING
    }
  });

  return UserDetail;
};
