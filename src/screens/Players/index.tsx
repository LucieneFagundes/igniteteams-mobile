import React from "react";
import { Alert, FlatList, Keyboard, TextInput } from "react-native";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ListEmpty } from "@components/ListEmpty";
import { PlayerCard } from "@components/PlayerCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playersAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByGroup } from "@storage/group/groupRemoveByName";
import { Loading } from "@components/Loading";

type RouteParams = {
  group: string;
};

export function Players() {
  const route = useRoute();
  const { navigate } = useNavigation();
  const { group } = route.params as RouteParams;

  const [team, setTeam] = React.useState<string>("Time A");
  const [players, setPlayers] = React.useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const newPlayerNameInputRef = React.useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        "Nova pessoa",
        "Informe o nome da pessoa para adicionar"
      );
    }

    const newPlayer = { name: newPlayerName, team };

    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur();

      fetchPlayersByTeam();
      setNewPlayerName("");
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert("Nova pessoa", error.message);
      } else {
        console.error(error);
        return Alert.alert(
          "Nova pessoa",
          "Não foi possível adicionar a pessoa"
        );
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);
      const players = await playersGetByGroupAndTeam(group, team);
      setPlayers(players);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Pessoas",
        "Não foi possível carregar as pessoas do time selecionado"
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert("Remover pessoa", "Não foi possível remover esta pessoa.");
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByGroup(group);
      navigate("groups");
    } catch (error) {
      console.log(error);
      Alert.alert("Remover turma", "Não foi possível remover esta turma.");
    }
  }

  async function handleRemoveGroup() {
    Alert.alert("Remover Turma", "Deseja realmente remover esta turma?", [
      { text: "Não", style: "cancel" },
      {
        text: "Sim",
        onPress: () => groupRemove(),
      },
    ]);
  }

  React.useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight title={group} subtitle="Adicione a galera e separe os times" />
      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" type="PRIMARY" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => {
                handleRemovePlayer(item.name);
              }}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Não há pessoas neste time" />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 50 },
            players.length === 0 && { flex: 1 },
          ]}
        />
      )}
      <Button
        title="Remover turma"
        type="SECONDARY"
        onPress={handleRemoveGroup}
      />
    </Container>
  );
}
