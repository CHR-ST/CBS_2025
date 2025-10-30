# Åben Wireshark

Når du åbner Wireshark skal du vælge 'Wi-Fi: en0' som interface.

Tryk derefter på den blå hajfinne øverst til venstre for at starte en packet capture.

På Canvas ligger der dokumenter for øvelser med Wireshark (nederst på hold LA_E25).

Øverst er der en linje til at lave filtreringer. Min Droplet ip adresse er 159.89.96.82

## UDP

Åben 5/1-udp-client/udp-client.js og indsæt ip adressen for din Droplet på linje 7 for host.

Lav følgende filter i Wireshark:

```bash
udp and ip.addr == 159.89.96.82
```

Derefter kør udp-client.js i en Terminal.

```bash
node udp-client.js
```

Arbejd med følgende spørgsmål i Wireshark:

- Vælg Internet Protocol og find Source Address og Destination Address
- Vælg User Datagram Protocol og find Source Port og Destination Port
- Vælg Data og se Packets og find 'ping' og 'pong'
- Hvor mange bytes er UDP Payload?

Derudover svar på følgende fra console.log() for pingForRTT() funktionen:

- Hvad er round trip time for UDP mellem klient og server?

## TCP

Åben 5/2-tcp-client/tcp-client.js og indsæt ip adressen for din Droplet på linje 5 for host.

Lav følgende filter i Wireshark:

```bash
tcp and ip.addr == 159.89.96.82
```

Derefter kør tcp-client.js i en Terminal.

```bash
node tcp-client.js
```

Arbejd med følgende spørgsmål i Wireshark:

- Internet Protocol er det samme for TCP som UDP
- Vælg Transmission Control Protocol og find Source Port og Destination Port
- Se de forskellige headers for TCP
- I oversigten for TCP, kan du se ud fra Info-kolonnen hvor TCP Three-Way Handshake finder sted?
- Kan du finde de packets som indeholder 'ping' og 'pong'?

Derudover svar på følgende fra console.log() for pingForRTT() funktionen:

- Hvad er round trip time for TCP mellem klient og server?

## HTTP

Åben 5/3-http-client/http-client.js og indsæt ip adressen for din Droplet på linje 22.

Lav følgende filter i wireshark:

```bash
http and ip.addr == 159.89.96.82
```

Derefter kør http-client.js i en Terminal.

```bash
node http-client.js
```

Arbejd med følgende spørgsmål i Wireshark:

- Hvad er TCP payload?
- Find både Request og Response i oversigten
- Vælg Hypertext Transfer Protocol og se headers og body

Derudover svar på følgende fra console.log() for ping() funktionen:

- Hvad er responstid for HTTP mellem klient og server?

Åben en browser og tilgå din Droplet på port 3000 for at lave kald til express serveren.

Lav filter kun på ip adressen hvis du vil se TCP og HTTP i packet capture.

```bash
ip.addr == 159.89.96.82
```

Prøv både at tilgå endpoint '/' samt '/image' og kig i Wireshark.

Bemærk hvordan TCP sørger for at overføre billedet i mange segmenter.

Se også HTTP for de to endpoints og de forskellige headers.

- Status Code
- Content-Type
- Content-Length
- Set-Cookie og Cookie
- X-Response-Time