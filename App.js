import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'KANBAN_BOARD_STATE';

const defaultColumns = [
  {
    id: 'todo',
    title: 'Da fare',
    cards: [
      { id: 'card-1', text: 'Impara la struttura Kanban' },
      { id: 'card-2', text: 'Crea task per l’app Expo' },
    ],
  },
  {
    id: 'inprogress',
    title: 'In corso',
    cards: [{ id: 'card-3', text: 'Implementa FlatList annidate' }],
  },
  {
    id: 'done',
    title: 'Completato',
    cards: [{ id: 'card-4', text: 'Salva lo stato con AsyncStorage' }],
  },
];

export default function App() {
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCardTextByColumn, setNewCardTextByColumn] = useState({});
  const [newColumnTitle, setNewColumnTitle] = useState('');

  useEffect(() => {
    async function loadBoard() {
      try {
        const storedBoard = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedBoard) {
          setColumns(JSON.parse(storedBoard));
        } else {
          setColumns(defaultColumns);
        }
      } catch (error) {
        Alert.alert('Errore', 'Impossibile caricare i dati salvati.');
        setColumns(defaultColumns);
      } finally {
        setLoading(false);
      }
    }
    loadBoard();
  }, []);

  useEffect(() => {
    async function saveBoard() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
      } catch (error) {
        console.warn('Salvataggio fallito', error);
      }
    }

    if (!loading) {
      saveBoard();
    }
  }, [columns, loading]);

  const generateId = () => `card-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

  const addCardToColumn = (columnId) => {
    const text = (newCardTextByColumn[columnId] || '').trim();
    if (!text) {
      Alert.alert('Attenzione', 'Inserisci il testo della card.');
      return;
    }

    const newCard = { id: generateId(), text };
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? { ...column, cards: [...column.cards, newCard] }
          : column,
      ),
    );
    setNewCardTextByColumn((prevState) => ({ ...prevState, [columnId]: '' }));
  };

  const deleteCard = (columnId, cardId) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? { ...column, cards: column.cards.filter((card) => card.id !== cardId) }
          : column,
      ),
    );
  };

  const moveCard = (columnId, cardId, direction) => {
    setColumns((prevColumns) => {
      const currentIndex = prevColumns.findIndex((column) => column.id === columnId);
      const targetIndex = currentIndex + direction;
      if (currentIndex < 0 || targetIndex < 0 || targetIndex >= prevColumns.length) {
        return prevColumns;
      }

      const cardToMove = prevColumns[currentIndex].cards.find((card) => card.id === cardId);
      if (!cardToMove) {
        return prevColumns;
      }

      return prevColumns.map((column, index) => {
        if (index === currentIndex) {
          return { ...column, cards: column.cards.filter((card) => card.id !== cardId) };
        }
        if (index === targetIndex) {
          return { ...column, cards: [...column.cards, cardToMove] };
        }
        return column;
      });
    });
  };

  const addColumn = () => {
    const title = newColumnTitle.trim();
    if (!title) {
      Alert.alert('Attenzione', 'Inserisci il nome della colonna.');
      return;
    }

    const newColumn = {
      id: `column-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
      title,
      cards: [],
    };
    setColumns((prevColumns) => [...prevColumns, newColumn]);
    setNewColumnTitle('');
  };

  const renderCard = (columnId, columnIndex) => ({ item }) => {
    const canMoveLeft = columnIndex > 0;
    const canMoveRight = columnIndex < columns.length - 1;

    return (
      <View style={styles.cardItem}>
        <Text style={styles.cardText}>{item.text}</Text>
        <View style={styles.cardButtonsRow}>
          <TouchableOpacity
            style={[styles.cardButton, !canMoveLeft && styles.cardButtonDisabled]}
            disabled={!canMoveLeft}
            onPress={() => moveCard(columnId, item.id, -1)}
          >
            <Text style={styles.cardButtonLabel}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cardButton, !canMoveRight && styles.cardButtonDisabled]}
            disabled={!canMoveRight}
            onPress={() => moveCard(columnId, item.id, 1)}
          >
            <Text style={styles.cardButtonLabel}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cardButton, styles.deleteButton]}
            onPress={() => deleteCard(columnId, item.id)}
          >
            <Text style={styles.cardButtonLabel}>×</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderColumn = ({ item, index }) => {
    return (
      <View style={styles.columnCard}>
        <Text style={styles.columnTitle}>{item.title}</Text>
        <View style={styles.addCardRow}>
          <TextInput
            value={newCardTextByColumn[item.id] || ''}
            onChangeText={(value) =>
              setNewCardTextByColumn((prevState) => ({ ...prevState, [item.id]: value }))
            }
            placeholder="Nuova card"
            placeholderTextColor="#999"
            style={styles.addCardInput}
          />
          <TouchableOpacity style={styles.addButton} onPress={() => addCardToColumn(item.id)}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={item.cards}
          keyExtractor={(card) => card.id}
          renderItem={renderCard(item.id, index)}
          style={styles.cardList}
          contentContainerStyle={styles.cardListContent}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        />
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Text style={styles.headerTitle}>Bacheca Kanban</Text>
        <Text style={styles.headerSubtitle}>
          Aggiungi card, spostale e verifica la persistenza con AsyncStorage.
        </Text>
        <View style={styles.newColumnContainer}>
          <TextInput
            value={newColumnTitle}
            onChangeText={setNewColumnTitle}
            placeholder="Nuova colonna"
            placeholderTextColor="#999"
            style={styles.newColumnInput}
          />
          <TouchableOpacity style={styles.newColumnButton} onPress={addColumn}>
            <Text style={styles.newColumnButtonText}>Aggiungi colonna</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={columns}
          keyExtractor={(column) => column.id}
          renderItem={renderColumn}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.boardContainer}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f4ff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 18,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#475569',
    marginBottom: 15,
    lineHeight: 22,
  },
  newColumnContainer: {
    flexDirection: 'row',
    marginBottom: 14,
    alignItems: 'center',
  },
  newColumnInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 10,
    color: '#0f172a',
  },
  newColumnButton: {
    backgroundColor: '#4f46e5',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  newColumnButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  boardContainer: {
    paddingBottom: 24,
  },
  columnCard: {
    width: 300,
    backgroundColor: '#eef2ff',
    borderRadius: 20,
    padding: 16,
    marginRight: 14,
    shadowColor: '#0f172a',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 7 },
  },
  columnTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 12,
  },
  addCardRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  addCardInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#0f172a',
  },
  addButton: {
    marginLeft: 8,
    borderRadius: 12,
    backgroundColor: '#4338ca',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },
  cardList: {
    maxHeight: 520,
  },
  cardListContent: {
    paddingBottom: 10,
  },
  cardItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#0f172a',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  cardText: {
    color: '#0f172a',
    fontSize: 15,
    marginBottom: 12,
  },
  cardButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 10,
    marginHorizontal: 2,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#fb7185',
  },
  cardButtonLabel: {
    color: '#0f172a',
    fontWeight: '700',
  },
  cardButtonDisabled: {
    opacity: 0.35,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
});
