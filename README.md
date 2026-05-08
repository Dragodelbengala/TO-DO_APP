# Kanban ToDo App

Questa repository contiene una versione Expo React Native di una bacheca Kanban in stile Trello.

## Avvio

1. Apri il terminale nella cartella del progetto principale.
2. Esegui `npm install`.
3. Avvia l'app con `npx expo start`.
4. Scegli un emulatore o un dispositivo fisico per aprire l'app.

## Struttura dati

Lo stato principale della board è un array di oggetti `column`:
- Ogni `column` ha un `id`, un `title` e un array `cards`.
- Ogni `card` è un oggetto con un `id` univoco e un `text`.

Esempio di struttura:

```js
[
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
    cards: [],
  },
  {
    id: 'done',
    title: 'Completato',
    cards: [],
  },
]
```

## Logica di gestione dello stato

- Lo stato completo viene gestito usando `useState` e salvato in una singola variabile `columns`.
- L'aggiunta di una card clona la colonna bersaglio usando `map` e aggiunge il nuovo oggetto `card` con lo spread operator.
- L'eliminazione di una card usa `filter` per creare un nuovo array di card senza l'elemento rimosso.
- Lo spostamento di una card tra colonne crea una nuova board con due colonne modificate: la colonna di origine senza la card e la colonna di destinazione con la card aggiunta in coda.
- Tutti gli aggiornamenti usano tecniche immutabili (`map`, `filter`, spread) per non mutare direttamente gli array o gli oggetti annidati.

## Persistenza

L'intero stato della board viene salvato in locale con `AsyncStorage` usando la chiave `KANBAN_BOARD_STATE`.
- All'avvio l'app tenta di leggere i dati salvati.
- Se non ci sono dati, viene caricata la board di default.
- Ogni modifica alla board aggiorna `AsyncStorage` automaticamente.

## Funzionalità

- Colonne predefinite: `Da fare`, `In corso`, `Completato`.
- Creazione di nuove colonne personalizzate.
- Aggiunta, eliminazione e spostamento delle card tra colonne.
- Layout con colonne orizzontali e liste di card verticali annidate.

Buona prova dell'app Kanban Expo!
