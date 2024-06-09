import AsyncStorage from "@react-native-async-storage/async-storage";
import { playersGetByGroups } from "./playersGetByGroups";
import { PLAYER_COLLECTION } from "@storage/storage.config";

export async function playerRemoveByGroup(playerName: string, group: string) {
  try {
    const storedPlayers = await playersGetByGroups(group);

    const filtered = storedPlayers.filter(
      (player) => player.name !== playerName
    );
    const players = JSON.stringify(filtered);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players);
  } catch (error) {
    throw error;
  }
}
