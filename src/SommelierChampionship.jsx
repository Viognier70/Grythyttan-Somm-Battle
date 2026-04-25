import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// KNOWLEDGE DOMAIN DESCRIPTIONS
// Grounded in:
// - Herdenstam (2011) "Den arbetande gommen" KTH
// - Herdenstam (2023) Pedagogisk meritportfölj, ORU/Campus Grythyttan
// - Crichton-Fock & Spence (2024) Journal of Wine Research
// - Herdenstam et al. (2018) Int. J. Gastronomy & Food Science
// - Herdenstam et al. (2020) "Breaking the Silence" IJGFS
// - Crichton-Fock, Spence & Pettersson (2023) Frontiers in Psychology
// Aristotelian framework: Episteme · Techne · Phronesis
// ─────────────────────────────────────────────────────────────────────────────

const DOMAIN_INTRO = {
  vetenskap: {
    title: "Episteme — Vetenskaplig kompetens",
    aristotle: "Episteme",
    icon: "📚",
    color: "#1e4a8a",
    bg: "#eef2fb",
    summary: "Den teoretiska och analytiska kunskapen om vin och måltid — mätbar, generaliserbar och systematisk. Episteme svarar på frågan: 'Vad kan jag identifiera i glaset?'",
    framework: `Aristoteles kallar den vetenskapliga kunskapen för Episteme — kunskap som kan bevisas, mätas och generaliseras. I Herdenstams meritportfölj (2023) definieras detta som kunskap "med krav på mätbarhet och generaliserbarhet". I vinprovarens dubbla grepp (Herdenstam, 2011) är det analytiska greppet det deduktiva: att systematiskt identifiera vinets beståndsdelar — syra, sötma, bitterhet, tannin, alkohol, aromer — utifrån etablerade protokoll som WSET SAT. I Double-Grip Analysis (Crichton-Fock & Spence, 2024) är den analytiska provningen "deduktiv, startande med frågan: Vilka kvaliteter kan jag urskilja i vinet?" Crossmodal correspondence-forskningen (Spence, Crichton-Fock & Pettersson, 2023) visar att epistemisk kunskap om hur sinnena interagerar är nödvändig för att förstå varför musik, ljus och form påverkar smakupplevelsen.`,
    inPractice: [
      "Tillämpa WSET SAT (Appearance → Nose → Palate → Conclusions) systematiskt och konsekvent",
      "Förklara tanninbindning, palate cleansing och retronasal olfaktion med vetenskaplig precision",
      "Använda Harringtons Food & Beverage Pyramid: grundsmaker → textur → flavours som hierarki",
      "Förstå hur crossmodal correspondence fungerar: ljus, musik, form och smak interagerar",
      "Identifiera biodynamisk, ekologisk och konventionell odlings skillnader i produktionskedjan",
      "Analytiskt bedöma vinets attack, mid-palate och finish som separata mätbara stadier",
    ],
    quote: '"Det som pågår här är en form av sensorisk analys — inte i ett laboratorium utan på golvet, i en faktisk situation, där jag låter varje sinne och dess receptorer i gommen arbeta hårt för att jag skall kunna analysera upplevelsen innan den försvinner." — Herdenstam, Den arbetande gommen (2011)',
  },
  hantverk: {
    title: "Techne — Hantverksmässig kompetens",
    aristotle: "Techne",
    icon: "🍷",
    color: "#8a4010",
    bg: "#fef3e2",
    summary: "Den praktiska färdighetskunskapen — att veta hur man gör, i rörelse, med rätt teknik och i rätt ordning. Techne svarar på frågan: 'Hur utför jag detta korrekt i situationen?'",
    framework: `Aristoteles kallar den praktiska kunskapen Techne — färdighetskunskap, att kunna utföra något. Herdenstam (2023) beskriver det som "hantverket att kunna utföra något, att jämföra med ett slags färdighetskunskap." I Den arbetande gommen liknar han det vid snickaren: "Novisen har verktygen men vet inte hur han skall använda dem." Hult & Scander (2024, Gastronomy & Tourism) tillför en modern dimension: i samtida restauranger organiseras service organiskt — utan tydlig frontstage/backstage-gräns. Sommelierlagets Techne handlar då inte bara om korrekt dekantering, utan om att samarbeta utan ord, improvisera i stunden och skapa flöde i rummet som en 'koreograferad dans'. Double-Grip Analysis (Crichton-Fock & Spence, 2024) tränar sommelierer i att växla mellan analytiskt och analogiskt tänkande under provningen — en central Techne-förmåga. 'Breaking the Silence' (Herdenstam et al., 2020) visar att analogisk träning konkret förbättrar kommunikationsförmågan i komplexa sensoriska situationer.`,
    inPractice: [
      "Behärska serveringstemperatur, glasval och dekanteringsteknik för varje vinsort och ålder",
      "Genomföra provningsproceduren korrekt: placering i gommen, rörelse, timing och memorering",
      "Tillämpa rätt provningsordning: torrt → sött, lätt → fylligt, vitt → rött, ungt → gammalt",
      "Identifiera felaktigheter i service: korksmak, diskmedelsrester, fel temperatur, oxidation",
      "Genomföra kombinationsprovning: mat och vin i rätt proportioner och ordning",
      "Använda analogier och metaforer aktivt för att kommunicera svårartikulerade smakupplevelser",
    ],
    quote: '"Novisen har verktygen — att uppleva med sinnen — men vet inte hur han skall använda dem eller helt enkelt använder dem fel. Att jämföra med snickaren som inte vet vilka verktyg han skall använda eller till vad." — Herdenstam, Den arbetande gommen (2011)',
  },
  estetisk: {
    title: "Phronesis — Estetisk gestaltande kompetens",
    aristotle: "Phronesis",
    icon: "✨",
    color: "#5a2890",
    bg: "#f3eeff",
    summary: "Den praktiska klokheten och förtrogenhetskunskapen — att med situationsförståelse orkestrera en måltidsupplevelse där alla sinnen är närvarande. Phronesis svarar på frågan: 'Vad väcker detta i mig — och hur gestaltar jag det för gästen?'",
    framework: `Phronesis — praktisk klokhet — är det Herdenstam (2023) delvis kallar förtrogenhetskunskap eller tyst kunskap: "kunskap som söker det individuella och situerade snarare än det generella." Det är det gestaltande greppet i det dubbla greppet: medan Episteme mäter det som "är", skapar Phronesis det som "blir." Crichton-Fock & Spence (2024) visar hur den analogiska provningen — "Vad väcker detta vin i mig?" — bygger på autobiografiska luktminnen och skapar gemensamt språk. Scander et al. (2020) tillför den sociokulturella dimensionen: socialt kapital omvandlas till kulturellt kapital via rätt nätverk och mentorer. Hult & Scander (2024, Gastronomy & Tourism) vidgar perspektivet: i samtida restauranger är sommelierens självrepresentation — personlighet, smakpreferenser och estetisk inramning — en del av Phronesis. Sommelieren är en kulturell intermediär som kommunicerar smak via berättelse och autenticitet. Goffmans dramaturgiska teori: gränserna mellan frontstage (formell service) och backstage (det privata) suddas ut — och det är i detta gränsland som organisk service skapar de mest minnesvärda upplevelserna.`,
    inPractice: [
      "Genomföra autobiografisk provning: låta luktminnen och associationer styra beskrivningen",
      "Orkestrera crossmodal correspondence: anpassa musik, ljus, glasform och tempo till vinets karaktär",
      "Kommunicera terroir som levd berättelse — odlarens filosofi, platsens historia, årgångens klimat",
      "Tillämpa expectation priming: menytextens och rummets design skapar smakupplevelsen innan första klunken",
      "Läsa situationen och personalisera: VIP-gästens bakgrund, firande, hemregion och förväntningar",
      "Bygga socialt kapital: delta i sommeliertävlingar, mentorsnätverk och producentbesök för att omvandla socialt till kulturellt kapital (Scander et al., 2020)",
      "Experimentera med oortodoxa kombinationer och kommunicera dem professionellt — agens och kreativitet är kärnan i Phronesis",
      "Inkludera alla gäster med lika omsorg: alkoholfria parningar som bär samma berättelse och gestaltning",
    ],
    quote: '"I naturvetenskapen finns ett inneboende krav på sanning — det som är. I gestaltande aktiviteter är däremot det formella kravet på sanning inte intressant. Det som blir är det väsentliga." — Herdenstam, Den arbetande gommen (2011)',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// RESTAURANTS — 12 lokaler i 4 zoner i Grythyttan
// ─────────────────────────────────────────────────────────────────────────────

const RESTAURANTS = [
  { id:"V1", zone:"V", name:"Järnvägshotellet", segment:"Bykrog",
    address:"Järnvägsgränden 2", emoji:"🚂",
    credits:{ekonomisk:90,social:65,ekologisk:30},
    bonus:"hantverk", bonusDesc:"+10 social på hantverk-svar",
    weakness:"Ekologiska kriser kostar dubbelt", cx:80, cy:138 },
  { id:"V2", zone:"V", name:"Lärkan", segment:"Terroir",
    address:"Skolgatan 3", emoji:"🌾",
    credits:{ekonomisk:55,social:65,ekologisk:75},
    bonus:"vetenskap", bonusDesc:"+10 ekologisk på vetenskap-svar",
    weakness:"Ekonomiska kriser kostar dubbelt", cx:80, cy:456 },
  { id:"V3", zone:"V", name:"Kopparkannan", segment:"Bistro",
    address:"Västra Bergvägen 8", emoji:"🍺",
    credits:{ekonomisk:70,social:80,ekologisk:40},
    bonus:"social", bonusDesc:"+15 social på alla rätta svar",
    weakness:"Kan ej köpa ekologiska investeringar", cx:168, cy:548 },
  { id:"C1", zone:"C", name:"Ekbacken", segment:"Fine dining",
    address:"Prästgatan 1", emoji:"🕯️",
    credits:{ekonomisk:75,social:50,ekologisk:60},
    bonus:"estetisk", bonusDesc:"+15 ekonomisk på estetik-svar",
    weakness:"Social-kris utlöses vid ≤20 (inte 0)", cx:370, cy:218 },
  { id:"C2", zone:"C", name:"Nocturne", segment:"Naturvin",
    address:"Kyrkogatan 8", emoji:"🍷",
    credits:{ekonomisk:40,social:60,ekologisk:85},
    bonus:"ekologisk", bonusDesc:"+20 ekologisk på investeringar",
    weakness:"Ekonomiska kriser kostar dubbelt", cx:298, cy:420 },
  { id:"C3", zone:"C", name:"Gropen", segment:"Gastropub",
    address:"Källaregränd 5", emoji:"🔥",
    credits:{ekonomisk:80,social:75,ekologisk:35},
    bonus:"hantverk", bonusDesc:"+10 ekonomisk på hantverk-svar",
    weakness:"Ekologisk kan ej överstiga 70", cx:440, cy:548 },
  { id:"Ö1", zone:"Ö", name:"Herrgårdsköket", segment:"Fine dining",
    address:"Breviksvägen 2", emoji:"🦌",
    credits:{ekonomisk:70,social:55,ekologisk:60},
    bonus:"estetisk", bonusDesc:"+10 social på estetik-svar",
    weakness:"Vetenskap-fel kostar extra -10", cx:560, cy:230 },
  { id:"Ö2", zone:"Ö", name:"Källan", segment:"Bistro",
    address:"Hyttgatan 5", emoji:"💧",
    credits:{ekonomisk:65,social:70,ekologisk:50},
    bonus:"vetenskap", bonusDesc:"+10 ekonomisk på vetenskap-svar",
    weakness:"Inga bonusar på estetik-frågor", cx:560, cy:456 },
  { id:"Ö3", zone:"Ö", name:"Bergsmannen", segment:"Terroir",
    address:"Bergsmansvägen 3", emoji:"⛏️",
    credits:{ekonomisk:50,social:60,ekologisk:80},
    bonus:"ekologisk", bonusDesc:"+15 ekologisk på alla rätta svar",
    weakness:"Ekonomiska kriser kostar dubbelt", cx:440, cy:338 },
  { id:"S1", zone:"S", name:"Qvarnen", segment:"Campus",
    address:"Carl Jans väg 2", emoji:"🎓",
    credits:{ekonomisk:45,social:75,ekologisk:70},
    bonus:"vetenskap", bonusDesc:"+15 social på vetenskap-svar",
    weakness:"Fine dining-frågor ger halv bonus", cx:80, cy:670 },
  { id:"S2", zone:"S", name:"Viken", segment:"Naturvin",
    address:"Mjölnarvägen 1", emoji:"🌊",
    credits:{ekonomisk:40,social:65,ekologisk:85},
    bonus:"ekologisk", bonusDesc:"+20 ekologisk på investeringar",
    weakness:"Ekonomiska kriser kostar dubbelt", cx:298, cy:800 },
  { id:"S3", zone:"S", name:"Bryggan", segment:"Säsongsmat",
    address:"Kyrkbacken 12", emoji:"⛵",
    credits:{ekonomisk:60,social:80,ekologisk:55},
    bonus:"social", bonusDesc:"+15 social på alla rätta svar",
    weakness:"Ekologisk kan ej överstiga 75", cx:440, cy:670 },
];

const ZONES = {
  V:{ label:"Zon V — Väst",    color:"#1e4a8a", bg:"#dce8f6", light:"#eef4fb" },
  C:{ label:"Zon C — Centrum", color:"#8a5010", bg:"#f4eedf", light:"#faf6ee" },
  Ö:{ label:"Zon Ö — Öst",     color:"#7a2e10", bg:"#f0e4d8", light:"#f8f0ea" },
  S:{ label:"Zon S — Sjö",     color:"#1a6040", bg:"#d8eed8", light:"#edf8ed" },
};

// ─────────────────────────────────────────────────────────────────────────────
// SCENARIO-BASED QUESTIONS
// Grounded in Herdenstam (2011) and ORU MÅ099U course objectives
// Each question paints a concrete professional situation
// ─────────────────────────────────────────────────────────────────────────────

const QUESTIONS = [
  // ── VETENSKAP ─────────────────────────────────────────────────────────────
  {
    id:"v1", domain:"vetenskap", difficulty:1,
    scenario:"Du provar igenom ett ungt Barolo inför en stor viltsupé. Vinet är kraftigt strävt och du undrar om det passar till rätterna.",
    text:"Vad händer kemiskt när ett tanninrikt vin möter proteinet i viltkött?",
    options:[
      "Tanniner löser upp sig och försvinner ur upplevelsen",
      "Tanniner binder till proteiner i köttet — strävheten minskar och vinet upplevs mjukare",
      "Tanniner förstärker köttets umamismak markant",
      "Proteinet blockerar alla smakintryck från vinet"
    ],
    correct:1,
    explanation:"Tanninbindning är kärnan: tanniner reagerar med proteiner och binder till dem. Köttet 'tar hand om' tanninet — strävheten mildras och vinet öppnar sig. Herdenstam beskriver hur denna analys sker under de 12 sekunderna i gommen, i den faktiska situationen.",
    credits:{ekonomisk:20,social:10,ekologisk:5}
  },
  {
    id:"v2", domain:"vetenskap", difficulty:2,
    scenario:"En gäst på Herrgårdsköket beställer en fyllig Alsace Riesling till sin foie gras. Din kollega ifrågasätter valet — 'Riesling och foie gras? Det kan inte fungera.'",
    text:"Vilket vetenskapligt resonemang försvarar kombinationen bäst?",
    options:[
      "Rieslings höga alkohol balanserar fettets tyngd",
      "Rieslings höga syra skär igenom foie gras' fetma och rensar gommen — palate cleansing — medan en eventuell restsötma balanserar leversmaken",
      "Rieslings petrolnyanser kompletterar leveraromen direkt",
      "Foie gras är alltid bättre med rött vin oavsett region"
    ],
    correct:1,
    explanation:"Palate cleansing: hög syra skär igenom fett och återställer gommens känslighet. Restsötma i en demi-sec Riesling balanserar dessutom leversmakens intensitet. Harringtons pyramid: grundsmaknivån (syra vs fett) löses innan man adresserar flavours.",
    credits:{ekonomisk:20,social:15,ekologisk:5}
  },
  {
    id:"v3", domain:"vetenskap", difficulty:2,
    scenario:"Du är på en vinmässa och ska prova igenom 80 viner på en dag. Du börjar med lätta vita och avslutar med kraftiga röda. Halvvägs in märker du att din gom inte längre reagerar lika distinkt.",
    text:"Vad är den primära fysiologiska orsaken till att bedömningsförmågan försämras under en lång provningssession?",
    options:[
      "Du glömmer de första vinerna",
      "Alkohol, tanniner och hög smakintensitet tröttar ut smakreceptorerna — palate fatigue — vilket gör att distinktioner suddas ut",
      "Rumstemperaturen stiger och påverkar vinets flyktiga ämnen negativt",
      "Hunger påverkar hjärnans signalsubstanser"
    ],
    correct:1,
    explanation:"Herdenstam beskriver detta precist ur sin yrkesvardag: alkoholen bedövar, tanninsträvheten sitter kvar, och smakintensiteten från kraftiga viner gör det svårt att ställa om gommen till subtila viner. Lösningen är vatten, neutrala livsmedel och rätt provningsordning.",
    credits:{ekonomisk:15,social:5,ekologisk:5}
  },
  {
    id:"v4", domain:"vetenskap", difficulty:1,
    scenario:"Du utbildar ny personal på Lärkan. En ny medarbetare frågar varför ni alltid börjar provningen med syn, sedan doft, sedan smak — i den ordningen.",
    text:"Varför är WSET SAT-ordningen (Appearance → Nose → Palate → Conclusions) utformad just så?",
    options:[
      "Det är en gammal tradition utan vetenskaplig grund",
      "Ordningen är slumpmässig — alla ordningar ger samma resultat",
      "Strukturen säkerställer att varje sinne bedöms utan att påverkas av det nästa — visuella intryck färgar inte doftbedömningen, doften färgar inte smakbedömningen — objektiv systematik",
      "Synbedömningen är alltid det viktigaste för kvalitetsbedömning"
    ],
    correct:2,
    explanation:"WSET SAT är designad för att minimera bias. Herdenstam lyfter fram att den sensoriska analysen kräver systematik för att fånga det mätbara — men påminner också om att denna analytiska metod måste kompletteras med det gestaltande greppet för att fånga helheten.",
    credits:{ekonomisk:20,social:10,ekologisk:5}
  },
  {
    id:"v5", domain:"vetenskap", difficulty:3,
    scenario:"Nocturne ska bygga en ny vinlista med fokus på hållbarhet. Du ska argumentera inför ägaren varför biodynamisk odling (Demeter) är ett starkare val än vanlig ekologisk certifiering.",
    text:"Vilket argument är vetenskapligt mest välgrundat?",
    options:[
      "Biodynamisk odling producerar alltid bättre vin",
      "Biodynamisk odling (Demeter) behandlar vingården som ett slutet ekosystem med biologisk mångfald, utan syntetiska insatser — ger ekologisk resiliens och trovärdighet utöver det som ekocertifiering kräver",
      "Demeter-certifiering är billigare än ekocertifiering",
      "Biodynamisk odling eliminerar all risk för klimatpåverkan"
    ],
    correct:1,
    explanation:"Demeter kräver att hela gården ses som ett levande system med biologisk mångfald och månkalender-anpassad odling. Det går längre än EU:s ekologiska certifiering som tillåter vissa insatser. För en hållbarhetsprofil ger Demeter starkast argumentation gentemot gäster och revisorer.",
    credits:{ekonomisk:10,social:10,ekologisk:30}
  },
  {
    id:"v6", domain:"vetenskap", difficulty:2,
    scenario:"En gäst på Ekbacken frågar varför ett vin som luktar körsbär på flaskan börjar smaka av smör och rostat bröd när det väl är i munnen.",
    text:"Vad är den vetenskapliga förklaringen till skillnaden mellan retronasal och orthonasal arom?",
    options:[
      "Glasets form förändrar aromerna kemiskt",
      "Orthonasal olfaktion är lukten via näsan utifrån — retronasal olfaktion är aromerna som stiger upp via svalget under tuggning och utgör vad vi kallar 'smak' till upp emot 80%",
      "Muntemperaturen bryter ned körsbärsaromer till smörföreningar",
      "Gästens smakminne är defekt"
    ],
    correct:1,
    explanation:"Herdenstam betonar retronasal olfaktion som central för vinprovarens arbete — 'det som vi kallar smak är till stor del en luktupplevelse bakvägen'. Dryckeskombinering handlar i hög grad om att harmonisera just dessa retronasal aromer mellan mat och vin.",
    credits:{ekonomisk:15,social:15,ekologisk:5}
  },
  {
    id:"v7", domain:"vetenskap", difficulty:3,
    scenario:"Du håller en utbildning för personalen på Järnvägshotellet. Du ska förklara Harringtons Food & Beverage Pyramid och varför man alltid börjar med grundsmaker.",
    text:"Varför är Harringtons hierarki (grundsmaker → textur → flavours) pedagogiskt och praktiskt riktig?",
    options:[
      "Grundsmaker är lättast att förstå för nybörjare, utan annan praktisk relevans",
      "Flavours är de viktigaste och bör alltid adresseras först",
      "Varje nivå måste vara i harmoni innan nästa adresseras: om grundsmaknivån är i konflikt (t.ex. hög syra mot sött) kan ingen mängd smaklig likhet på flavour-nivå rädda kombinationen",
      "Pyramiden gäller bara vita viner"
    ],
    correct:2,
    explanation:"Harringtons pyramid är en processhierarki, inte bara en taxonomi. Om grundsmakbalansen misslyckas — t.ex. ett torrt tanninrikt vin till en söt sås — störs upplevelsen på nivå ett och inga aromer kan rädda kombinationen. Metodisk provning börjar alltid i botten av pyramiden.",
    credits:{ekonomisk:20,social:15,ekologisk:5}
  },

  // ── HANTVERK ──────────────────────────────────────────────────────────────
  {
    id:"h1", domain:"hantverk", difficulty:1,
    scenario:"En stor sällskapsmiddag på Herrgårdsköket. En gäst beställer ett ungt Barolo 2021 till sin viltrygg. Vinet plockas upp ur källaren.",
    text:"Vad gör du omedelbart och varför?",
    options:[
      "Serverar vinet direkt — kalla viner är alltid bäst",
      "Dekantera i 30 minuter och kontrollera att temperaturen är 16–18°C — unga kraftiga röda behöver syre för att öppna sig och rätt temperatur för att visa sin komplexitet",
      "Värmer flaskan under varmt vatten till 22°C",
      "Serverar med is i glaset för att gästen ska välja temperatur själv"
    ],
    correct:1,
    explanation:"Herdenstam beskriver detta som hantverkskunskapens kärna: att veta hur verktyget ska användas. Ung Barolo har höga tanniner och komplex struktur som behöver syre. 16–18°C är optimal serveringstemperatur för fylliga röda — varmare dämpar frukten, kallare döljer komplexiteten och förstärker tanninerna.",
    credits:{ekonomisk:25,social:10,ekologisk:5}
  },
  {
    id:"h2", domain:"hantverk", difficulty:2,
    scenario:"En stamgäst på Bryggan tar med en flaska Chambolle-Musigny 2005 (Premier Cru, 20 år gammal). Han vill att du ska hantera den professionellt.",
    text:"Vad är rätt hantering av en gammal fin Bourgogne?",
    options:[
      "Dekanteras i minst 2 timmar för maximal syresättning",
      "Stå upprätt 24h i rumstemperatur innan service, sedan öppna och servera direkt — gammal fin Bourgogne är känslig och kollapsar vid lång dekantering",
      "Serveras direkt ur källartemperatur (10°C)",
      "Skakas lätt för att väcka sedimentet"
    ],
    correct:1,
    explanation:"Herdenstam beskriver hur erfarenhetsbaserat omdöme — förtrogenhetskunskapen — avgör dessa beslut. Gammal fin Bourgogne har en delikat struktur som riskerar att kollapsa vid för lång exponering mot syre. Sediment avskiljs med lätt dekantering men exponering minimeras. Rätt temperatur: 14–16°C.",
    credits:{ekonomisk:20,social:15,ekologisk:5}
  },
  {
    id:"h3", domain:"hantverk", difficulty:1,
    scenario:"Halvvägs genom en stor bröllopsbankett på Ekbacken börjar champagnegästerna klaga på att mousset är platt och aromen svag. Du byter ut glas och häller upp nytt vin.",
    text:"Vad var troligen den primära orsaken och hur förebygger du det framöver?",
    options:[
      "Champagnen har stått för länge och förlorat kolsyra naturligt",
      "Diskmedelsrester i glasen dödar mousse och dämpar aromen — förebygg med vinrinsning (häll lite vin i glaset, snurra och häll ut) och kontrollera alltid glashygien innan service",
      "Temperaturen i matsalen var för hög",
      "Champagnen var av för låg kvalitet"
    ],
    correct:1,
    explanation:"Diskmedelsrester är den vanligaste orsaken till platt champagne. Herdenstam betonar att hantverkskunnandet handlar om att veta hur verktygen fungerar och vilka felkällor som finns. Vinrinsning är en enkel professionell rutin som eliminerar problemet.",
    credits:{ekonomisk:15,social:25,ekologisk:5}
  },
  {
    id:"h4", domain:"hantverk", difficulty:2,
    scenario:"Du bygger en avsmakningsmeny med sju rätter på Qvarnen och ska presentera sju viner. En kollega föreslår att starta med en kraftig Amarone för att 'imponera direkt'.",
    text:"Varför är det fel att starta med ett kraftigt vin och vad är korrekt ordning?",
    options:[
      "Det är inte fel — börja alltid med det dyraste",
      "Kraftiga viner tröttar ut gommen tidigt — korrekt ordning är Mousserande → Lätta vita → Fylliga vita → Lätta röda → Fylliga röda → Dessertviner, torrt → sött, lätt → fylligt",
      "Ordningen spelar ingen roll om vinerna är av hög kvalitet",
      "Starta alltid med rött för att imponera"
    ],
    correct:1,
    explanation:"Herdenstam beskriver ur egen mässerfarenhet hur gommen tröttnar och hur en fel ordning gör att subtila viner upplevs platta efter kraftiga. Progressionsprincipen är ett av hantverkets grundläggande verktyg — Mousserande öppnar gommen, dessertviner avslutar utan att söta igen den.",
    credits:{ekonomisk:20,social:20,ekologisk:5}
  },
  {
    id:"h5", domain:"hantverk", difficulty:2,
    scenario:"En av Nocturnes bäst säljande viner är ett naturvin som klarnas med äggvita. En ny stamgäst berättar diskret att hennes son är allergisk mot ägg.",
    text:"Vad gör du och vad borde du redan ha gjort?",
    options:[
      "Servera vinet — en liten mängd äggvita är inga problem",
      "Informera gästen om att vinet innehåller äggvita och erbjud ett alternativ utan djurbaserade klarningsmedel — proaktiv kommunikation är sommelierlagets ansvar, inte producentens",
      "Säg att alla naturviner är veganska och servera",
      "Ta bort vinet från menyn tills vidare"
    ],
    correct:1,
    explanation:"Social hållbarhet kräver inkludering och proaktiv kommunikation. Herdenstam betonar att sommelierens yrkeskunnande inbegriper att känna sina produkter in i minsta detalj. Att kommunicera allergener är både lagkrav och professionell etik — och skapar förtroende hos gästerna.",
    credits:{ekonomisk:10,social:30,ekologisk:10}
  },
  {
    id:"h6", domain:"hantverk", difficulty:2,
    scenario:"Lärkan vill minska sin vinlistas klimatavtryck med 40% inom ett år utan att kompromissa med kvaliteten. Du presenterar en plan för ägaren.",
    text:"Vilket konkret åtgärdspaket ger störst ekologisk effekt?",
    options:[
      "Byta alla korkar till skruv och servera vin kallare",
      "Prioritera lokala och nordiska producenter + introducera bag-in-box för husviner (70% lägre CO₂ per liter vs glasflaska) + dokumentera hela listans klimatavtryck",
      "Ta bort alla importerade viner och servera bara svensk cider",
      "Minska portionsstorlekarna med 20%"
    ],
    correct:1,
    explanation:"Transport och förpackning dominerar vinets klimatavtryck. Lokala producenter eliminerar långa transportkedjor. Bag-in-box ger dramatiskt lägre förpackningsavtryck per liter. Dokumentation möjliggör dessutom gästkommunikation om klimatval — en social och ekologisk vinst i ett.",
    credits:{ekonomisk:5,social:10,ekologisk:40}
  },

  // ── ESTETISK GESTALTNING ──────────────────────────────────────────────────
  {
    id:"e1", domain:"estetisk", difficulty:2,
    scenario:"Ekbacken ska ta emot en känd matskribent för en utvärdering. Du funderar på hur du kan skapa en minnesvärdig upplevelse utan att byta ut en enda rätt på menyn.",
    text:"Vilket tillvägagångssätt är mest i linje med Herdenstams dubbla grepp och Crichton-Focks atmospheric influence?",
    options:[
      "Sänk priset den kvällen för att imponera",
      "Anpassa rummets belysning, musikval och serveringstempo till vinernas karaktär — och berätta aktivt om varje vins ursprung, odlarens filosofi och årgångens karaktär",
      "Byt till dyrare viner för recensentens skull",
      "Låt recensenten välja allt själv utan guidning"
    ],
    correct:1,
    explanation:"Herdenstam: 'Det som sker, handlandets kunskap, är det viktiga.' Crichton-Fock visar att rummets alla sinnesintryck samverkar och skapar en stämningsbas. Crossmodal correspondence (Spence) bekräftar att ljus och musik konkret förändrar smakupplevelsen. Gestaltningen handlar om att orkestrera hela miljön.",
    credits:{ekonomisk:15,social:30,ekologisk:5}
  },
  {
    id:"e2", domain:"estetisk", difficulty:3,
    scenario:"En stammis på Bryggan beställer alltid 'det bästa rödvinet'. Idag avslöjar han att han fyller 60 år. Du har tre alternativ: Barolo 2015, Châteauneuf-du-Pape 2018, och Pinot Noir från Bourgogne 2010.",
    text:"Vad är det estetiskt gestaltande beslutet — och hur fattar du det?",
    options:[
      "Välj det dyraste automatiskt — det är alltid säkrast",
      "Fråga diskret om gästen har en koppling till en region, ett minne eller ett livsögonblick — och välj sedan det vin vars historia bäst resonerar med hans berättelse",
      "Servera det vin som du personligen föredrar",
      "Låt gästen välja bland de tre utan guidning"
    ],
    correct:1,
    explanation:"Herdenstam visar att estetisk gestaltning börjar med lyssning och situationsläsning. Expectation priming: när gästen förstår berättelsen bakom vinet aktiveras fler kognitiva lager och upplevelsen djupnar. Personalisering överstiger alltid prisets signalvärde.",
    credits:{ekonomisk:20,social:35,ekologisk:5}
  },
  {
    id:"e3", domain:"estetisk", difficulty:2,
    scenario:"Du ska skriva menytexterna för en ny avsmakningsmeny på Herrgårdsköket. Din kollega föreslår korta neutrala beskrivningar: 'Riesling, Mosel, 2019'.",
    text:"Varför är Herdenstams kunskap om expectation priming relevant här — och hur skriver du bättre menytexten?",
    options:[
      "Neutrala beskrivningar är alltid bäst — gästerna vill inte bli påverkade",
      "Menytexten privar gästens upplevelse innan första klunken — en text som väcker en bild, ett minne eller en känsla förändrar bokstavligen hur gästen smakar vinet. Skriv: 'Riesling från Mosel — bergig mineralitet, citrusblomstersyrlig friskhet, en doft av skiffersten efter regn'",
      "Längre texter är alltid sämre — håll det kort",
      "Menytexten påverkar inte smakupplevelsen"
    ],
    correct:1,
    explanation:"Expectation priming är vetenskapligt belagd: studier visar att en välskriven menytext aktiverar förväntningar som konkret förändrar hur gästen upplever smaken. Herdenstam: 'I naturvetenskapen mäter vi det som är. I gestaltningen skapar vi det som blir.' Menytexten är ett gestaltande verktyg.",
    credits:{ekonomisk:10,social:25,ekologisk:5}
  },
  {
    id:"e4", domain:"estetisk", difficulty:3,
    scenario:"Du håller en terroir-middag på Viken med fokus på Loire Valley. En av gästerna, en professor i kulturgeografi, frågar hur du kan förmedla känslan av floden och kalkstenen utan att gästen befinner sig där.",
    text:"Vilket svar bäst illustrerar Herdenstams gestaltande grepp?",
    options:[
      "Det är omöjligt — terroir kan bara upplevas på plats",
      "Berätta odlarens historia, lägg fram en bit kalksten på bordet, visa en bild av flodlandskapet, och låt doften av mineralitet i vinet bära berättelsen — analogier och sinnesintryck skapar gemensam förståelse utan att gästen behöver vara på plats",
      "Servera bara viner med starka egenskaper och hoppas att gästen förstår",
      "Förklara terroir med kemiska termer"
    ],
    correct:1,
    explanation:"Herdenstam: 'Kopplingen till verkligheten blir viktig, och insikten att det inte finns en verklighet utan flera ännu viktigare.' Analogier, sinnesintryck och berättelser skapar intransitiv förståelse — gästen smakar med hela sin kulturella förståelse. Det är estetisk gestaltning i praktiken.",
    credits:{ekonomisk:15,social:30,ekologisk:10}
  },
  {
    id:"e5", domain:"estetisk", difficulty:2,
    scenario:"Nocturne ska lansera en alkoholfri parningsmeny. En kollega är skeptisk: 'Ingen riktig sommelier ägnar tid åt alkoholfritt — det är inte prestige nog.'",
    text:"Hur bemöter du argumentet ur ett hållbarhets- och gestaltningsperspektiv?",
    options:[
      "Kollegan har rätt — prioritera vinmenyn",
      "Alkoholfria alternativ med samma omsorg, berättelse och presentation som vinmenyn är ett uttryck för social hållbarhet och inkludering — och ett växande affärssegment. En sommelier som inte behärskar alkoholfri parning behärskar inte hela sitt hantverk",
      "Erbjud bara alkoholfritt om gästen frågar specifikt",
      "Alkoholfritt är alltid underlägset och bör minimeras"
    ],
    correct:1,
    explanation:"Social hållbarhet innebär att alla gäster är välkomna oavsett val. Herdenstam visar att gestaltningskunskapen handlar om att skapa en upplevelse för gästen — inte om den egna prestigen. En alkoholfri parningsmeny med samma berättelse och presentation är fullt värdig sommelierens hantverk.",
    credits:{ekonomisk:15,social:40,ekologisk:10}
  },
  {
    id:"e6", domain:"estetisk", difficulty:3,
    scenario:"Under en avsmakningsmeny på Ekbacken spelar du musik som du valt ut. En gäst kommenterar att det tredje vinet, en kraftig Syrah, verkar 'sötare och rundare' nu än vid förprovsningen i kväll — du spelade då tyngre jazzmusik, nu spelar du lättare stråkkvartett.",
    text:"Vilket fenomen förklarar gästens upplevelse och vad lär det oss om sommelierens roll?",
    options:[
      "Gästen har fel — vinet förändras inte av musik",
      "Crossmodal correspondence (Spence): hög, ljus musik framhäver upplevd sötma och elegans; tyngre musik framhäver bitterhet och strävhet. Sommelieren som orkesterar miljön är en del av smakupplevelsen",
      "Temperaturen i lokalen har förändrat vinets egenskaper",
      "Gästen har druckit för mycket och bedömer felaktigt"
    ],
    correct:1,
    explanation:"Spences forskning (Oxford) är vetenskapligt belagd: ljud, ljus och miljö förändrar bokstavligen smakperceptionen. Herdenstam och Crichton-Fock: alla sinnesintryck i matsalen samverkar. Sommelieren som medvetet orkesterar miljön utövar estetisk gestaltningskunskap på sin högsta nivå.",
    credits:{ekonomisk:10,social:25,ekologisk:10}
  },

  // ── EXTRA SCENARIOS ───────────────────────────────────────────────────────
  {
    id:"h7", domain:"hantverk", difficulty:1,
    scenario:"Du provar ett vin vid ett mässbesök. Redan efter tre sekunder känner du att något är fundamentalt fel — vinet har en skarp, unken doft.",
    text:"Vad är mest troligt fel och vad gör du?",
    options:[
      "Vinet är för ungt och behöver mer tid på flaska",
      "Vinet är troligen korksmakat (TCA — trikloranisol) — tacka nej artigt och be om en ny flaska eller ett annat vin. Korksmak förstör alla aromkvaliteter",
      "Doften är en typisk karaktär för det aktuella druvsorten",
      "Rumstemperaturen har skämt vinet temporärt"
    ],
    correct:1,
    explanation:"Herdenstam beskriver att erfarna sommelierer kan göra omdömet på sekunder — 'redan innan det får en gestalt'. TCA-korksmak är den vanligaste felaktigheten och känns igen som en fuktig, mustig, unken ton. Att snabbt identifiera och hantera detta är kärnhantverk.",
    credits:{ekonomisk:20,social:15,ekologisk:5}
  },
  {
    id:"v8", domain:"vetenskap", difficulty:2,
    scenario:"En gäst på Qvarnen undrar varför hennes favorit-Sauvignon Blanc smakar 'plattare' när hon dricker det till sin gräddsås jämfört med oysters.",
    text:"Vad är den vetenskapliga förklaringen?",
    options:[
      "Sauvignon Blanc passar aldrig till gräddsåser",
      "Gräddsåsens höga fetthalt och sötma dämpar Sauvignon Blancs syra och aromer — syrliga viner upplevs tunnare mot fett eftersom fettet 'tar' syran. Oysters förstärker istället vinets mineralitet och fräschör",
      "Gästen har fel — vinet smakar likadant oavsett mat",
      "Grädden koagulerar vinets proteiner kemiskt"
    ],
    correct:1,
    explanation:"Grundsmakinteraktion: syra mot fett ger ett komplext samspel där fettet dämpar syrans skärpa — men om fetthalten är för hög upplevs vinet tunnare. Oysters' mineralitet och sälta kompletterar och förstärker istället vinets egna egenskaper. Harringtons pyramid, grundsmaknivå.",
    credits:{ekonomisk:15,social:10,ekologisk:5}
  },
  {
    id:"e7", domain:"estetisk", difficulty:2,
    scenario:"En solo-gäst sitter tyst vid Vikens fönsterbord med utsikt mot sjön. Hon ser ledsen ut och beställer 'ett glas vitt vin — valfritt'. Du märker hennes humör.",
    text:"Vad gör du — och hur använder du sommelierens gestaltande kompetens i denna situation?",
    options:[
      "Häller upp närmaste öppna flaska och lämnar henne i fred",
      "Väljer ett vin med en berättelse som matchar stunden — kanske ett mineraliskt naturvin från en liten producent vid havet — och presenterar det kort med ett enkelt berättande: 'Det här är från en familj som odlat vid Atlantkusten i tre generationer. Något lugnt och rent.' Läser av om hon vill ha mer kontakt",
      "Frågar ingående om hennes kvälls- och livssituation",
      "Erbjuder det dyraste vinet för att kompensera"
    ],
    correct:1,
    explanation:"Herdenstam visar att sommelier-hantverket inbegriper situationsläsning och social förmåga. Det gestaltande greppet handlar om att skapa en upplevelse som möter gästen där hon är. En kort berättelse med rätt ton är ett estetiskt val — inte bara en produktpresentation.",
    credits:{ekonomisk:10,social:40,ekologisk:5}
  },
  // ── BASERADE PÅ PUBLICERADE ARTIKLAR ─────────────────────────────────────
  {
    id:"dg1", domain:"estetisk", difficulty:3,
    scenario:"Du leder en Double-Grip Analysis-session med ditt sommelierlag inför en avsmakningsmeny på Ekbacken. Du delar ut papper och ber alla prova ett Bourgogne tyst — utan WSET-protokollet. Första frågan du ställer är inte 'Vad hittar ni i glaset?'",
    text:"Vilken är den korrekta inledningsfrågan i den analogiska provningen enligt Double-Grip Analysis? (Crichton-Fock & Spence, 2024)",
    options:[
      "'Identifiera syrans intensitet på en skala 1–9'",
      "'Vad väcks i er när era sinnen möter vinet?' — autobiografiskt flöde, utan analytiskt filter",
      "'Vilken druvsort är detta troligen?'",
      "'Beskriv doftprofilen med WSET-terminologi'"
    ],
    correct:1,
    explanation:"Double-Grip Analysis har två parallella provningar: analytisk (deduktiv — vad hittar jag i glaset?) och analogisk (induktiv — vad väcks i mig?). Den analogiska startar med autobiografisk provning där personliga luktminnen och associationer flödar fritt utan a priori-mallar. Grupper i studien nådde 8 gemensamma attribut i båda kategorierna och skapade analogviner som fick högre betyg än kommersiella motsvarigheter.",
    credits:{ekonomisk:10,social:20,ekologisk:10}
  },
  {
    id:"dg2", domain:"estetisk", difficulty:3,
    scenario:"Under ett dialogseminarium (Herdenstam et al., 2018) delar en sommelier sin autobiografiska provning: 'Det är sommar, högt gräs, min mormors trädgård, jordgubbskakan har stått för länge i solen...' En kollega avbryter: 'Det där är inte en vinbeskrivning — det är en saga.'",
    text:"Varför är kollegans invändning fel ur ett Phronesis-perspektiv?",
    options:[
      "Kollegan har rätt — vinbeskrivningar ska vara objektiva och analytiska",
      "Analogier och autobiografiska minnen är kunskapsbärare med lägre mätbarhet men hög förståelsekraft — de fångar helhetskaraktären som isolerade analytiska attribut inte kan",
      "Beskrivningen är användbar bara om sommelier och gäst delar exakt kulturell bakgrund",
      "Autobiografiska beskrivningar är bara pedagogiska övningar, inte professionella verktyg"
    ],
    correct:1,
    explanation:"Herdenstam (2011, 2018, 2020): analogier och autobiografiska berättelser är legitima kunskapsbärare — de har 'lägre mätbarhet men hög förståelsekraft' och fångar vinets gestalt. 'Breaking the Silence' (2020) bevisar att analogisk träning faktiskt ökar konsistensen i bedömningar och utökar det gemensamma vokabuläret från 3 till 8 kategorier.",
    credits:{ekonomisk:10,social:25,ekologisk:5}
  },
  {
    id:"cc1", domain:"estetisk", difficulty:2,
    scenario:"Crichton-Fock, Spence & Pettersson (2023, Frontiers in Psychology) genomförde en studie med 329 vinkonsumenter om crossmodal kommunikation. Laget på Nocturne diskuterar hur ni kan använda resultaten i er gästkommunikation.",
    text:"Vilket fynd är viktigast från studien för en sommelier som vill kommunicera sitt sortiment mer effektivt?",
    options:[
      "Konsumenterna föredrar uteslutande analytisk terminologi — druvsorter och syranivåer",
      "Visuell kommunikation via former och färger rankades högst (54%) och 91% var positiva till vin baserat enbart på sensorisk information — konsumenter är mer öppna för crossmodal kommunikation än branschen antar",
      "Auditiv kommunikation (musik, ljud) var den mest populära alternativa kommunikationsformen",
      "Konsumenterna vill inte ha alternativ kommunikation — pris och ursprung räcker"
    ],
    correct:1,
    explanation:"Crichton-Fock et al. (2023): 91% var positiva till att köpa vin baserat enbart på sensorisk information. Former och färger (54%), smak (45%) och doft (38%) dominerade. En sommelier som använder crossmodal kommunikation — former, analogier, berättande — bättre möter konsumenternas faktiska preferenser och kan reducera matsvinn av viner med okonventionell profil.",
    credits:{ekonomisk:15,social:20,ekologisk:10}
  },
  {
    id:"bs1", domain:"vetenskap", difficulty:2,
    scenario:"I 'Breaking the Silence' (Herdenstam et al., 2020) genomfördes dialogseminarier med klassisk litteratur — Proust, Faulkner, Woolf, Joyce — för att stimulera analogiskt tänkande hos sommelierer. Din kollega frågar varför man använder skönlitteratur i vinprovningsutbildning.",
    text:"Vad var det vetenskapliga skälet till att använda modernistiska litteraturutdrag i träningen?",
    options:[
      "Litteraturen lärde sommeliererna ny vinvokabulär direkt",
      "Modernistiska texter stimulerar analogiskt och associativt tänkande — de inspirerar till att fånga helheten och progressionen av en upplevelse snarare än att analysera delar, vilket är exakt vad Phronesis-kompetensen kräver vid provning",
      "Litteraturen distraherade sommeliererna från teknisk terminologi vilket var oönskat",
      "Det var en slumpmässig metod utan specifikt pedagogiskt syfte"
    ],
    correct:1,
    explanation:"Herdenstam et al. (2020): Proust, Faulkner, Woolf och Joyce valdes för sin avant-garde-experimentalism och förmåga att fånga sensorisk progression, gestalt och dynamik. Resultaten: deltagarna gick från analytiska listbeskrivningar till narrativa helhetsbeskrivningar med starkare personliga ankare, och konsistensen i bedömningarna ökade trots att antalet attribut nästan fördubblade.",
    credits:{ekonomisk:15,social:10,ekologisk:5}
  },

  // ── BASERADE PÅ HULT & SCANDER (2024) — HIPSTER HOSPITALITY ─────────────
  {
    id:"hs1", domain:"estetisk", difficulty:2,
    scenario:"Nocturne har en öppen kökslösning — inga dörrar, delad toalett med gäster, vinflaskor synliga längs hela baren. Gästerna ser sommelierlaget skölja glas, smaka av och ibland ta en klunk vatten. En kollega är obekväm: 'Vi borde ha en tydligare backstage-zon.'",
    text:"Vilket perspektiv stöder Hult & Scander (2024) om upplösningen av frontstage och backstage?",
    options:[
      "Kollegan har rätt — gäster ska aldrig se service-backstage",
      "Upplöst gräns mellan frontstage och backstage skapar organisk, transparent service som bygger förtroende och fellowship med gästerna — förutsatt att laget behärskar situationsläsning och kan visa sig 'som sig själva' professionellt",
      "Transparens fungerar bara i informella restauranger, aldrig i fine dining",
      "Gäster som ser backstage-aktiviteter tappar alltid förtroendet för servicen"
    ],
    correct:1,
    explanation:"Hult & Scander (2024): i samtida restauranger skapar upplöst frontstage/backstage ett 'fellowship' och transparens som stärker gästupplevelsen. Goffman: nya scener skapas ständigt. Organisk service kräver att laget behärskar självrepresentation — att vara sig själv är en professionell kompetens, inte en brist på formalism.",
    credits:{ekonomisk:10,social:30,ekologisk:5}
  },
  {
    id:"hs2", domain:"estetisk", difficulty:2,
    scenario:"På Bergsmannen diskuterar laget hur man ska sälja ett naturvin från en udda producent i Jura. Vinet är tekniskt sett lite instabilt men har en fantastisk historia: producenten lämnade ett etablerat vingård efter en konflikt och startade eget. Joe på studien berättar historien för gästen — inte om druvsorten.",
    text:"Vilket koncept från Hult & Scander (2024) bäst förklarar varför producentens personliga historia kan vara mer säljande än vinets sensoriska profil?",
    options:[
      "Gäster väljer alltid på pris och ursprung, aldrig på berättelse",
      "Sommelieren fungerar som kulturell intermediär — vinmakarens personlighet och historia kommunicerar smak symboliskt. Gästen köper berättelsen och identiteten, inte bara drycken i glaset",
      "Tekniska defekter i vinet kan aldrig kompenseras med storytelling",
      "Berättelsen är irrelevant — gäster vill ha objektiva smakbeskrivningar"
    ],
    correct:1,
    explanation:"Hult & Scander (2024): i studien säljs ett vin med 'instabila' egenskaper via producentens personliga historia — gästerna utbrister 'Vilken härlig berättelse, vi tar det!' Smaken kommuniceras symboliskt, inte analytiskt. Sommelieren är en cultural intermediary vars förmåga att gestalta personlighet och autenticitet är lika viktig som WSET-kunskapen.",
    credits:{ekonomisk:15,social:25,ekologisk:10}
  },
  {
    id:"hs3", domain:"hantverk", difficulty:1,
    scenario:"Under en fullbokad lördagskväll på Bryggan arbetar Sara och Maja i matsalen utan att kommunicera verbalt. Sara lägger bestick när Maja plockar tallrikar; Maja häller vin när Sara satt ut nya glas. Deras koordination är sömlös.",
    text:"Vad är den Techne-kompetens som möjliggör detta samarbete utan ord? (Hult & Scander, 2024)",
    options:[
      "De har memorerat ett formellt serviceskript",
      "Förtrogenhetskunskap — djup förståelse för varandras arbetsstilar och situationsläsning gör att de kan improvisera som 'en koreograferad dans' utan verbal kommunikation",
      "De är personliga vänner och det är det enda som spelar roll",
      "Deras arbete är rutiniserat och kräver ingen aktiv kompetens"
    ],
    correct:1,
    explanation:"Hult & Scander (2024) beskriver detta som organisk service: 'Utan att ha kommunicerat med varandra följer en den andras arbete.' Detta är Techne i sin mest raffinerade form — förtrogenhetskunskap om kollegans rytm och situationsläsning som möjliggör tyst koordination. Herdenstam (2011) kallar liknande fenomen 'den arbetande gommens tysta vetenskap.'",
    credits:{ekonomisk:15,social:20,ekologisk:5}
  },
  {
    id:"hs4", domain:"estetisk", difficulty:3,
    scenario:"Ekbacken ska rekrytera en ny matsommeliermästare. Kandidat A är tekniskt perfekt — korrekt, formell, felfri WSET-kunskap. Kandidat B har lite mer varierande teknisk stil men en stark personlighet, djupa smakpreferenser för naturvin och förmåga att berätta om producenter på ett levande sätt. Gästerna minns Kandidat B:s bord länge.",
    text:"Vilket synsätt stöder Hult & Scander (2024) om vad samtida gästrumsprofessionalism kräver?",
    options:[
      "Kandidat A är alltid bäst — teknik övervinner allt",
      "Samtida restaurangkultur kräver en kulturell intermediär vars självrepresentation, smakpreferenser och personlighet är en del av servicekompetensen — Kandidat B:s förmåga att inkarnera autenticitet och skapa minnesvärda upplevelser är lika värdefullt som formell teknik",
      "Personlighet och teknik är alltid likvärdiga — välj på lön",
      "Kandidat B:s stil fungerar bara på hipsterrestauranger, aldrig på fine dining"
    ],
    correct:1,
    explanation:"Hult & Scander (2024): 'Det är inte bara servitören som behöver verka genuin; det är hela restaurangens personlighet.' Samtida gästrumsprofessionalism handlar om att vara sig själv autentiskt, inte att spela en roll. Sommelierens identitet och smakpreferenser är en resurs, inte ett problem — förutsatt att det kombineras med grundläggande Techne-kompetens.",
    credits:{ekonomisk:10,social:30,ekologisk:5}
  },
  {
    id:"hs5", domain:"estetisk", difficulty:2,
    scenario:"Qvarnen genomgår en renovering. Laget diskuterar den nya interiören: ska man gå för polerade ytor och vit-svart estetik, eller naturmaterial, synliga förvaringsytor och enkelt hantverk? Ägaren frågar vad som passar restaurangens identitet och gästprofil.",
    text:"Hur relaterar estetisk inramning (aesthetical framing) till sommelierlagets kompetensuttryck? (Hult & Scander, 2024)",
    options:[
      "Inredning är orelaterat till sommelierens yrkeskompetens",
      "Restaurangens estetiska inramning — material, belysning, vinflaskornas exponering, matpresentation — är en förlängning av lagets smakidentitet och kommunicerar direkt vad gästerna kan förvänta sig av upplevelsen",
      "Estetik handlar bara om att ta bra Instagram-bilder",
      "Polerade ytor signalerar alltid högre kompetens än naturmaterial"
    ],
    correct:1,
    explanation:"Hult & Scander (2024): 'Aesthetical framing' är en av tre kärnkategorier i samtida restaurangprestationer. Inredning, produktexponering och matpresentation kommunicerar smakidentitet och sätter förväntningarna. En vinlista som speglar autenticitet och hantverksproduktion, exponerad på rätt sätt i rummet, är en del av sommelierens Phronesis-kompetens.",
    credits:{ekonomisk:10,social:25,ekologisk:10}
  },
  {
    id:"sc1", domain:"estetisk", difficulty:2,
    scenario:"En ung sommelier på Bryggan har just fått en inbjudan att delta som medhjälpare under en vinmakarmiddag arrangerad av en berömd Bourgogne-producent i Göteborg. Kollegan frågar: 'Är det verkligen värt att åka dit — du lär dig mer av att läsa böcker?'",
    text:"Varför är deltagandet i sådana nätverk avgörande för sommelierens kompetensutveckling? (Scander et al., 2020)",
    options:[
      "Böcker räcker — praktisk erfarenhet tillför inget teoretiken inte täcker",
      "Socialt kapital omvandlas till kulturellt kapital: rätt nätverk ger tillgång till legitim smak och erfarenhet som inte kan läras ur böcker — att smaka rätt viner i rätt sällskap inbäddas i kroppen som förtrogenhetskunskap",
      "Det handlar bara om prestige — nätverket ger inga faktiska kunskaper",
      "Vinmakarmiddagar är bara för gäster, inte för sommelierer i utbildning"
    ],
    correct:1,
    explanation:"Scander et al. (2020): socialt kapital (att känna rätt personer) konverteras till kulturellt kapital (att veta vad som är gott). Studien visar att sommelierens kompetens i hög grad formas av vem man umgås med, vilka erfarenheter man får tillgång till och hur dessa inbäddas som förtrogenhetskunskap — inte enbart av formell utbildning.",
    credits:{ekonomisk:10,social:35,ekologisk:5}
  },
  {
    id:"sc2", domain:"estetisk", difficulty:2,
    scenario:"Under ett temakvällen på Nocturne serverar ditt lag enkel mat: potatischips, enkla smörgåsar och ett fåtal tillbehör. Priset per kuvert är ändå 800 kr. En gäst höjer ett ögonbryn. Du förklarar valet.",
    text:"Vilket resonemang speglar bäst Scander et al.:s fynd om dryckens roll som kulturbärare?",
    options:[
      "Enkel mat är ett misstag — priset motiveras aldrig av enkel mat oavsett dryck",
      "Vinet ger maten legitimitet: ett enastående vin kan adla det mest anspråkslösa mål. Sommelierens kompetens ligger i att visa hur rätt dryck höjer hela upplevelsens kulturella och sensoriska värde",
      "Gästen har rätt — enkel mat och högt pris är alltid felaktigt",
      "Det viktiga är att maten är dyr, inte vinet"
    ],
    correct:1,
    explanation:"Scander et al. (2020): sommeliererna i studien betonade att 'ett bra vin är förenligt med enkel mat — men inte tvärtom.' Drycken fungerar som kulturbärare och ger legitimitet åt kombinationen. Att kombinera potatischips med champagne är ett uttryck för sommelierens kulturella kapital, inte ett tecken på bristande kompetens.",
    credits:{ekonomisk:15,social:30,ekologisk:5}
  },
  {
    id:"sc3", domain:"vetenskap", difficulty:1,
    scenario:"En ny medarbetare på Järnvägshotellet frågar hur lång tid det tar att bli en kompetent sommelier. Din seniorkollega svarar: 'Det beror på vad du menar med kompetens.'",
    text:"Vilket tvåstegsperspektiv på kompetensutveckling beskriver Scander et al. (2020)?",
    options:[
      "Steg 1: ta WSET-examen. Steg 2: börja arbeta",
      "Steg 1: tillägna sig grundläggande kunskaper om grundsmaker, textur och kombinationsregler — relativt snabbt. Steg 2: utveckla fördjupad förtrogenhetskunskap genom långsiktig praktisk erfarenhet och rätt sociala nätverk — tar år",
      "Steg 1: läsa om alla vinregioner. Steg 2: memorera parningskombinationer",
      "Det finns bara ett steg — antingen kan man kombinera mat och dryck eller inte"
    ],
    correct:1,
    explanation:"Scander et al. (2020): grundkunskaperna (grundsmaker, syra, vikt) är relativt lätta att förstå men har lägre kulturellt värde. Det är det andra steget — den djupa förtrogenhetskunskapen förvärvad genom år av praktik och rätt sällskap — som utgör sommelierens egentliga kulturella kapital och yrkesidentitet.",
    credits:{ekonomisk:20,social:15,ekologisk:5}
  },
  {
    id:"sc4", domain:"estetisk", difficulty:3,
    scenario:"Bergsmannen lanserar en ny matsedel med utpräglade 'lowbrow'-rätter: varmkorv med tillbehör, potatissallad, och klassisk falukorv. Priset är högt. Ditt lag diskuterar om konceptet är rimligt ur ett professionellt sommelierperspektiv.",
    text:"Hur motiverar ni konceptet med stöd av Scander et al.:s forskning?",
    options:[
      "Konceptet är omöjligt att motivera — priset är alltid knutet till råvarornas kvalitet",
      "Sommelierens kulturella kapital gör att 'lowbrow'-mat kan ges legitimitet genom rätt dryckeskombination. Konceptet kräver att lagets kompetensnivå är hög nog att välja och kommunicera viner som höjer och transformerar rätternas kulturella status",
      "Konceptet fungerar bara om man inte berättar om råvarorna för gästerna",
      "Enkla råvaror motiverar alltid lägre pris — det finns inga undantag"
    ],
    correct:1,
    explanation:"Scander et al. (2020): studien visar att 'lowbrow'-mat — inklusive potatischips och enkel korv — legitimeras i kombination med rätt dryck. Det är sommelierens förmåga att kommunicera denna transformation som utgör det kulturella kapitalets kärna. Konceptet kräver hög kompetens, inte hög råvarukostnad.",
    credits:{ekonomisk:20,social:25,ekologisk:5}
  },
  {
    id:"sc5", domain:"hantverk", difficulty:2,
    scenario:"Lärkan ska rekrytera en ny sommelier. Två kandidater söker: Kandidat A har WSET Level 3 och tre år på skolrestaurang. Kandidat B saknar formell utbildning men har arbetat fem år på välkända restauranger, deltagit i sommeliertävlingar och har ett brett professionellt nätverk.",
    text:"Vilket resonemang om kompetensvärdering är mest i linje med Scander et al.:s forskning?",
    options:[
      "Kandidat A är alltid bättre — formell utbildning är det enda som räknas",
      "Kandidat B:s informellt förvärvade sociala och kulturella kapital — praktisk erfarenhet, rätt nätverk, tävlingsexponering — kan vara lika eller mer värdefullt än formella meriter, beroende på restaurangens behov",
      "Kandidaterna är identiska — erfarenhet och utbildning väger alltid lika",
      "Kandidat B är alltid bättre — praktisk erfarenhet övertrumfar alltid utbildning"
    ],
    correct:1,
    explanation:"Scander et al. (2020) visar att sommelierens kompetens förvärvas genom en kombination av formell kunskap och socialt kapital. Tävlingsdeltagande, mentorskap av framstående sommelierer och professionella nätverk bygger en förtrogenhetskunskap som är svår att ersätta med enbart skolstudier — men inte heller tillräcklig utan grundläggande analytisk kompetens.",
    credits:{ekonomisk:15,social:20,ekologisk:5}
  },
  {
    id:"sc6", domain:"estetisk", difficulty:3,
    scenario:"Under ett sommelierlag-möte på Ekbacken diskuterar ni hur ni ska presentera en ovanlig kombination för kvällens gäster: en kraftig naturvin-orange från Georgien till traditionell husmanskost. Kollegan är nervös: 'Vad om gästerna tycker att det är konstigt?'",
    text:"Vilket förhållningssätt speglar bäst Scander et al.:s syn på sommelierens agens och experimentlust?",
    options:[
      "Välj alltid det trygga — ovanliga kombinationer skadar alltid gästernas förtroende",
      "Sommelierens agens innebär frihet och ansvar att experimentera och prova oortodoxa kombinationer. Med rätt kommunikation — berättelse om vinets ursprung, analogier om smakprogression — kan laget transformera gästernas förväntan och öppna nya smakupplevelser",
      "Experimentella kombinationer ska bara göras på temakvällar, aldrig reguljärt",
      "Gästens preferenser avgör alltid — sommelieren ska aldrig utmana gästens komfortzon"
    ],
    correct:1,
    explanation:"Scander et al. (2020): 'Den enskilda sommelierens agens är lika viktig som strukturella villkor. Socialisering in i professionen kräver sällskaplighet, kreativitet och en vilja att experimentera med ibland udda kombinationer.' Att kommunicera experimentella val professionellt — med berättelse och kunnig vägledning — är ett tecken på hög Phronesis-kompetens.",
    credits:{ekonomisk:10,social:30,ekologisk:10}
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CRISIS CARDS
// ─────────────────────────────────────────────────────────────────────────────

const CRISIS_CARDS = [
  { id:"k1", title:"Dålig recension", icon:"📰",
    text:"Aftontidningen publicerar en kritisk recension av lagets vinlista. Alla gäster i er zon läser den.",
    target:"zone", affects:"social", amount:-20,
    question:"Hur bemöter laget kritiken professionellt?",
    options:["Ignorera recensionen","Bjud in journalisten på en ny provning och demonstrera er kompetens","Sänk priserna omedelbart","Byt vinlista helt"],
    correct:1,
    explanation:"En öppen dialog och demonstrerad kompetens vänder negativ press till positiv synlighet. Proaktiv kommunikation är sommelierlagets starkaste verktyg.",
    saveBonus:{social:15} },
  { id:"k2", title:"Leverantörskris", icon:"🚛",
    text:"Er primära vinleverantör kan inte leverera inför helgens stora middag.",
    target:"self", affects:"ekonomisk", amount:-25,
    question:"Vilket alternativ räddar kvällen bäst?",
    options:["Stäng restaurangen","Ring ett grannlags sommelier och samarbeta om reservlager","Servera bara öl","Köp från Systembolaget till butikspris"],
    correct:1,
    explanation:"Sommelier-nätverket i Grythyttan är en resurs. Kollegialt samarbete i kris är praktiskt och bygger social hållbarhet på lång sikt.",
    saveBonus:{social:20,ekonomisk:10} },
  { id:"k3", title:"Extremväder", icon:"⛈️",
    text:"Ovädret skadar skörden hos er biodynamiska leverantör i Bergslagen. Priserna stiger.",
    target:"all", affects:"ekologisk", amount:-15,
    question:"Vilket svar är mest hållbart på lång sikt?",
    options:["Byt till billigare konventionell leverantör","Minska vinlistan och gå djupare med färre ekologiska producenter","Höj priserna på alla rätter","Ta bort vinlistan tillfälligt"],
    correct:1,
    explanation:"Hållbar inköpsstrategi handlar om djup snarare än bredd. Färre producenter med stark relation ger resiliens mot klimatstörningar.",
    saveBonus:{ekologisk:25} },
  { id:"k4", title:"VIP-gäst", icon:"⭐",
    text:"En känd matskribent bokar bord ikväll utan förvarning. Hela byn pratar om det.",
    target:"zone", affects:"social", amount:0,
    question:"Vilken crossmodal strategi väljer ni för att maximera upplevelsen?",
    options:["Servera det dyraste vinet","Anpassa musik, ljus och serveringstempo till vinens karaktär och gästens förväntningar","Låt gästen välja själv utan guidning","Fokusera bara på maten"],
    correct:1,
    explanation:"Crichton-Fock's atmospheric influence: alla sinnesintryck i matsalen samverkar. Ett medvetet sommelierlag orkestrerar helheten — inte bara glaset.",
    saveBonus:{social:30,ekonomisk:15} },
  { id:"k5", title:"Personalbrist", icon:"👤",
    text:"En i laget är sjuk. Ni måste sköta hela vinservicen med en person under en fullbokad kväll.",
    target:"self", affects:"social", amount:-15,
    question:"Vilken provningsteknik prioriterar ni under tidspress?",
    options:["Hoppa över provningen helt","Använd WSET SAT — syn, doft, smak, slutsats — snabbt men konsekvent","Gissa baserat på etikett","Be kökschefen provsmaka"],
    correct:1,
    explanation:"WSET SAT är designad för effektivitet utan att kompromissa med precision. Ett tränat sommelierlag gör en korrekt bedömning på under 60 sekunder.",
    saveBonus:{social:20} },
  { id:"k6", title:"Hållbarhetsrevision", icon:"🌱",
    text:"Kommunen granskar alla restaurangers miljöprofil inför utmärkelsen 'Årets Hållbara Krog'.",
    target:"all", affects:"ekologisk", amount:0,
    question:"Vilket initiativ ger störst ekologisk trovärdighet?",
    options:["Sätt upp en grön blomma i fönstret","Dokumentera hela vinlistans CO₂-avtryck och erbjud gästen ett klimatval","Köp klimatkompensation","Byt alla glas mot återvunnet material"],
    correct:1,
    explanation:"Transparens och gästens möjlighet att göra aktiva val är kärnan i social-ekologisk hållbarhet. Dokumentation ger dessutom konkurrensfördelar.",
    saveBonus:{ekologisk:30,social:10} },
  { id:"k7", title:"Naturvinsfestival", icon:"🍾",
    text:"Grythyttan arrangerar sin första naturvinsfestival. Alla restauranger konkurrerar om uppmärksamheten.",
    target:"zone", affects:"ekonomisk", amount:0,
    question:"Hur positionerar ni er restaurang under festivalen?",
    options:["Sänk alla priser","Curera en tematisk provning med storytelling om producenten och terroir","Kopiera grannlagets meny","Ta ledigt under festivalen"],
    correct:1,
    explanation:"Terroir-kommunikation och curated experiences differentierar. Gäster betalar premium för berättelsen bakom flaskan — inte bara vinet i glaset.",
    saveBonus:{ekonomisk:25,social:20} },
  { id:"k8", title:"Allergikris", icon:"⚠️",
    text:"En gäst reagerar på ett vin som innehöll osmärkt äggvita (klarningsmedel). Situationen eskalerar.",
    target:"self", affects:"social", amount:-30,
    question:"Vad borde laget ha gjort INNAN servering?",
    options:["Ingenting — det är producentens ansvar","Kommunicerat alla klarningsmedel proaktivt och haft alternativ redo för allergiker","Serverat bara naturvin","Frågat alla gäster om allergier vid bokning"],
    correct:1,
    explanation:"Social hållbarhet innebär inkludering och proaktiv kommunikation. Ett ansvarsfull sommelierlag känner sin vinlista och kommunicerar proaktivt — inte reaktivt.",
    saveBonus:{social:25} },
  { id:"k9", title:"Tävlingsinbjudan", icon:"🏅",
    text:"Svenska Sommelierföreningen bjuder in ett lag att delta i regionala mästerskapen. Det kräver fem veckors intensiv förberedelse.",
    target:"self", affects:"social", amount:0,
    question:"Hur motiverar ni deltagandet för restaurangägaren? (Scander et al., 2020)",
    options:[
      "Det är onödigt — tävlingar ger inga praktiska kunskaper",
      "Tävlingsdeltagande bygger socialt kapital som konverteras till kulturellt kapital: kontakt med ledande sommelierer, exponering för legitima smakdomar och nätverksbygge som direkt stärker restaurangens kompetensprofil och gästupplevelse",
      "Det ger bra PR men inga verkliga kunskapsvinster",
      "Tävlingar är bara för individer, inte för sommelierlag"
    ],
    correct:1,
    explanation:"Scander et al. (2020): sommelierernas kompetens byggs i hög grad via tävlingsdeltagande och kontakt med ledande yrkesutövare. En av informanterna beskriver hur han tränande med 'kända sommelierer' som lärde honom rätt ord, positionering och kommunikationsstil — kunskap som inte finns i böcker.",
    saveBonus:{social:30,ekonomisk:10} },
];

const INVESTMENTS = [
  { id:"i1", name:"Biodynamisk vingård", icon:"🌿", cat:"ekologisk",
    desc:"Exklusivt samarbete med Demeter-certifierad producent",
    cost:{ekonomisk:30,social:0,ekologisk:10}, reward:{ekonomisk:0,social:15,ekologisk:40} },
  { id:"i2", name:"WSET-utbildning", icon:"🎓", cat:"social",
    desc:"Sänd en medarbetare på WSET Level 3",
    cost:{ekonomisk:40,social:0,ekologisk:0}, reward:{ekonomisk:20,social:25,ekologisk:0} },
  { id:"i3", name:"Bag-in-box husviner", icon:"♻️", cat:"ekologisk",
    desc:"Byt husviner till hållbara förpackningar — 70% lägre CO₂",
    cost:{ekonomisk:15,social:0,ekologisk:0}, reward:{ekonomisk:10,social:5,ekologisk:30} },
  { id:"i4", name:"Alkoholfri parningmeny", icon:"🫧", cat:"social",
    desc:"Lansera en komplett alkoholfri parningsmeny med full storytelling",
    cost:{ekonomisk:20,social:10,ekologisk:0}, reward:{ekonomisk:25,social:40,ekologisk:5} },
  { id:"i5", name:"Terroir-event", icon:"🗺️", cat:"ekonomisk",
    desc:"Arrangera en producentmiddag med storytelling och analogier",
    cost:{ekonomisk:25,social:15,ekologisk:0}, reward:{ekonomisk:35,social:30,ekologisk:0} },
  { id:"i6", name:"Lokal vinregion", icon:"🏔️", cat:"ekologisk",
    desc:"Bygg en vinlista på svenska och nordiska producenter",
    cost:{ekonomisk:10,social:0,ekologisk:20}, reward:{ekonomisk:15,social:20,ekologisk:25} },
];

const DOMAIN_META = {
  vetenskap: { label:"Vetenskaplig kompetens",          icon:"📚", color:"#1e4a8a", bg:"#eef2fb" },
  hantverk:  { label:"Hantverksmässig kompetens",       icon:"🍷", color:"#8a4010", bg:"#fef3e2" },
  estetisk:  { label:"Estetisk gestaltande kompetens",  icon:"✨", color:"#5a2890", bg:"#f3eeff" },
};

const CREDIT_META = {
  ekonomisk: { label:"Ekonomisk", icon:"💰", color:"#b45309", bg:"#fffbeb", bar:"#f59e0b" },
  social:    { label:"Social",    icon:"🤝", color:"#0e7490", bg:"#ecfeff", bar:"#06b6d4" },
  ekologisk: { label:"Ekologisk", icon:"🌱", color:"#15803d", bg:"#f0fdf4", bar:"#22c55e" },
};

function shuffle(a) {
  const b = [...a];
  for (let i = b.length-1; i > 0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [b[i],b[j]] = [b[j],b[i]];
  }
  return b;
}
function clamp(v, min=0, max=200) { return Math.max(min, Math.min(max, v)); }

// ─────────────────────────────────────────────────────────────────────────────
// MAP COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function GameMap({ teams, activeRestaurantId, onSelect, lotteryMode }) {
  const pinColors = { V:"#1e4a8a", C:"#8a5010", Ö:"#7a2e10", S:"#1a6040" };
  return (
    <svg width="100%" viewBox="0 0 680 860" style={{display:"block",borderRadius:12,border:"0.5px solid #d6d3d1"}}>
      <rect width="680" height="860" fill="#edeae2"/>
      <rect x="12" y="12" width="656" height="836" fill="#f0ece4" rx="2"/>
      <polygon points="12,88 228,88 228,608 12,748" fill="#dce8f6" opacity="0.45"/>
      <polygon points="228,88 468,88 468,608 228,608" fill="#f4eedf" opacity="0.42"/>
      <polygon points="468,88 668,88 668,568 468,568" fill="#f0e4d8" opacity="0.42"/>
      <polygon points="12,748 228,608 468,608 468,568 668,568 668,848 12,848" fill="#d8eed8" opacity="0.42"/>
      <path d="M228 88 L228 608" stroke="#b8b0a4" strokeWidth="0.8" strokeDasharray="6,4" fill="none"/>
      <path d="M468 88 L468 568" stroke="#b8b0a4" strokeWidth="0.8" strokeDasharray="6,4" fill="none"/>
      <path d="M12 608 L228 608 L468 608 L468 568 L668 568" stroke="#b8b0a4" strokeWidth="0.6" strokeDasharray="5,3" fill="none"/>
      <path d="M12 748 L228 608" stroke="#b8b0a4" strokeWidth="0.6" strokeDasharray="5,3" fill="none"/>
      <text x="40" y="108" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="#1e4a8a" opacity="0.8" letterSpacing="1.5">ZON V — VÄST</text>
      <text x="292" y="108" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="#8a5010" opacity="0.8" letterSpacing="1.5">ZON C — CENTRUM</text>
      <text x="474" y="108" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="#7a2e10" opacity="0.8" letterSpacing="1.5">ZON Ö — ÖST</text>
      <text x="40" y="768" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="#1a6040" opacity="0.8" letterSpacing="1.5">ZON S — SJÖ</text>
      <ellipse cx="518" cy="736" rx="112" ry="68" fill="#b8d8e8" stroke="#96c0d4" strokeWidth="0.8"/>
      <ellipse cx="518" cy="736" rx="108" ry="64" fill="#c4e0ec"/>
      <text x="518" y="740" fontFamily="serif" fontSize="8" fill="#4a7888" textAnchor="middle">Grythytteviken</text>
      <rect x="26" y="548" width="70" height="58" fill="#d4e8c2" rx="2"/>
      <rect x="72" y="174" width="76" height="46" fill="#d4e8c2" rx="2"/>
      <rect x="374" y="88" width="58" height="38" fill="#d4e8c2" rx="2"/>
      {[[106,246,46,26],[160,246,38,26],[106,282,50,22],[164,282,32,22],[254,246,46,30],[308,246,42,30],[362,246,44,30],[254,340,42,30],[306,340,46,30],[360,340,38,30],[406,340,38,30],[476,186,72,42],[476,240,72,34],[106,416,52,26],[164,416,42,26],[64,356,38,24],[64,390,38,24],[254,462,46,30],[308,462,42,30],[254,506,42,26]].map(([x,y,w,h],i)=>(
        <rect key={i} x={x} y={y} width={w} height={h} fill="#e0dbd0" stroke="#ccc8be" strokeWidth="0.5" rx="1"/>
      ))}
      <path d="M12 336 L668 336" fill="none" stroke="#a4a09a" strokeWidth="7.5" strokeLinecap="round"/>
      <path d="M296 86 L296 800" fill="none" stroke="#a4a09a" strokeWidth="7.5" strokeLinecap="round"/>
      {["M12 228 L668 228","M12 454 L548 454","M166 86 L166 568","M438 86 L438 546","M12 546 L358 546","M78 136 L78 798","M558 136 L558 562","M12 136 L668 136","M12 668 L418 668","M116 798 L438 798","M166 136 L78 336","M558 136 L646 336","M78 454 L78 546","M166 454 L166 568","M296 668 L296 798","M438 546 L438 668","M558 454 L558 562","M78 668 L78 798"].map((d,i)=>(
        <path key={i} d={d} fill="none" stroke="#bcb8b0" strokeWidth="4" strokeLinecap="round"/>
      ))}
      <text x="192" y="330" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle">Nygatan</text>
      <text x="498" y="330" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle">Prästgatan</text>
      <text x="291" y="190" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,291,190)">Kyrkogatan</text>
      <text x="291" y="508" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,291,508)">Smedsgatan</text>
      <text x="161" y="398" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,161,398)">Hammargatan</text>
      <text x="433" y="393" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,433,393)">Sjögatan</text>
      <text x="73" y="448" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,73,448)">Skolgatan</text>
      <text x="553" y="398" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,553,398)">Hyttgatan</text>
      <text x="553" y="193" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,553,193)">Breviksvägen</text>
      <text x="73" y="218" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,73,218)">Stationsgatan</text>
      <text x="73" y="318" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,73,318)">Västra Bergvägen</text>
      <text x="208" y="663" fontFamily="sans-serif" fontSize="8" fill="#a09890">Carl Jans väg</text>
      <text x="258" y="793" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle">Kyrkbacken</text>
      <text x="73" y="728" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,73,728)">Bergsmansvägen</text>
      <text x="291" y="728" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,291,728)">Mjölnarvägen</text>
      <text x="433" y="608" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,433,608)">Källaregränd</text>
      <text x="161" y="508" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,161,508)">Järnvägsgränden</text>
      <text x="553" y="510" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,553,510)">Koppargränd</text>
      <text x="161" y="133" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,161,133)">Smedsbacken</text>
      <circle cx="296" cy="336" r="15" fill="#ddd6c6" stroke="#b8b0a2" strokeWidth="0.8"/>
      <text x="296" y="332" fontFamily="serif" fontSize="6.5" fill="#6b6358" textAnchor="middle">TORGET</text>
      <text x="296" y="343" fontFamily="sans-serif" fontSize="5.5" fill="#9c9488" textAnchor="middle">centrum</text>
      {RESTAURANTS.map(r => {
        const team = teams?.find(t => t.restaurantId === r.id);
        const isActive = r.id === activeRestaurantId;
        const isTaken = !!team;
        const pc = pinColors[r.zone];
        const isElim = team && !team.alive;
        return (
          <g key={r.id} onClick={() => lotteryMode && !isTaken && onSelect && onSelect(r.id)}
            style={{cursor: lotteryMode && !isTaken ? "pointer" : "default"}}>
            <circle cx={r.cx} cy={r.cy} r={isActive?14:11} fill={isElim?"#9ca3af":pc}
              stroke={isActive?"#f59e0b":"white"} strokeWidth={isActive?2.5:1.5} opacity={isElim?0.5:1}/>
            <circle cx={r.cx} cy={r.cy} r={isActive?8:6} fill={isElim?"#d1d5db":pc} opacity={isElim?0.5:0.65}/>
            <text x={r.cx} y={r.cy+4} fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">{r.id}</text>
            {isTaken && !isElim && (
              <text x={r.cx} y={r.cy-17} fontFamily="sans-serif" fontSize="7" fill={pc} textAnchor="middle" fontWeight="600">
                {team.name.split(" ")[0]}
              </text>
            )}
          </g>
        );
      })}
      <text x="340" y="40" fontFamily="serif" fontSize="16" fontWeight="600" fill="#2c2c2a" textAnchor="middle" letterSpacing="1">Grythyttan</text>
      <text x="340" y="56" fontFamily="sans-serif" fontSize="7" fill="#a8a49c" textAnchor="middle" letterSpacing="2">SOMMELIER CHAMPIONSHIP</text>
      <g transform="translate(632,92)">
        <circle cx="0" cy="0" r="13" fill="white" stroke="#c4beb4" strokeWidth="0.5"/>
        <path d="M0,-9 L2.2,3.5 L0,1 L-2.2,3.5 Z" fill="#2c2c2a"/>
        <path d="M0,9 L2.2,-3.5 L0,-1 L-2.2,-3.5 Z" fill="#c8c4bc"/>
        <text x="0" y="-12" fontFamily="sans-serif" fontSize="7" fill="#2c2c2a" textAnchor="middle">N</text>
      </g>
    </svg>
  );
}

function CreditBar({ type, value, small }) {
  const m = CREDIT_META[type];
  const pct = Math.min(100, (value/100)*100);
  const danger = value <= 20;
  return (
    <div style={{marginBottom: small?4:6}}>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:small?10:11,marginBottom:2}}>
        <span style={{color:danger?"#dc2626":m.color,fontWeight:600}}>{m.icon} {m.label}</span>
        <span style={{fontWeight:700,color:danger?"#dc2626":"#1c1917"}}>{value}</span>
      </div>
      <div style={{height:small?4:6,background:"#e7e5e4",borderRadius:99,overflow:"hidden"}}>
        <div style={{width:`${pct}%`,height:"100%",borderRadius:99,background:danger?"#ef4444":m.bar,transition:"width 0.6s ease"}}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DOMAIN INTRO SCREEN
// ─────────────────────────────────────────────────────────────────────────────

function DomainIntroScreen({ onDone }) {
  const [active, setActive] = useState("vetenskap");
  const d = DOMAIN_INTRO[active];
  const domains = ["vetenskap","hantverk","estetisk"];

  return (
    <div style={S.page}>
      <div style={{...S.card, maxWidth:680}}>
        <div style={S.logoBadge}>Kunskapsformer</div>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,color:"#1c1917",margin:"8px 0 4px"}}>
          Tre former av sommelierkunnande
        </h2>
        <p style={{fontSize:13,color:"#78716c",lineHeight:1.7,marginBottom:20}}>
          Herdenstams aristoteliska kunskapsmodell (2011, 2023) · Crichton-Fock & Spence (2024) · Herdenstam et al. (2018, 2020) · Scander et al. (2020) · Hult & Scander (2024) · ORU MÅ099U.
          Varje sommelierlag tävlar inom alla tre kompetensdomäner.
        </p>

        <div style={{display:"flex",gap:8,marginBottom:20}}>
          {domains.map(k => {
            const dm = DOMAIN_INTRO[k];
            const isActive = active === k;
            return (
              <button key={k} onClick={()=>setActive(k)}
                style={{flex:1,padding:"10px 8px",borderRadius:10,cursor:"pointer",
                  background:isActive?dm.bg:"#fafaf9",
                  border:`1.5px solid ${isActive?DOMAIN_META[k].color:"#e7e5e4"}`,
                  fontFamily:"sans-serif",fontSize:11,fontWeight:isActive?700:500,
                  color:isActive?DOMAIN_META[k].color:"#78716c",transition:"all 0.2s"}}>
                <div style={{fontSize:20,marginBottom:3}}>{dm.icon}</div>
                <div style={{fontSize:10,fontWeight:700,opacity:0.7,letterSpacing:0.5}}>{dm.aristotle}</div>
                <div>{dm.title.split("—")[0].trim().split(" ")[0]}</div>
              </button>
            );
          })}
        </div>

        <div style={{background:d.bg,border:`1px solid ${DOMAIN_META[active].color}25`,borderRadius:14,padding:"20px 22px",marginBottom:16}}>
          <div style={{fontSize:12,fontWeight:700,color:DOMAIN_META[active].color,letterSpacing:0.8,textTransform:"uppercase",marginBottom:8}}>
            {d.icon} {d.title}
          </div>
          <p style={{fontSize:14,color:"#1c1917",fontWeight:600,margin:"0 0 12px",lineHeight:1.6}}>{d.summary}</p>
          <p style={{fontSize:12,color:"#57534e",margin:"0 0 14px",lineHeight:1.7}}>{d.framework}</p>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:700,color:"#78716c",textTransform:"uppercase",letterSpacing:0.8,marginBottom:8}}>
              I konkreta yrkessituationer:
            </div>
            {d.inPractice.map((item,i) => (
              <div key={i} style={{display:"flex",gap:8,fontSize:12,color:"#2c2c2a",marginBottom:6,lineHeight:1.5}}>
                <span style={{color:DOMAIN_META[active].color,flexShrink:0}}>→</span>
                {item}
              </div>
            ))}
          </div>
          <div style={{background:"#1c1917",borderRadius:8,padding:"12px 14px"}}>
            <p style={{fontSize:11,color:"#f5f0e8",fontStyle:"italic",margin:0,lineHeight:1.6}}>{d.quote}</p>
          </div>
        </div>

        <button onClick={onDone} style={S.primaryBtn}>
          Förstått — starta tävlingen →
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INTRO SCREEN
// ─────────────────────────────────────────────────────────────────────────────

function IntroScreen({ onStart }) {
  const [numTeams, setNumTeams] = useState(4);
  const [names, setNames] = useState(Array.from({length:12},(_,i)=>`Sommelierlag ${i+1}`));

  return (
    <div style={S.page}>
      <div style={{...S.card,maxWidth:680}}>
        <div style={S.logoBadge}>Sommelier Championship</div>
        <h1 style={S.heroTitle}>La Grande<br/>Compétition</h1>
        <p style={{fontSize:14,color:"#78716c",lineHeight:1.8,marginBottom:24,maxWidth:520}}>
          Sommelierlag driver restauranger i Grythyttan och tävlar om credits genom
          <strong style={{color:"#b45309"}}> vetenskaplig</strong>,
          <strong style={{color:"#6d28d9"}}> hantverksmässig</strong> och
          <strong style={{color:"#0891b2"}}> estetisk gestaltande</strong> kompetens.
          Credits investeras i hållbarhet. Kriskort slår hårt. Noll i en dimension: <strong>utslaget.</strong>
        </p>
        <div style={{marginBottom:20}}>
          <label style={{fontSize:13,fontWeight:600,color:"#57534e"}}>Antal sommelierlag: {numTeams}</label>
          <input type="range" min={2} max={12} step={1} value={numTeams}
            onChange={e=>setNumTeams(+e.target.value)} style={{width:"100%",marginTop:6}}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:28}}>
          {Array.from({length:numTeams}).map((_,i)=>(
            <input key={i} value={names[i]} placeholder={`Sommelierlag ${i+1}`}
              onChange={e=>{const n=[...names];n[i]=e.target.value;setNames(n);}}
              style={S.input}/>
          ))}
        </div>
        <div style={{marginBottom:28}}>
          <div style={{fontSize:11,fontWeight:700,color:"#78716c",letterSpacing:1,textTransform:"uppercase",marginBottom:12}}>Spelplanen — Grythyttan</div>
          <GameMap teams={[]} lotteryMode={false}/>
        </div>
        <button onClick={()=>onStart(
          Array.from({length:numTeams}).map((_,i)=>({
            id:`team${i}`,name:names[i]||`Sommelierlag ${i+1}`,
            restaurantId:null,alive:true,rank:null,
            credits:{ekonomisk:0,social:0,ekologisk:0},
            correctAnswers:0,totalAnswers:0,investments:[],
          }))
        )} style={S.primaryBtn}>Läs om kunskapsformerna →</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOTTERY SCREEN
// ─────────────────────────────────────────────────────────────────────────────

function LotteryScreen({ teams, onDone }) {
  const [assigned, setAssigned] = useState({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flash, setFlash] = useState(null);
  const [done, setDone] = useState(false);
  const current = teams[currentIdx];
  const takenIds = new Set(Object.values(assigned));

  function pickRestaurant(rId) {
    const newAssigned = {...assigned,[current.id]:rId};
    setAssigned(newAssigned);
    setFlash(rId);
    setTimeout(()=>{
      setFlash(null);
      if(currentIdx+1>=teams.length){setDone(true);}
      else{setCurrentIdx(i=>i+1);}
    },1000);
  }

  function finish() {
    onDone(teams.map(t=>{
      const r=RESTAURANTS.find(x=>x.id===assigned[t.id]);
      return {...t,restaurantId:r.id,credits:{...r.credits}};
    }));
  }

  const displayTeams = teams.map((t,i)=>i<currentIdx||done?{...t,restaurantId:assigned[t.id],alive:true}:t);

  return (
    <div style={S.page}>
      <div style={{...S.card,maxWidth:720}}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={S.logoBadge}>Lottning</div>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,color:"#1c1917",margin:"8px 0 4px"}}>
            {done?"Alla restauranger lottade!":"Välj er restaurang på kartan"}
          </h2>
          {!done&&<p style={{fontSize:15,color:"#78716c",margin:0}}>
            <strong style={{color:"#1c1917"}}>{current?.name}</strong> — klicka på en ledig lokal
          </p>}
        </div>
        <GameMap teams={displayTeams} activeRestaurantId={flash} lotteryMode={!done} onSelect={pickRestaurant}/>
        {done&&(
          <>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,margin:"20px 0"}}>
              {teams.map(t=>{
                const r=RESTAURANTS.find(x=>x.id===assigned[t.id]);
                const z=ZONES[r?.zone];
                return(
                  <div key={t.id} style={{background:z?.light||"#fafaf9",border:`1px solid ${z?.color}30`,borderRadius:12,padding:"12px 14px"}}>
                    <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}>
                      <span style={{fontSize:22}}>{r?.emoji}</span>
                      <div>
                        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,fontWeight:700}}>{t.name}</div>
                        <div style={{fontSize:11,color:z?.color,fontWeight:600}}>{r?.name} — {r?.segment}</div>
                        <div style={{fontSize:10,color:"#78716c"}}>{r?.address}</div>
                      </div>
                    </div>
                    <div style={{fontSize:11,color:"#059669",background:"#d1fae5",padding:"4px 8px",borderRadius:6,marginBottom:4}}>✦ {r?.bonusDesc}</div>
                    <div style={{fontSize:11,color:"#dc2626",background:"#fee2e2",padding:"4px 8px",borderRadius:6,marginBottom:6}}>⚠ {r?.weakness}</div>
                    <div style={{display:"flex",gap:4}}>
                      {["ekonomisk","social","ekologisk"].map(type=>(
                        <span key={type} style={{background:CREDIT_META[type].bg,color:CREDIT_META[type].color,
                          border:`1px solid ${CREDIT_META[type].color}25`,fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:99}}>
                          {CREDIT_META[type].icon} {r?.credits[type]}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <button onClick={finish} style={S.primaryBtn}>Starta tävlingen →</button>
          </>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CRISIS PHASE
// ─────────────────────────────────────────────────────────────────────────────

function CrisisPhase({ crisis, onDone }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const isCorrect = selected===crisis.correct;

  return (
    <div style={S.page}>
      <div style={{...S.card,maxWidth:600}}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{fontSize:48,marginBottom:8}}>{crisis.icon}</div>
          <div style={{display:"inline-block",background:"#fee2e2",color:"#991b1b",
            fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:99,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>
            Kriskort
          </div>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,color:"#1c1917",margin:"0 0 8px"}}>{crisis.title}</h2>
          <p style={{fontSize:14,color:"#57534e",lineHeight:1.7,marginBottom:4}}>{crisis.text}</p>
          <div style={{fontSize:12,color:"#78716c",fontStyle:"italic"}}>
            {crisis.target==="all"?"Drabbar ALLA sommelierlag":crisis.target==="zone"?"Drabbar alla lag i samma zon":"Drabbar det aktiva laget"}
            {crisis.amount<0&&<span style={{color:"#dc2626",fontWeight:700}}>{" · "}{crisis.amount} {CREDIT_META[crisis.affects]?.icon}</span>}
          </div>
        </div>
        <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:12,padding:"14px 16px",marginBottom:18}}>
          <p style={{fontSize:15,color:"#1c1917",margin:0,fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",lineHeight:1.7}}>{crisis.question}</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:18}}>
          {crisis.options.map((opt,i)=>{
            let bg="#fafaf9",border="#e7e5e4",color="#1c1917";
            if(revealed){if(i===crisis.correct){bg="#d1fae5";border="#34d399";color="#065f46";}else if(i===selected){bg="#fee2e2";border="#f87171";color="#7f1d1d";}}
            return(
              <button key={i} onClick={()=>{if(!revealed){setSelected(i);setRevealed(true);}}}
                style={{background:bg,border:`1.5px solid ${border}`,borderRadius:10,padding:"12px 16px",
                  textAlign:"left",cursor:revealed?"default":"pointer",fontSize:14,color,
                  fontFamily:"sans-serif",transition:"all 0.2s",display:"flex",gap:10,alignItems:"flex-start"}}>
                <span style={{fontWeight:700,minWidth:20,opacity:0.6}}>{["A","B","C","D"][i]}</span>
                {opt}
                {revealed&&i===crisis.correct&&<span style={{marginLeft:"auto"}}>✓</span>}
                {revealed&&i===selected&&i!==crisis.correct&&<span style={{marginLeft:"auto"}}>✗</span>}
              </button>
            );
          })}
        </div>
        {revealed&&(
          <>
            <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:12,padding:"14px 16px",marginBottom:20}}>
              <div style={{fontSize:12,fontWeight:700,color:"#b45309",marginBottom:4}}>{isCorrect?"✓ Rätt — krisen hanteras:":"✗ Fel — krisen drabbar fullt ut:"}</div>
              <p style={{fontSize:13,color:"#57534e",margin:0,lineHeight:1.6}}>{crisis.explanation}</p>
              {isCorrect&&(
                <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>
                  {Object.entries(crisis.saveBonus).map(([type,amt])=>(
                    <span key={type} style={{background:CREDIT_META[type].bg,color:CREDIT_META[type].color,
                      border:`1px solid ${CREDIT_META[type].color}30`,fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:99}}>
                      +{amt} {CREDIT_META[type].icon}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <button onClick={()=>onDone(isCorrect,crisis)} style={S.primaryBtn}>Fortsätt →</button>
          </>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// QUESTION PHASE
// ─────────────────────────────────────────────────────────────────────────────

function QuestionPhase({ team, restaurant, question, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const m = DOMAIN_META[question.domain];
  const di = DOMAIN_INTRO[question.domain];
  const isCorrect = selected===question.correct;
  const z = ZONES[restaurant.zone];

  return (
    <div style={S.page}>
      <div style={{...S.card,maxWidth:640}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
          <span style={{fontSize:28}}>{restaurant.emoji}</span>
          <div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,fontWeight:700}}>{team.name}</div>
            <div style={{fontSize:12,color:z?.color,fontWeight:600}}>{restaurant.name} · {restaurant.segment}</div>
          </div>
          <div style={{marginLeft:"auto"}}>
            <span style={{background:m.bg,color:m.color,border:`1px solid ${m.color}25`,
              fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:99,letterSpacing:0.8,textTransform:"uppercase"}}>
              {m.icon} {di.title.split(" ")[0]}
            </span>
          </div>
        </div>
        <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
          {["ekonomisk","social","ekologisk"].map(t=>(
            <div key={t} style={{flex:1,minWidth:90}}><CreditBar type={t} value={team.credits[t]} small/></div>
          ))}
        </div>
        {question.scenario && (
          <div style={{background:"#f9f6f0",border:"1px solid #e8e2d8",borderRadius:10,padding:"12px 14px",marginBottom:14}}>
            <div style={{fontSize:10,fontWeight:700,color:"#78716c",letterSpacing:0.8,textTransform:"uppercase",marginBottom:6}}>Scenario</div>
            <p style={{fontSize:13,color:"#3c3a36",margin:0,lineHeight:1.7,fontStyle:"italic"}}>{question.scenario}</p>
          </div>
        )}
        <div style={{background:m.bg,border:`1px solid ${m.color}25`,borderRadius:14,padding:"16px 18px",marginBottom:18}}>
          <div style={{fontSize:10,fontWeight:700,color:m.color,marginBottom:6,letterSpacing:0.8}}>
            {"★".repeat(question.difficulty)}{"☆".repeat(3-question.difficulty)} SVÅRIGHET
          </div>
          <p style={{fontSize:15,color:"#1c1917",lineHeight:1.7,margin:0,fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic"}}>
            {question.text}
          </p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:18}}>
          {question.options.map((opt,i)=>{
            let bg="#fafaf9",border="#e7e5e4",color="#1c1917";
            if(revealed){if(i===question.correct){bg="#d1fae5";border="#34d399";color="#065f46";}else if(i===selected){bg="#fee2e2";border="#f87171";color="#7f1d1d";}}
            return(
              <button key={i} onClick={()=>{if(!revealed){setSelected(i);setRevealed(true);}}}
                style={{background:bg,border:`1.5px solid ${border}`,borderRadius:10,padding:"12px 16px",
                  textAlign:"left",cursor:revealed?"default":"pointer",fontSize:13,color,
                  fontFamily:"sans-serif",transition:"all 0.2s",display:"flex",gap:10,alignItems:"flex-start"}}>
                <span style={{fontWeight:700,minWidth:20,opacity:0.6}}>{["A","B","C","D"][i]}</span>
                {opt}
                {revealed&&i===question.correct&&<span style={{marginLeft:"auto"}}>✓</span>}
                {revealed&&i===selected&&i!==question.correct&&<span style={{marginLeft:"auto"}}>✗</span>}
              </button>
            );
          })}
        </div>
        {revealed&&(
          <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:12,padding:"14px 16px",marginBottom:20}}>
            <div style={{fontSize:12,fontWeight:700,color:"#b45309",marginBottom:4}}>{isCorrect?"✓ Rätt! Förklaring:":"✗ Fel. Rätt svar:"}</div>
            <p style={{fontSize:13,color:"#57534e",margin:0,lineHeight:1.6}}>{question.explanation}</p>
            {isCorrect&&(
              <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>
                {Object.entries(question.credits).map(([type,amt])=>amt>0&&(
                  <span key={type} style={{background:CREDIT_META[type].bg,color:CREDIT_META[type].color,
                    border:`1px solid ${CREDIT_META[type].color}30`,fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:99}}>
                    +{amt} {CREDIT_META[type].icon}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
        {revealed&&<button onClick={()=>onAnswer(isCorrect,question.credits)} style={S.primaryBtn}>{isCorrect?"Välj investering →":"Nästa →"}</button>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INVESTMENT PHASE
// ─────────────────────────────────────────────────────────────────────────────

function InvestmentPhase({ team, restaurant, earnedCredits, onDone }) {
  const [chosen, setChosen] = useState(null);
  const z = ZONES[restaurant.zone];
  return (
    <div style={S.page}>
      <div style={{...S.card,maxWidth:660}}>
        <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:16}}>
          <span style={{fontSize:26}}>{restaurant.emoji}</span>
          <div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700}}>{team.name}</div>
            <div style={{fontSize:12,color:z?.color,fontWeight:600}}>{restaurant.name} · väljer investering</div>
          </div>
        </div>
        {earnedCredits&&(
          <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
            {Object.entries(earnedCredits).map(([type,amt])=>amt>0&&(
              <span key={type} style={{background:CREDIT_META[type].bg,color:CREDIT_META[type].color,
                border:`1px solid ${CREDIT_META[type].color}30`,fontSize:12,fontWeight:700,padding:"4px 12px",borderRadius:99}}>
                +{amt} {CREDIT_META[type].icon} {CREDIT_META[type].label}
              </span>
            ))}
          </div>
        )}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
          {INVESTMENTS.map(inv=>{
            const blocked = restaurant.weakness?.includes("ej köpa ekologiska")&&inv.cat==="ekologisk";
            const canAfford = !blocked&&Object.entries(inv.cost).every(([t,c])=>(team.credits[t]+(earnedCredits?.[t]||0))>=c);
            const isChosen = chosen===inv.id;
            const disabled = !canAfford||!!chosen;
            return(
              <div key={inv.id} onClick={()=>!disabled&&setChosen(inv.id)}
                style={{background:isChosen?"#d1fae5":canAfford?"#fff":"#f5f5f4",
                  border:`1.5px solid ${isChosen?"#34d399":canAfford?"#e7e5e4":"#d6d3d1"}`,
                  borderRadius:12,padding:"12px 14px",cursor:disabled&&!isChosen?"default":"pointer",
                  opacity:disabled&&!isChosen?0.5:1,transition:"all 0.2s"}}>
                <div style={{fontSize:22,marginBottom:4}}>{inv.icon}</div>
                <div style={{fontSize:13,fontWeight:700,color:"#1c1917",marginBottom:3}}>{inv.name}</div>
                <div style={{fontSize:11,color:"#78716c",marginBottom:8,lineHeight:1.5}}>{inv.desc}</div>
                <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                  {Object.entries(inv.cost).map(([t,c])=>c>0&&<span key={t} style={{background:"#fee2e2",color:"#dc2626",fontSize:10,fontWeight:600,padding:"2px 6px",borderRadius:99}}>−{c} {CREDIT_META[t].icon}</span>)}
                  {Object.entries(inv.reward).map(([t,r])=>r>0&&<span key={t} style={{background:CREDIT_META[t].bg,color:CREDIT_META[t].color,fontSize:10,fontWeight:600,padding:"2px 6px",borderRadius:99}}>+{r} {CREDIT_META[t].icon}</span>)}
                </div>
                {blocked&&<div style={{fontSize:10,color:"#dc2626",marginTop:6}}>⚠ Ej tillgänglig för ert lag</div>}
              </div>
            );
          })}
        </div>
        <button onClick={()=>onDone(chosen?INVESTMENTS.find(i=>i.id===chosen):null)} style={S.primaryBtn}>
          {chosen?`Investera i "${INVESTMENTS.find(i=>i.id===chosen)?.name}" →`:"Hoppa över →"}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROUND SUMMARY
// ─────────────────────────────────────────────────────────────────────────────

function RoundSummary({ round, teams, onNext }) {
  return (
    <div style={S.page}>
      <div style={{...S.card,maxWidth:720}}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{fontSize:11,fontWeight:700,color:"#b45309",letterSpacing:1.5,textTransform:"uppercase",marginBottom:4}}>Omgång {round} avslutad</div>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,color:"#1c1917",margin:0}}>Hållbarhetsbalans</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:24}}>
          {teams.map(t=>{
            const r=RESTAURANTS.find(x=>x.id===t.restaurantId);
            const z=ZONES[r?.zone];
            const danger=Object.values(t.credits).some(v=>v<=20);
            return(
              <div key={t.id} style={{background:t.alive?z?.light||"#fafaf9":"#f5f5f4",
                border:`1.5px solid ${!t.alive?"#d6d3d1":danger?"#f87171":(z?.color+"40")}`,
                borderRadius:14,padding:"14px 16px",opacity:t.alive?1:0.5,position:"relative"}}>
                {!t.alive&&<div style={{position:"absolute",top:8,right:10,background:"#ef4444",color:"#fff",fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:99}}>UTSLAGET</div>}
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:10}}>
                  <span style={{fontSize:20}}>{r?.emoji}</span>
                  <div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,fontWeight:700}}>{t.name}</div>
                    <div style={{fontSize:11,color:z?.color,fontWeight:600}}>{r?.name}</div>
                  </div>
                </div>
                <CreditBar type="ekonomisk" value={t.credits.ekonomisk} small/>
                <CreditBar type="social" value={t.credits.social} small/>
                <CreditBar type="ekologisk" value={t.credits.ekologisk} small/>
                {danger&&t.alive&&<div style={{fontSize:10,color:"#dc2626",marginTop:4,fontStyle:"italic"}}>⚠ Kritisk nivå</div>}
              </div>
            );
          })}
        </div>
        <button onClick={onNext} style={S.primaryBtn}>Nästa omgång →</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ELIMINATION SCREEN
// ─────────────────────────────────────────────────────────────────────────────

function EliminationScreen({ eliminated, rankings, onContinue, isGameOver }) {
  return (
    <div style={S.page}>
      <div style={{...S.card,maxWidth:540,textAlign:"center"}}>
        <div style={{fontSize:52,marginBottom:8}}>{isGameOver?"🏆":"💀"}</div>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,color:"#1c1917",marginBottom:6}}>
          {isGameOver?"Tävlingen är slut!":"Utslagning!"}
        </h2>
        <p style={{fontSize:14,color:"#78716c",marginBottom:20}}>
          {eliminated.map(t=>t.name).join(", ")} har nått kritisk nivå i minst en hållbarhetsdimension.
        </p>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:24}}>
          {rankings.map((team,i)=>{
            const r=RESTAURANTS.find(x=>x.id===team.restaurantId);
            return(
              <div key={team.id} style={{display:"flex",alignItems:"center",gap:10,
                background:i===0?"#fef9c3":team.alive?"#f0fdf4":"#fef2f2",
                border:`1px solid ${i===0?"#fde047":team.alive?"#86efac":"#fca5a5"}`,
                borderRadius:10,padding:"10px 14px"}}>
                <span style={{fontSize:20,minWidth:28}}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":`${i+1}.`}</span>
                <span style={{fontSize:16}}>{r?.emoji}</span>
                <div style={{flex:1,textAlign:"left"}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,fontWeight:700}}>{team.name}</div>
                  <div style={{fontSize:11,color:"#78716c"}}>{r?.name} · 💰{team.credits.ekonomisk} 🤝{team.credits.social} 🌱{team.credits.ekologisk}</div>
                </div>
              </div>
            );
          })}
        </div>
        {!isGameOver&&<button onClick={onContinue} style={S.primaryBtn}>Fortsätt tävlingen →</button>}
        {isGameOver&&<button onClick={()=>window.location.reload()} style={S.primaryBtn}>Ny tävling →</button>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN CONTROLLER
// ─────────────────────────────────────────────────────────────────────────────

export default function SommelierChampionship() {
  const [screen,setScreen] = useState("intro");
  const [teams,setTeams] = useState([]);
  const [round,setRound] = useState(1);
  const [turnIndex,setTurnIndex] = useState(0);
  const [qQueue,setQQueue] = useState([]);
  const [currentQ,setCurrentQ] = useState(null);
  const [currentCrisis,setCurrentCrisis] = useState(null);
  const [earnedThisTurn,setEarnedThisTurn] = useState(null);
  const [phase,setPhase] = useState("question");
  const [rankings,setRankings] = useState([]);
  const [crisisPool,setCrisisPool] = useState([]);
  const [pendingTeams,setPendingTeams] = useState([]);

  const aliveTeams = teams.filter(t=>t.alive);

  function startGame(initialTeams) {
    setPendingTeams(initialTeams);
    setScreen("domainIntro");
  }

  function afterDomainIntro() {
    setTeams(pendingTeams);
    setScreen("lottery");
  }

  function afterLottery(assignedTeams) {
    const pool=shuffle([...QUESTIONS]);
    const crises=shuffle([...CRISIS_CARDS]);
    setTeams(assignedTeams);
    setQQueue(pool);
    setCrisisPool(crises);
    setRound(1);
    setTurnIndex(0);
    setCurrentQ(pool[0]);
    setPhase("question");
    setScreen("game");
  }

  function applyBonus(team,credits,domain) {
    const r=RESTAURANTS.find(x=>x.id===team.restaurantId);
    if(!r)return credits;
    const b={...credits};
    if(r.bonus==="social") b.social=(b.social||0)+15;
    if(r.bonus==="vetenskap"&&domain==="vetenskap") b.ekologisk=(b.ekologisk||0)+10;
    if(r.bonus==="ekologisk") b.ekologisk=(b.ekologisk||0)+10;
    if(r.bonus==="hantverk"&&domain==="hantverk"){
      if(r.id==="V1") b.social=(b.social||0)+10;
      if(r.id==="C3") b.ekonomisk=(b.ekonomisk||0)+10;
    }
    if(r.bonus==="estetisk"&&domain==="estetisk"){
      if(r.id==="C1") b.ekonomisk=(b.ekonomisk||0)+15;
      if(r.id==="Ö1") b.social=(b.social||0)+10;
    }
    if(r.id==="S1"&&domain==="vetenskap") b.social=(b.social||0)+15;
    return b;
  }

  function handleAnswer(correct,credits) {
    const team=aliveTeams[turnIndex];
    const r=RESTAURANTS.find(x=>x.id===team.restaurantId);
    if(correct){
      const bonused=applyBonus(team,credits,currentQ.domain);
      setEarnedThisTurn(bonused);
      setTeams(prev=>prev.map(t=>{
        if(t.id!==team.id)return t;
        const ekMax=r?.weakness?.includes("70")?70:r?.weakness?.includes("75")?75:200;
        return{...t,credits:{
          ekonomisk:clamp(t.credits.ekonomisk+(bonused.ekonomisk||0)),
          social:clamp(t.credits.social+(bonused.social||0)),
          ekologisk:clamp(t.credits.ekologisk+(bonused.ekologisk||0),0,ekMax),
        },correctAnswers:t.correctAnswers+1,totalAnswers:t.totalAnswers+1};
      }));
      setPhase("invest");
    } else {
      const penalty=(r?.weakness?.includes("Vetenskap-fel")&&currentQ.domain==="vetenskap")?15:5;
      setTeams(prev=>prev.map(t=>{
        if(t.id!==team.id)return t;
        const {ekonomisk,social,ekologisk}=t.credits;
        const minKey=[["ekonomisk",ekonomisk],["social",social],["ekologisk",ekologisk]].sort((a,b)=>a[1]-b[1])[0][0];
        return{...t,credits:{...t.credits,[minKey]:Math.max(0,t.credits[minKey]-penalty)},totalAnswers:t.totalAnswers+1};
      }));
      setEarnedThisTurn(null);
      advanceTurn();
    }
  }

  function handleInvestment(inv) {
    const team=aliveTeams[turnIndex];
    const r=RESTAURANTS.find(x=>x.id===team.restaurantId);
    if(inv){
      const ekBonus=r?.bonus==="ekologisk"?20:0;
      const ekMax=r?.weakness?.includes("70")?70:r?.weakness?.includes("75")?75:200;
      setTeams(prev=>prev.map(t=>{
        if(t.id!==team.id)return t;
        return{...t,credits:{
          ekonomisk:clamp(t.credits.ekonomisk-(inv.cost.ekonomisk||0)+(inv.reward.ekonomisk||0)),
          social:clamp(t.credits.social-(inv.cost.social||0)+(inv.reward.social||0)),
          ekologisk:clamp(t.credits.ekologisk-(inv.cost.ekologisk||0)+(inv.reward.ekologisk||0)+ekBonus,0,ekMax),
        },investments:[...t.investments,inv.id]};
      }));
    }
    advanceTurn();
  }

  function handleCrisis(correct,crisis) {
    const alive=teams.filter(t=>t.alive);
    const activeTeam=alive[turnIndex];
    const activeR=RESTAURANTS.find(x=>x.id===activeTeam.restaurantId);
    setTeams(prev=>prev.map(t=>{
      if(!t.alive)return t;
      const r=RESTAURANTS.find(x=>x.id===t.restaurantId);
      const inZone=r?.zone===activeR?.zone;
      const affects=crisis.target==="all"?true:crisis.target==="zone"?inZone:t.id===activeTeam.id;
      if(!affects)return t;
      if(correct){
        return{...t,credits:{
          ekonomisk:clamp(t.credits.ekonomisk+(crisis.saveBonus?.ekonomisk||0)),
          social:clamp(t.credits.social+(crisis.saveBonus?.social||0)),
          ekologisk:clamp(t.credits.ekologisk+(crisis.saveBonus?.ekologisk||0)),
        }};
      } else {
        const dbl=(r?.weakness?.includes("Ekologiska kriser kostar dubbelt")&&crisis.affects==="ekologisk")||(r?.weakness?.includes("Ekonomiska kriser kostar dubbelt")&&crisis.affects==="ekonomisk");
        const pen=dbl?crisis.amount*2:crisis.amount;
        return{...t,credits:{...t.credits,[crisis.affects]:Math.max(0,t.credits[crisis.affects]+pen)}};
      }
    }));
    setCurrentCrisis(null);
    advanceTurn();
  }

  function advanceTurn() {
    setPhase("question");
    setEarnedThisTurn(null);
    const alive=teams.filter(t=>t.alive);
    const next=turnIndex+1;
    if(next>=alive.length){
      if(round%2===0&&crisisPool.length>0){
        const [crisis,...rest]=crisisPool;
        setCrisisPool(rest);
        setCurrentCrisis(crisis);
        setTurnIndex(0);
        return;
      }
      setTimeout(()=>checkEliminations(round+1),100);
    } else {
      setTurnIndex(next);
      const qIdx=(round-1)*alive.length+next;
      setCurrentQ(qQueue[qIdx%qQueue.length]);
    }
  }

  function checkEliminations(nextRound) {
    setTeams(prev=>{
      const eliminated=prev.filter(t=>t.alive&&(
        t.credits.ekonomisk<=0||t.credits.social<=0||t.credits.ekologisk<=0||
        (RESTAURANTS.find(x=>x.id===t.restaurantId)?.weakness?.includes("Social-kris utlöses vid ≤20")&&t.credits.social<=20)
      ));
      if(!eliminated.length){
        setRound(nextRound);
        setTurnIndex(0);
        const nextAlive=prev.filter(t=>t.alive);
        const qIdx=(nextRound-1)*nextAlive.length;
        setCurrentQ(qQueue[qIdx%qQueue.length]);
        setScreen("roundSummary");
        return prev;
      }
      const rank=prev.filter(t=>!t.alive).length+eliminated.length;
      const newTeams=prev.map(t=>eliminated.some(e=>e.id===t.id)?{...t,alive:false,rank}:t);
      const sorted=[...newTeams].sort((a,b)=>{
        if(a.alive&&!b.alive)return -1;
        if(!a.alive&&b.alive)return 1;
        if(!a.alive&&!b.alive)return(a.rank||99)-(b.rank||99);
        return(b.credits.ekonomisk+b.credits.social+b.credits.ekologisk)-(a.credits.ekonomisk+a.credits.social+a.credits.ekologisk);
      });
      setRankings(sorted);
      setScreen("elimination");
      return newTeams;
    });
  }

  function continueAfterElim() {
    const alive=teams.filter(t=>t.alive);
    setTurnIndex(0);
    setCurrentQ(qQueue[((round-1)*alive.length)%qQueue.length]);
    setScreen("game");
  }

  const isGameOver=teams.filter(t=>t.alive).length<=1;

  if(screen==="intro") return <IntroScreen onStart={startGame}/>;
  if(screen==="domainIntro") return <DomainIntroScreen onDone={afterDomainIntro}/>;
  if(screen==="lottery") return <LotteryScreen teams={pendingTeams.length?pendingTeams:teams} onDone={afterLottery}/>;
  if(screen==="roundSummary") return <RoundSummary round={round-1} teams={teams} onNext={()=>setScreen("game")}/>;
  if(screen==="elimination") return <EliminationScreen eliminated={teams.filter(t=>!t.alive)} rankings={rankings} onContinue={continueAfterElim} isGameOver={isGameOver}/>;

  if(screen==="game"){
    if(currentCrisis) return <CrisisPhase crisis={currentCrisis} onDone={handleCrisis}/>;
    const team=aliveTeams[turnIndex];
    const restaurant=RESTAURANTS.find(x=>x.id===team?.restaurantId);
    if(!team||!restaurant||!currentQ) return <div style={S.page}><div style={S.card}>Laddar...</div></div>;

    const scoreboard=(
      <div style={{background:"#1c1917",color:"#fff",padding:"10px 16px",display:"flex",alignItems:"center",gap:12,overflowX:"auto",flexShrink:0}}>
        <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontWeight:700,color:"#f59e0b",whiteSpace:"nowrap"}}>Omgång {round}</span>
        {teams.filter(t=>t.alive).map(t=>{
          const r=RESTAURANTS.find(x=>x.id===t.restaurantId);
          const isActive=t.id===team.id;
          return(
            <div key={t.id} style={{display:"flex",gap:5,alignItems:"center",fontSize:11,padding:"3px 7px",borderRadius:7,
              background:isActive?"#f59e0b20":"transparent",border:isActive?"1px solid #f59e0b50":"1px solid transparent"}}>
              <span style={{fontSize:14}}>{r?.emoji}</span>
              <span style={{fontWeight:600}}>{t.name.split(" ").slice(-1)}</span>
              <span style={{color:"#fde68a"}}>💰{t.credits.ekonomisk}</span>
              <span style={{color:"#67e8f9"}}>🤝{t.credits.social}</span>
              <span style={{color:"#86efac"}}>🌱{t.credits.ekologisk}</span>
            </div>
          );
        })}
      </div>
    );

    if(phase==="question") return <div>{scoreboard}<QuestionPhase team={team} restaurant={restaurant} question={currentQ} onAnswer={handleAnswer}/></div>;
    if(phase==="invest") return <div>{scoreboard}<InvestmentPhase team={team} restaurant={restaurant} earnedCredits={earnedThisTurn} onDone={handleInvestment}/></div>;
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────────────────────

const S = {
  page:{minHeight:"100vh",background:"#f5f0e8",display:"flex",flexDirection:"column",alignItems:"center",padding:"28px 16px 64px",fontFamily:"'DM Sans',sans-serif"},
  card:{background:"#fff",border:"1px solid #e7e5e4",borderRadius:20,padding:"28px 32px",width:"100%",maxWidth:560,boxShadow:"0 4px 28px rgba(0,0,0,0.07)"},
  logoBadge:{display:"inline-block",background:"#1c1917",color:"#f59e0b",fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",padding:"5px 14px",borderRadius:99,marginBottom:14},
  heroTitle:{fontFamily:"'Cormorant Garamond',serif",fontSize:48,lineHeight:1.05,margin:"0 0 14px",color:"#1c1917",letterSpacing:"-1px"},
  input:{background:"#fafaf9",border:"1px solid #e7e5e4",borderRadius:8,padding:"9px 12px",fontSize:14,color:"#1c1917",fontFamily:"'DM Sans',sans-serif",outline:"none",width:"100%",boxSizing:"border-box"},
  primaryBtn:{background:"#1c1917",color:"#f5f0e8",border:"none",borderRadius:10,padding:"13px 28px",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",width:"100%",transition:"all 0.15s"},
};
