# Ekstraopgave

Lav en Express applikation hvor brugerne kan indtaste brugernavn og password i en formular for at få adgang til en beskyttet side.

1. Opret en Express applikation (brug gerne express-generator)

2. Lav endpoints for '/' (GET), '/login' (POST) og '/protected' (GET)

3. Opret en cookie for brugeren ved login

4. Beskyt endpointet '/protected' med middleware som checker for cookie

5. Deploy din Express applikation på en Droplet

6. Åben Wireshark og start en packet capture

7. Tilgå din Express applikation på IP adressen for din Droplet og log in

8. Analyser i Wireshark om du kan sniffe password og cookie i packets

I øvelse /3/cookie-app er der eksempler på routes for auth, cookie og middleware. Der er et eksempel på en database i /3/cookie-app/db.

I følgende tabel er der en oversigt over HTTP metoder og endpoints med en beskrivelse.

| HTTP metode   | Endpoint      | Beskrivelse                                       |
|---------------|---------------|---------------------------------------------------|
| GET           | /             | Viser index.html med loginformularen              |
| POST          | /login        | Modtager brugernavn og password, sætter cookie    |
| GET           | /protected    | Viser beskyttet side, kræver gyldig cookie        |

