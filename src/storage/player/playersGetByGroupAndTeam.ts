import { playersGetByGroups } from "./playersGetByGroups";

export async function playersGetByGroupAndTeam(group: string, team: string) {
  try {
    const storedPlayers = await playersGetByGroups(group);

    const players = storedPlayers.filter((player) => player.team === team);

    return players;
  } catch (error) {
    throw error;
  }
}
