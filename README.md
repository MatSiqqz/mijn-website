# Mats de Roon · Persoonlijk portfolio

Nederlandstalige website voor Talentontwikkeling (TOW), studiejaar 2026–2027, Hogeschool Rotterdam. Gemaakt met React, TypeScript en Vite. Werkt op mobiel en desktop en kan als statische website worden gehost; er is geen backend, database of account nodig.

## Ontwikkelen

Gebruik de bestaande checkout in `/workspace/mijn-website`. Elke cloudtaak is al geïsoleerd; een extra Git-worktree is niet nodig.

Node.js 22 of 24 en npm zijn geschikt; deze omgeving bevat Node.js 24.22.1.

```sh
cd /workspace/mijn-website
npm ci
npm run dev -- --port 5173
```

De ontwikkelserver luistert op poort 5173. Er zijn geen secrets of omgevingsvariabelen nodig. Afhankelijkheden komen van `registry.npmjs.org`. Lettertypen, afbeeldingen en het CV staan lokaal, zodat de website tijdens gebruik geen externe beeld- of lettertypediensten nodig heeft.

## Controleren en bouwen

```sh
npm run build
npm run preview -- --port 4173
```

`build` controleert TypeScript en maakt de productieversie in `dist/`. De previewserver dient alleen om die build lokaal te controleren.

Met een draaiende ontwikkelserver:

```sh
npm test
```

Met de draaiende productiepreview:

```sh
BASE_URL=http://127.0.0.1:4173 npm test
```

De browsersmoke-test controleert routes, filters, zoeken, conceptopslag en downloads, CV-PDF, uitklapbare inhoud, mobiele navigatie en horizontale overflow. Hiervoor gebruikt hij Chromium op `/usr/bin/chromium`. Op een andere machine kun je met `CHROMIUM_PATH` het uitvoerbare bestand aanwijzen. Tests gebruiken een geïsoleerde browsercontext en veranderen geen echte gebruikersconcepten.

## Pagina’s en inhoud bijwerken

| Inhoud | Bestand |
| --- | --- |
| Landingspagina | `src/pages/HomePage.tsx` |
| Over mij, CV, stage, extra ervaringen en colofon | `src/pages/SupportingPages.tsx` |
| Zeven TOW-opdrachten, vereisten en deadlines | `src/data/course.ts` |
| Opdrachtenoverzicht, detailpagina’s en conceptwerkruimte | `src/pages/AssignmentsPage.tsx` |
| Kleuren, typografie en responsive opmaak | `src/styles.css` |
| Navigatie, routes en footer | `src/App.tsx` |
| CV-PDF | `public/documents/cv-mats-de-roon.pdf` |

Persoonsgegevens en werkervaring komen uit de door Mats aangeleverde informatie. Er zijn geen eigenschappen, resultaten, cijfers, persoonlijke reflecties, werkperiodes of contactgegevens verzonnen. Nog ontbrekende uitwerkingen zijn duidelijk als gepland gemarkeerd. De Brightspace-voortgang is geen bewijs dat een persoonlijke uitwerking op deze website is toegevoegd.

De conceptwerkruimte per TOW-opdracht gebruikt uitsluitend `localStorage` van de bezoeker. **Bewaren publiceert niets.** Concepten blijven in dezelfde browser op hetzelfde apparaat; download de Markdown-versie als reservekopie. Om definitieve inhoud op de openbare website te plaatsen, moet die in de paginabestanden worden verwerkt en de website opnieuw worden gebouwd en gehost. De browserwerkruimte is geen CMS en heeft geen accounts.

### CV opnieuw genereren

De bestaande PDF wordt direct meegebouwd. Alleen bij het aanpassen van de PDF is Python met PyMuPDF nodig (al beschikbaar in deze omgeving):

```sh
python3 scripts/generate-cv.py
```

Wijzig gegevens in zowel de CV-pagina als de generator om beide versies gelijk te houden. Voeg geen onbekende datums of contactgegevens toe.

## Nog aan te vullen door Mats

- Een eigen profielfoto, als vervanging van de initialen.
- De periode van het werk bij Facilicom en gewenste openbare contactgegevens.
- Eigen TOW-uitwerkingen, scans, persoonlijke leerdoelen en bewijsstukken.
- De aparte stagehandleiding, het stagebedrijf en de officiële stageopdrachten.
- Studentbedrijf en websitelink, keuzevak, belevenisweken en eigen foto’s/verslagen.

De TOW-handleiding bevat een onduidelijkheid: het complete portfolio zou op 7 mei 2027 klaar moeten zijn, terwijl de genoemde stageperiode 10 mei–4 juni 2027 is. Bevestig deze planning bij de docent voordat je er een definitieve stageplanning van maakt.

## Online plaatsen

Host de **inhoud van `dist/`** bij een statische hostingdienst met HTTPS. De website gebruikt relatieve bestandspaden en hashroutes (`/#/over-mij`), zodat pagina’s ook onder een repositorypad zoals `/mijn-website/` kunnen werken zonder server-side routeconfiguratie.

Voor GitHub Pages staat de statische productieversie op de branch `gh-pages`. Activeer in GitHub onder **Settings → Pages → Build and deployment** de bron **Deploy from a branch**, kies **gh-pages** en **/ (root)** en sla op. De beoogde website-URL is `https://matsiqqz.github.io/mijn-website/`; deze wordt pas actief nadat GitHub Pages is ingeschakeld en de publicatie is afgerond.

Er is geen automatische publicatieworkflow ingesteld. Een nieuwe `build` moet opnieuw naar `gh-pages` worden overgebracht om de openbare website bij te werken. Het draaien van `build` alleen publiceert niets. Een gepubliceerde cloudontwikkelomgeving is ook niet hetzelfde als een openbaar gehoste website.

## Herkomst

Opdrachtinformatie is gebaseerd op de aangeleverde *Cursushandleiding Talentontwikkeling 2026–2027* (p. 23–28, deadlines p. 15). De Rotterdam-afbeelding is een AI-architectuurimpressie, geen eigen foto van Mats. Ontwerp, code en basisteksten zijn met AI-ondersteuning gemaakt; dit staat transparant in het colofon. De originele handleiding met docentgegevens wordt niet als publiek bestand meegestuurd.
