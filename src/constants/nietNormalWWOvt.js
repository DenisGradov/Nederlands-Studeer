const nietNormalWWOvt = [
  { infinitive: "aandoen", pastSingular: "deed aan", pastPlural: "deden aan", translation: "робити" },
  { infinitive: "aankomen", pastSingular: "kwam aan", pastPlural: "kwamen aan", translation: "прийти" },
  { infinitive: "afwassen", pastSingular: "waste af", pastPlural: "wasten af", translation: "мити посуд" },
  { infinitive: "bakken", pastSingular: "bakte", pastPlural: "bakten", translation: "пекти" },
  { infinitive: "beginnen", pastSingular: "begon", pastPlural: "begonnen", translation: "починати" },
  { infinitive: "bezoeken", pastSingular: "bezocht", pastPlural: "bezochten", translation: "відвідувати" },
  { infinitive: "blijven", pastSingular: "bleef", pastPlural: "bleven", translation: "залишатися" },
  { infinitive: "breken", pastSingular: "brak", pastPlural: "braken", translation: "ламати" },
  { infinitive: "brengen", pastSingular: "bracht", pastPlural: "brachten", translation: "приносити" },
  { infinitive: "denken", pastSingular: "dacht", pastPlural: "dachten", translation: "думати" },
  { infinitive: "doen", pastSingular: "deed", pastPlural: "deden", translation: "робити" },
  { infinitive: "dragen", pastSingular: "droeg", pastPlural: "droegen", translation: "носити" },
  { infinitive: "drinken", pastSingular: "dronk", pastPlural: "dronken", translation: "пити" },
  { infinitive: "eten", pastSingular: "at", pastPlural: "aten", translation: "їсти" },
  { infinitive: "gaan", pastSingular: "ging", pastPlural: "gingen", translation: "йти" },
  { infinitive: "geven", pastSingular: "gaf", pastPlural: "gaven", translation: "давати" },
  { infinitive: "hangen", pastSingular: "hing", pastPlural: "hingen", translation: "висіти" },
  { infinitive: "hebben", pastSingular: "had", pastPlural: "hadden", translation: "мати" },
  { infinitive: "helpen", pastSingular: "hielp", pastPlural: "hielpen", translation: "допомагати" },
  { infinitive: "innemen", pastSingular: "nam in", pastPlural: "namen in", translation: "приймати (ліки)" },
  { infinitive: "kiezen", pastSingular: "koos", pastPlural: "kozen", translation: "вибирати" },
  { infinitive: "kijken", pastSingular: "keek", pastPlural: "keken", translation: "дивитися" },
  { infinitive: "komen", pastSingular: "kwam", pastPlural: "kwamen", translation: "приходити" },
  { infinitive: "kopen", pastSingular: "kocht", pastPlural: "kochten", translation: "купувати" },
  { infinitive: "krijgen", pastSingular: "kreeg", pastPlural: "kregen", translation: "отримувати" },
  { infinitive: "kunnen", pastSingular: "kon", pastPlural: "konden", translation: "могти" },
  { infinitive: "lachen", pastSingular: "lachte", pastPlural: "lachten", translation: "сміятися" },
  { infinitive: "lezen", pastSingular: "las", pastPlural: "lazen", translation: "читати" },
  { infinitive: "liggen", pastSingular: "lag", pastPlural: "lagen", translation: "лежати" },
  { infinitive: "lopen", pastSingular: "liep", pastPlural: "liepen", translation: "бігти" },
  { infinitive: "rijden", pastSingular: "reed", pastPlural: "reden", translation: "їхати" },
  { infinitive: "roepen", pastSingular: "riep", pastPlural: "riepen", translation: "кликати" },
  { infinitive: "schrijven", pastSingular: "schreef", pastPlural: "schreven", translation: "писати" },
  { infinitive: "slapen", pastSingular: "sliep", pastPlural: "sliepen", translation: "спати" },
  { infinitive: "sluiten", pastSingular: "sloot", pastPlural: "sloten", translation: "закривати" },
  { infinitive: "spreken", pastSingular: "sprak", pastPlural: "spraken", translation: "говорити" },
  { infinitive: "staan", pastSingular: "stond", pastPlural: "stonden", translation: "стояти" },
  { infinitive: "trekken", pastSingular: "trok", pastPlural: "trokken", translation: "тягнути" },
  { infinitive: "vallen", pastSingular: "viel", pastPlural: "vielen", translation: "падати" },
  { infinitive: "verliezen", pastSingular: "verloor", pastPlural: "verloren", translation: "губити" },
  { infinitive: "vinden", pastSingular: "vond", pastPlural: "vonden", translation: "знаходити" },
  { infinitive: "vliegen", pastSingular: "vloog", pastPlural: "vlogen", translation: "літати" },
  { infinitive: "weten", pastSingular: "wist", pastPlural: "wisten", translation: "знати" },
  { infinitive: "wijzen", pastSingular: "wees", pastPlural: "wezen", translation: "вказувати" },
  { infinitive: "winnen", pastSingular: "won", pastPlural: "wonnen", translation: "вигравати" },
  { infinitive: "worden", pastSingular: "werd", pastPlural: "werden", translation: "ставати" },
  { infinitive: "zeggen", pastSingular: "zei", pastPlural: "zeiden", translation: "сказати" },
  { infinitive: "zien", pastSingular: "zag", pastPlural: "zagen", translation: "бачити" },
  { infinitive: "zijn", pastSingular: "was", pastPlural: "waren", translation: "бути" },
  { infinitive: "zingen", pastSingular: "zong", pastPlural: "zongen", translation: "співати" },
  { infinitive: "zitten", pastSingular: "zat", pastPlural: "zaten", translation: "сидіти" },
  { infinitive: "zoeken", pastSingular: "zocht", pastPlural: "zochten", translation: "шукати" },
  { infinitive: "zwemmen", pastSingular: "zwom", pastPlural: "zwommen", translation: "плавати" },
];

export function getRandomVerbByRange(start, end) {
  const arrayLength = nietNormalWWOvt.length;

  let realStart = start - 1;
  let realEnd = end - 1;

  if (realStart < 0) realStart = 0;
  if (realEnd >= arrayLength) realEnd = arrayLength - 1;

  const possibleVerbs = nietNormalWWOvt.slice(realStart, realEnd + 1);

  if (!possibleVerbs.length) {
    return {
      infinitive: "",
      pastSingular: "",
      pastPlural: "",
      translation: "Geen woorden beschikbaar"
    };
  }

  const randomIndex = Math.floor(Math.random() * possibleVerbs.length);
  return possibleVerbs[randomIndex];
}

export function getVerbsCount() {
  return nietNormalWWOvt.length;
}

export default nietNormalWWOvt;
