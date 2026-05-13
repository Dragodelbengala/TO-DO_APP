# 🚀 Quick Start - Kanban ToDo App

## Avvio Immediato (3 passi)

### Passo 1: Installa le dipendenze
```bash
npm install
```

### Passo 2: Avvia Expo
```bash
npx expo start
```

### Passo 3: Apri l'app

Scegli una delle opzioni:

```
┌─────────────────────────────────────────────────┐
│         SCEGLI COME APRIRE L'APP                 │
├─────────────────────────────────────────────────┤
│  w  →  Browser Web (più veloce per test)        │
│  a  →  Android Emulator                         │
│  i  →  iOS Simulator (Mac solo)                 │
│  Scansiona il QR con Expo Go (smartphone)       │
└─────────────────────────────────────────────────┘
```

---

## 🎮 Come Usare l'App

### Aggiungere una Card
1. Digita il testo nella casella "Nuova card"
2. Tocca il bottone "+" per aggiungerla

### Spostare una Card
1. Tocca il bottone "←" per spostare a sinistra
2. Tocca il bottone "→" per spostare a destra
3. I bottoni sono disabilitati ai limiti

### Eliminare una Card
1. Tocca il bottone "×" (rosso) su una card
2. La card scompare immediatamente

### Modificare una Card
1. Clicca sul testo della card
2. Modifica il testo
3. Le modifiche vengono salvate automaticamente

### Aggiungere una Colonna
1. Digita il nome nella casella "Nuova colonna"
2. Tocca "Aggiungi colonna"
3. La colonna appare in fondo

### Eliminare una Colonna
1. Tocca il bottone "✕" (giallo) nell'intestazione della colonna
2. Conferma l'eliminazione
3. Tutte le card nella colonna verranno eliminate

### Ripristinare la Board
1. Tocca il bottone "Ripristina bacheca" in alto
2. La board tornerà allo stato iniziale

---

## 📊 Test Checklist

Segui questo checklist per verificare che tutto funziona:

- [ ] App avvia senza errori
- [ ] 3 colonne di default sono visibili ("Da fare", "In corso", "Completato")
- [ ] Puoi aggiungere una card digitando e premendo "+"
- [ ] Puoi spostare una card con i bottoni "←" e "→"
- [ ] I bottoni "←" e "→" si disabilitano ai limiti
- [ ] Puoi eliminare una card con il bottone "×"
- [ ] Puoi aggiungere una colonna personalizzata
- [ ] Puoi eliminare una colonna
- [ ] Riavvii l'app e i dati vengono preservati ✅

---

## 📹 Registrare il Video Demo

Vedi le istruzioni complete in [DEMO_SCRIPT.md](DEMO_SCRIPT.md)

Riassunto rapido:
1. Crea una nuova card (5-15 secondi)
2. Spostala tra colonne (20-40 secondi)
3. Eliminala (40-55 secondi)
4. Riavvia l'app e verifica la persistenza (55-90 secondi)

**Durata totale**: 60-90 secondi

---

## 🐛 Troubleshooting

### L'app non avvia
```bash
# Pulisci la cache
npm install --legacy-peer-deps

# Cancella la cache Expo
expo prebuild --clean
npx expo start -c
```

### Non vedo le modifiche
- Premi R nel terminale Expo per ricaricare
- Premi Ctrl+C e rilancia `npx expo start`

### AsyncStorage non funziona
- In web: Usa localStorage (automatico)
- In mobile: Assicurati che il dispositivo abbia spazio disponibile

### I dati non vengono salvati
- Controlla che AsyncStorage sia importato correttamente
- Verifica che il device/emulator non sia in read-only mode

---

## 📚 File Importanti

| File | Descrizione |
|------|-------------|
| [App.js](App.js) | Codice principale della Kanban board |
| [README.md](README.md) | Documentazione completa con spiegazioni tecniche |
| [DEMO_SCRIPT.md](DEMO_SCRIPT.md) | Istruzioni per registrare il video demo |
| [COMPLETION_SUMMARY.md](COMPLETION_SUMMARY.md) | Riepilogo di completamento del progetto |
| [package.json](package.json) | Dipendenze del progetto |
| [app.json](app.json) | Configurazione Expo |

---

## 🎯 Prossimi Passi

Dopo aver testato l'app:

1. ✅ Registra il video di 60-90 secondi seguendo [DEMO_SCRIPT.md](DEMO_SCRIPT.md)
2. ✅ Leggi [COMPLETION_SUMMARY.md](COMPLETION_SUMMARY.md) per il riepilogo completo
3. ✅ Consulta [README.md](README.md) per la documentazione tecnica dettagliata

---

## 📞 Supporto

Per maggiori informazioni, consulta:
- [README.md](README.md) - Documentazione completa
- [DEMO_SCRIPT.md](DEMO_SCRIPT.md) - Guide video
- [App.js](App.js) - Codice sorgente commentato

---

**Buona prova!** 🎉

