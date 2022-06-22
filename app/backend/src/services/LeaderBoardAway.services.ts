import { methodTeamsAll } from './Team.services';
import Match from '../database/models/match';

const methodWins = (matches: Match[]) => {
  const wins = matches
    .reduce((acc, crr) => (
      crr.awayTeamGoals > crr.homeTeamGoals ? acc + 1 : acc
    ), 0);
  return wins;
};

const methodDraws = (matches: Match[]) => {
  const draws = matches
    .reduce((acc, crr) => (
      crr.awayTeamGoals === crr.homeTeamGoals ? acc + 1 : acc
    ), 0);
  return draws;
};

const methodLosses = (matches: Match[]) => {
  const losses = matches
    .reduce((acc, crr) => (
      crr.awayTeamGoals < crr.homeTeamGoals ? acc + 1 : acc
    ), 0);
  return losses;
};

const methodGoalsFavor = (matches: Match[]) => {
  const goalsFavor = matches
    .reduce((acc, crr) => (
      crr.awayTeamGoals >= 0 ? acc + crr.awayTeamGoals : acc
    ), 0);
  return goalsFavor;
};

const methodGames = (win: number, draw: number, loss: number) => {
  const total = (win + draw + loss);

  return total;
};

const methodPoints = (win: number, draw: number) => {
  const total = ((win * 3) + (draw * 1));

  return total;
};

const methodGoalsOwn = (matches: Match[]) => {
  const goalsFavor = matches
    .reduce((acc, crr) => (
      crr.homeTeamGoals >= 0 ? acc + crr.homeTeamGoals : acc
    ), 0);
  return goalsFavor;
};

const leaderboardData = (matches: Match[]) => {
  const totalVictories = methodWins(matches);
  const goalsFavor = methodGoalsFavor(matches);
  const goalsOwn = methodGoalsOwn(matches);
  const totalDraws = methodDraws(matches);
  const totalLosses = methodLosses(matches);
  const totalGames = methodGames(totalVictories, totalDraws, totalLosses);
  const totalPoints = methodPoints(totalVictories, totalDraws);

  return {
    totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
    goalsBalance: goalsFavor - goalsOwn,
    efficiency: Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2)),
  };
};

const methodLeaderboardAway = async () => {
  const teams = await methodTeamsAll();

  const statistics = Promise.all(teams
    .map(async (team) => {
      const allMatchesTeam = await Match.findAll({ where: {
        awayTeam: team.id,
        inProgress: false,
      } });

      const finalNumbers = leaderboardData(allMatchesTeam);
      return { name: team.teamName, ...finalNumbers };
    }));

  return (await statistics).sort((a, b) => {
    if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
    if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
    if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
    if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
    if (a.goalsOwn !== b.goalsOwn) return b.goalsOwn - a.goalsOwn;
    return 0;
  });
};

export default methodLeaderboardAway;
