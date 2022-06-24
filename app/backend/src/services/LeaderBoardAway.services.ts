import { methodTeamsAll } from './Team.services';
import Match from '../database/models/match';

const methodWins = (matches: Match[]) => matches
  .reduce((acc, crr) => (
    crr.awayTeamGoals > crr.homeTeamGoals ? acc + 1 : acc
  ), 0);

const methodDraws = (matches: Match[]) => matches
  .reduce((acc, crr) => (
    crr.awayTeamGoals === crr.homeTeamGoals ? acc + 1 : acc
  ), 0);

const methodLosses = (matches: Match[]) => matches
  .reduce((acc, crr) => (
    crr.awayTeamGoals < crr.homeTeamGoals ? acc + 1 : acc
  ), 0);

const methodGoalsFavor = (matches: Match[]) => matches
  .reduce((acc, crr) => acc + crr.awayTeamGoals, 0);

const methodGames = (win: number, draw: number, loss: number) => (win + draw + loss);

const methodPoints = (win: number, draw: number) => ((win * 3) + (draw * 1));

const methodGoalsOwn = (matches: Match[]) => matches
  .reduce((acc, crr) => acc + crr.homeTeamGoals, 0);

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

  const statistics = await Promise.all(teams
    .map(async (team) => {
      const allMatchesTeam = await Match.findAll({ where: {
        awayTeam: team.id,
        inProgress: false,
      } });

      const finalNumbers = leaderboardData(allMatchesTeam);
      return { name: team.teamName, ...finalNumbers };
    }));

  return statistics.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || a.goalsOwn - b.goalsOwn);
};

export default methodLeaderboardAway;
