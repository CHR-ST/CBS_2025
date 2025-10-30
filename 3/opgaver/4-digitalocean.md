# Droplet på DigitalOcean

Når du har oprettet en Droplet på DigitalOcean skal du gå ind i Access og Droplet Console.

## Node.js

Installere Node.js version 22 på Linux distribution Ubuntu version 20.04. Se link til dokumentationen for at installere andre udgaver af Node.js på Linux.

```
sudo apt-get install -y curl
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
```

[Link til dokumentation](https://nodesource.com/products/distributions)

## Express generator

Installer express-generator med npm globalt.

```bash
npm install -g express-generator
```

Opret et nyt express-generator projekt med .gitignore og uden view templates.
    
```bash
express min-nye-app --git --no-view
```

Gå ind i din nye projektmappe.
    
```bash
cd min-nye-app
```

Installer projektets afhængigheder.
    
```bash
npm install
```

## PM2

PM2 (står for proces manager) holder vores applikation kørende 24/7.

[Link til PM2](https://pm2.keymetrics.io/)

```
sudo npm install pm2@latest -g
```

Derefter starter vi appen med pm2.

Fordi det er en express-generator app skal vi kalde følgende.

```
pm2 start ./bin/www --name min-nye-app

pm2 save
```

Se om appen er oppe og køre med følgende.

```
pm2 list
```

Se alle requests til appen med følgende. Stop logningen ved at trykke CTRL+C.

```
pm2 logs
```

For at starte pm2 listen hvis den virtuelle maskine genstarter

```
pm2 startup systemd

pm2 save
```

Appen kører nu på port 3000 på IP-adressen.

## Nginx

Nginx (udtales ENGINE-X) er en open-source webserver med en reverse proxy og load balancer.

```
sudo apt update

sudo apt install nginx

sudo nginx -v

systemctl status nginx
```

Kør derefter følgende Nginx kommandoer for kun at tillade HTTP på port 80 og ssh på port 22 med en firewall.

```
sudo ufw app list

sudo ufw allow 'Nginx HTTP'

sudo ufw allow ssh

sudo ufw enable

sudo ufw status
```

Kommandoen nano åbner en teksteditor i Linux som gør det muligt at konfigurere vores endpoint for / til at pege på localhost:3000 for appen.

```
sudo nano /etc/nginx/sites-available/default
```

Inde i teksteditoren skal vi tilføje følgende under server.

```
server { 
... 
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection upgrade;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
... 
}
```

Gem ændringerne i konfigurationen med CTRL+X og Y for Yes og Enter. Derefter genstart NGINX på den virtuelle maskine. Vi checker derefter om syntaksen er korrekt og genstarter webserveren.

```
sudo nginx -t

sudo systemctl restart nginx
```

[Link til dokumentation](https://nginx.org/en/docs/beginners_guide.html)

Nu skulle du gerne kunne tilgå appen på IP adressen uden at angive port 3000.

# Linux

Når vi åbner vores virtuelle maskine skal vi interagere gennem Linux kommandoer:

ls – liste filer og mapper

cd – skifte mappe

pwd – vis nuværende filsti

mkdir – lav en ny mappe

rm – slette fil eller mappe

touch – opret en ny fil 

cat – vis indholdet af en fil

history – vis seneste kommandoer

[Link til Linux kommandoer](https://www.geeksforgeeks.org/linux-unix/linux-commands-cheat-sheet/)

# SSH

Ved at åbne en terminal på din computer kan du tilgå din Droplet med Secure Shell (ssh).

```
ssh root@ip-adresse
```

Skriv derefter det password til ´root´ som du oprettede for din Droplet. Bemærk det ikke fremgår af Terminalen når du skriver et tegn i passwordet.

# Fuld Nginx konfiguration

Kan tilgås på Droplet via:

```
sudo nano /etc/nginx/sites-available/default
```

Lav ændringer og tryk CTRL+X og Y for Yes og tryk ENTER for at gemme.

```
server {
	listen 80 default_server;
	listen [::]:80 default_server;

	root /var/www/html;

	index index.html index.htm index.nginx-debian.html;

	server_name _;

	location / {
		proxy_pass http://localhost:3000;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection upgrade;
		proxy_set_header Host $host;
		proxy_cache_bypass $http_upgrade;
	}
}
```



