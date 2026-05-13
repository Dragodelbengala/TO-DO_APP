# Kanban ToDo App - Bacheca Kanban in Stile Trello

Questa repository contiene un'app React Native con Expo che implementa una vera e propria bacheca Kanban simile a Trello. L'app consente di gestire colonne (liste) e card (attività) con spostamenti tra le colonne, persistenza completa dei dati, e un'interfaccia responsive e intuitiva.

## 🚀 Avvio rapido

### Prerequisiti
- Node.js (v14 o superiore)
- npm o yarn

### Installazione e avvio

```bash
# 1. Installa le dipendenze
npm install

# 2. Avvia l'app con Expo
npx expo start

# 3. Scegli un'opzione:
#    - Premi 'w' per aprire nel browser (Expo Web)
#    - Premi 'a' per lanciare su Android Emulator
#    - Premi 'i' per lanciare su iOS Simulator
#    - Scansiona il QR code con l'app Expo Go su un dispositivo fisico
```

## 📹 Video dimostrativo

Vedi [DEMO_SCRIPT.md](DEMO_SCRIPT.md) per le istruzioni su come registrare un video dimostrativo di 60-90 secondi che mostra:
- ✅ Creazione di una nuova card in una colonna
- ✅ Spostamento di una card tra due colonne diverse
- ✅ Eliminazione di una card
- ✅ Riavvio dell'app per dimostrare la persistenza dei dati

Il video deve mostrare chiaramente che tutti i dati vengono persistiti automaticamente con AsyncStorage e che l'interfaccia è reattiva e intuitiva.

## 📊 Struttura dati e architettura dello stato

### Modello di dati

Lo stato principale della board è un **array di oggetti `column`**, dove ogni colonna contiene un array di **oggetti `card`**. Questa struttura annidata consente di organizzare gerarchicamente le attività all'interno delle loro rispettive colonne.

**Tipo di dato `Column`:**
```typescript
{
  id: string;           // Identificatore univoco della colonna (es. "todo", "column-1234567890-abcd")
  title: string;        // Titolo della colonna (es. "Da fare", "In corso", "Completato")
  cards: Card[];        // Array di card contenute in questa colonna
}
```

**Tipo di dato `Card`:**
```typescript
{
  id: string;           // Identificatore univoco della card (es. "card-1234567890-abcd")
  text: string;         // Testo/titolo della card (es. "Implementa login")
}
```

### Esempio di stato completo

```javascript
const boardState = [
  {
    id: 'todo',
    title: 'Da fare',
    cards: [
      { id: 'card-1', text: 'Impara la struttura Kanban' },
      { id: 'card-2', text: 'Crea task per l\'app Expo' },
      { id: 'card-3', text: 'Implementa spostamento card' },
    ],
  },
  {
    id: 'inprogress',
    title: 'In corso',
    cards: [
      { id: 'card-4', text: 'Configura AsyncStorage' },
    ],
  },
  {
    id: 'done',
    title: 'Completato',
    cards: [
      { id: 'card-5', text: 'Salva lo stato con AsyncStorage' },
    ],
  },
];
```

### Gestione dello stato con `useState`

Lo stato viene gestito con un singolo `useState` che contiene l'intero array di colonne:

```javascript
const [columns, setColumns] = useState([]);
```

Questo approccio centralizzato facilita:
- La persistenza atomica su AsyncStorage (basta salvare l'intero array)
- Il tracking della storia dello stato
- L'aggiornamento coerente dell'interfaccia

## 🔄 Logica di gestione dello stato e immutabilità

L'app rispetta rigorosamente il **principio di immutabilità**, fondamentale in React. Tutte le operazioni sullo stato (CRUD) creano una **nuova versione dello stato** senza modificare l'originale.

### 1. Aggiungere una Card (`addCardToColumn`)

**Operazione**: Inserire una nuova card in una colonna specifica, mantenendola in coda.

**Logica immutabile** (usando `map` e `spread`):
```javascript
const addCardToColumn = (columnId) => {
  const newCard = { id: generateId(), text };
  
  setColumns((prevColumns) =>
    prevColumns.map((column) =>
      column.id === columnId
        ? { ...column, cards: [...column.cards, newCard] }  // Clone column, clone cards array
        : column
    )
  );
};
```

**Spiegazione**:
- `map()` itera su tutte le colonne
- Per la colonna target, crea un **nuovo oggetto column** con lo `spread operator` (`...column`)
- Dentro il nuovo column, crea un **nuovo array di cards** con lo `spread operator` (`...column.cards`)
- Aggiunge la `newCard` in coda al nuovo array
- Le colonne non target restano inalterate

### 2. Eliminare una Card (`deleteCard`)

**Operazione**: Rimuovere una card da una colonna specifica.

**Logica immutabile** (usando `map` e `filter`):
```javascript
const deleteCard = (columnId, cardId) => {
  setColumns((prevColumns) =>
    prevColumns.map((column) =>
      column.id === columnId
        ? { ...column, cards: column.cards.filter((card) => card.id !== cardId) }
        : column
    )
  );
};
```

**Spiegazione**:
- `map()` itera su tutte le colonne
- Per la colonna target, crea un **nuovo oggetto column**
- Dentro il nuovo column, crea un **nuovo array di cards** usando `filter()`
- `filter()` mantiene solo le card il cui `id !== cardId`, eliminando la card target
- Le colonne non target restano inalterate

### 3. Spostare una Card tra Colonne (`moveCard`)

**Operazione**: Spostare una card da una colonna a una colonna adiacente (sinistra/destra).

**Logica immutabile** (usando `map` e condizioni):
```javascript
const moveCard = (columnId, cardId, direction) => {
  setColumns((prevColumns) => {
    const currentIndex = prevColumns.findIndex((column) => column.id === columnId);
    const targetIndex = currentIndex + direction;
    
    // Validazione: non muovere se sei già all'inizio/fine
    if (currentIndex < 0 || targetIndex < 0 || targetIndex >= prevColumns.length) {
      return prevColumns;
    }

    // Estrai la card da spostare
    const cardToMove = prevColumns[currentIndex].cards.find((card) => card.id === cardId);
    if (!cardToMove) return prevColumns;

    // Crea una nuova board con le colonne modificate
    return prevColumns.map((column, index) => {
      if (index === currentIndex) {
        // Colonna di origine: rimuovi la card
        return { ...column, cards: column.cards.filter((card) => card.id !== cardId) };
      }
      if (index === targetIndex) {
        // Colonna di destinazione: aggiungi la card in coda
        return { ...column, cards: [...column.cards, cardToMove] };
      }
      // Altre colonne: rimangono inalterate
      return column;
    });
  });
};
```

**Spiegazione**:
- `findIndex()` localizza l'indice della colonna di origine
- Calcola l'indice della colonna target: `targetIndex = currentIndex + direction` (direction = -1 per sinistra, +1 per destra)
- Valida i limiti: non consente spostamenti fuori dai confini dell'array
- `find()` estrae la card da spostare dall'array della colonna di origine
- **Mappa su tutte le colonne**:
  - Colonna di origine: crea un nuovo column con le cards filtrate (senza la card spostata)
  - Colonna di destinazione: crea un nuovo column con la card aggiunta in coda
  - Altre colonne: rimangono inalterate
- Ritorna il nuovo array di colonne (nuova board)

### 4. Modificare il testo di una Card (`updateCardText`)

**Operazione**: Aggiornare il testo di una card esistente.

**Logica immutabile**:
```javascript
const updateCardText = (columnId, cardId, text) => {
  setColumns((prevColumns) =>
    prevColumns.map((column) =>
      column.id === columnId
        ? {
            ...column,
            cards: column.cards.map((card) =>
              card.id === cardId ? { ...card, text } : card
            ),
          }
        : column
    )
  );
};
```

**Spiegazione**:
- **Primo `map()`**: itera su tutte le colonne
- Per la colonna target, **secondo `map()`**: itera su tutte le card della colonna
- Per la card target, crea un **nuovo oggetto card** con il testo aggiornato (`{ ...card, text }`)
- Le card non target rimangono inalterate

### 5. Aggiungere una Colonna (`addColumn`)

**Operazione**: Aggiungere una nuova colonna personalizzata alla board.

**Logica immutabile**:
```javascript
const addColumn = () => {
  const newColumn = {
    id: `column-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
    title,
    cards: [],
  };
  setColumns((prevColumns) => [...prevColumns, newColumn]);
};
```

**Spiegazione**:
- Crea un oggetto `newColumn` con un ID univoco generato da timestamp e numero casuale
- Usa lo `spread operator` per creare un **nuovo array di colonne** (`[...prevColumns, newColumn]`)
- Questo conserva tutte le colonne precedenti e aggiunge la nuova in coda

## 💾 Persistenza con AsyncStorage

L'app salva automaticamente lo stato ogni volta che cambia:

```javascript
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
```

**All'apertura**, l'app carica lo stato salvato:

```javascript
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
      setColumns(defaultColumns);
    } finally {
      setLoading(false);
    }
  }

  loadBoard();
}, []);
```

## 🎨 Layout e UI

L'app utilizza una **struttura a due livelli di scroll**:

1. **Scroll orizzontale** (FlatList `horizontal`): Scorre tra le colonne
2. **Scroll verticale** (FlatList `vertical` annidato): Scorre tra le card di ogni colonna

**Colonna**: Larghezza fissa a 320px, con altezza massima di 520px per la lista delle card
**Card**: Design "a scheda" con testo editabile e bottoni per spostamento e eliminazione
**Colori e spacing**: Design moderno con ombra sottile e palette di colori coerente

## ✨ Funzionalità supportate

### Funzionalità obbligatorie
- ✅ Gestire colonne (3 colonne di base preimpostate)
- ✅ Aggiungere card in una colonna specifica
- ✅ Eliminare card
- ✅ Spostare card tra colonne adiacenti
- ✅ Persistenza completa con AsyncStorage
- ✅ Immutabilità rigorosa dello stato

### Funzionalità extra
- ✅ Aggiungere colonne personalizzate
- ✅ Eliminare colonne
- ✅ Modificare titoli di colonne inline
- ✅ Modificare testo delle card inline
- ✅ Validazione input (non consente card o colonne vuote)
- ✅ Reset della board allo stato iniziale
- ✅ Feedback visivo su bottoni disabilitati (spostamento ai limiti)

## 📦 Dipendenze principali

- **react-native**: Framework per app native cross-platform
- **expo**: Piattaforma per semplificare lo sviluppo React Native
- **@react-native-async-storage/async-storage**: Persistenza locale dei dati
- **react**: Libreria per UI componente

## 🤝 Contribuire

Le pull request sono benvenute. Per modifiche significative, apri un issue prima per discutere i cambiamenti proposti.

---

**Autore**: Dragodelbengala  
**Licenza**: MIT
