import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storage.config";
import { groupGetAll } from "./groupsGetAll";

export async function groupRemoveByGroup(groupDeleted: string) {
  try {
    const storedGroups = await groupGetAll();

    const filtered = storedGroups.filter((group) => group !== groupDeleted);
    const groups = JSON.stringify(filtered);

    await AsyncStorage.setItem(GROUP_COLLECTION, groups);
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`);
  } catch (error) {
    throw error;
  }
}
