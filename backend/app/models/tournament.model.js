module.exports = (sequelize, Sequelize) => {
  const Tournament = sequelize.define("tournaments", {
    name: {
      type: Sequelize.STRING
    },
    tournament_start_date: {
      type: Sequelize.DATE
    },
    tournament_end_date: {
      type: Sequelize.DATE
    },
    place: {
      type: Sequelize.STRING
    }
  });

  return Tournament;
};
