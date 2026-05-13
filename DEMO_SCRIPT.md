# Script Video Dimostrativo - Kanban ToDo App (60-90 secondi)

## Istruzioni per la registrazione

Registra uno screencast (60-90 secondi) seguendo questo script:

---

## 📹 Scena 1: Setup e Visualizzazione Iniziale (0-5 secondi)

**Azione**: Avvia l'app
```bash
npx expo start
```
Seleziona 'w' per web o 'a' per Android, oppure scansiona il QR con Expo Go.

**Cosa vedere**:
- La app carica con 3 colonne: "Da fare", "In corso", "Completato"
- La colonna "Da fare" ha 2 card di esempio
- La colonna "In corso" ha 1 card
- La colonna "Completato" ha 1 card

---

## 📹 Scena 2: Creazione di una Nuova Card (5-20 secondi)

**Azioni**:
1. Scorri orizzontalmente per visualizzare bene la colonna "Da fare"
2. Tocca l'input "Nuova card" nella colonna "Da fare"
3. Digita un testo, ad esempio: `"Implementa Kanban Board"`
4. Tocca il bottone "+" per aggiungerla

**Cosa vedere**:
- La nuova card appare in coda nella colonna "Da fare"
- L'input si svuota dopo l'aggiunta
- La card ha il testo inserito, con bottoni "←", "→", "×" (spostamento e eliminazione)

---

## 📹 Scena 3: Spostamento di una Card tra Colonne (20-40 secondi)

**Azioni**:
1. Scorri per visualizzare la card che hai appena creato in "Da fare"
2. Tocca il bottone "→" sulla card per spostarla a destra (verso "In corso")
3. Aspetta un momento per vedere il cambiamento
4. Scorri orizzontalmente per vedere la card ora in "In corso"
5. Tocca ancora il bottone "→" per spostarla ancora a destra (verso "Completato")
6. Scorri per visualizzare la card nella colonna "Completato"

**Cosa vedere**:
- La card scompare da "Da fare" e appare in "In corso"
- La card scompare da "In corso" e appare in "Completato"
- I bottoni "←" e "→" sono disabilitati quando la card è ai limiti (inizio/fine colonne)
- L'interfaccia rimane reattiva e fluida

---

## 📹 Scena 4: Eliminazione di una Card (40-55 secondi)

**Azioni**:
1. Scorri per visualizzare la card in "Completato" che hai spostato
2. Tocca il bottone "×" (rosso) sulla card
3. Osserva che la card scompare dalla colonna

**Cosa vedere**:
- La card scompare immediatamente dalla colonna "Completato"
- La lista si aggiorna senza errori
- L'interfaccia rimane reattiva

---

## 📹 Scena 5: Riavvio e Persistenza dei Dati (55-90 secondi)

**Azioni**:
1. Ferma l'app (premi Ctrl+C nel terminale o chiudi l'app)
2. Aspetta 1-2 secondi
3. Riavvia l'app con lo stesso comando: `npx expo start`
4. Riaprila (w per web, a per Android, o scansiona il QR)

**Cosa vedere**:
- Tutte le colonne con le card sono presenti esattamente come prima del riavvio
- La card che hai spostato in "Completato" è ancora lì
- La card che hai eliminato non è più presente
- Tutti i dati sono stati persistiti correttamente su AsyncStorage

---

## 🎬 Tips per una buona registrazione

- **Schermo pulito**: Usa un emulatore o dispositivo senza distrazioni
- **Ritmo**: Vai lentamente (2-3 secondi tra un'azione e l'altra) per far vedere chiaramente cosa succede
- **Audio**: (Facoltativo) Aggiungi una voce narrante che spiega cosa stai facendo
- **Qualità**: Registra con una buona risoluzione e illuminazione
- **Durata totale**: Mira a 70-80 secondi per un tempo perfetto
- **Formato**: Salva in MP4, WebM, o altro formato standard

---

## 📝 Esempio di narrazione (opzionale)

*"Questa è la Kanban ToDo App. Vediamo come funziona. All'avvio, la board ha tre colonne preimpostate: Da fare, In corso e Completato. Aggiungo una nuova card nella colonna Da fare digitando un testo. La card appare immediatamente. Ora la sposto nella colonna In corso con il bottone freccia destra. Poi la sposto ancora verso Completato. Infine la elimino con il bottone rosso X. Ora riavvio l'app. Come puoi vedere, tutti i dati sono stati salvati automaticamente e la board è esattamente come l'ho lasciata. Questo dimostra la persistenza completa dei dati con AsyncStorage."*

---

## 📂 Dove salvare il video

Salva il video nella cartella radice del progetto con il nome:
```
DEMO_VIDEO.mp4
```

O fornisci il link a un servizio di hosting video (YouTube, Vimeo, ecc.) nel README.
