import { Op } from 'sequelize';
import { methodTeamsAll } from './Team.services';
import Match from '../database/models/match';

const winsAway = (matches: Match[], id: number) => matches
  .filter((m) => m.awayTeam === id)
  .reduce((acc, crr) => (
    crr.homeTeamGoals < crr.awayTeamGoals ? acc + 1 : acc
  ), 0);

const winsHome = (matches: Match[], id: number) => matches
  .filter((m) => m.homeTeam === id)
  .reduce((acc, crr) => (
    crr.homeTeamGoals > crr.awayTeamGoals ? acc + 1 : acc
  ), 0);

const methodWins = (matches: Match[], id: number) => {
  const victoriesHome = winsHome(matches, id);
  const victoriesAway = winsAway(matches, id);

  return victoriesAway + victoriesHome;
};

const methodDraws = (matches: Match[]) => matches
  .reduce((acc, crr) => (
    crr.homeTeamGoals === crr.awayTeamGoals ? acc + 1 : acc
  ), 0);

const methodGoalsFavor = (matches: Match[], id: number) => matches
  .filter((m) => m.homeTeam === id || m.awayTeam === id)
  .map((m) => (m.homeTeam === id ? m.homeTeamGoals : m.awayTeamGoals))
  .reduce((acc, crr) => acc + crr, 0);

const methodPoints = (win: number, draw: number) => ((win * 3) + (draw * 1));

const methodGoalsOwn = (matches: Match[], id: number) => matches
  .filter((m) => m.homeTeam === id || m.awayTeam === id)
  .map((m) => (m.homeTeam === id ? m.awayTeamGoals : m.homeTeamGoals))
  .reduce((acc, crr) => acc + crr, 0);

const leaderboardData = (matches: Match[], id: number) => {
  const totalVictories = methodWins(matches, id);
  const goalsFavor = methodGoalsFavor(matches, id);
  const goalsOwn = methodGoalsOwn(matches, id);
  const totalDraws = methodDraws(matches);
  const totalLosses = matches.length - (totalVictories + totalDraws);
  const totalGames = matches.length;
  const totalPoints = methodPoints(totalVictories, totalDraws);

  return {
    totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
    goalsBalance: (goalsFavor - goalsOwn),
    efficiency: Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2)),
  };
};

const methodLeaderboard = async () => {
  const teams = await methodTeamsAll();

  const statistics = await Promise.all(teams
    .map(async (team) => {
      const allMatchesTeam = await Match.findAll({ where: {
        [Op.and]: [{ [Op.or]: [{ homeTeam: team.id }, { awayTeam: team.id }] },
          { inProgress: false }],
      } });

      return { name: team.teamName, ...leaderboardData(allMatchesTeam, team.id) };
    }));

  return statistics.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || a.goalsOwn - b.goalsOwn);
};

export default methodLeaderboard;
