import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// RESTAURANTS — 12 lokaler i 4 zoner i Grythyttan
// ─────────────────────────────────────────────────────────────────────────────

const RESTAURANTS = [
  { id:"V1", zone:"V", name:"Järnvägshotellet", segment:"Bykrog",
    address:"Järnvägsgränden 2", emoji:"🚂",
    credits:{ekonomisk:90,social:65,ekologisk:30},
    bonus:"hantverk", bonusDesc:"+10 social på varje hantverk-svar",
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
// CRISIS CARDS
// ─────────────────────────────────────────────────────────────────────────────

const CRISIS_CARDS = [
  { id:"k1", title:"Dålig recension", icon:"📰",
    text:"Aftontidningen publicerar en kritisk recension av din vinlista. Alla gäster i din zon noterar.",
    target:"zone", affects:"social", amount:-20,
    question:"Hur bemöter du kritiken professionellt?",
    options:["Ignorera recensionen","Bjud in journalisten på en ny provning och demonstrera din kompetens","Sänk priserna omedelbart","Byt vinlista helt"],
    correct:1,
    explanation:"En öppen dialog och demonstrerad kompetens vänder negativ press till positiv synlighet. Proaktiv kommunikation är sommelierens starkaste verktyg.",
    saveBonus:{social:15} },
  { id:"k2", title:"Leverantörskris", icon:"🚛",
    text:"Din primära vinleverantör kan inte leverera inför helgens stora middag.",
    target:"self", affects:"ekonomisk", amount:-25,
    question:"Vilket alternativ räddar kvällen bäst?",
    options:["Stäng restaurangen","Ring en kollegas sommelier och samarbeta om reservlager","Servera bara öl","Köp från Systembolaget till butikspris"],
    correct:1,
    explanation:"Sommelier-nätverket är en resurs. Kollegialt samarbete i kris är praktiskt och bygger social hållbarhet på lång sikt.",
    saveBonus:{social:20,ekonomisk:10} },
  { id:"k3", title:"Extremväder", icon:"⛈️",
    text:"Ovädret skadar skörden hos din biodynamiska leverantör i Bergslagen. Priserna stiger.",
    target:"all", affects:"ekologisk", amount:-15,
    question:"Vilket svar är mest hållbart på lång sikt?",
    options:["Byt till billigare konventionell leverantör","Minska vinlistan och gå djupare med färre ekologiska producenter","Höj priserna på alla rätter","Ta bort vinlistan tillfälligt"],
    correct:1,
    explanation:"Hållbar inköpsstrategi handlar om djup snarare än bredd. Färre producenter med stark relation ger resiliens mot klimatstörningar.",
    saveBonus:{ekologisk:25} },
  { id:"k4", title:"VIP-gäst", icon:"⭐",
    text:"En känd matskribent bokar bord ikväll utan förvarning. Hela byn pratar om det.",
    target:"zone", affects:"social", amount:0,
    question:"Vilken crossmodal strategi väljer du för att maximera upplevelsen?",
    options:["Servera det dyraste vinet","Anpassa musik, ljus och serveringstempo till vinets karaktär och gästens förväntningar","Låt gästen välja själv utan guidning","Fokusera bara på maten"],
    correct:1,
    explanation:"Crichton-Fock's atmospheric influence: alla sinnesintryck i matsalen samverkar. En medveten sommelier orkestrerar helheten — inte bara glaset.",
    saveBonus:{social:30,ekonomisk:15} },
  { id:"k5", title:"Personalbrist", icon:"👤",
    text:"Din bartender är sjuk. Du måste sköta hela vinservicen ensam under en fullbokad kväll.",
    target:"self", affects:"social", amount:-15,
    question:"Vilken provningsteknik prioriterar du under tidspress?",
    options:["Hoppa över provningen helt","Använd WSET SAT — syn, doft, smak, slutsats — snabbt men konsekvent","Gissa baserat på etikett","Be kökschefen provsmaka"],
    correct:1,
    explanation:"WSET SAT är designad för effektivitet utan att kompromissa med precision. En tränad sommelier gör en korrekt bedömning på under 60 sekunder.",
    saveBonus:{social:20} },
  { id:"k6", title:"Hållbarhetsrevision", icon:"🌱",
    text:"Kommunen granskar alla restaurangers miljöprofil inför utmärkelsen 'Årets Hållbara Krog'.",
    target:"all", affects:"ekologisk", amount:0,
    question:"Vilket initiativ ger störst ekologisk trovärdighet?",
    options:["Sätt upp en grön blomma i fönstret","Dokumentera hela vinlistans CO₂-avtryck och erbjud gästen ett klimatval","Köp klimatkompensation","Byt alla glas mot återvunnet material"],
    correct:1,
    explanation:"Transparens och gästens möjlighet att göra aktiva val är kärnan i social-ekologisk hållbarhet. Dokumentation ger även konkurrensfördelar.",
    saveBonus:{ekologisk:30,social:10} },
  { id:"k7", title:"Naturvinsfestival", icon:"🍾",
    text:"Grythyttan arrangerar sin första naturvinsfestival. Alla restauranger konkurrerar om uppmärksamheten.",
    target:"zone", affects:"ekonomisk", amount:0,
    question:"Hur positionerar du din restaurang under festivalen?",
    options:["Sänk alla priser","Curera en tematisk provning med storytelling om producenten och terroir","Kopiera grannens meny","Ta ledigt under festivalen"],
    correct:1,
    explanation:"Terroir-kommunikation och curated experiences differentierar. Gäster betalar premium för berättelsen bakom flaskan — inte bara vinet i glaset.",
    saveBonus:{ekonomisk:25,social:20} },
  { id:"k8", title:"Allergikris", icon:"⚠️",
    text:"En gäst reagerar på ett vin som innehöll osmärkt äggvita (kolningsmedel). Situationen eskalerar.",
    target:"self", affects:"social", amount:-30,
    question:"Vad borde du ha gjort INNAN servering?",
    options:["Ingenting — det är producentens ansvar","Kommunicerat alla klarningsmedel proaktivt och haft alternativ redo för allergiker","Serverat bara naturvin","Frågat alla gäster om allergier vid bokning"],
    correct:1,
    explanation:"Social hållbarhet innebär inkludering. En ansvarsfull sommelier känner sin vinlista och kommunicerar proaktivt — inte reaktivt.",
    saveBonus:{social:25} },
];

// ─────────────────────────────────────────────────────────────────────────────
// QUESTIONS
// ─────────────────────────────────────────────────────────────────────────────

const QUESTIONS = [
  { id:"v1", domain:"vetenskap",
    text:"Vilket påstående förklarar bäst varför ett syrligt vin passar till en fet rätt?",
    options:["Syran förstärker fettets arom","Syran skär igenom fettet och rensar gommen","Syran minskar tannininnehållet","Syran gör rätten sötare"],
    correct:1, difficulty:1,
    explanation:"Hög syra fungerar som citronsaft — skär igenom fett och återställer gommens känslighet (palate cleansing).",
    credits:{ekonomisk:20,social:10,ekologisk:5} },
  { id:"v2", domain:"vetenskap",
    text:"Vad menas med 'tanninbindning' i mat och vin?",
    options:["Tanniner löser upp sig i maten","Tanniner reagerar med proteiner och minskar sin strävhet","Tanniner förstärker sötma","Tanniner blockerar umami"],
    correct:1, difficulty:1,
    explanation:"Tanniner binder till proteiner i mat. Proteinet 'tar hand om' tanninet — strävheten minskar och vinet upplevs mjukare.",
    credits:{ekonomisk:20,social:5,ekologisk:10} },
  { id:"v3", domain:"vetenskap",
    text:"Vilken druvsort är känd för hög syra, låg alkohol och petrolnyanser vid mognad?",
    options:["Chardonnay","Viognier","Riesling","Gewurztraminer"],
    correct:2, difficulty:2,
    explanation:"Riesling är en av vinvärldens mest åldringsvärdiga vita druvor. Petrolton (TDN) utvecklas med åren.",
    credits:{ekonomisk:25,social:5,ekologisk:5} },
  { id:"v4", domain:"vetenskap",
    text:"Vad är 'retronasal olfaktion' och varför är det viktigt vid dryckeskombinering?",
    options:["Lukten via näsan utifrån — irrelevant vid kombination","Aromer som stiger upp via halsen under tuggning — avgörande för helhetssmaken","En teknik för att bedöma vinets färg","Metoden att värma vin före provning"],
    correct:1, difficulty:2,
    explanation:"Retronasal olfaktion = aromer bakvägen via svalget. Detta är 'smak' till 80%. Kombinering handlar om att harmonisera retronasal arom.",
    credits:{ekonomisk:15,social:15,ekologisk:5} },
  { id:"v5", domain:"vetenskap",
    text:"Enligt WSET SAT — i vilken ordning bedöms ett vin?",
    options:["Smak → Doft → Syn","Syn → Doft → Smak → Slutsats","Doft → Syn → Smak","Smak → Slutsats → Doft"],
    correct:1, difficulty:1,
    explanation:"WSET SAT: Appearance → Nose → Palate → Conclusions. Strukturen säkerställer objektiv bedömning utan att tidigare intryck påverkar.",
    credits:{ekonomisk:20,social:10,ekologisk:5} },
  { id:"v6", domain:"vetenskap",
    text:"Vilken hållbarhetscertifiering är vanligast bland progressiva vinkällare i Nya Världen?",
    options:["AOC","Biodynamisk (Demeter)","Fairtrade","RSPO"],
    correct:1, difficulty:2,
    explanation:"Biodynamisk odling (Demeter) behandlar vingården som ett slutet ekosystem. Allt fler producenter söker denna certifiering.",
    credits:{ekonomisk:10,social:10,ekologisk:30} },
  { id:"v7", domain:"vetenskap",
    text:"Vad beskriver 'Food & Beverage Pyramid' (Harrington)?",
    options:["Kaloripyramid för restaurangmenyer","En hierarki från grundsmaker → textur → flavours som vägledning för kombination","Prismodell för dryckessortiment","Vinregionernas geografiska fördelning"],
    correct:1, difficulty:3,
    explanation:"Harringtons pyramid börjar med grundsmaker (bas), bygger via textur och kulminerar i flavours. Varje nivå kräver harmoni.",
    credits:{ekonomisk:20,social:15,ekologisk:5} },
  { id:"h1", domain:"hantverk",
    text:"En gäst beställer Châteaubriand. Vilken serveringstemperatur är korrekt för ett ungt Bordeaux?",
    options:["8–10°C","12–14°C","16–18°C","20–22°C"],
    correct:2, difficulty:1,
    explanation:"Fylliga röda serveras vid 16–18°C. Varmare dämpar frukten; kallare döljer komplexiteten och framhäver tanniner.",
    credits:{ekonomisk:25,social:10,ekologisk:5} },
  { id:"h2", domain:"hantverk",
    text:"När är dekantering INTE rekommenderad?",
    options:["Ungt tanninrikt rödvin","Äldre Bourgogne med fin sediment","Kraftig Barolo från 2015","Australiensisk Shiraz 2 år på fat"],
    correct:1, difficulty:2,
    explanation:"Äldre känsliga viner riskerar att kollapsa vid för lång dekantering. Sediment avskiljs försiktigt men exponering mot syre hålls minimal.",
    credits:{ekonomisk:20,social:15,ekologisk:5} },
  { id:"h3", domain:"hantverk",
    text:"En gäst klagar på att ett glasvin 'smakar platt'. Vad gör du FÖRST?",
    options:["Byt hela flaskan","Kontrollera glaset — diskmedelsrester dödar mousse och arom","Tillsätt is","Förklara att det är vinets karaktär"],
    correct:1, difficulty:1,
    explanation:"Diskmedelsrester är den vanligaste orsaken till platt champagne. Kontrollera alltid glaset och skölj vid behov.",
    credits:{ekonomisk:15,social:25,ekologisk:5} },
  { id:"h4", domain:"hantverk",
    text:"Vilken ordning är korrekt vid en formell vinprovning vid bordet?",
    options:["Röda → Vita → Rosé → Mousserande","Mousserande → Lätta vita → Fylliga vita → Lätta röda → Fylliga röda → Dessertviner","Söta → Torra → Mousserande","Kronologisk årgångsordning"],
    correct:1, difficulty:2,
    explanation:"Progressionen: torrt → sött, lätt → fylligt, vitt → rött. Mousserande öppnar gommen. Dessertviner sist.",
    credits:{ekonomisk:20,social:20,ekologisk:5} },
  { id:"h5", domain:"hantverk",
    text:"En vegetarisk gäst frågar om ett naturvin. Vad stämmer?",
    options:["Naturvin är alltid veganskt certifierat","Naturvin kan innehålla äggvita eller mjölkprotein om vinaren klarnar traditionellt","Naturvin görs uteslutande av biodynamiska druvor","Naturvin har alltid lägre alkohol"],
    correct:1, difficulty:2,
    explanation:"Traditionella klarningsmedel (äggvita, gelatine) kan förekomma. Kommunicera tydligt och kontakta producenten vid osäkerhet.",
    credits:{ekonomisk:10,social:30,ekologisk:10} },
  { id:"h6", domain:"hantverk",
    text:"Vilket är det MEST effektiva steget för att minska vinlistans koldioxidavtryck?",
    options:["Byta till skruvkork","Prioritera lokala producenter samt bag-in-box för husviner","Sluta servera mousserande","Servera allt i mindre glas"],
    correct:1, difficulty:2,
    explanation:"Transport + förpackning är störst. Lokala producenter + bag-in-box (70% lägre CO₂ per liter) ger störst ekologisk vinst.",
    credits:{ekonomisk:5,social:10,ekologisk:40} },
  { id:"e1", domain:"estetisk",
    text:"Forskning om 'crossmodal correspondence' (Spence) visar att musik påverkar vinupplevelsen. Vad stämmer?",
    options:["Musik har ingen bevisad effekt","Hög, ljus musik kan framhäva upplevd sötma och elegans i vin","Tung rockmusik förstärker tanniner positivt","Musik påverkar bara atmosfären, inte smaken"],
    correct:1, difficulty:2,
    explanation:"Spence (Oxford): ljus, hög musik framhäver sötma medan lägre, rundare ljud framhäver bitterhet. Crossmodal correspondence är vetenskapligt belagd.",
    credits:{ekonomisk:10,social:20,ekologisk:5} },
  { id:"e2", domain:"estetisk",
    text:"En VIP-gäst firar 50-årsdag. Vilket tillvägagångssätt är BÄST?",
    options:["Välj det dyraste vinet automatiskt","Fråga diskret om preferenser, årgångsåret och personlig koppling till en region","Servera alltid Pétrus vid speciella tillfällen","Låt kökschefen bestämma"],
    correct:1, difficulty:2,
    explanation:"Estetisk gestaltning börjar med lyssning. Personalisering och berättelsen skapar emotionell resonans som överstiger prisets påverkan.",
    credits:{ekonomisk:20,social:35,ekologisk:5} },
  { id:"e3", domain:"estetisk",
    text:"Vilket begrepp beskriver hur gästens förväntningar FÖRE måltiden påverkar smakupplevelsen?",
    options:["Retronasal olfaktion","Kognitiv dissonans","Expectation bias — multisensorisk priming","Palate fatigue"],
    correct:2, difficulty:3,
    explanation:"En välskriven menytext och sommelierens kommunikation aktiverar expectation priming som förändrar hur gästen upplever smaken.",
    credits:{ekonomisk:10,social:25,ekologisk:5} },
  { id:"e4", domain:"estetisk",
    text:"En sommelier vill gestalta en 'terroir-upplevelse' vid bordet. Vad är kärnan?",
    options:["Alltid servera vin och mat från samma region","Berätta vinets historia, plats och odlarens filosofi så gästen smakar med hela sin kulturella förståelse","Använda geografiska kartor som bordsdekoration","Servera i traditionella lokala glas"],
    correct:1, difficulty:3,
    explanation:"Terroir-upplevelse är kommunikativ. När gästen förstår platsens historia aktiveras fler kognitiva lager — vinet smakar mer komplext.",
    credits:{ekonomisk:15,social:30,ekologisk:10} },
  { id:"e5", domain:"estetisk",
    text:"Vilken åtgärd har STÖRST social hållbarhetseffekt i en sommeliers dagliga arbete?",
    options:["Erbjuda alkoholfria alternativ med lika stor omsorg som vinmenyn","Minska vinlistan","Höja priset på naturvin","Ta bort glasvinsmenyn"],
    correct:0, difficulty:2,
    explanation:"Social hållbarhet innebär inkludering. Alkoholfria parningar med samma presentation signalerar att alla gäster är välkomna — och öppnar nya affärsmöjligheter.",
    credits:{ekonomisk:15,social:40,ekologisk:10} },
  { id:"e6", domain:"estetisk",
    text:"Vad menas med 'atmospheric influence' i Crichton-Focks multisensoriska måltidsmodell?",
    options:["Luftkonditioneringens effekt på vintemperatur","Hur rummets ljus, ljud, doft och temperatur skapar en emotionell kontext som färgar smakupplevelsen","Effekten av höjd på vinets kolsyra","Ventilationssystemets inverkan på vinkällaren"],
    correct:1, difficulty:3,
    explanation:"Crichton-Fock (ORU): alla sinnesintryck i matsalen samverkar och skapar en stämningsbas som gästen omedvetet applicerar på mat och dryck.",
    credits:{ekonomisk:10,social:25,ekologisk:10} },
];

const INVESTMENTS = [
  { id:"i1", name:"Biodynamisk vingård", icon:"🌿", cat:"ekologisk",
    desc:"Exklusivt samarbete med certifierad biodynamisk producent",
    cost:{ekonomisk:30,social:0,ekologisk:10}, reward:{ekonomisk:0,social:15,ekologisk:40} },
  { id:"i2", name:"Sommelierutbildning", icon:"🎓", cat:"social",
    desc:"Sänd en medarbetare på WSET Level 3",
    cost:{ekonomisk:40,social:0,ekologisk:0}, reward:{ekonomisk:20,social:25,ekologisk:0} },
  { id:"i3", name:"Bag-in-box husviner", icon:"♻️", cat:"ekologisk",
    desc:"Byt husviner till hållbara förpackningar — 70% lägre CO₂",
    cost:{ekonomisk:15,social:0,ekologisk:0}, reward:{ekonomisk:10,social:5,ekologisk:30} },
  { id:"i4", name:"Alkoholfri parningmeny", icon:"🫧", cat:"social",
    desc:"Lansera en komplett alkoholfri parningsmeny",
    cost:{ekonomisk:20,social:10,ekologisk:0}, reward:{ekonomisk:25,social:40,ekologisk:5} },
  { id:"i5", name:"Terroir-event", icon:"🗺️", cat:"ekonomisk",
    desc:"Arrangera en producentmiddag med storytelling och terroir-kommunikation",
    cost:{ekonomisk:25,social:15,ekologisk:0}, reward:{ekonomisk:35,social:30,ekologisk:0} },
  { id:"i6", name:"Lokal vinregion", icon:"🏔️", cat:"ekologisk",
    desc:"Bygg en vinlista enbart på svenska och nordiska producenter",
    cost:{ekonomisk:10,social:0,ekologisk:20}, reward:{ekonomisk:15,social:20,ekologisk:25} },
];

const DOMAIN_META = {
  vetenskap: { label:"Vetenskap",            icon:"📚", color:"#1e4a8a", bg:"#eef2fb" },
  hantverk:  { label:"Hantverk",             icon:"🍷", color:"#8a4010", bg:"#fef3e2" },
  estetisk:  { label:"Estetisk gestaltning", icon:"✨", color:"#5a2890", bg:"#f3eeff" },
};

const CREDIT_META = {
  ekonomisk: { label:"Ekonomisk", icon:"💰", color:"#b45309", bg:"#fffbeb", bar:"#f59e0b" },
  social:    { label:"Social",    icon:"🤝", color:"#0e7490", bg:"#ecfeff", bar:"#06b6d4" },
  ekologisk: { label:"Ekologisk", icon:"🌱", color:"#15803d", bg:"#f0fdf4", bar:"#22c55e" },
};

function shuffle(a) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

function clamp(v, min = 0, max = 200) {
  return Math.max(min, Math.min(max, v));
}

// ─────────────────────────────────────────────────────────────────────────────
// MAP COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function GameMap({ teams, activeRestaurantId, onSelect, lotteryMode }) {
  const pinColors = { V:"#1e4a8a", C:"#8a5010", Ö:"#7a2e10", S:"#1a6040" };

  return (
    <svg width="100%" viewBox="0 0 680 860" style={{display:"block",borderRadius:12,border:"0.5px solid #d6d3d1"}}>
      <rect width="680" height="860" fill="#edeae2"/>
      <rect x="12" y="12" width="656" height="836" fill="#f0ece4" rx="2"/>

      {/* Zone fills */}
      <polygon points="12,88 228,88 228,608 12,748" fill="#dce8f6" opacity="0.45"/>
      <polygon points="228,88 468,88 468,608 228,608" fill="#f4eedf" opacity="0.42"/>
      <polygon points="468,88 668,88 668,568 468,568" fill="#f0e4d8" opacity="0.42"/>
      <polygon points="12,748 228,608 468,608 468,568 668,568 668,848 12,848" fill="#d8eed8" opacity="0.42"/>

      {/* Zone dividers */}
      <path d="M228 88 L228 608" stroke="#b8b0a4" strokeWidth="0.8" strokeDasharray="6,4" fill="none"/>
      <path d="M468 88 L468 568" stroke="#b8b0a4" strokeWidth="0.8" strokeDasharray="6,4" fill="none"/>
      <path d="M12 608 L228 608 L468 608 L468 568 L668 568" stroke="#b8b0a4" strokeWidth="0.6" strokeDasharray="5,3" fill="none"/>
      <path d="M12 748 L228 608" stroke="#b8b0a4" strokeWidth="0.6" strokeDasharray="5,3" fill="none"/>

      {/* Zone labels */}
      <text x="40"  y="108" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="#1e4a8a" opacity="0.8" letterSpacing="1.5">ZON V — VÄST</text>
      <text x="292" y="108" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="#8a5010" opacity="0.8" letterSpacing="1.5">ZON C — CENTRUM</text>
      <text x="474" y="108" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="#7a2e10" opacity="0.8" letterSpacing="1.5">ZON Ö — ÖST</text>
      <text x="40"  y="768" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="#1a6040" opacity="0.8" letterSpacing="1.5">ZON S — SJÖ</text>

      {/* Lake */}
      <ellipse cx="518" cy="736" rx="112" ry="68" fill="#b8d8e8" stroke="#96c0d4" strokeWidth="0.8"/>
      <ellipse cx="518" cy="736" rx="108" ry="64" fill="#c4e0ec"/>
      <text x="518" y="740" fontFamily="serif" fontSize="8" fill="#4a7888" textAnchor="middle">Grythytteviken</text>

      {/* Green areas */}
      <rect x="26" y="548" width="70" height="58" fill="#d4e8c2" rx="2"/>
      <rect x="72" y="174" width="76" height="46" fill="#d4e8c2" rx="2"/>
      <rect x="374" y="88" width="58" height="38" fill="#d4e8c2" rx="2"/>

      {/* City blocks */}
      {[[106,246,46,26],[160,246,38,26],[106,282,50,22],[164,282,32,22],
        [254,246,46,30],[308,246,42,30],[362,246,44,30],
        [254,340,42,30],[306,340,46,30],[360,340,38,30],[406,340,38,30],
        [476,186,72,42],[476,240,72,34],
        [106,416,52,26],[164,416,42,26],
        [64,356,38,24],[64,390,38,24],
        [254,462,46,30],[308,462,42,30],[254,506,42,26]
      ].map(([x,y,w,h],i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill="#e0dbd0" stroke="#ccc8be" strokeWidth="0.5" rx="1"/>
      ))}

      {/* Main roads */}
      <path d="M12 336 L668 336" fill="none" stroke="#a4a09a" strokeWidth="7.5" strokeLinecap="round"/>
      <path d="M296 86 L296 800" fill="none" stroke="#a4a09a" strokeWidth="7.5" strokeLinecap="round"/>

      {/* Secondary roads */}
      {["M12 228 L668 228","M12 454 L548 454","M166 86 L166 568","M438 86 L438 546",
        "M12 546 L358 546","M78 136 L78 798","M558 136 L558 562","M12 136 L668 136",
        "M12 668 L418 668","M116 798 L438 798","M166 136 L78 336","M558 136 L646 336",
        "M78 454 L78 546","M166 454 L166 568","M296 668 L296 798",
        "M438 546 L438 668","M558 454 L558 562","M78 668 L78 798"
      ].map((d,i) => (
        <path key={i} d={d} fill="none" stroke="#bcb8b0" strokeWidth="4" strokeLinecap="round"/>
      ))}

      {/* Road labels */}
      <text x="192" y="330" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle">Nygatan</text>
      <text x="498" y="330" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle">Prästgatan</text>
      <text x="291" y="190" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,291,190)">Kyrkogatan</text>
      <text x="291" y="508" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,291,508)">Smedsgatan</text>
      <text x="161" y="398" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,161,398)">Hammargatan</text>
      <text x="433" y="393" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,433,393)">Sjögatan</text>
      <text x="73"  y="448" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,73,448)">Skolgatan</text>
      <text x="553" y="398" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,553,398)">Hyttgatan</text>
      <text x="553" y="193" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,553,193)">Breviksvägen</text>
      <text x="73"  y="218" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,73,218)">Stationsgatan</text>
      <text x="73"  y="318" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,73,318)">Västra Bergvägen</text>
      <text x="208" y="663" fontFamily="sans-serif" fontSize="8" fill="#a09890">Carl Jans väg</text>
      <text x="258" y="793" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle">Kyrkbacken</text>
      <text x="73"  y="728" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,73,728)">Bergsmansvägen</text>
      <text x="291" y="728" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,291,728)">Mjölnarvägen</text>
      <text x="433" y="608" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,433,608)">Källaregränd</text>
      <text x="161" y="508" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,161,508)">Järnvägsgränden</text>
      <text x="553" y="510" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,553,510)">Koppargränd</text>
      <text x="161" y="133" fontFamily="sans-serif" fontSize="8" fill="#a09890" textAnchor="middle" transform="rotate(90,161,133)">Smedsbacken</text>

      {/* Torget */}
      <circle cx="296" cy="336" r="15" fill="#ddd6c6" stroke="#b8b0a2" strokeWidth="0.8"/>
      <text x="296" y="332" fontFamily="serif" fontSize="6.5" fill="#6b6358" textAnchor="middle">TORGET</text>
      <text x="296" y="343" fontFamily="sans-serif" fontSize="5.5" fill="#9c9488" textAnchor="middle">centrum</text>

      {/* Restaurant pins */}
      {RESTAURANTS.map(r => {
        const team = teams?.find(t => t.restaurantId === r.id);
        const isActive = r.id === activeRestaurantId;
        const isTaken = !!team;
        const pc = pinColors[r.zone];
        const isElim = team && !team.alive;
        return (
          <g key={r.id}
            onClick={() => lotteryMode && !isTaken && onSelect && onSelect(r.id)}
            style={{cursor: lotteryMode && !isTaken ? "pointer" : "default"}}>
            <circle cx={r.cx} cy={r.cy} r={isActive ? 14 : 11}
              fill={isElim ? "#9ca3af" : pc}
              stroke={isActive ? "#f59e0b" : "white"}
              strokeWidth={isActive ? 2.5 : 1.5}
              opacity={isElim ? 0.5 : 1}/>
            <circle cx={r.cx} cy={r.cy} r={isActive ? 8 : 6}
              fill={isElim ? "#d1d5db" : pc}
              opacity={isElim ? 0.5 : 0.65}/>
            <text x={r.cx} y={r.cy + 4} fontFamily="sans-serif" fontSize="7"
              fontWeight="700" fill="white" textAnchor="middle">{r.id}</text>
            {isTaken && !isElim && (
              <text x={r.cx} y={r.cy - 17} fontFamily="sans-serif" fontSize="7"
                fill={pc} textAnchor="middle" fontWeight="600">
                {team.name.split(" ")[0]}
              </text>
            )}
            {lotteryMode && !isTaken && (
              <circle cx={r.cx} cy={r.cy} r={isActive ? 14 : 11}
                fill="transparent" stroke={pc} strokeWidth="2" opacity="0.4"/>
            )}
          </g>
        );
      })}

      {/* Title */}
      <text x="340" y="40" fontFamily="serif" fontSize="16" fontWeight="600" fill="#2c2c2a" textAnchor="middle" letterSpacing="1">Grythyttan</text>
      <text x="340" y="56" fontFamily="sans-serif" fontSize="7" fill="#a8a49c" textAnchor="middle" letterSpacing="2">SOMMELIER CHAMPIONSHIP</text>

      {/* Compass */}
      <g transform="translate(632,92)">
        <circle cx="0" cy="0" r="13" fill="white" stroke="#c4beb4" strokeWidth="0.5"/>
        <path d="M0,-9 L2.2,3.5 L0,1 L-2.2,3.5 Z" fill="#2c2c2a"/>
        <path d="M0,9 L2.2,-3.5 L0,-1 L-2.2,-3.5 Z" fill="#c8c4bc"/>
        <text x="0" y="-12" fontFamily="sans-serif" fontSize="7" fill="#2c2c2a" textAnchor="middle">N</text>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CREDIT BAR
// ─────────────────────────────────────────────────────────────────────────────

function CreditBar({ type, value, small }) {
  const m = CREDIT_META[type];
  const pct = Math.min(100, (value / 100) * 100);
  const danger = value <= 20;
  return (
    <div style={{marginBottom: small ? 4 : 6}}>
      <div style={{display:"flex", justifyContent:"space-between", fontSize: small ? 10 : 11, marginBottom:2}}>
        <span style={{color: danger ? "#dc2626" : m.color, fontWeight:600}}>{m.icon} {m.label}</span>
        <span style={{fontWeight:700, color: danger ? "#dc2626" : "#1c1917"}}>{value}</span>
      </div>
      <div style={{height: small ? 4 : 6, background:"#e7e5e4", borderRadius:99, overflow:"hidden"}}>
        <div style={{width:`${pct}%`, height:"100%", borderRadius:99,
          background: danger ? "#ef4444" : m.bar, transition:"width 0.6s ease"}}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INTRO SCREEN
// ─────────────────────────────────────────────────────────────────────────────

function IntroScreen({ onStart }) {
  const [numTeams, setNumTeams] = useState(4);
  const [names, setNames] = useState(
    Array.from({length:12}, (_,i) => `Sommelier ${i+1}`)
  );

  return (
    <div style={S.page}>
      <div style={{...S.card, maxWidth:680}}>
        <div style={S.logoBadge}>Sommelier Championship</div>
        <h1 style={S.heroTitle}>La Grande<br/>Compétition</h1>
        <p style={{fontSize:14, color:"#78716c", lineHeight:1.8, marginBottom:24, maxWidth:520}}>
          Sommelierer driver restauranger i Grythyttan och tävlar om credits genom
          <strong style={{color:"#b45309"}}> Vetenskap</strong>,
          <strong style={{color:"#6d28d9"}}> Hantverk</strong> och
          <strong style={{color:"#0891b2"}}> Estetisk gestaltning</strong>.
          Credits investeras i social, ekonomisk och ekologisk hållbarhet.
          Kriskort slår hårt — och asymmetriskt. Noll i en dimension: <strong>utslaget.</strong>
        </p>

        <div style={{marginBottom:20}}>
          <label style={{fontSize:13, fontWeight:600, color:"#57534e"}}>Antal sommelierer: {numTeams}</label>
          <input type="range" min={2} max={12} step={1} value={numTeams}
            onChange={e => setNumTeams(+e.target.value)}
            style={{width:"100%", marginTop:6}}/>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:28}}>
          {Array.from({length:numTeams}).map((_,i) => (
            <input key={i} value={names[i]} placeholder={`Sommelier ${i+1}`}
              onChange={e => {const n=[...names]; n[i]=e.target.value; setNames(n);}}
              style={S.input}/>
          ))}
        </div>

        <div style={{marginBottom:28}}>
          <div style={{fontSize:11, fontWeight:700, color:"#78716c", letterSpacing:1,
            textTransform:"uppercase", marginBottom:12}}>Spelplanen — Grythyttan</div>
          <GameMap teams={[]} lotteryMode={false}/>
        </div>

        <button onClick={() => onStart(
          Array.from({length:numTeams}).map((_,i) => ({
            id:`team${i}`, name:names[i] || `Sommelier ${i+1}`,
            restaurantId:null, alive:true, rank:null,
            credits:{ekonomisk:0, social:0, ekologisk:0},
            correctAnswers:0, totalAnswers:0, investments:[],
          }))
        )} style={S.primaryBtn}>Lotta ut restauranger →</button>
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
    const newAssigned = {...assigned, [current.id]: rId};
    setAssigned(newAssigned);
    setFlash(rId);
    setTimeout(() => {
      setFlash(null);
      if (currentIdx + 1 >= teams.length) {
        setDone(true);
      } else {
        setCurrentIdx(i => i+1);
      }
    }, 1000);
  }

  function finish() {
    const result = teams.map(t => {
      const r = RESTAURANTS.find(x => x.id === assigned[t.id]);
      return {...t, restaurantId: r.id, credits: {...r.credits}};
    });
    onDone(result);
  }

  const displayTeams = teams.map((t,i) => i < currentIdx || done
    ? {...t, restaurantId: assigned[t.id], alive:true}
    : t
  );

  return (
    <div style={S.page}>
      <div style={{...S.card, maxWidth:720}}>
        <div style={{textAlign:"center", marginBottom:20}}>
          <div style={S.logoBadge}>Lottning</div>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif", fontSize:26, color:"#1c1917", margin:"8px 0 4px"}}>
            {done ? "Alla restauranger lottade!" : "Välj din restaurang på kartan"}
          </h2>
          {!done && (
            <p style={{fontSize:15, color:"#78716c", margin:0}}>
              <strong style={{color:"#1c1917"}}>{current?.name}</strong> — klicka på en ledig lokal (färgad pin)
            </p>
          )}
        </div>

        <GameMap
          teams={displayTeams}
          activeRestaurantId={flash}
          lotteryMode={!done}
          onSelect={pickRestaurant}
        />

        {done && (
          <>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, margin:"20px 0"}}>
              {teams.map(t => {
                const r = RESTAURANTS.find(x => x.id === assigned[t.id]);
                const z = ZONES[r?.zone];
                return (
                  <div key={t.id} style={{background:z?.light||"#fafaf9",
                    border:`1px solid ${z?.color}30`, borderRadius:12, padding:"12px 14px"}}>
                    <div style={{display:"flex", gap:8, alignItems:"center", marginBottom:8}}>
                      <span style={{fontSize:22}}>{r?.emoji}</span>
                      <div>
                        <div style={{fontFamily:"'Cormorant Garamond',serif", fontSize:15, fontWeight:700}}>{t.name}</div>
                        <div style={{fontSize:12, color:z?.color, fontWeight:600}}>{r?.name} — {r?.segment}</div>
                        <div style={{fontSize:11, color:"#78716c"}}>{r?.address}</div>
                      </div>
                    </div>
                    <div style={{fontSize:11, color:"#059669", background:"#d1fae5",
                      padding:"4px 8px", borderRadius:6, marginBottom:4}}>
                      ✦ {r?.bonusDesc}
                    </div>
                    <div style={{fontSize:11, color:"#dc2626", background:"#fee2e2",
                      padding:"4px 8px", borderRadius:6}}>
                      ⚠ {r?.weakness}
                    </div>
                    <div style={{display:"flex", gap:4, marginTop:8}}>
                      {["ekonomisk","social","ekologisk"].map(type => (
                        <span key={type} style={{background:CREDIT_META[type].bg,
                          color:CREDIT_META[type].color, border:`1px solid ${CREDIT_META[type].color}25`,
                          fontSize:10, fontWeight:700, padding:"2px 7px", borderRadius:99}}>
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
  const isCorrect = selected === crisis.correct;

  return (
    <div style={S.page}>
      <div style={{...S.card, maxWidth:600}}>
        <div style={{textAlign:"center", marginBottom:20}}>
          <div style={{fontSize:48, marginBottom:8}}>{crisis.icon}</div>
          <div style={{display:"inline-block", background:"#fee2e2", color:"#991b1b",
            fontSize:11, fontWeight:700, padding:"4px 12px", borderRadius:99,
            letterSpacing:1, textTransform:"uppercase", marginBottom:10}}>
            Kriskort
          </div>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif", fontSize:24,
            color:"#1c1917", margin:"0 0 8px"}}>{crisis.title}</h2>
          <p style={{fontSize:14, color:"#57534e", lineHeight:1.7, marginBottom:4}}>{crisis.text}</p>
          <div style={{fontSize:12, color:"#78716c", fontStyle:"italic"}}>
            {crisis.target==="all"   ? "Drabbar ALLA lag" :
             crisis.target==="zone"  ? "Drabbar alla lag i samma zon" :
             "Drabbar det aktiva laget"}
            {crisis.amount < 0 && (
              <span style={{color:"#dc2626", fontWeight:700}}>
                {" · "}{crisis.amount} {CREDIT_META[crisis.affects]?.icon}
              </span>
            )}
          </div>
        </div>

        <div style={{background:"#fffbeb", border:"1px solid #fde68a",
          borderRadius:12, padding:"14px 16px", marginBottom:18}}>
          <p style={{fontSize:15, color:"#1c1917", margin:0,
            fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", lineHeight:1.7}}>
            {crisis.question}
          </p>
        </div>

        <div style={{display:"flex", flexDirection:"column", gap:8, marginBottom:18}}>
          {crisis.options.map((opt,i) => {
            let bg="#fafaf9", border="#e7e5e4", color="#1c1917";
            if (revealed) {
              if (i === crisis.correct) { bg="#d1fae5"; border="#34d399"; color="#065f46"; }
              else if (i === selected)  { bg="#fee2e2"; border="#f87171"; color="#7f1d1d"; }
            }
            return (
              <button key={i} onClick={() => { if (!revealed) { setSelected(i); setRevealed(true); }}}
                style={{background:bg, border:`1.5px solid ${border}`, borderRadius:10,
                  padding:"12px 16px", textAlign:"left",
                  cursor: revealed ? "default" : "pointer",
                  fontSize:14, color, fontFamily:"sans-serif",
                  transition:"all 0.2s", display:"flex", gap:10, alignItems:"flex-start"}}>
                <span style={{fontWeight:700, minWidth:20, opacity:0.6}}>{["A","B","C","D"][i]}</span>
                {opt}
                {revealed && i === crisis.correct && <span style={{marginLeft:"auto"}}>✓</span>}
                {revealed && i === selected && i !== crisis.correct && <span style={{marginLeft:"auto"}}>✗</span>}
              </button>
            );
          })}
        </div>

        {revealed && (
          <>
            <div style={{background:"#fffbeb", border:"1px solid #fde68a",
              borderRadius:12, padding:"14px 16px", marginBottom:20}}>
              <div style={{fontSize:12, fontWeight:700, color:"#b45309", marginBottom:4}}>
                {isCorrect ? "✓ Rätt — krisen hanteras:" : "✗ Fel — krisen drabbar fullt ut:"}
              </div>
              <p style={{fontSize:13, color:"#57534e", margin:0, lineHeight:1.6}}>
                {crisis.explanation}
              </p>
              {isCorrect && (
                <div style={{display:"flex", gap:6, marginTop:8, flexWrap:"wrap"}}>
                  {Object.entries(crisis.saveBonus).map(([type,amt]) => (
                    <span key={type} style={{background:CREDIT_META[type].bg,
                      color:CREDIT_META[type].color,
                      border:`1px solid ${CREDIT_META[type].color}30`,
                      fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:99}}>
                      +{amt} {CREDIT_META[type].icon}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => onDone(isCorrect, crisis)} style={S.primaryBtn}>
              Fortsätt →
            </button>
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
  const isCorrect = selected === question.correct;
  const z = ZONES[restaurant.zone];

  return (
    <div style={S.page}>
      <div style={{...S.card, maxWidth:620}}>
        <div style={{display:"flex", alignItems:"center", gap:12, marginBottom:16}}>
          <span style={{fontSize:28}}>{restaurant.emoji}</span>
          <div>
            <div style={{fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:700}}>{team.name}</div>
            <div style={{fontSize:12, color:z?.color, fontWeight:600}}>
              {restaurant.name} · {restaurant.segment}
            </div>
          </div>
          <div style={{marginLeft:"auto"}}>
            <span style={{background:m.bg, color:m.color,
              border:`1px solid ${m.color}25`, fontSize:11, fontWeight:700,
              padding:"3px 10px", borderRadius:99, letterSpacing:0.8, textTransform:"uppercase"}}>
              {m.icon} {m.label}
            </span>
          </div>
        </div>

        <div style={{display:"flex", gap:8, marginBottom:14, flexWrap:"wrap"}}>
          {["ekonomisk","social","ekologisk"].map(t => (
            <div key={t} style={{flex:1, minWidth:100}}>
              <CreditBar type={t} value={team.credits[t]} small/>
            </div>
          ))}
        </div>

        <div style={{background:m.bg, border:`1px solid ${m.color}25`,
          borderRadius:14, padding:"16px 18px", marginBottom:18}}>
          <div style={{fontSize:10, fontWeight:700, color:m.color, marginBottom:6, letterSpacing:0.8}}>
            {"★".repeat(question.difficulty)}{"☆".repeat(3-question.difficulty)} SVÅRIGHET
          </div>
          <p style={{fontSize:15, color:"#1c1917", lineHeight:1.7, margin:0,
            fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic"}}>
            {question.text}
          </p>
        </div>

        <div style={{display:"flex", flexDirection:"column", gap:8, marginBottom:18}}>
          {question.options.map((opt,i) => {
            let bg="#fafaf9", border="#e7e5e4", color="#1c1917";
            if (revealed) {
              if (i === question.correct) { bg="#d1fae5"; border="#34d399"; color="#065f46"; }
              else if (i === selected)    { bg="#fee2e2"; border="#f87171"; color="#7f1d1d"; }
            }
            return (
              <button key={i} onClick={() => { if (!revealed) { setSelected(i); setRevealed(true); }}}
                style={{background:bg, border:`1.5px solid ${border}`, borderRadius:10,
                  padding:"12px 16px", textAlign:"left",
                  cursor: revealed ? "default" : "pointer",
                  fontSize:14, color, fontFamily:"sans-serif",
                  transition:"all 0.2s", display:"flex", gap:10, alignItems:"flex-start"}}>
                <span style={{fontWeight:700, minWidth:20, opacity:0.6}}>{["A","B","C","D"][i]}</span>
                {opt}
                {revealed && i === question.correct && <span style={{marginLeft:"auto"}}>✓</span>}
                {revealed && i === selected && i !== question.correct && <span style={{marginLeft:"auto"}}>✗</span>}
              </button>
            );
          })}
        </div>

        {revealed && (
          <div style={{background:"#fffbeb", border:"1px solid #fde68a",
            borderRadius:12, padding:"14px 16px", marginBottom:20}}>
            <div style={{fontSize:12, fontWeight:700, color:"#b45309", marginBottom:4}}>
              {isCorrect ? "✓ Rätt! Förklaring:" : "✗ Fel. Rätt svar:"}
            </div>
            <p style={{fontSize:13, color:"#57534e", margin:0, lineHeight:1.6}}>
              {question.explanation}
            </p>
            {isCorrect && (
              <div style={{display:"flex", gap:6, marginTop:8, flexWrap:"wrap"}}>
                {Object.entries(question.credits).map(([type,amt]) => amt > 0 && (
                  <span key={type} style={{background:CREDIT_META[type].bg,
                    color:CREDIT_META[type].color,
                    border:`1px solid ${CREDIT_META[type].color}30`,
                    fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:99}}>
                    +{amt} {CREDIT_META[type].icon}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {revealed && (
          <button onClick={() => onAnswer(isCorrect, question.credits)} style={S.primaryBtn}>
            {isCorrect ? "Välj investering →" : "Nästa →"}
          </button>
        )}
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
      <div style={{...S.card, maxWidth:660}}>
        <div style={{display:"flex", gap:10, alignItems:"center", marginBottom:16}}>
          <span style={{fontSize:26}}>{restaurant.emoji}</span>
          <div>
            <div style={{fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:700}}>{team.name}</div>
            <div style={{fontSize:12, color:z?.color, fontWeight:600}}>
              {restaurant.name} · väljer investering
            </div>
          </div>
        </div>

        {earnedCredits && (
          <div style={{display:"flex", gap:6, marginBottom:14, flexWrap:"wrap"}}>
            {Object.entries(earnedCredits).map(([type,amt]) => amt > 0 && (
              <span key={type} style={{background:CREDIT_META[type].bg,
                color:CREDIT_META[type].color,
                border:`1px solid ${CREDIT_META[type].color}30`,
                fontSize:12, fontWeight:700, padding:"4px 12px", borderRadius:99}}>
                +{amt} {CREDIT_META[type].icon} {CREDIT_META[type].label}
              </span>
            ))}
          </div>
        )}

        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:20}}>
          {INVESTMENTS.map(inv => {
            const blocked = restaurant.weakness?.includes("ej köpa ekologiska") && inv.cat === "ekologisk";
            const canAfford = !blocked && Object.entries(inv.cost).every(([t,c]) =>
              (team.credits[t] + (earnedCredits?.[t] || 0)) >= c
            );
            const isChosen = chosen === inv.id;
            const disabled = !canAfford || !!chosen;
            return (
              <div key={inv.id} onClick={() => !disabled && setChosen(inv.id)}
                style={{background: isChosen ? "#d1fae5" : canAfford ? "#fff" : "#f5f5f4",
                  border:`1.5px solid ${isChosen ? "#34d399" : canAfford ? "#e7e5e4" : "#d6d3d1"}`,
                  borderRadius:12, padding:"12px 14px",
                  cursor: disabled && !isChosen ? "default" : "pointer",
                  opacity: disabled && !isChosen ? 0.5 : 1,
                  transition:"all 0.2s"}}>
                <div style={{fontSize:22, marginBottom:4}}>{inv.icon}</div>
                <div style={{fontSize:13, fontWeight:700, color:"#1c1917", marginBottom:3}}>{inv.name}</div>
                <div style={{fontSize:11, color:"#78716c", marginBottom:8, lineHeight:1.5}}>{inv.desc}</div>
                <div style={{display:"flex", gap:4, flexWrap:"wrap"}}>
                  {Object.entries(inv.cost).map(([t,c]) => c > 0 && (
                    <span key={t} style={{background:"#fee2e2", color:"#dc2626",
                      fontSize:10, fontWeight:600, padding:"2px 6px", borderRadius:99}}>
                      −{c} {CREDIT_META[t].icon}
                    </span>
                  ))}
                  {Object.entries(inv.reward).map(([t,r]) => r > 0 && (
                    <span key={t} style={{background:CREDIT_META[t].bg, color:CREDIT_META[t].color,
                      fontSize:10, fontWeight:600, padding:"2px 6px", borderRadius:99}}>
                      +{r} {CREDIT_META[t].icon}
                    </span>
                  ))}
                </div>
                {blocked && (
                  <div style={{fontSize:10, color:"#dc2626", marginTop:6}}>⚠ Ej tillgänglig för din restaurang</div>
                )}
              </div>
            );
          })}
        </div>

        <button onClick={() => onDone(chosen ? INVESTMENTS.find(i => i.id === chosen) : null)} style={S.primaryBtn}>
          {chosen
            ? `Investera i "${INVESTMENTS.find(i => i.id === chosen)?.name}" →`
            : "Hoppa över →"}
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
      <div style={{...S.card, maxWidth:720}}>
        <div style={{textAlign:"center", marginBottom:20}}>
          <div style={{fontSize:11, fontWeight:700, color:"#b45309",
            letterSpacing:1.5, textTransform:"uppercase", marginBottom:4}}>
            Omgång {round} avslutad
          </div>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif", fontSize:24,
            color:"#1c1917", margin:0}}>Hållbarhetsbalans</h2>
        </div>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:24}}>
          {teams.map(t => {
            const r = RESTAURANTS.find(x => x.id === t.restaurantId);
            const z = ZONES[r?.zone];
            const danger = Object.values(t.credits).some(v => v <= 20);
            return (
              <div key={t.id} style={{
                background: t.alive ? z?.light || "#fafaf9" : "#f5f5f4",
                border:`1.5px solid ${!t.alive ? "#d6d3d1" : danger ? "#f87171" : (z?.color+"40")}`,
                borderRadius:14, padding:"14px 16px",
                opacity: t.alive ? 1 : 0.5, position:"relative"}}>
                {!t.alive && (
                  <div style={{position:"absolute", top:8, right:10,
                    background:"#ef4444", color:"#fff",
                    fontSize:9, fontWeight:700, padding:"2px 7px", borderRadius:99}}>
                    UTSLAGET
                  </div>
                )}
                <div style={{display:"flex", gap:8, alignItems:"center", marginBottom:10}}>
                  <span style={{fontSize:20}}>{r?.emoji}</span>
                  <div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif", fontSize:14, fontWeight:700}}>{t.name}</div>
                    <div style={{fontSize:11, color:z?.color, fontWeight:600}}>{r?.name}</div>
                  </div>
                </div>
                <CreditBar type="ekonomisk" value={t.credits.ekonomisk} small/>
                <CreditBar type="social"    value={t.credits.social}    small/>
                <CreditBar type="ekologisk" value={t.credits.ekologisk} small/>
                {danger && t.alive && (
                  <div style={{fontSize:10, color:"#dc2626", marginTop:4, fontStyle:"italic"}}>
                    ⚠ Kritisk nivå — risk för utslagning
                  </div>
                )}
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
      <div style={{...S.card, maxWidth:540, textAlign:"center"}}>
        <div style={{fontSize:52, marginBottom:8}}>{isGameOver ? "🏆" : "💀"}</div>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif", fontSize:26,
          color:"#1c1917", marginBottom:6}}>
          {isGameOver ? "Tävlingen är slut!" : "Utslagning!"}
        </h2>
        <p style={{fontSize:14, color:"#78716c", marginBottom:20}}>
          {eliminated.map(t => t.name).join(", ")} har nått kritisk nivå i minst en hållbarhetsdimension.
        </p>
        <div style={{display:"flex", flexDirection:"column", gap:8, marginBottom:24}}>
          {rankings.map((team,i) => {
            const r = RESTAURANTS.find(x => x.id === team.restaurantId);
            return (
              <div key={team.id} style={{display:"flex", alignItems:"center", gap:10,
                background: i===0 ? "#fef9c3" : team.alive ? "#f0fdf4" : "#fef2f2",
                border:`1px solid ${i===0 ? "#fde047" : team.alive ? "#86efac" : "#fca5a5"}`,
                borderRadius:10, padding:"10px 14px"}}>
                <span style={{fontSize:20, minWidth:28}}>
                  {i===0 ? "🥇" : i===1 ? "🥈" : i===2 ? "🥉" : `${i+1}.`}
                </span>
                <span style={{fontSize:16}}>{r?.emoji}</span>
                <div style={{flex:1, textAlign:"left"}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif", fontSize:15, fontWeight:700}}>
                    {team.name}
                  </div>
                  <div style={{fontSize:11, color:"#78716c"}}>
                    {r?.name} · 💰{team.credits.ekonomisk} 🤝{team.credits.social} 🌱{team.credits.ekologisk}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {!isGameOver && <button onClick={onContinue} style={S.primaryBtn}>Fortsätt tävlingen →</button>}
        {isGameOver && <button onClick={() => window.location.reload()} style={S.primaryBtn}>Ny tävling →</button>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN CONTROLLER
// ─────────────────────────────────────────────────────────────────────────────

export default function SommelierChampionship() {
  const [screen,       setScreen]       = useState("intro");
  const [teams,        setTeams]        = useState([]);
  const [round,        setRound]        = useState(1);
  const [turnIndex,    setTurnIndex]    = useState(0);
  const [qQueue,       setQQueue]       = useState([]);
  const [currentQ,     setCurrentQ]     = useState(null);
  const [currentCrisis,setCurrentCrisis]= useState(null);
  const [earnedThisTurn,setEarnedThisTurn] = useState(null);
  const [phase,        setPhase]        = useState("question");
  const [rankings,     setRankings]     = useState([]);
  const [crisisPool,   setCrisisPool]   = useState([]);

  const aliveTeams = teams.filter(t => t.alive);

  function startGame(initialTeams) {
    setTeams(initialTeams);
    setScreen("lottery");
  }

  function afterLottery(assignedTeams) {
    const pool   = shuffle([...QUESTIONS]);
    const crises = shuffle([...CRISIS_CARDS]);
    setTeams(assignedTeams);
    setQQueue(pool);
    setCrisisPool(crises);
    setRound(1);
    setTurnIndex(0);
    setCurrentQ(pool[0]);
    setPhase("question");
    setScreen("game");
  }

  function applyBonus(team, credits, domain) {
    const r = RESTAURANTS.find(x => x.id === team.restaurantId);
    if (!r) return credits;
    const b = {...credits};
    if (r.bonus === "social")    { b.social    = (b.social    || 0) + 15; }
    if (r.bonus === "vetenskap"  && domain === "vetenskap")  { b.ekologisk = (b.ekologisk || 0) + 10; }
    if (r.bonus === "ekologisk")  { b.ekologisk = (b.ekologisk || 0) + 10; }
    if (r.bonus === "hantverk"   && domain === "hantverk") {
      if (r.id === "V1") b.social    = (b.social    || 0) + 10;
      if (r.id === "C3") b.ekonomisk = (b.ekonomisk || 0) + 10;
    }
    if (r.bonus === "estetisk"   && domain === "estetisk") {
      if (r.id === "C1") b.ekonomisk = (b.ekonomisk || 0) + 15;
      if (r.id === "Ö1") b.social    = (b.social    || 0) + 10;
    }
    if (r.id === "S1" && domain === "vetenskap") { b.social = (b.social || 0) + 15; }
    return b;
  }

  function handleAnswer(correct, credits) {
    const team = aliveTeams[turnIndex];
    const r = RESTAURANTS.find(x => x.id === team.restaurantId);

    if (correct) {
      const bonused = applyBonus(team, credits, currentQ.domain);
      setEarnedThisTurn(bonused);
      setTeams(prev => prev.map(t => {
        if (t.id !== team.id) return t;
        const ekMax = r?.weakness?.includes("70") ? 70 : r?.weakness?.includes("75") ? 75 : 200;
        return {
          ...t,
          credits: {
            ekonomisk: clamp(t.credits.ekonomisk + (bonused.ekonomisk || 0)),
            social:    clamp(t.credits.social    + (bonused.social    || 0)),
            ekologisk: clamp(t.credits.ekologisk + (bonused.ekologisk || 0), 0, ekMax),
          },
          correctAnswers: t.correctAnswers + 1,
          totalAnswers:   t.totalAnswers   + 1,
        };
      }));
      setPhase("invest");
    } else {
      const penalty = (r?.weakness?.includes("Vetenskap-fel") && currentQ.domain === "vetenskap") ? 15 : 5;
      setTeams(prev => prev.map(t => {
        if (t.id !== team.id) return t;
        const {ekonomisk, social, ekologisk} = t.credits;
        const minKey = [["ekonomisk",ekonomisk],["social",social],["ekologisk",ekologisk]]
          .sort((a,b) => a[1]-b[1])[0][0];
        return {
          ...t,
          credits: {...t.credits, [minKey]: Math.max(0, t.credits[minKey] - penalty)},
          totalAnswers: t.totalAnswers + 1,
        };
      }));
      setEarnedThisTurn(null);
      advanceTurn();
    }
  }

  function handleInvestment(inv) {
    const team = aliveTeams[turnIndex];
    const r = RESTAURANTS.find(x => x.id === team.restaurantId);
    if (inv) {
      const ekBonus = r?.bonus === "ekologisk" ? 20 : 0;
      const ekMax   = r?.weakness?.includes("70") ? 70 : r?.weakness?.includes("75") ? 75 : 200;
      setTeams(prev => prev.map(t => {
        if (t.id !== team.id) return t;
        return {
          ...t,
          credits: {
            ekonomisk: clamp(t.credits.ekonomisk - (inv.cost.ekonomisk||0) + (inv.reward.ekonomisk||0)),
            social:    clamp(t.credits.social    - (inv.cost.social   ||0) + (inv.reward.social   ||0)),
            ekologisk: clamp(t.credits.ekologisk - (inv.cost.ekologisk||0) + (inv.reward.ekologisk||0) + ekBonus, 0, ekMax),
          },
          investments: [...t.investments, inv.id],
        };
      }));
    }
    advanceTurn();
  }

  function handleCrisis(correct, crisis) {
    const alive = teams.filter(t => t.alive);
    const activeTeam = alive[turnIndex];
    const activeR = RESTAURANTS.find(x => x.id === activeTeam.restaurantId);

    setTeams(prev => prev.map(t => {
      if (!t.alive) return t;
      const r = RESTAURANTS.find(x => x.id === t.restaurantId);
      const inZone = r?.zone === activeR?.zone;
      const affects =
        crisis.target === "all"  ? true :
        crisis.target === "zone" ? inZone :
        t.id === activeTeam.id;
      if (!affects) return t;

      if (correct) {
        return {
          ...t,
          credits: {
            ekonomisk: clamp(t.credits.ekonomisk + (crisis.saveBonus?.ekonomisk || 0)),
            social:    clamp(t.credits.social    + (crisis.saveBonus?.social    || 0)),
            ekologisk: clamp(t.credits.ekologisk + (crisis.saveBonus?.ekologisk || 0)),
          },
        };
      } else {
        const dbl =
          (r?.weakness?.includes("Ekologiska kriser kostar dubbelt") && crisis.affects === "ekologisk") ||
          (r?.weakness?.includes("Ekonomiska kriser kostar dubbelt")  && crisis.affects === "ekonomisk");
        const pen = dbl ? crisis.amount * 2 : crisis.amount;
        return {
          ...t,
          credits: {...t.credits, [crisis.affects]: Math.max(0, t.credits[crisis.affects] + pen)},
        };
      }
    }));

    setCurrentCrisis(null);
    advanceTurn();
  }

  function advanceTurn() {
    setPhase("question");
    setEarnedThisTurn(null);
    const alive = teams.filter(t => t.alive);
    const next  = turnIndex + 1;

    if (next >= alive.length) {
      if (round % 2 === 0 && crisisPool.length > 0) {
        const [crisis, ...rest] = crisisPool;
        setCrisisPool(rest);
        setCurrentCrisis(crisis);
        setTurnIndex(0);
        return;
      }
      setTimeout(() => checkEliminations(round + 1), 100);
    } else {
      setTurnIndex(next);
      const qIdx = (round - 1) * alive.length + next;
      setCurrentQ(qQueue[qIdx % qQueue.length]);
    }
  }

  function checkEliminations(nextRound) {
    setTeams(prev => {
      const eliminated = prev.filter(t =>
        t.alive && (
          t.credits.ekonomisk <= 0 ||
          t.credits.social    <= 0 ||
          t.credits.ekologisk <= 0 ||
          (RESTAURANTS.find(x => x.id === t.restaurantId)?.weakness?.includes("Social-kris utlöses vid ≤20")
            && t.credits.social <= 20)
        )
      );

      if (!eliminated.length) {
        setRound(nextRound);
        setTurnIndex(0);
        const nextAlive = prev.filter(t => t.alive);
        const qIdx = (nextRound - 1) * nextAlive.length;
        setCurrentQ(qQueue[qIdx % qQueue.length]);
        setScreen("roundSummary");
        return prev;
      }

      const rank = prev.filter(t => !t.alive).length + eliminated.length;
      const newTeams = prev.map(t =>
        eliminated.some(e => e.id === t.id) ? {...t, alive:false, rank} : t
      );

      const sorted = [...newTeams].sort((a,b) => {
        if (a.alive && !b.alive) return -1;
        if (!a.alive && b.alive) return 1;
        if (!a.alive && !b.alive) return (a.rank||99) - (b.rank||99);
        const sumA = a.credits.ekonomisk + a.credits.social + a.credits.ekologisk;
        const sumB = b.credits.ekonomisk + b.credits.social + b.credits.ekologisk;
        return sumB - sumA;
      });

      setRankings(sorted);
      setScreen("elimination");
      return newTeams;
    });
  }

  function continueAfterElim() {
    const alive = teams.filter(t => t.alive);
    setTurnIndex(0);
    const qIdx = (round - 1) * alive.length;
    setCurrentQ(qQueue[qIdx % qQueue.length]);
    setScreen("game");
  }

  const isGameOver = teams.filter(t => t.alive).length <= 1;

  // ── Route ──────────────────────────────────────────────────────────────────
  if (screen === "intro")       return <IntroScreen onStart={startGame}/>;
  if (screen === "lottery")     return <LotteryScreen teams={teams} onDone={afterLottery}/>;
  if (screen === "roundSummary") return <RoundSummary round={round-1} teams={teams} onNext={() => setScreen("game")}/>;
  if (screen === "elimination") return (
    <EliminationScreen
      eliminated={teams.filter(t => !t.alive)}
      rankings={rankings}
      onContinue={continueAfterElim}
      isGameOver={isGameOver}
    />
  );

  if (screen === "game") {
    if (currentCrisis) {
      return <CrisisPhase crisis={currentCrisis} onDone={handleCrisis}/>;
    }

    const team = aliveTeams[turnIndex];
    const restaurant = RESTAURANTS.find(x => x.id === team?.restaurantId);
    if (!team || !restaurant || !currentQ) {
      return <div style={S.page}><div style={S.card}>Laddar...</div></div>;
    }

    const scoreboard = (
      <div style={{background:"#1c1917", color:"#fff", padding:"10px 16px",
        display:"flex", alignItems:"center", gap:12, overflowX:"auto", flexShrink:0}}>
        <span style={{fontFamily:"'Cormorant Garamond',serif", fontSize:15,
          fontWeight:700, color:"#f59e0b", whiteSpace:"nowrap"}}>
          Omgång {round}
        </span>
        {teams.filter(t => t.alive).map(t => {
          const r = RESTAURANTS.find(x => x.id === t.restaurantId);
          const isActive = t.id === team.id;
          return (
            <div key={t.id} style={{display:"flex", gap:5, alignItems:"center",
              fontSize:11, padding:"3px 7px", borderRadius:7,
              background: isActive ? "#f59e0b20" : "transparent",
              border: isActive ? "1px solid #f59e0b50" : "1px solid transparent"}}>
              <span style={{fontSize:14}}>{r?.emoji}</span>
              <span style={{fontWeight:600}}>{t.name}</span>
              <span style={{color:"#fde68a"}}>💰{t.credits.ekonomisk}</span>
              <span style={{color:"#67e8f9"}}>🤝{t.credits.social}</span>
              <span style={{color:"#86efac"}}>🌱{t.credits.ekologisk}</span>
            </div>
          );
        })}
      </div>
    );

    if (phase === "question") return (
      <div>
        {scoreboard}
        <QuestionPhase team={team} restaurant={restaurant} question={currentQ} onAnswer={handleAnswer}/>
      </div>
    );

    if (phase === "invest") return (
      <div>
        {scoreboard}
        <InvestmentPhase team={team} restaurant={restaurant} earnedCredits={earnedThisTurn} onDone={handleInvestment}/>
      </div>
    );
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────────────────────

const S = {
  page: {
    minHeight:"100vh", background:"#f5f0e8",
    display:"flex", flexDirection:"column",
    alignItems:"center", padding:"28px 16px 64px",
    fontFamily:"'DM Sans', sans-serif",
  },
  card: {
    background:"#fff", border:"1px solid #e7e5e4",
    borderRadius:20, padding:"28px 32px",
    width:"100%", maxWidth:560,
    boxShadow:"0 4px 28px rgba(0,0,0,0.07)",
  },
  logoBadge: {
    display:"inline-block", background:"#1c1917", color:"#f59e0b",
    fontSize:10, fontWeight:700, letterSpacing:2,
    textTransform:"uppercase", padding:"5px 14px",
    borderRadius:99, marginBottom:14,
  },
  heroTitle: {
    fontFamily:"'Cormorant Garamond', serif",
    fontSize:48, lineHeight:1.05,
    margin:"0 0 14px", color:"#1c1917", letterSpacing:"-1px",
  },
  input: {
    background:"#fafaf9", border:"1px solid #e7e5e4",
    borderRadius:8, padding:"9px 12px", fontSize:14,
    color:"#1c1917", fontFamily:"'DM Sans', sans-serif",
    outline:"none", width:"100%", boxSizing:"border-box",
  },
  primaryBtn: {
    background:"#1c1917", color:"#f5f0e8",
    border:"none", borderRadius:10,
    padding:"13px 28px", fontSize:14, fontWeight:600,
    cursor:"pointer", fontFamily:"'DM Sans', sans-serif",
    width:"100%", transition:"all 0.15s",
  },
};
