const db = require("../models");
const Tournament = db.tournament;
const User = db.user;

exports.createTournament = async (req, res) => {
  try {
    if (!req.isAdmin) {
      return res.status(403).send({ message: "Require Admin Role!" });
    }
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
    if (!req.isAdmin) {
      return res.status(403).send({ message: "Require Admin Role!" });
    }
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
    if (!req.isAdmin) {
      return res.status(403).send({ message: "Require Admin Role!" });
    }
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