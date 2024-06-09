import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storage.config";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export async function playersGetByGroups(group: string) {
  try {
    const storedPlayers = await AsyncStorage.getItem(
      `${PLAYER_COLLECTION}-${group}`
    );

    const players: PlayerStorageDTO[] = storedPlayers
      ? JSON.parse(storedPlayers)
      : [];

    return players;
  } catch (error) {
    throw error;
  }
}
