const { authJwt } = require("../middleware");
const controller = require("../controllers/tournament.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1/tournaments", controller.getAllTournaments);
  app.get("/api/v1/tournaments/:id", controller.getTournamentById);
  app.post(
    "/api/v1/tournaments",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createTournament
  );
  app.put(
    "/api/v1/tournaments/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateTournamentById
  );
  app.delete(
    "/api/v1/tournaments/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteTournamentById
  );
  //registrar user
  app.post(
    "/api/v1/tournaments/:id/register",
    [authJwt.verifyToken],
    controller.registerUserInTournament
  );
  app.get("/api/v1/tournaments/:id/users",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.getUsersRegisteredInTournaments
  );
  app.delete(
    "/api/v1/tournaments/:id/users/:idUser",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteUserRegisteredInTournament
  );
};
