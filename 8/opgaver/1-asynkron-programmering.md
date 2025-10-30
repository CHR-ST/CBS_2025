# async/await

Den moderne måde at håndtere asynkrone operationer på. 

async gør en funktion asynkron og await pauser eksekvering indtil et promise er resolved.

async foran en funktion betyder at funktionen returnerer et promise.

await pauser funktionens eksekvering indtil promise'et er resolved, og returnerer så værdien.

Node.js kan stadig håndtere andre requests mens den venter, funktionen blokerer ikke event loop.

# Promises

Fundamentet under async/await. 

Et promise repræsenterer en værdi der måske er tilgængelig nu, i fremtiden, eller aldrig. Har tre states: pending, fulfilled, rejected.

Brug Promise.all() når du skal vente på flere parallelle operationer.

# Try-catch blokke

Fejlhåndtering for async/await. Uden try-catch vil fejl crashe din app eller resultere i unhandled promise rejections.

Kan smide fejl med .status property for at kontrollere HTTP status koden.

Brug express-async-errors som middleware til at håndtere fejl, der bliver thrown og fanget automatisk, og behøver ikke try-catch i hver route.

# fetch()

Fra Node.js 18+ er fetch() built-in. Bruges til at lave HTTP requests til eksterne APIs.

[Fetch på client-side (Mozilla)](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch)

[Fetch på server-side (nodejs.org)](https://nodejs.org/en/learn/getting-started/fetch)

# Event loop

Node.js kan håndtere tusindvis af samtidige connections på én tråd, fordi I/O operationer (database, HTTP calls, fil læsning) frigiver event loop mens de venter.

Event loop er hjertet i Node.js's asynkrone model.

Når du bruger await, sker der følgende:

Funktionen pauses - koden efter await bliver sat "on hold"

Event loop fortsætter - Node.js kan nu håndtere andre requests/events

Når promise resolves - callback'en bliver sat i event loop's queue

Funktionen genoptages - når event loop kommer til den i køen