# IT2810 Webutvikling H18 Prosjekt 3 - Gruppe 10

## Om appen
Applikasjonen er en “Personal Information and Motivation Manager". Denne skal hjelpe deg og holde styr på kommende hendelser, gjøremål og aktivitetsmål i form av antall skritt i løpet av en dag. 

## Valg og bruk av teknologi

### React Native
Ved å bruke expo, som påkrevd oppfylte vi kravet om å bruke React native. Noe som kanskje kan være litt synd med Expo er at det fjerner all behov for native kode og man sitter bare og skrive JS. 

### react-native-elements
Når man raskt skal lage apper er det viktig å passe på hvor lang tid man bruker på ting. En av prosessene vi valgte å kutte på var design. Ved å bruke et UI Toolkit får vi mange forskjellige skjermelementer som lett kan plasseres i appen og som ser helt greie ut. Problemet med disse er at det ofte kan bli litt vanskelig å tilpasse de slik man vil ha dem og passer derfor ikke like godt til alle prosjekter.

Vi valgte react-native-elements fordi det er et av de største og mest kjente bibliotekene. Dette sikrer oss, iallefall i stor grad, mot vanlige bugs og andre irriterende småfeil. Samt at det også inneholder det aller meste vi trenger. 

For å bruke react-native-elements må det først installeres i prosjektet ved å bruke `npm i --save react-native-elements`, eller `yarn add react-native-elements`. Deretter er det bare å importere enkeltkomponenter derfra inn i komponenten man lager. Dette gjør man ved å bruke `import {komponentnavn,} from ‘react-native-elements’`. På [nettsiden](https://react-native-training.github.io/react-native-elements/docs/getting_started.html) finner man meget god dokumentasjon og oversikt over de forskjellige komponentene og hvordan man bruker dem. En ting å være obs på er de forskjellige props’ene de tar, f.eks har Button forskjellige style-props som påvirker forskjellige ting. 

### react-native-datepicker
En av de tingene som fort kunne tatt veldig lang tid å implementere er en datepicker. Her er det mulig å velge dato og tid og det skal støttes av både android og IOS. Så grunnen til at vi brukte en ferdiglaget var enkel - sparte oss for masse tid! 

Man bruker det ved å importere Datepicker-komponenten for så å plassere denne i et View. Det er en ganske godt [dokumentert](https://github.com/xgfe/react-native-datepicker) komponent med mange forskjellige props som gjør at man kan tilpasse den til sitt eget bruk. Ut av boksen funker den også smertefritt på begge plattformer.

### pedometer from expo
Denne bruker Core Motion (iOS) og Google Fit (Android) til å finne data om skritt. Denne delen av Expo lar deg hente skritt på noen forskjellige måter. Vi brukte en metode som het watchStepCount(callback) som kallet callback-funksjonen når ny skrittdata var tilgjengelig. Dokumentasjon finnes [her](https://docs.expo.io/versions/latest/sdk/pedometer) og har gode eksempler på hvordan man implementerer dette. Her er en subscription til skritt lik den vi brukte. 

```javascript
import { Pedometer } from 'expo'

this._subscription = Pedometer.watchStepCount(result => {
  this.setState({
    currentStepCount: result.steps
  });
});

```

## Krav til applikasjonens innhold og funksjonalitet
I vårt produkt har vi implementert pedometer som gir en oversikt over antall skritt brukeren har gått i dag, sammen med mulighet for å legge til gjøremål og hendelser har denne applikasjonen potensiale til å bli et fullkomment produkt i form av en “Personal Information and Motivation Manager”. 

Du kan legge til nye elementer som kalenderhendelser, todos og mål pr dag.

Tilstand lagres via AsyncStorage som vi kommer tilbake til i teknologi.

Appen bruker skritteller. Det er tenkt at en skal finne motivasjon til å oppnå et mål i form av antall skritt. Initialt er målet satt til 10 000 skritt, men dette har en mulighet til å endre selv inne på aktivitet-siden. 


## Krav til bruk av teknologi
Applikasjonen er bygd opp ved hjelp av Expo, og videre brukes AsyncStorage til å lagre og hente data. AsyncStorage fungerer på den måten at man lagrer data ved AsyncStorage.setItem(key, value) og henter data ved AsyncStorage.getItem(key). Det har den egenskapen at informasjonen lagres permanent, asynkront og lokalt på enheten som benyttes. Det å bruke AsyncStorage har vært ypperlig til vårt formål, da ingen sensitiv informasjon etterspørres (AsyncStorage er ikke kryptert). 

[Nyttig docs](https://facebook.github.io/react-native/docs/asyncstorage)

## Krav til testing
Måten vi har testet appen på er først og fremst testing ved hjelp av Expo-appen på telefonen (da både på Android og iOS). Dette har gjort at vi hele tiden har testet responsivitet, hastighet og brukervennlighet. Videre begynte vi etter hvert å skrive tester i Jest, men vi rakk ikke å bli ferdig med dette da vi har hatt utallige problemer (og brukt enda flere timer for å løse disse).

Vi har vist evner til testing av AsyncStorage, state og vanlig enhets-testing. Så selv om vi ikke har høy dekningsgrad mener vi at vi har oppfylt kravene. Blant annet har det vært problemer med å teste komponentene på hjem-siden da disse testene ikke ville avslutte, men kjøre uendelig.

## Kort forklaring av sider

### Hjem
Hjemskjermen tenkte vi skulle fungere som et oversiktlig dashboard med informasjon om kommende avtaler, todos og progresjonen på dagens mål. 

Det viste seg etterhvert at noen enheter hadde problemer med å laste aktivitetsdata fra start, etter litt uformell testing på diverse mobile enheter har det vist seg at det virker på omtrent 75% av disse. Dette er noe vi hadde prioritert å fikse hvis tiden hadde strukket til. 

### Todo
Side for å administrere todo-oppgaver. Her setter man navn og eventuell dato som så vises i en liste under 

### Kalender
Side for å vise avtaler på kalender. Her kan du legge til og fjerne avtaler på forskjellige datoer og tidspunkt.

### Kontakter
Side for å administrere sine kontakter, som å vise alle, legge til, endre og fjerne kontakter. Tidligere hadde vi også funksjonalitet for å importere kontakter fra telefonen, men av en eller annen grunn gjorde implementasjonen vår resten av appen veldig treig til man hadde scrollet seg til bunnen av lista.

En annen ting her er modalen som dukker opp for å legge til en kontakt. Her er det mulig å legge inn hva som helst, men aller helst skulle det vært en form med validering. Det ligger noen Form-komponenter i react-native-elements og vi skulle nok brukt disse.

### Profil
Profil-siden er bygd opp som en egen Screen og deretter lagt inn i en modal som kun åpnes fra hjem-siden. Dette er på grunn av dette ikke sees på som en side som ikke trengs å være like aksesserbar. Skulle applikasjonen vært videreutviklet ville det vært interessant å implementere høyde- og vekt-parameterne i en funksjon sammen med pedometeret for utregning av flere helsemål, som for eksempel en omtrentlig kaloriteller. 

## Skulle vi gjort mer
* Ville gjort det mulig å få todo items importert til calender
* Sortert kalender items etter tid
* Hatt mer integrasjon med kontakter og mulighet for å legge til bilde
* Mulighet for å bytte profilbilde

