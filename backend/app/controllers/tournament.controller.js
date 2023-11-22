const db = require("../models");
const Tournament = db.tournament;
const User = db.user;

exports.createTournament = async (req, res) => {
  try {
    const tournament = await Tournament.create({
      name: req.body.name,
      tournament_start_date: req.body.tournament_start_date,
      tournament_end_date: req.body.tournament_end_date,
      place: req.body.place,
    })
    res.status(201).send(tournament);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getAllTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.findAll();
    res.status(200).send(tournaments);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getTournamentById = async (req, res) => {
  try {
    const tournamentId = req.params.id;
    const tournament = await Tournament.findByPk(tournamentId);

    if (!tournament) {
      return res.status(404).send({ message: "Tournament not found." });
    }

    res.status(200).send(tournament);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateTournamentById = async (req, res) => {
  try {
    const tournamentId = req.params.id;
    const tournament = await Tournament.findByPk(tournamentId);
    const { name, tournament_start_date, tournament_end_date, place } =
      req.body;

    if (!tournament) {
      return res.status(404).send({ message: "Tournament not found." });
    }

    if (name) {
      tournament.name = name;
    }

    if (tournament_start_date) {
      tournament.tournament_start_date = tournament_start_date;
    }

    if (tournament_end_date) {
      tournament.tournament_end_date = tournament_end_date;
    }

    if (place) {
      tournament.place = place;
    }

    await tournament.save();

    res.status(200).send(tournament);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteTournamentById = async (req, res) => {
  try {
    const tournamentId = req.params.id;
    const tournament = await Tournament.findByPk(tournamentId);

    if (!tournament) {
      return res.status(404).send({ message: "Tournament not found." });
    }
    await tournament.destroy();

    res.status(204).send({message: "Tournament has been eliminated."});
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.registerUserInTournament = async (req, res) => {
  try {
    const userId = req.userId;
    const tournamentId = req.params.id;
    const user = await User.findByPk(userId);
    const tournament = await Tournament.findByPk(tournamentId);
    if (!tournament) {
      return res.status(404).send({ message: "Tournament not found." });
    }
    const tournamentHasUser = await tournament.hasUser(user);
    if (tournamentHasUser) {
      return res.status(400).send({ message: "User already registered in the tournament." });
    }
    await tournament.addUser(user);
    res.status(200).send({ message: "User registered in the tournament successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getUsersRegisteredInTournaments = async (req,res)=>{
  try {
    const tournamentId = req.params.id;
    const tournament = await Tournament.findByPk(tournamentId);
    if (!tournament) {
      return res.status(404).send({ message: "Tournament not found." });
    }
    const users = await tournament.getUsers();
    const usersResponse = users.map((user) => {
      return { id: user.id, username: user.username, email: user.email };
    });
    res.status(200).send(usersResponse);

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteUserRegisteredInTournament = async (req,res)=>{
  try {
    const tournamentId = req.params.id;
    const tournament = await Tournament.findByPk(tournamentId);
    const userId = req.params.idUser;
    const user = await User.findByPk(userId);
    if (!tournament) {
      return res.status(404).send({ message: "Tournament not found." });
    }
    const tournamentHasUser = await tournament.hasUser(user);
    if (!tournamentHasUser) {
      return res.status(400).send({ message: "User is not registered in the tournament." });
    }
    await tournament.removeUser(user);
    res.status(200).send({ message: "User removed from the tournament successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}
