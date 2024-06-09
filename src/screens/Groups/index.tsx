import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React from "react";
import { Alert, FlatList } from "react-native";
import { Container } from "./styles";

import { Button } from "@components/Button";
import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpty";
import { groupGetAll } from "@storage/group/groupsGetAll";
import { Loading } from "@components/Loading";

export function Groups() {
  const { navigate } = useNavigation();
  const [groups, setGroups] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  function handleNewGroup() {
    navigate("new");
  }

  function handleOpenGroup(group: string) {
    navigate("players", { group });
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);
      const data = await groupGetAll();
      setGroups(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Turmas", "Não foi possível carregar as turmas.");
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty
              message={
                "Nenhuma turma encontrada." +
                "\n" +
                " Vamos cadastrar a primeira turma?"
              }
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
}
