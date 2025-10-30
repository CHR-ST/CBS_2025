# Lav en Droplet på DigitalOcean

Start en ny Droplet på DigitalOcean.

En Droplet til 4$ om måneden er fint og vælg et password.

Åben en Terminal og brug ssh til at tilgå din Droplet.

```bash 
ssh root@ip
```

Du skal skrive passwordet til din Droplet for at tilgå den med fjernadgang.

Herefter skal du installere Node.js på din Droplet.

Skriv følgende kommandoer i Terminalen.

```bash
sudo apt-get install -y curl

curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -

sudo apt-get install -y nodejs

node -v
```

Hvis installeren giver fejl kan det hjælpe at lave en genstart af din Droplet.

```bash
reboot
```

Derefter skal du forbinde til din Droplet med ssh igen og lave installationen.

Derefter kan du installere pm2 med npm globalt.

```bash 
sudo npm install pm2@latest -g
```

Og lave en git clone af Mikkels repository på GitHub for øvelser.

```bash
git clone https://github.com/mwndigi/cbs-2025.git
```

Brug derefter Linux kommandoer til at navigere ind i mappen for øvelse 5.

```bash
ls 

cd cbs-2025

ls

cd 5

ls 

cd 1-udp-server

pm2 start udp-server.js

pm2 save

cd ..

cd 2-tcp-server

pm2 start tcp-server.js

pm2 save

cd ..

cd 3-http-server

pm2 start http-server.js

pm2 save

cd ..

cd 4-express-server

pm2 start express-server.js

pm2 save

pm2 list
```

Nu kører Node.js processerne på følgende porte:

udp-server på port 6790

tcp-server på port 8080

http-server på port 8000

express-server på port 3000