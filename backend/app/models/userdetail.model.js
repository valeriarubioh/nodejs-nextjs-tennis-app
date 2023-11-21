module.exports = (sequelize, Sequelize) => {
  const UserDetail = sequelize.define("usersDetails", {
    gender: {
      type: Sequelize.STRING,
      allowNull: false
    },
    birthdate: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false
    },
    contact_number: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return UserDetail;
};
