// src/features/visualization/utils/chemicalDictionary/inorganic.ts
// 🌍 Dicionário multilíngue de compostos inorgânicos

export const INORGANIC_DICTIONARY: Record<
  string,
  {
    english: string;
    french?: string;
    german?: string;
    spanish?: string;
    arabic?: string;
    hindi?: string;
    russian?: string;
    chinese?: string;
    indonesian?: string;
    bengali?: string;
    commonName?: string;
  }
> = {
  // 🌊 Substâncias simples
  "água": {
    english: "water",
    french: "eau",
    german: "Wasser",
    spanish: "agua",
    arabic: "ماء",
    hindi: "पानी",
    russian: "вода",
    chinese: "水",
    indonesian: "air",
    bengali: "পানি",
    commonName: "água"
  },
  "amônia": {
    english: "ammonia",
    french: "ammoniac",
    german: "Ammoniak",
    spanish: "amoníaco",
    arabic: "الأمونيا",
    hindi: "अमोनिया",
    russian: "аммиак",
    chinese: "氨",
    indonesian: "amonia",
    bengali: "অ্যামোনিয়া",
    commonName: "amônia"
  },
  "hidrogênio": {
    english: "hydrogen gas",
    french: "hydrogène",
    german: "Wasserstoff",
    spanish: "hidrógeno",
    arabic: "الهيدروجين",
    hindi: "हाइड्रोजन",
    russian: "водород",
    chinese: "氢气",
    indonesian: "hidrogen",
    bengali: "হাইড্রোজেন"
  },
  "oxigênio": {
    english: "oxygen gas",
    french: "oxygène",
    german: "Sauerstoff",
    spanish: "oxígeno",
    arabic: "الأكسجين",
    hindi: "ऑक्सीजन",
    russian: "кислород",
    chinese: "氧气",
    indonesian: "oksigen",
    bengali: "অক্সিজেন"
  },
  "nitrogênio": {
    english: "nitrogen gas",
    french: "azote",
    german: "Stickstoff",
    spanish: "nitrógeno",
    arabic: "النيتروجين",
    hindi: "नाइट्रोजन",
    russian: "азот",
    chinese: "氮气",
    indonesian: "nitrogen",
    bengali: "নাইট্রোজেন"
  },
  "cloro": {
    english: "chlorine gas",
    french: "chlore",
    german: "Chlor",
    spanish: "cloro",
    arabic: "الكلور",
    hindi: "क्लोरीन",
    russian: "хлор",
    chinese: "氯气",
    indonesian: "klorin",
    bengali: "ক্লোরিন"
  },

  // 💨 Gases importantes
  "dióxido de carbono": {
    english: "carbon dioxide",
    french: "dioxyde de carbone",
    german: "Kohlenstoffdioxid",
    spanish: "dióxido de carbono",
    arabic: "ثاني أكسيد الكربون",
    hindi: "कार्बन डाइऑक्साइड",
    russian: "углекислый газ",
    chinese: "二氧化碳",
    indonesian: "karbon dioksida",
    bengali: "কার্বন ডাই অক্সাইড",
    commonName: "gás carbônico"
  },
  "monóxido de carbono": {
    english: "carbon monoxide",
    french: "monoxyde de carbone",
    german: "Kohlenmonoxid",
    spanish: "monóxido de carbono",
    arabic: "أول أكسيد الكربون",
    hindi: "कार्बन मोनोऑक्साइड",
    russian: "угарный газ",
    chinese: "一氧化碳",
    indonesian: "karbon monoksida",
    bengali: "কার্বন মনোক্সাইড"
  },
  "gás carbônico": {
    english: "carbon dioxide",
    french: "gaz carbonique",
    german: "Kohlendioxidgas",
    spanish: "gas carbónico",
    arabic: "غاز ثاني أكسيد الكربون",
    hindi: "कार्बनिक गैस",
    russian: "углекислый газ",
    chinese: "碳酸气体",
    indonesian: "gas karbonik",
    bengali: "কার্বন গ্যাস",
    commonName: "gás carbônico"
  },

  // 🧂 Haletos
  "cloreto de sódio": {
    english: "sodium chloride",
    french: "chlorure de sodium",
    german: "Natriumchlorid",
    spanish: "cloruro de sodio",
    arabic: "كلوريد الصوديوم",
    hindi: "सोडियम क्लोराइड",
    russian: "хлорид натрия",
    chinese: "氯化钠",
    indonesian: "natrium klorida",
    bengali: "সোডিয়াম ক্লোরাইড",
    commonName: "sal de cozinha"
  },
  "cloreto de potássio": {
    english: "potassium chloride",
    french: "chlorure de potassium",
    german: "Kaliumchlorid",
    spanish: "cloruro de potasio",
    arabic: "كلوريد البوتاسيوم",
    hindi: "पोटेशियम क्लोराइड",
    russian: "хлорид калия",
    chinese: "氯化钾",
    indonesian: "kalium klorida",
    bengali: "পটাসিয়াম ক্লোরাইড"
  },
  "cloreto de cálcio": {
    english: "calcium chloride",
    french: "chlorure de calcium",
    german: "Calciumchlorid",
    spanish: "cloruro de calcio",
    arabic: "كلوريد الكالسيوم",
    hindi: "कैल्शियम क्लोराइड",
    russian: "хлорид кальция",
    chinese: "氯化钙",
    indonesian: "kalsium klorida",
    bengali: "ক্যালসিয়াম ক্লোরাইড"
  },

  // 🧪 Ácidos inorgânicos (principais)
  "ácido clorídrico": {
    english: "hydrochloric acid",
    french: "acide chlorhydrique",
    german: "Salzsäure",
    spanish: "ácido clorhídrico",
    arabic: "حمض الهيدروكلوريك",
    hindi: "हाइड्रोक्लोरिक एसिड",
    russian: "соляная кислота",
    chinese: "盐酸",
    indonesian: "asam klorida",
    bengali: "হাইড্রোক্লোরিক অ্যাসিড",
    commonName: "ácido muriático"
  },
  "ácido sulfúrico": {
    english: "sulfuric acid",
    french: "acide sulfurique",
    german: "Schwefelsäure",
    spanish: "ácido sulfúrico",
    arabic: "حمض الكبريتيك",
    hindi: "सल्फ्यूरिक एसिड",
    russian: "серная кислота",
    chinese: "硫酸",
    indonesian: "asam sulfat",
    bengali: "সালফিউরিক অ্যাসিড",
    commonName: "ácido de bateria"
  },
  "ácido nítrico": {
    english: "nitric acid",
    french: "acide nitrique",
    german: "Salpetersäure",
    spanish: "ácido nítrico",
    arabic: "حمض النتريك",
    hindi: "नाइट्रिक एसिड",
    russian: "азотная кислота",
    chinese: "硝酸",
    indonesian: "asam nitrat",
    bengali: "নাইট্রিক অ্যাসিড"
  },
  "ácido fosfórico": {
    english: "phosphoric acid",
    french: "acide phosphorique",
    german: "Phosphorsäure",
    spanish: "ácido fosfórico",
    arabic: "حمض الفوسفوريك",
    hindi: "फॉस्फोरिक एसिड",
    russian: "фосфорная кислота",
    chinese: "磷酸",
    indonesian: "asam fosfat",
    bengali: "ফসফরিক অ্যাসিড",
    commonName: "ácido de refrigerante"
  },
  "ácido carbônico": {
    english: "carbonic acid",
    french: "acide carbonique",
    german: "Kohlensäure",
    spanish: "ácido carbónico",
    arabic: "حمض الكربونيك",
    hindi: "कार्बोनिक एसिड",
    russian: "угольная кислота",
    chinese: "碳酸",
    indonesian: "asam karbonat",
    bengali: "কার্বনিক অ্যাসিড",
    commonName: "formado em bebidas gaseificadas"
  },

  // ⚗️ Bases (hidróxidos)
  "hidróxido de sódio": {
    english: "sodium hydroxide",
    french: "hydroxyde de sodium",
    german: "Natriumhydroxid",
    spanish: "hidróxido de sodio",
    arabic: "هيدروكسيد الصوديوم",
    hindi: "सोडियम हाइड्रॉक्साइड",
    russian: "гидроксид натрия",
    chinese: "氢氧化钠",
    indonesian: "natrium hidroksida",
    bengali: "সোডিয়াম হাইড্রোক্সাইড",
    commonName: "soda cáustica"
  },
  "hidróxido de cálcio": {
    english: "calcium hydroxide",
    french: "hydroxyde de calcium",
    german: "Calciumhydroxid",
    spanish: "hidróxido de calcio",
    arabic: "هيدروكسيد الكالسيوم",
    hindi: "कैल्शियम हाइड्रॉक्साइड",
    russian: "гидроксид кальция",
    chinese: "氢氧化钙",
    indonesian: "kalsium hidroksida",
    bengali: "ক্যালসিয়াম হাইড্রোক্সাইড",
    commonName: "cal hidratada"
  },
  "hidróxido de amônio": {
    english: "ammonium hydroxide",
    french: "hydroxyde d'ammonium",
    german: "Ammoniumhydroxid",
    spanish: "hidróxido de amonio",
    arabic: "هيدروكسيد الأمونيوم",
    hindi: "अमोनियम हाइड्रॉक्साइड",
    russian: "гидроксид аммония",
    chinese: "氢氧化铵",
    indonesian: "amonium hidroksida",
    bengali: "অ্যামোনিয়াম হাইড্রোক্সাইড"
  },

  // 💠 Sais comuns
  "sulfato de cobre": {
    english: "copper sulfate",
    french: "sulfate de cuivre",
    german: "Kupfersulfat",
    spanish: "sulfato de cobre",
    arabic: "كبريتات النحاس",
    hindi: "कॉपर सल्फेट",
    russian: "сульфат меди",
    chinese: "硫酸铜",
    indonesian: "tembaga sulfat",
    bengali: "তামা সালফেট",
    commonName: "sulfato de cobre II"
  },
  "carbonato de cálcio": {
    english: "calcium carbonate",
    french: "carbonate de calcium",
    german: "Calciumcarbonat",
    spanish: "carbonato de calcio",
    arabic: "كربونات الكالسيوم",
    hindi: "कैल्शियम कार्बोनेट",
    russian: "карбонат кальция",
    chinese: "碳酸钙",
    indonesian: "kalsium karbonat",
    bengali: "ক্যালসিয়াম কার্বোনেট",
    commonName: "calcário"
  },  
  
  // 💠 Nitratos
  "nitrato de potássio": {
    english: "potassium nitrate",
    french: "nitrate de potassium",
    german: "Kaliumnitrat",
    spanish: "nitrato de potasio",
    arabic: "نترات البوتاسيوم",
    hindi: "पोटेशियम नाइट्रेट",
    russian: "нитрат калия",
    chinese: "硝酸钾",
    indonesian: "kalium nitrat",
    bengali: "পটাসিয়াম নাইট্রেট",
    commonName: "salitre"
  },
  "nitrato de sódio": {
    english: "sodium nitrate",
    french: "nitrate de sodium",
    german: "Natriumnitrat",
    spanish: "nitrato de sodio",
    arabic: "نترات الصوديوم",
    hindi: "सोडियम नाइट्रेट",
    russian: "нитрат натрия",
    chinese: "硝酸钠",
    indonesian: "natrium nitrat",
    bengali: "সোডিয়াম নাইট্রেট",
    commonName: "salitre do Chile"
  },
  "nitrato de cálcio": {
    english: "calcium nitrate",
    french: "nitrate de calcium",
    german: "Calciumnitrat",
    spanish: "nitrato de calcio",
    arabic: "نترات الكالسيوم",
    hindi: "कैल्शियम नाइट्रेट",
    russian: "нитрат кальция",
    chinese: "硝酸钙",
    indonesian: "kalsium nitrat",
    bengali: "ক্যালসিয়াম নাইট্রেট",
    commonName: "nitrato de cal"
  },
  "nitrato de amônio": {
    english: "ammonium nitrate",
    french: "nitrate d'ammonium",
    german: "Ammoniumnitrat",
    spanish: "nitrato de amonio",
    arabic: "نترات الأمونيوم",
    hindi: "अमोनियम नाइट्रेट",
    russian: "нитрат аммония",
    chinese: "硝酸铵",
    indonesian: "amonium nitrat",
    bengali: "অ্যামোনিয়াম নাইট্রেট",
    commonName: "fertilizante explosivo"
  },
  "nitrato de prata": {
    english: "silver nitrate",
    french: "nitrate d'argent",
    german: "Silbernitrat",
    spanish: "nitrato de plata",
    arabic: "نترات الفضة",
    hindi: "सिल्वर नाइट्रेट",
    russian: "нитрат серебра",
    chinese: "硝酸银",
    indonesian: "perak nitrat",
    bengali: "রূপা নাইট্রেট",
    commonName: "lápis de nitrato de prata"
  },
  "nitrato de cobre": {
    english: "copper nitrate",
    french: "nitrate de cuivre",
    german: "Kupfernitrat",
    spanish: "nitrato de cobre",
    arabic: "نترات النحاس",
    hindi: "कॉपर नाइट्रेट",
    russian: "нитрат меди",
    chinese: "硝酸铜",
    indonesian: "tembaga nitrat",
    bengali: "তামা নাইট্রেট"
  },

};
