// src/features/visualization/utils/chemicalDictionary/organic.ts
// 🌍 Dicionário multilíngue de compostos orgânicos

export const ORGANIC_DICTIONARY: Record<
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
  // 🔥 Hidrocarbonetos
  // 🔥 Hidrocarbonetos (expandidos até C10 com traduções multilíngues)
"metano": {
  english: "methane",
  french: "méthane",
  german: "Methan",
  spanish: "metano",
  arabic: "ميثان",
  hindi: "मीथेन",
  russian: "метан",
  chinese: "甲烷",
  indonesian: "metana",
  bengali: "মিথেন"
},
"etano": {
  english: "ethane",
  french: "éthane",
  german: "Ethan",
  spanish: "etano",
  arabic: "إيثان",
  hindi: "एथेन",
  russian: "этан",
  chinese: "乙烷",
  indonesian: "etana",
  bengali: "ইথেন"
},

"decano": {
  english: "decane",
  french: "décane",
  german: "Decan",
  spanish: "decano",
  arabic: "ديكان",
  hindi: "डिकेन",
  russian: "декан",
  chinese: "癸烷",
  indonesian: "dekana",
  bengali: "ডেকেন"
},
// 🌿 Hidrocarbonetos ramificados (principais isômeros e cadeias secundárias)
"isobutano": {
  english: "isobutane",
  french: "isobutane",
  german: "Isobutan",
  spanish: "isobutano",
  arabic: "إيزوبيوتان",
  hindi: "आइसोब्यूटेन",
  russian: "изобутан",
  chinese: "异丁烷",
  indonesian: "isobutana",
  bengali: "আইসোবিউটেন"
},
"2-metilpropano": {
  english: "2-methylpropane",
  french: "2-méthylpropane",
  german: "2-Methylpropan",
  spanish: "2-metilpropano",
  arabic: "2-ميثيل بروبان",
  hindi: "2-मेथिलप्रोपेन",
  russian: "2-метилпропан",
  chinese: "2-甲基丙烷",
  indonesian: "2-metilpropan",
  bengali: "২-মিথাইলপ্রোপেন"
},
"isopentano": {
  english: "isopentane",
  french: "isopentane",
  german: "Isopentan",
  spanish: "isopentano",
  arabic: "إيزوبنتان",
  hindi: "आइसोपेंटेन",
  russian: "изопентан",
  chinese: "异戊烷",
  indonesian: "isopentana",
  bengali: "আইসোপেন্টেন"
},
"2-metilbutano": {
  english: "2-methylbutane",
  french: "2-méthylbutane",
  german: "2-Methylbutan",
  spanish: "2-metilbutano",
  arabic: "2-ميثيل بيوتان",
  hindi: "2-मेथिलब्यूटेन",
  russian: "2-метилбутан",
  chinese: "2-甲基丁烷",
  indonesian: "2-metilbutana",
  bengali: "২-মিথাইলবিউটেন"
},
"neopentano": {
  english: "neopentane",
  french: "néopentane",
  german: "Neopentan",
  spanish: "neopentano",
  arabic: "نيو بنتان",
  hindi: "नियोपेंटेन",
  russian: "неопентан",
  chinese: "新戊烷",
  indonesian: "neopentana",
  bengali: "নিওপেন্টেন"
},
"2,2-dimetilpropano": {
  english: "2,2-dimethylpropane",
  french: "2,2-diméthylpropane",
  german: "2,2-Dimethylpropan",
  spanish: "2,2-dimetilpropano",
  arabic: "2,2-ثنائي ميثيل بروبان",
  hindi: "2,2-डाइमिथाइलप्रोपेन",
  russian: "2,2-диметилпропан",
  chinese: "2,2-二甲基丙烷",
  indonesian: "2,2-dimetilpropan",
  bengali: "২,২-ডাইমিথাইলপ্রোপেন"
},
"isohexano": {
  english: "isohexane",
  french: "isohexane",
  german: "Isohexan",
  spanish: "isohexano",
  arabic: "إيزوهيكسان",
  hindi: "आइसोहेक्सेन",
  russian: "изогексан",
  chinese: "异己烷",
  indonesian: "isoheksana",
  bengali: "আইসোহেক্সেন"
},
"3-metilpentano": {
  english: "3-methylpentane",
  french: "3-méthylpentane",
  german: "3-Methylpentan",
  spanish: "3-metilpentano",
  arabic: "3-ميثيل بنتان",
  hindi: "3-मेथिलपेंटेन",
  russian: "3-метилпентан",
  chinese: "3-甲基戊烷",
  indonesian: "3-metilpentana",
  bengali: "৩-মিথাইলপেন্টেন"
},
"2,3-dimetilbutano": {
  english: "2,3-dimethylbutane",
  french: "2,3-diméthylbutane",
  german: "2,3-Dimethylbutan",
  spanish: "2,3-dimetilbutano",
  arabic: "2,3-ثنائي ميثيل بيوتان",
  hindi: "2,3-डाइमिथाइलब्यूटेन",
  russian: "2,3-диметилбутан",
  chinese: "2,3-二甲基丁烷",
  indonesian: "2,3-dimetilbutana",
  bengali: "২,৩-ডাইমিথাইলবিউটেন"
},
"isoheptano": {
  english: "isoheptane",
  french: "isoheptane",
  german: "Isoheptan",
  spanish: "isoheptano",
  arabic: "إيزوهيبتان",
  hindi: "आइसोहैपटेन",
  russian: "изогептан",
  chinese: "异庚烷",
  indonesian: "isoheptana",
  bengali: "আইসোহেপ্টেন"
},
"2,4-dimetilpentano": {
  english: "2,4-dimethylpentane",
  french: "2,4-diméthylpentane",
  german: "2,4-Dimethylpentan",
  spanish: "2,4-dimetilpentano",
  arabic: "2,4-ثنائي ميثيل بنتان",
  hindi: "2,4-डाइमिथाइलपेंटेन",
  russian: "2,4-диметилпентан",
  chinese: "2,4-二甲基戊烷",
  indonesian: "2,4-dimetilpentana",
  bengali: "২,৪-ডাইমিথাইলপেন্টেন"
},


// 🔥 Alcenos correspondentes (C2–C10)
"eteno": {
  english: "ethylene",
  french: "éthylène",
  german: "Ethen",
  spanish: "eteno",
  arabic: "إيثيلين",
  hindi: "एथिलीन",
  russian: "этилен",
  chinese: "乙烯",
  indonesian: "etilena",
  bengali: "ইথিলিন"
},

"propeno": {
  english: "propene",
  french: "propène",
  german: "Propen",
  spanish: "propeno",
  arabic: "بروبيلين",
  hindi: "प्रोपीन",
  russian: "пропен",
  chinese: "丙烯",
  indonesian: "propena",
  bengali: "প্রোপিন"
},
"buteno": {
  english: "butene",
  french: "butène",
  german: "Buten",
  spanish: "buteno",
  arabic: "بيوتين",
  hindi: "ब्यूटीन",
  russian: "бутен",
  chinese: "丁烯",
  indonesian: "butena",
  bengali: "বিউটিন"
},
"penteno": {
  english: "pentene",
  french: "pentène",
  german: "Penten",
  spanish: "penteno",
  arabic: "بينتين",
  hindi: "पेंटीन",
  russian: "пентен",
  chinese: "戊烯",
  indonesian: "pentena",
  bengali: "পেন্টিন"
},
"hexeno": {
  english: "hexene",
  french: "hexène",
  german: "Hexen",
  spanish: "hexeno",
  arabic: "هكسين",
  hindi: "हेक्सीन",
  russian: "гексен",
  chinese: "己烯",
  indonesian: "heksena",
  bengali: "হেক্সিন"
},
"hepteno": {
  english: "heptene",
  french: "heptène",
  german: "Hepten",
  spanish: "hepteno",
  arabic: "هيبتين",
  hindi: "हेप्टीन",
  russian: "гептен",
  chinese: "庚烯",
  indonesian: "heptena",
  bengali: "হেপ্টিন"
},
"octeno": {
  english: "octene",
  french: "octène",
  german: "Octen",
  spanish: "octeno",
  arabic: "أوكتين",
  hindi: "ऑक्टीन",
  russian: "октен",
  chinese: "辛烯",
  indonesian: "oktena",
  bengali: "অকটিন"
},
"noneno": {
  english: "nonene",
  french: "nonène",
  german: "Nonen",
  spanish: "noneno",
  arabic: "نونين",
  hindi: "नॉनीन",
  russian: "нонен",
  chinese: "壬烯",
  indonesian: "nonena",
  bengali: "নোনিন"
},
"deceno": {
  english: "decene",
  french: "décène",
  german: "Decen",
  spanish: "deceno",
  arabic: "ديكين",
  hindi: "डिसीन",
  russian: "децен",
  chinese: "癸烯",
  indonesian: "dekena",
  bengali: "ডেকেন"
},

// 🔥 Alcinos correspondentes (C2–C10)
"etino": {
  english: "acetylene",
  french: "acétylène",
  german: "Ethin",
  spanish: "etino",
  arabic: "أسيتيلين",
  hindi: "एसीटिलीन",
  russian: "ацетилен",
  chinese: "乙炔",
  indonesian: "asetilena",
  bengali: "অ্যাসিটিলিন"
},
"propino": {
  english: "propyne",
  french: "propyne",
  german: "Propin",
  spanish: "propino",
  arabic: "بروبين",
  hindi: "प्रोपाइन",
  russian: "пропин",
  chinese: "丙炔",
  indonesian: "propina",
  bengali: "প্রোপাইন"
},
"butino": {
  english: "butyne",
  french: "butyne",
  german: "Butin",
  spanish: "butino",
  arabic: "بيوتين",
  hindi: "ब्यूटाइन",
  russian: "бутин",
  chinese: "丁炔",
  indonesian: "butina",
  bengali: "বিউটাইন"
},
"pentino": {
  english: "pentyne",
  french: "pentyne",
  german: "Pentin",
  spanish: "pentino",
  arabic: "بينتين",
  hindi: "पेंटाइन",
  russian: "пентин",
  chinese: "戊炔",
  indonesian: "pentina",
  bengali: "পেন্টাইন"
},
"hexino": {
  english: "hexyne",
  french: "hexyne",
  german: "Hexin",
  spanish: "hexino",
  arabic: "هكساين",
  hindi: "हेक्साइन",
  russian: "гексин",
  chinese: "己炔",
  indonesian: "heksina",
  bengali: "হেক্সাইন"
},
"heptino": {
  english: "heptyne",
  french: "heptyne",
  german: "Heptin",
  spanish: "heptino",
  arabic: "هيبتاين",
  hindi: "हेप्टाइन",
  russian: "гептин",
  chinese: "庚炔",
  indonesian: "heptina",
  bengali: "হেপ্টাইন"
},
"octino": {
  english: "octyne",
  french: "octyne",
  german: "Octin",
  spanish: "octino",
  arabic: "أوكتاين",
  hindi: "ऑक्टाइन",
  russian: "октин",
  chinese: "辛炔",
  indonesian: "oktina",
  bengali: "অকটাইন"
},
"nonino": {
  english: "nonyne",
  french: "nonyne",
  german: "Nonin",
  spanish: "nonino",
  arabic: "نونين",
  hindi: "नॉनाइन",
  russian: "нонин",
  chinese: "壬炔",
  indonesian: "nonina",
  bengali: "নোনাইন"
},
"decino": {
  english: "decyne",
  french: "decyne",
  german: "Decin",
  spanish: "decino",
  arabic: "ديكاين",
  hindi: "डिकाइन",
  russian: "децин",
  chinese: "癸炔",
  indonesian: "dekina",
  bengali: "ডেকাইন"
},



  "benzeno": {
    english: "benzene",
    french: "benzène",
    german: "Benzol",
    spanish: "benceno",
    arabic: "البنزين",
    hindi: "बेंजीन",
    russian: "бензол",
    chinese: "苯",
    indonesian: "benzena",
    bengali: "বেনজিন"
  },
  
  "tolueno": {
    english: "toluene",
    french: "toluène",
    german: "Toluol",
    spanish: "tolueno",
    arabic: "التولوين",
    hindi: "टोल्यून",
    russian: "толуол",
    chinese: "甲苯",
    indonesian: "toluena",
    bengali: "টলুইন"
  },
  "xileno": {
    english: "xylene",
    french: "xylène",
    german: "Xylol",
    spanish: "xileno",
    arabic: "الزيلين",
    hindi: "जाइलीन",
    russian: "ксилол",
    chinese: "二甲苯",
    indonesian: "xilena",
    bengali: "জাইলিন"
  },
  "naftaleno": {
    english: "naphthalene",
    french: "naphtaline",
    german: "Naphthalin",
    spanish: "naftalina",
    arabic: "النفثالين",
    hindi: "नेफ्थलीन",
    russian: "нафталин",
    chinese: "萘",
    indonesian: "naftalena",
    bengali: "নাফথালিন"
  },

  // 🍶 Álcoois, fenóis e éteres
  "metanol": {
    english: "methanol",
    french: "méthanol",
    german: "Methanol",
    spanish: "metanol",
    arabic: "الميثانول",
    hindi: "मेथनॉल",
    russian: "метанол",
    chinese: "甲醇",
    indonesian: "metanol",
    bengali: "মিথানল",
    commonName: "álcool metílico"
  },
  "etanol": {
    english: "ethanol",
    french: "éthanol",
    german: "Ethanol",
    spanish: "etanol",
    arabic: "الإيثانول",
    hindi: "एथेनॉल",
    russian: "этанол",
    chinese: "乙醇",
    indonesian: "etanol",
    bengali: "ইথানল",
    commonName: "álcool etílico"
  },
  "propanol": {
    english: "propanol",
    french: "propanol",
    german: "Propanol",
    spanish: "propanol",
    arabic: "بروبانول",
    hindi: "प्रोपानोल",
    russian: "пропанол",
    chinese: "丙醇",
    indonesian: "propanol",
    bengali: "প্রোপানল"
  },
  "glicerina": {
    english: "glycerin",
    french: "glycérine",
    german: "Glyzerin",
    spanish: "glicerina",
    arabic: "الجلسرين",
    hindi: "ग्लिसरीन",
    russian: "глицерин",
    chinese: "甘油",
    indonesian: "gliserin",
    bengali: "গ্লিসারিন",
    commonName: "glicerol"
  },
  "fenol": {
    english: "phenol",
    french: "phénol",
    german: "Phenol",
    spanish: "fenol",
    arabic: "الفينول",
    hindi: "फिनोल",
    russian: "фенол",
    chinese: "苯酚",
    indonesian: "fenol",
    bengali: "ফেনল"
  },

  // 🧴 Aldeídos e cetonas
  "formaldeído": {
    english: "formaldehyde",
    french: "formaldéhyde",
    german: "Formaldehyd",
    spanish: "formaldehído",
    arabic: "الفورمالديهايد",
    hindi: "फॉर्मल्डिहाइड",
    russian: "формальдегид",
    chinese: "甲醛",
    indonesian: "formaldehida",
    bengali: "ফরমালডিহাইড",
    commonName: "metanal"
  },
  "acetona": {
    english: "acetone",
    french: "acétone",
    german: "Aceton",
    spanish: "acetona",
    arabic: "الأسيتون",
    hindi: "एसीटोन",
    russian: "ацетон",
    chinese: "丙酮",
    indonesian: "aseton",
    bengali: "অ্যাসিটোন",
    commonName: "propanona"
  },
  "benzaldeído": {
    english: "benzaldehyde",
    french: "benzaldéhyde",
    german: "Benzaldehyd",
    spanish: "benzaldehído",
    arabic: "بنزالديهيد",
    hindi: "बेंज़ाल्डिहाइड",
    russian: "бензальдегид",
    chinese: "苯甲醛",
    indonesian: "benzaldehida",
    bengali: "বেনজালডিহাইড",
    commonName: "cheiro de amêndoas"
  },

  // 🍋 Ácidos carboxílicos e ésteres
  "ácido acético": {
    english: "acetic acid",
    french: "acide acétique",
    german: "Essigsäure",
    spanish: "ácido acético",
    arabic: "حمض الخليك",
    hindi: "एसिटिक एसिड",
    russian: "уксусная кислота",
    chinese: "乙酸",
    indonesian: "asam asetat",
    bengali: "অ্যাসিটিক অ্যাসিড",
    commonName: "vinagre"
  },
  "ácido fórmico": {
    english: "formic acid",
    french: "acide formique",
    german: "Ameisensäure",
    spanish: "ácido fórmico",
    arabic: "حمض النمل",
    hindi: "फॉर्मिक एसिड",
    russian: "муравьиная кислота",
    chinese: "甲酸",
    indonesian: "asam format",
    bengali: "ফর্মিক অ্যাসিড"
  },
  "ácido cítrico": {
    english: "citric acid",
    french: "acide citrique",
    german: "Zitronensäure",
    spanish: "ácido cítrico",
    arabic: "حمض الستريك",
    hindi: "साइट्रिक एसिड",
    russian: "лимонная кислота",
    chinese: "柠檬酸",
    indonesian: "asam sitrat",
    bengali: "সাইট্রিক অ্যাসিড"
  },
  "ácido lático": {
    english: "lactic acid",
    french: "acide lactique",
    german: "Milchsäure",
    spanish: "ácido láctico",
    arabic: "حمض اللبنيك",
    hindi: "लैक्टिक एसिड",
    russian: "молочная кислота",
    chinese: "乳酸",
    indonesian: "asam laktat",
    bengali: "ল্যাকটিক অ্যাসিড"
  },
  "salicilato de metila": {
    english: "methyl salicylate",
    french: "salicylate de méthyle",
    german: "Methylsalicylat",
    spanish: "salicilato de metilo",
    arabic: "ساليسيلات الميثيل",
    hindi: "मेथिल सैलिसिलेट",
    russian: "метилсалицилат",
    chinese: "水杨酸甲酯",
    indonesian: "metil salisilat",
    bengali: "মিথাইল স্যালিসাইলেট",
    commonName: "óleo de wintergreen"
  },

  // 💨 Compostos halogenados e nitrados
  "clorofórmio": {
    english: "chloroform",
    french: "chloroforme",
    german: "Chloroform",
    spanish: "cloroformo",
    arabic: "الكلوروفورم",
    hindi: "क्लोरोफॉर्म",
    russian: "хлороформ",
    chinese: "氯仿",
    indonesian: "kloroform",
    bengali: "ক্লোরোফর্ম",
    commonName: "triclormetano"
  },
  "tetracloreto de carbono": {
    english: "carbon tetrachloride",
    french: "tétrachlorure de carbone",
    german: "Tetrachlorkohlenstoff",
    spanish: "tetracloruro de carbono",
    arabic: "رباعي كلوريد الكربون",
    hindi: "कार्बन टेट्राक्लोराइड",
    russian: "четыреххлористый углерод",
    chinese: "四氯化碳",
    indonesian: "karbon tetraklorida",
    bengali: "কার্বন টেট্রাক্লোরাইড"
  },
  "nitrobenzeno": {
    english: "nitrobenzene",
    french: "nitrobenzène",
    german: "Nitrobenzol",
    spanish: "nitrobenceno",
    arabic: "نيتروبنزين",
    hindi: "नाइट्रोबेंजीन",
    russian: "нитробензол",
    chinese: "硝基苯",
    indonesian: "nitrobenzena",
    bengali: "নাইট্রোবেঞ্জিন"
  },

  // 🧬 Aminas e amidas
  "anilina": {
    english: "aniline",
    french: "aniline",
    german: "Anilin",
    spanish: "anilina",
    arabic: "أنيلين",
    hindi: "एनिलीन",
    russian: "анилин",
    chinese: "苯胺",
    indonesian: "anilina",
    bengali: "অ্যানিলিন"
  },
  "ureia": {
    english: "urea",
    french: "urée",
    german: "Harnstoff",
    spanish: "urea",
    arabic: "اليوريا",
    hindi: "यूरिया",
    russian: "мочевина",
    chinese: "尿素",
    indonesian: "urea",
    bengali: "ইউরিয়া"
  },

  // 🍬 Açúcares e biomoléculas
  "glicose": {
    english: "glucose",
    french: "glucose",
    german: "Glukose",
    spanish: "glucosa",
    arabic: "الجلوكوز",
    hindi: "ग्लूकोज",
    russian: "глюкоза",
    chinese: "葡萄糖",
    indonesian: "glukosa",
    bengali: "গ্লুকোজ"
  },
  "frutose": {
    english: "fructose",
    french: "fructose",
    german: "Fruktose",
    spanish: "fructosa",
    arabic: "الفركتوز",
    hindi: "फ्रुक्टोज़",
    russian: "фруктоза",
    chinese: "果糖",
    indonesian: "fruktosa",
    bengali: "ফ্রুক্টোজ"
  },
  "sacarose": {
    english: "sucrose",
    french: "saccharose",
    german: "Saccharose",
    spanish: "sacarosa",
    arabic: "السكروز",
    hindi: "सुक्रोज़",
    russian: "сахароза",
    chinese: "蔗糖",
    indonesian: "sukrosa",
    bengali: "সুক্রোজ"
  },

  // 🧴 Solventes e polímeros
  "dimetilformamida": {
    english: "dimethylformamide",
    french: "diméthylformamide",
    german: "Dimethylformamid",
    spanish: "dimetilformamida",
    arabic: "ثنائي ميثيل فورماميد",
    hindi: "डाइमिथाइलफॉर्मामाइड",
    russian: "диметилформамид",
    chinese: "二甲基甲酰胺",
    indonesian: "dimetilformamida",
    bengali: "ডাইমিথাইলফরমামাইড",
    commonName: "DMF"
  },
  "dimetilsulfóxido": {
    english: "dimethyl sulfoxide",
    french: "diméthylsulfoxyde",
    german: "Dimethylsulfoxid",
    spanish: "dimetilsulfóxido",
    arabic: "ثنائي ميثيل سلفوكسيد",
    hindi: "डाइमिथाइल सल्फॉक्साइड",
    russian: "диметилсульфоксид",
    chinese: "二甲基亚砜",
    indonesian: "dimetil sulfoksida",
    bengali: "ডাইমিথাইল সালফঅক্সাইড",
    commonName: "DMSO"
  },
  "teflon": {
    english: "polytetrafluoroethylene",
    french: "polytétrafluoroéthylène",
    german: "Polytetrafluorethylen",
    spanish: "politetrafluoroetileno",
    arabic: "بوليتترافلوروإيثيلين",
    hindi: "पोलिटेट्राफ्लोरोएथिलीन",
    russian: "политетрафторэтилен",
    chinese: "聚四氟乙烯",
    indonesian: "politetrafluoroetilena",
    bengali: "পলিটেট্রাফ্লুরোইথিলিন",
    commonName: "PTFE"
  },
    // 🧬 Biomoléculas, hormônios, neurotransmissores e enzimas
  "oxitocina": { "english": "oxytocin", "french": "ocytocine", "german": "Oxytocin", "spanish": "oxitocina", "arabic": "الأوكسيتوسين", "hindi": "ऑक्सिटोसिन", "russian": "окситоцин", "chinese": "催产素", "indonesian": "oksitosin", "bengali": "অক্সিটোসিন" },
  "adrenalina": { "english": "adrenaline", "french": "adrénaline", "german": "Adrenalin", "spanish": "adrenalina", "arabic": "الأدرينالين", "hindi": "एड्रेनालिन", "russian": "адреналин", "chinese": "肾上腺素", "indonesian": "adrenalin", "bengali": "অ্যাড্রেনালিন" },
  "noradrenalina": { "english": "noradrenaline", "french": "noradrénaline", "german": "Noradrenalin", "spanish": "noradrenalina", "arabic": "نورأدرينالين", "hindi": "नॉरएड्रेनालिन", "russian": "норадреналин", "chinese": "去甲肾上腺素", "indonesian": "noradrenalin", "bengali": "নরঅ্যাড্রেনালিন" },
  "serotonina": { "english": "serotonin", "french": "sérotonine", "german": "Serotonin", "spanish": "serotonina", "arabic": "السيروتونين", "hindi": "सेरोटोनिन", "russian": "серотонин", "chinese": "血清素", "indonesian": "serotonin", "bengali": "সেরোটোনিন" },
  "dopamina": { "english": "dopamine", "french": "dopamine", "german": "Dopamin", "spanish": "dopamina", "arabic": "الدوبامين", "hindi": "डोपामिन", "russian": "дофамин", "chinese": "多巴胺", "indonesian": "dopamin", "bengali": "ডোপামিন" },
  "melatonina": { "english": "melatonin", "french": "mélatonine", "german": "Melatonin", "spanish": "melatonina", "arabic": "الميلاتونين", "hindi": "मेलाटोनिन", "russian": "мелатонин", "chinese": "褪黑激素", "indonesian": "melatonin", "bengali": "মেলাটোনিন" },
  "acetilcolina": { "english": "acetylcholine", "french": "acétylcholine", "german": "Acetylcholin", "spanish": "acetilcolina", "arabic": "أسيتيل كولين", "hindi": "एसिटाइलकोलाइन", "russian": "ацетилхолин", "chinese": "乙酰胆碱", "indonesian": "asetilkolin", "bengali": "অ্যাসিটাইলকোলিন" },
  "histamina": { "english": "histamine", "french": "histamine", "german": "Histamin", "spanish": "histamina", "arabic": "الهيستامين", "hindi": "हिस्टामिन", "russian": "гистамин", "chinese": "组胺", "indonesian": "histamin", "bengali": "হিস্টামিন" },
  "gaba": { "english": "gamma-aminobutyric acid", "french": "acide gamma-aminobutyrique", "german": "Gamma-Aminobuttersäure", "spanish": "ácido gamma-aminobutírico", "arabic": "حمض غاما أمينوبوتيريك", "hindi": "गामा-एमिनोब्यूट्रिक एसिड", "russian": "гамма-аминомасляная кислота", "chinese": "γ-氨基丁酸", "indonesian": "asam gamma-aminobutirat", "bengali": "গামা-অ্যামিনোবিউটারিক অ্যাসিড" },
  "insulina": { "english": "insulin", "french": "insuline", "german": "Insulin", "spanish": "insulina", "arabic": "الأنسولين", "hindi": "इंसुलिन", "russian": "инсулин", "chinese": "胰岛素", "indonesian": "insulin", "bengali": "ইনসুলিন" },
  "hemoglobina": { "english": "hemoglobin", "french": "hémoglobine", "german": "Hämoglobin", "spanish": "hemoglobina", "arabic": "الهيموغلوبين", "hindi": "हीमोग्लोबिन", "russian": "гемоглобин", "chinese": "血红蛋白", "indonesian": "hemoglobin", "bengali": "হিমোগ্লোবিন" },
  "mioglobina": { "english": "myoglobin", "french": "myoglobine", "german": "Myoglobin", "spanish": "mioglobina", "arabic": "الميوغلوبين", "hindi": "मायोग्लोबिन", "russian": "миоглобин", "chinese": "肌红蛋白", "indonesian": "mioglobin", "bengali": "মায়োগ্লোবিন" },
  "colesterol": { "english": "cholesterol", "french": "cholestérol", "german": "Cholesterin", "spanish": "colesterol", "arabic": "الكوليسترول", "hindi": "कोलेस्ट्रॉल", "russian": "холестерин", "chinese": "胆固醇", "indonesian": "kolesterol", "bengali": "কোলেস্টেরল" },
  "testosterona": { "english": "testosterone", "french": "testostérone", "german": "Testosteron", "spanish": "testosterona", "arabic": "التستوستيرون", "hindi": "टेस्टोस्टेरोन", "russian": "тестостерон", "chinese": "睾酮", "indonesian": "testosteron", "bengali": "টেস্টোস্টেরন" },
  "estradiol": { "english": "estradiol", "french": "œstradiol", "german": "Östradiol", "spanish": "estradiol", "arabic": "إستراديول", "hindi": "एस्ट्राडियोल", "russian": "эстрадиол", "chinese": "雌二醇", "indonesian": "estradiol", "bengali": "ইস্ট্রাডিওল" },
  "progesterona": { "english": "progesterone", "french": "progestérone", "german": "Progesteron", "spanish": "progesterona", "arabic": "البروجسترون", "hindi": "प्रोजेस्टेरोन", "russian": "прогестерон", "chinese": "孕酮", "indonesian": "progesteron", "bengali": "প্রোজেস্টেরন" },
  "vitamina c": { "english": "ascorbic acid", "french": "acide ascorbique", "german": "Ascorbinsäure", "spanish": "vitamina C", "arabic": "حمض الأسكوربيك", "hindi": "एस्कॉर्बिक एसिड", "russian": "аскорбиновая кислота", "chinese": "维生素C", "indonesian": "asam askorbat", "bengali": "অ্যাসকরবিক অ্যাসিড" },
  "vitamina d": { "english": "cholecalciferol", "french": "cholécalciférol", "german": "Cholecalciferol", "spanish": "vitamina D", "arabic": "كوليكالسيفيرول", "hindi": "कोलेकाल्सीफेरोल", "russian": "холекальциферол", "chinese": "维生素D3", "indonesian": "kolekalsiferol", "bengali": "কোলেক্যালসিফেরল" },
  "ácido desoxirribonucleico": { "english": "deoxyribonucleic acid", "french": "acide désoxyribonucléique", "german": "Desoxyribonukleinsäure", "spanish": "ácido desoxirribonucleico", "arabic": "الحمض النووي الريبوزي منقوص الأكسجين", "hindi": "डीऑक्सीराइबोन्यूक्लिक एसिड", "russian": "дезоксирибонуклеиновая кислота", "chinese": "脱氧核糖核酸", "indonesian": "asam deoksiribonukleat", "bengali": "ডিঅক্সিরাইবো নিউক্লিক অ্যাসিড" },
  "ácido ribonucleico": { "english": "ribonucleic acid", "french": "acide ribonucléique", "german": "Ribonukleinsäure", "spanish": "ácido ribonucleico", "arabic": "الحمض النووي الريبوزي", "hindi": "राइबोन्यूक्लिक एसिड", "russian": "рибонуклеиновая кислота", "chinese": "核糖核酸", "indonesian": "asam ribonukleat", "bengali": "রাইবো নিউক্লিক অ্যাসিড" },
  "atp": { "english": "adenosine triphosphate", "french": "adénosine triphosphate", "german": "Adenosintriphosphat", "spanish": "adenosín trifosfato", "arabic": "أدينوسين ثلاثي الفوسفات", "hindi": "एडेनोसिन ट्राइफॉस्फेट", "russian": "аденозинтрифосфат", "chinese": "三磷酸腺苷", "indonesian": "adenosin trifosfat", "bengali": "অ্যাডেনোসিন ট্রাইফসফেট" },
  "amilase": { "english": "amylase", "french": "amylase", "german": "Amylase", "spanish": "amilasa", "arabic": "الأميلاز", "hindi": "एमाइलेज", "russian": "амилаза", "chinese": "淀粉酶", "indonesian": "amilase", "bengali": "অ্যামাইলেস" },
  "catalase": { "english": "catalase", "french": "catalase", "german": "Katalase", "spanish": "catalasa", "arabic": "الكاتالاز", "hindi": "कैटालेज़", "russian": "каталаза", "chinese": "过氧化氢酶", "indonesian": "katalase", "bengali": "ক্যাটালেজ" },
  "lipase": { "english": "lipase", "french": "lipase", "german": "Lipase", "spanish": "lipasa", "arabic": "الليباز", "hindi": "लाइपेज़", "russian": "липаза", "chinese": "脂肪酶", "indonesian": "lipase", "bengali": "লিপেজ" },
  "lactase": { "english": "lactase", "french": "lactase", "german": "Laktase", "spanish": "lactasa", "arabic": "اللاكتاز", "hindi": "लैक्टेज़", "russian": "лактаза", "chinese": "乳糖酶", "indonesian": "laktase", "bengali": "ল্যাক্টেজ" },
  "pepsina": { "english": "pepsin", "french": "pepsine", "german": "Pepsin", "spanish": "pepsina", "arabic": "البيبسين", "hindi": "पेप्सिन", "russian": "пепсин", "chinese": "胃蛋白酶", "indonesian": "pepsin", "bengali": "পেপসিন" },

  
  /* --- VARIAÇÕES DE DECANO (C10) - Originais --- */
  "1-metil-decano": { "english": "1-methyl-decane", "french": "1-méthyl-décane", "german": "1-Methyl-decan", "spanish": "1-metil-decano", "arabic": "1-ميثيل ديكان", "hindi": "1-मेथिल-डेकैन", "russian": "1-метилдекан", "chinese": "1-甲基癸烷", "indonesian": "1-metil-dekana", "bengali": "১-মিথাইল-ডেকেন" },
  "2-metil-decano": { "english": "2-methyl-decane", "french": "2-méthyl-décane", "german": "2-Methyl-decan", "spanish": "2-metil-decano", "arabic": "2-ميثيل ديكان", "hindi": "2-मेथिल-डेकैन", "russian": "2-метилдекан", "chinese": "2-甲基癸烷", "indonesian": "2-metil-dekana", "bengali": "২-মিথাইল-ডেকেন" },
  "3-metil-decano": { "english": "3-methyl-decane", "french": "3-méthyl-décane", "german": "3-Methyl-decan", "spanish": "3-metil-decano", "arabic": "3-ميثيل ديكان", "hindi": "3-मेथिल-डेकैन", "russian": "3-метилдекан", "chinese": "3-甲基癸烷", "indonesian": "3-metil-dekana", "bengali": "৩-মিথাইল-ডেকেন" },
  "4-metil-decano": { "english": "4-methyl-decane", "french": "4-méthyl-décane", "german": "4-Methyl-decan", "spanish": "4-metil-decano", "arabic": "4-ميثيل ديكان", "hindi": "4-मेथिल-डेकैन", "russian": "4-метилдекан", "chinese": "4-甲基癸烷", "indonesian": "4-metil-dekana", "bengali": "৪-মিথাইল-ডেকেন" },
  "5-metil-decano": { "english": "5-methyl-decane", "french": "5-méthyl-décane", "german": "5-Methyl-decan", "spanish": "5-metil-decano", "arabic": "5-ميثيل ديكان", "hindi": "5-मेथिल-डेकैन", "russian": "5-метилдекан", "chinese": "5-甲基癸烷", "indonesian": "5-metil-dekana", "bengali": "৫-মিথাইল-ডেকেন" },
  "1-etil-decano": { "english": "1-ethyl-decane", "french": "1-éthyl-décane", "german": "1-Ethyl-decan", "spanish": "1-etil-decano", "arabic": "1-إيثيل ديكان", "hindi": "1-एथिल-डेकैन", "russian": "1-этилдекан", "chinese": "1-乙基癸烷", "indonesian": "1-etil-dekana", "bengali": "১-ইথাইল-ডেকেন" },
  "2-etil-decano": { "english": "2-ethyl-decane", "french": "2-éthyl-décane", "german": "2-Ethyl-decan", "spanish": "2-etil-decano", "arabic": "2-إيثيل ديكان", "hindi": "2-एथिल-डेकैन", "russian": "2-этилдекан", "chinese": "2-乙基癸烷", "indonesian": "2-etil-dekana", "bengali": "২-ইথাইল-ডেকেন" },
  "3-etil-decano": { "english": "3-ethyl-decane", "french": "3-éthyl-décane", "german": "3-Ethyl-decan", "spanish": "3-etil-decano", "arabic": "3-إيثيل ديكان", "hindi": "3-एथिल-डेकैन", "russian": "3-этилдекан", "chinese": "3-乙基癸烷", "indonesian": "3-etil-dekana", "bengali": "৩-ইথাইল-ডেকেন" },
  "4-etil-decano": { "english": "4-ethyl-decane", "french": "4-éthyl-décane", "german": "4-Ethyl-decan", "spanish": "4-etil-decano", "arabic": "4-إيثيل ديكان", "hindi": "4-एथिल-डेकैन", "russian": "4-этилдекан", "chinese": "4-乙基癸烷", "indonesian": "4-etil-dekana", "bengali": "৪-ইথাইল-ডেকেন" },
  "5-etil-decano": { "english": "5-ethyl-decane", "french": "5-éthyl-décane", "german": "5-Ethyl-decan", "spanish": "5-etil-decano", "arabic": "5-إيثيل ديكان", "hindi": "5-एथिल-डेकैन", "russian": "5-этилдекан", "chinese": "5-乙基癸烷", "indonesian": "5-etil-dekana", "bengali": "৫-ইथাইল-ডেকেন" },
  "dec-1-eno": { "english": "dec-1-ene", "french": "déc-1-ène", "german": "Dec-1-en", "spanish": "dec-1-eno", "arabic": "ديك-1-ين", "hindi": "डेक-1-इन", "russian": "дек-1-ен", "chinese": "癸-1-烯", "indonesian": "dek-1-ena", "bengali": "ডেক-১-ইন" },
  "dec-2-eno": { "english": "dec-2-ene", "french": "déc-2-ène", "german": "Dec-2-en", "spanish": "dec-2-eno", "arabic": "ديك-2-ين", "hindi": "डेक-2-इन", "russian": "дек-2-ен", "chinese": "癸-2-烯", "indonesian": "dek-2-ena", "bengali": "ডেক-২-ইন" },
  "dec-3-eno": { "english": "dec-3-ene", "french": "déc-3-ène", "german": "Dec-3-en", "spanish": "dec-3-eno", "arabic": "ديك-3-ين", "hindi": "डेक-3-इन", "russian": "дек-3-ен", "chinese": "癸-3-烯", "indonesian": "dek-3-ena", "bengali": "ডেক-৩-ইন" },
  "dec-4-eno": { "english": "dec-4-ene", "french": "déc-4-ène", "german": "Dec-4-en", "spanish": "dec-4-eno", "arabic": "ديك-4-ين", "hindi": "डेक-4-इन", "russian": "дек-4-ен", "chinese": "癸-4-烯", "indonesian": "dek-4-ena", "bengali": "ডেক-৪-ইন" },
  "dec-5-eno": { "english": "dec-5-ene", "french": "déc-5-ène", "german": "Dec-5-en", "spanish": "dec-5-eno", "arabic": "ديك-5-ين", "hindi": "डेक-5-इन", "russian": "дек-5-ен", "chinese": "癸-5-烯", "indonesian": "dek-5-ena", "bengali": "ডেক-৫-ইন" },
  "dec-1-ino": { "english": "dec-1-yne", "french": "déc-1-yne", "german": "Dec-1-in", "spanish": "dec-1-ino", "arabic": "ديك-1-اين", "hindi": "डेक-1-ाइन", "russian": "дек-1-ин", "chinese": "癸-1-炔", "indonesian": "dek-1-ina", "bengali": "ডেক-১-াইন" },
  "dec-2-ino": { "english": "dec-2-yne", "french": "déc-2-yne", "german": "Dec-2-in", "spanish": "dec-2-ino", "arabic": "ديك-2-اين", "hindi": "डेक-2-ाइन", "russian": "дек-2-ин", "chinese": "癸-2-炔", "indonesian": "dek-2-ina", "bengali": "ডেক-২-اين" },
  "dec-3-ino": { "english": "dec-3-yne", "french": "déc-3-yne", "german": "Dec-3-in", "spanish": "dec-3-ino", "arabic": "ديك-3-اين", "hindi": "डेक-3-ाइन", "russian": "дек-3-ин", "chinese": "癸-3-炔", "indonesian": "dek-3-ina", "bengali": "ডেক-৩-اين" },
  "dec-4-ino": { "english": "dec-4-yne", "french": "déc-4-yne", "german": "Dec-4-in", "spanish": "dec-4-ino", "arabic": "ديك-4-اين", "hindi": "डेक-4-ाइन", "russian": "дек-4-ин", "chinese": "癸-4-炔", "indonesian": "dek-4-ina", "bengali": "ডেক-৪-اين" },
  "dec-5-ino": { "english": "dec-5-yne", "french": "déc-5-yne", "german": "Dec-5-in", "spanish": "dec-5-ino", "arabic": "ديك-5-اين", "hindi": "डेक-5-ाइन", "russian": "дек-5-ин", "chinese": "癸-5-炔", "indonesian": "dek-5-ina", "bengali": "ডেক-৫-اين" },
  "decan-1-ol": { "english": "decan-1-ol", "french": "décan-1-ol", "german": "Decan-1-ol", "spanish": "decan-1-ol", "arabic": "ديكان-1-أول", "hindi": "डेकन-1-ओल", "russian": "декан-1-ол", "chinese": "癸醇-1", "indonesian": "dekan-1-ol", "bengali": "ডেকান-১-অল" },
  "decan-2-ol": { "english": "decan-2-ol", "french": "décan-2-ol", "german": "Decan-2-ol", "spanish": "decan-2-ol", "arabic": "ديكان-2-أول", "hindi": "डेकन-2-ओल", "russian": "декан-2-ол", "chinese": "癸醇-2", "indonesian": "dekan-2-ol", "bengali": "ডেকান-২-অল" },
  "decan-3-ol": { "english": "decan-3-ol", "french": "décan-3-ol", "german": "Decan-3-ol", "spanish": "decan-3-ol", "arabic": "ديكان-3-أول", "hindi": "डेकन-3-ओल", "russian": "декан-3-ол", "chinese": "癸醇-3", "indonesian": "dekan-3-ol", "bengali": "ডেকান-৩-অল" },
  "decan-4-ol": { "english": "decan-4-ol", "french": "décan-4-ol", "german": "Decan-4-ol", "spanish": "decan-4-ol", "arabic": "ديكان-4-أول", "hindi": "डेकन-4-ओल", "russian": "декан-4-ол", "chinese": "癸醇-4", "indonesian": "dekan-4-ol", "bengali": "ডেকান-৪-অল" },
  "decan-5-ol": { "english": "decan-5-ol", "french": "décan-5-ol", "german": "Decan-5-ol", "spanish": "decan-5-ol", "arabic": "ديكان-5-أول", "hindi": "डेकन-5-ओल", "russian": "декан-5-ол", "chinese": "癸醇-5", "indonesian": "dekan-5-ol", "bengali": "ডেকান-৫-অল" },
  "1-metil-dec-1-eno": { "english": "1-methyl-dec-1-ene", "french": "1-méthyl-déc-1-ène", "german": "1-Methyl-Dec-1-en", "spanish": "1-metil-dec-1-eno", "arabic": "1-ميثيل ديك-1-ين", "hindi": "1-मेथिल-डेक-1-इन", "russian": "1-метилдек-1-ен", "chinese": "1-甲基癸-1-烯", "indonesian": "1-metil-dek-1-ena", "bengali": "১-মিথাইল-ডেক-১-ইন" },
  "2-metil-dec-2-eno": { "english": "2-methyl-dec-2-ene", "french": "2-méthyl-déc-2-ène", "german": "2-Methyl-Dec-2-en", "spanish": "2-metil-dec-2-eno", "arabic": "2-ميثيل ديك-2-ين", "hindi": "2-मेथिल-डेक-2-इन", "russian": "2-метилдек-2-ен", "chinese": "2-甲基癸-2-烯", "indonesian": "2-metil-dek-2-ena", "bengali": "২-মিথাইল-ডেক-২-ইন" },
  "3-metil-dec-3-eno": { "english": "3-methyl-dec-3-ene", "french": "3-méthyl-déc-3-ène", "german": "3-Methyl-Dec-3-en", "spanish": "3-metil-dec-3-eno", "arabic": "3-ميثيل ديك-3-ين", "hindi": "3-मेथिल-डेक-3-इन", "russian": "3-метилдек-3-ен", "chinese": "3-甲基癸-3-烯", "indonesian": "3-metil-dek-3-ena", "bengali": "৩-মিথাইল-ডেক-৩-ইন" },
  "4-metil-dec-4-eno": { "english": "4-methyl-dec-4-ene", "french": "4-méthyl-déc-4-ène", "german": "4-Methyl-Dec-4-en", "spanish": "4-metil-dec-4-eno", "arabic": "4-ميثيل ديك-4-ين", "hindi": "4-मेथिल-डेक-4-इन", "russian": "4-метилдек-4-ен", "chinese": "4-甲基癸-4-烯", "indonesian": "4-metil-dek-4-ena", "bengali": "৪-মিথাইল-ডেক-৪-ইন" },
  "5-metil-dec-5-eno": { "english": "5-methyl-dec-5-ene", "french": "5-méthyl-déc-5-ène", "german": "5-Methyl-Dec-5-en", "spanish": "5-metil-dec-5-eno", "arabic": "5-ميثيل ديك-5-ين", "hindi": "5-मेथिल-डेक-5-इन", "russian": "5-метилдек-5-ен", "chinese": "5-甲基癸-5-烯", "indonesian": "5-metil-dek-5-ena", "bengali": "৫-মিথাইল-ডেক-৫-ইন" },
  "1-metil-decan-1-ol": { "english": "1-methyl-decan-1-ol", "french": "1-méthyl-décan-1-ol", "german": "1-Methyl-Decan-1-ol", "spanish": "1-metil-decan-1-ol", "arabic": "1-ميثيل ديكان-1-أول", "hindi": "1-मेथिल-डेकन-1-ओल", "russian": "1-метилдекан-1-ол", "chinese": "1-甲基癸醇-1", "indonesian": "1-metil-dekan-1-ol", "bengali": "১-মিথাইল-ডেকান-১-অল" },
  "2-metil-decan-2-ol": { "english": "2-methyl-decan-2-ol", "french": "2-méthyl-décan-2-ol", "german": "2-Methyl-Decan-2-ol", "spanish": "2-metil-decan-2-ol", "arabic": "2-ميثيل ديكان-2-أول", "hindi": "2-मेथिल-डेकन-2-ओल", "russian": "2-метилдекан-2-ол", "chinese": "2-甲基癸醇-2", "indonesian": "2-metil-dekan-2-ol", "bengali": "২-মিথাইল-ডেকান-২-অল" },
  "3-metil-decan-3-ol": { "english": "3-methyl-decan-3-ol", "french": "3-méthyl-décan-3-ol", "german": "3-Methyl-Decan-3-ol", "spanish": "3-metil-decan-3-ol", "arabic": "3-ميثيل ديكان-3-أول", "hindi": "3-मेथिल-डेकन-3-ओल", "russian": "3-метилдекан-3-ол", "chinese": "3-甲基癸醇-3", "indonesian": "3-metil-dekan-3-ol", "bengali": "৩-মিথাইল-ডেকান-৩-অল" },
  "4-metil-decan-4-ol": { "english": "4-methyl-decan-4-ol", "french": "4-méthyl-décan-4-ol", "german": "4-Methyl-Decan-4-ol", "spanish": "4-metil-decan-4-ol", "arabic": "4-ميثيل ديكان-4-أول", "hindi": "4-मेथिल-डेकन-4-ओल", "russian": "4-метилдекан-4-ол", "chinese": "4-甲基癸醇-4", "indonesian": "4-metil-dekan-4-ol", "bengali": "৪-মিথাইল-ডেকان-৪-অল" },
  "5-metil-decan-5-ol": { "english": "5-methyl-decan-5-ol", "french": "5-méthyl-décan-5-ol", "german": "5-Methyl-Decan-5-ol", "spanish": "5-metil-decan-5-ol", "arabic": "5-ميثيل ديكان-5-أول", "hindi": "5-मेथिल-डेकन-5-ओल", "russian": "5-метилдекан-5-ол", "chinese": "5-甲基癸醇-5", "indonesian": "5-metil-dekan-5-ol", "bengali": "৫-মিথাইল-ডেকان-৫-অল" },
  "1-metil-ciclohexano": { "english": "1-methylcyclohexane", "french": "1-méthylcyclohexane", "german": "1-Methylcyclohexan", "spanish": "1-metilciclohexano", "arabic": "1-ميثيل سيكلوهكسان", "hindi": "1-मेथिलसाइक्लोहेक्सेन", "russian": "1-метилциклогексан", "chinese": "1-甲基环己烷", "indonesian": "1-metilsikloheksana", "bengali": "১-মিথাইলসাইক্লোহেক্সেন" },
  "1-etil-ciclohexano": { "english": "1-ethylcyclohexane", "french": "1-éthylcyclohexane", "german": "1-Ethylcyclohexan", "spanish": "1-etilciclohexano", "arabic": "1-إيثيل سيكلوهكسان", "hindi": "1-एथिलसाइक्लोहेक्सेन", "russian": "1-этилциклогексан", "chinese": "1-乙基环己烷", "indonesian": "1-etilsikloheksana", "bengali": "১-ইথাইলসাইक्लोহেক্সেন" },
  "ciclohexeno": { "english": "cyclohexene", "french": "cyclohexène", "german": "Cyclohexen", "spanish": "ciclohexeno", "arabic": "سيكلوهيكسين", "hindi": "साइक्लोहेक्सीन", "russian": "циклогексен", "chinese": "环己烯", "indonesian": "sikloheksena", "bengali": "সাইক্লোহেক্সিন" },

  /* --- VARIAÇÕES DE NONANO (C9) --- */
  "nonano": { "english": "nonane", "french": "nonane", "german": "Nonan", "spanish": "nonano", "arabic": "نونان", "hindi": "नोनेन", "russian": "нонан", "chinese": "壬烷", "indonesian": "nonana", "bengali": "নোনেন" },
  "1-metil-octano": { "english": "1-methyl-octane", "french": "1-méthyl-octane", "german": "1-Methyl-octan", "spanish": "1-metil-octano", "arabic": "1-ميثيل أوكتان", "hindi": "1-मेथिल-ऑक्टेन", "russian": "1-метилоктан", "chinese": "1-甲基辛烷", "indonesian": "1-metil-oktana", "bengali": "১-মিথাইল-অক্টেন" },
  "2-metil-octano": { "english": "2-methyl-octane", "french": "2-méthyl-octane", "german": "2-Methyl-octan", "spanish": "2-metil-octano", "arabic": "2-ميثيل أوكتان", "hindi": "2-मेथिल-ऑक्टेन", "russian": "2-метилоктан", "chinese": "2-甲基辛烷", "indonesian": "2-metil-oktana", "bengali": "২-মিথাইল-অক্টেন" },
  "3-metil-octano": { "english": "3-methyl-octane", "french": "3-méthyl-octane", "german": "3-Methyl-octan", "spanish": "3-metil-octano", "arabic": "3-ميثيل أوكتان", "hindi": "3-मेथिल-ऑक्टेन", "russian": "3-метилоктан", "chinese": "3-甲基辛烷", "indonesian": "3-metil-oktana", "bengali": "৩-মিথাইল-অক্টেন" },
  "4-metil-octano": { "english": "4-methyl-octane", "french": "4-méthyl-octane", "german": "4-Methyl-octan", "spanish": "4-metil-octano", "arabic": "4-ميثيل أوكتان", "hindi": "4-मेथिल-ऑक्टेन", "russian": "4-метилоктан", "chinese": "4-甲基辛烷", "indonesian": "4-metil-oktana", "bengali": "৪-মিথাইল-অক্টেন" },
  "non-1-eno": { "english": "non-1-ene", "french": "non-1-ène", "german": "Non-1-en", "spanish": "non-1-eno", "arabic": "نون-1-ين", "hindi": "नोन-1-इन", "russian": "нон-1-ен", "chinese": "壬-1-烯", "indonesian": "non-1-ena", "bengali": "নোন-১-ইন" },
  "non-2-eno": { "english": "non-2-ene", "french": "non-2-ène", "german": "Non-2-en", "spanish": "non-2-eno", "arabic": "نون-2-ين", "hindi": "नोन-2-इन", "russian": "нон-2-ен", "chinese": "壬-2-烯", "indonesian": "non-2-ena", "bengali": "নোন-২-ইন" },
  "non-3-eno": { "english": "non-3-ene", "french": "non-3-ène", "german": "Non-3-en", "spanish": "non-3-eno", "arabic": "نون-3-ين", "hindi": "नोन-3-इन", "russian": "нон-3-ен", "chinese": "壬-3-烯", "indonesian": "non-3-ena", "bengali": "নোন-৩-ইন" },
  "non-4-eno": { "english": "non-4-ene", "french": "non-4-ène", "german": "Non-4-en", "spanish": "non-4-eno", "arabic": "نون-4-ين", "hindi": "नोन-4-इन", "russian": "нон-4-ен", "chinese": "壬-4-烯", "indonesian": "non-4-ena", "bengali": "নোন-৪-ইন" },
  "nonan-1-ol": { "english": "nonan-1-ol", "french": "nonan-1-ol", "german": "Nonan-1-ol", "spanish": "nonan-1-ol", "arabic": "نونان-1-أول", "hindi": "नोनेन-1-ओल", "russian": "нонан-1-ол", "chinese": "壬醇-1", "indonesian": "nonan-1-ol", "bengali": "নোনান-১-অল" },
  "nonan-2-ol": { "english": "nonan-2-ol", "french": "nonan-2-ol", "german": "Nonan-2-ol", "spanish": "nonan-2-ol", "arabic": "نونان-2-أول", "hindi": "नोनेन-2-ओल", "russian": "нонан-2-ол", "chinese": "壬醇-2", "indonesian": "nonan-2-ol", "bengali": "নোনান-২-অল" },

  /* --- VARIAÇÕES DE OCTANO (C8) --- */
  "octano": { "english": "octane", "french": "octane", "german": "Octan", "spanish": "octano", "arabic": "أوكتان", "hindi": "ऑक्टेन", "russian": "октан", "chinese": "辛烷", "indonesian": "oktana", "bengali": "অক্টেন" },
  "2-metil-heptano": { "english": "2-methyl-heptane", "french": "2-méthyl-heptane", "german": "2-Methyl-heptan", "spanish": "2-metil-heptano", "arabic": "2-ميثيل هبتان", "hindi": "2-मेथिल-हेप्टेन", "russian": "2-метилгептан", "chinese": "2-甲基庚烷", "indonesian": "2-metil-heptana", "bengali": "২-মিথাইল-হেপ্টেন" },
  "3-metil-heptano": { "english": "3-methyl-heptane", "french": "3-méthyl-heptane", "german": "3-Methyl-heptan", "spanish": "3-metil-heptano", "arabic": "3-ميثيل هبتان", "hindi": "3-मेथिल-हेप्टेन", "russian": "3-метилгептан", "chinese": "3-甲基庚烷", "indonesian": "3-metil-heptana", "bengali": "৩-মিথাইল-হেপ্টেন" },
  "4-metil-heptano": { "english": "4-methyl-heptane", "french": "4-méthyl-heptane", "german": "4-Methyl-heptan", "spanish": "4-metil-heptano", "arabic": "4-ميثيل هبتان", "hindi": "4-मेथिल-हेप्टेन", "russian": "4-метилгептан", "chinese": "4-甲基庚烷", "indonesian": "4-metil-heptana", "bengali": "৪-মিথাইল-হেপ্টেন" },
  "oct-1-eno": { "english": "oct-1-ene", "french": "oct-1-ène", "german": "Oct-1-en", "spanish": "oct-1-eno", "arabic": "أوكت-1-ين", "hindi": "ऑक्ट-1-इन", "russian": "окт-1-ен", "chinese": "辛-1-烯", "indonesian": "okt-1-ena", "bengali": "অক্ট-১-ইন" },
  "oct-2-eno": { "english": "oct-2-ene", "french": "oct-2-ène", "german": "Oct-2-en", "spanish": "oct-2-eno", "arabic": "أوكت-2-ين", "hindi": "ऑक्ट-2-इन", "russian": "окт-2-ен", "chinese": "辛-2-烯", "indonesian": "okt-2-ena", "bengali": "অক্ট-২-ইন" },
  "oct-3-eno": { "english": "oct-3-ene", "french": "oct-3-ène", "german": "Oct-3-en", "spanish": "oct-3-eno", "arabic": "أوكت-3-ين", "hindi": "ऑक्ट-3-इन", "russian": "окт-3-ен", "chinese": "辛-3-烯", "indonesian": "okt-3-ena", "bengali": "অক্ট-৩-ইন" },
  "oct-4-eno": { "english": "oct-4-ene", "french": "oct-4-ène", "german": "Oct-4-en", "spanish": "oct-4-eno", "arabic": "أوكت-4-ين", "hindi": "ऑक्ट-4-इन", "russian": "окт-4-ен", "chinese": "辛-4-烯", "indonesian": "okt-4-ena", "bengali": "অক্ট-৪-ইন" },
  "octan-1-ol": { "english": "octan-1-ol", "french": "octan-1-ol", "german": "Octan-1-ol", "spanish": "octan-1-ol", "arabic": "أوكتان-1-أول", "hindi": "ऑक्टेन-1-ओल", "russian": "октан-1-ол", "chinese": "辛醇-1", "indonesian": "oktan-1-ol", "bengali": "অক্টান-১-অল" },
  "octan-2-ol": { "english": "octan-2-ol", "french": "octan-2-ol", "german": "Octan-2-ol", "spanish": "octan-2-ol", "arabic": "أوكتان-2-أول", "hindi": "ऑक्टेन-2-ओल", "russian": "октан-2-ол", "chinese": "辛醇-2", "indonesian": "oktan-2-ol", "bengali": "অক্টান-২-অল" },

  /* --- VARIAÇÕES DE HEPTANO (C7) --- */
  "heptano": { "english": "heptane", "french": "heptane", "german": "Heptan", "spanish": "heptano", "arabic": "هبتان", "hindi": "हेप्टेन", "russian": "гептан", "chinese": "庚烷", "indonesian": "heptana", "bengali": "হেপ্টেন" },
  "hept-1-eno": { "english": "hept-1-ene", "french": "hept-1-ène", "german": "Hept-1-en", "spanish": "hept-1-eno", "arabic": "هبت-1-ين", "hindi": "हेप्ट-1-इन", "russian": "гепт-1-ен", "chinese": "庚-1-烯", "indonesian": "hept-1-ena", "bengali": "হেপ্ট-১-ইন" },
  "hept-2-eno": { "english": "hept-2-ene", "french": "hept-2-ène", "german": "Hept-2-en", "spanish": "hept-2-eno", "arabic": "هبت-2-ين", "hindi": "हेप्ट-2-इन", "russian": "гепт-2-ен", "chinese": "庚-2-烯", "indonesian": "hept-2-ena", "bengali": "হেप्ट-২-ইন" },
  "hept-3-eno": { "english": "hept-3-ene", "french": "hept-3-ène", "german": "Hept-3-en", "spanish": "hept-3-eno", "arabic": "هبت-3-ين", "hindi": "हेप्ट-3-इन", "russian": "гепт-3-ен", "chinese": "庚-3-烯", "indonesian": "hept-3-ena", "bengali": "হেপ্ট-৩-ইন" },
  "hept-1-ino": { "english": "hept-1-yne", "french": "hept-1-yne", "german": "Hept-1-in", "spanish": "hept-1-ino", "arabic": "هبت-1-اين", "hindi": "हेप्ट-1-ाइन", "russian": "гепт-1-ин", "chinese": "庚-1-炔", "indonesian": "hept-1-ina", "bengali": "হেপ্ট-১-াইন" },
  "hept-2-ino": { "english": "hept-2-yne", "french": "hept-2-yne", "german": "Hept-2-in", "spanish": "hept-2-ino", "arabic": "هبت-2-اين", "hindi": "हेप्ट-2-ाइन", "russian": "гепт-2-ин", "chinese": "庚-2-炔", "indonesian": "hept-2-ina", "bengali": "হেপ্ট-২-اين" },
  "hept-3-ino": { "english": "hept-3-yne", "french": "hept-3-yne", "german": "Hept-3-in", "spanish": "hept-3-ino", "arabic": "هبت-3-اين", "hindi": "हेप्ट-3-ाइन", "russian": "гепт-3-ин", "chinese": "庚-3-炔", "indonesian": "hept-3-ina", "bengali": "হেপ্ট-৩-اين" },
  "heptan-1-ol": { "english": "heptan-1-ol", "french": "heptan-1-ol", "german": "Heptan-1-ol", "spanish": "heptan-1-ol", "arabic": "هبتان-1-أول", "hindi": "हेप्टेन-1-ओल", "russian": "гептан-1-ол", "chinese": "庚醇-1", "indonesian": "heptan-1-ol", "bengali": "হেপ্টান-১-অল" },
  "heptan-2-ol": { "english": "heptan-2-ol", "french": "heptan-2-ol", "german": "Heptan-2-ol", "spanish": "heptan-2-ol", "arabic": "هبتان-2-أول", "hindi": "हेप्टेन-2-ओल", "russian": "гептан-2-ол", "chinese": "庚醇-2", "indonesian": "heptan-2-ol", "bengali": "হেপ্টান-২-অল" },
  "heptan-3-ol": { "english": "heptan-3-ol", "french": "heptan-3-ol", "german": "Heptan-3-ol", "spanish": "heptan-3-ol", "arabic": "هبتان-3-أول", "hindi": "हेप्टेन-3-ओल", "russian": "гептан-3-ол", "chinese": "庚醇-3", "indonesian": "heptan-3-ol", "bengali": "হেפטান-৩-অল" },

  /* --- VARIAÇÕES DE HEXANO (C6) --- */
  "hexano": { "english": "hexane", "french": "hexane", "german": "Hexan", "spanish": "hexano", "arabic": "هكسان", "hindi": "हेक्सेन", "russian": "гексан", "chinese": "己烷", "indonesian": "heksana", "bengali": "হেক্সেন" },
  "2-metil-pentano": { "english": "2-methylpentane", "french": "2-méthylpentane", "german": "2-Methylpentan", "spanish": "2-metilpentano", "arabic": "2-ميثيل بنتان", "hindi": "2-मेथिलपेंटेन", "russian": "2-метилпентан", "chinese": "2-甲基戊烷", "indonesian": "2-metilpentana", "bengali": "২-মিথাইল-পেন্টেন" },
  "3-metil-pentano": { "english": "3-methylpentane", "french": "3-méthylpentane", "german": "3-Methylpentan", "spanish": "3-metilpentano", "arabic": "3-ميثيل بنتان", "hindi": "3-मेथिलपेंटेन", "russian": "3-метилпентан", "chinese": "3-甲基戊烷", "indonesian": "3-metilpentana", "bengali": "৩-মিথाइल-পেন্টেন" },
  "hex-1-eno": { "english": "hex-1-ene", "french": "hex-1-ène", "german": "Hex-1-en", "spanish": "hex-1-eno", "arabic": "هكس-1-ين", "hindi": "हेक्स-1-इन", "russian": "гекс-1-ен", "chinese": "己-1-烯", "indonesian": "heks-1-ena", "bengali": "হেক্স-১-ইন" },
  "hex-2-eno": { "english": "hex-2-ene", "french": "hex-2-ène", "german": "Hex-2-en", "spanish": "hex-2-eno", "arabic": "هكس-2-ين", "hindi": "हेक्स-2-इन", "russian": "гекс-2-ен", "chinese": "己-2-烯", "indonesian": "heks-2-ena", "bengali": "হেক্স-২-ইন" },
  "hex-3-eno": { "english": "hex-3-ene", "french": "hex-3-ène", "german": "Hex-3-en", "spanish": "hex-3-eno", "arabic": "هكس-3-ين", "hindi": "हेक्स-3-इन", "russian": "гекс-3-ен", "chinese": "己-3-烯", "indonesian": "heks-3-ena", "bengali": "হেক্স-৩-इन" },
  "hex-1-ino": { "english": "hex-1-yne", "french": "hex-1-yne", "german": "Hex-1-in", "spanish": "hex-1-ino", "arabic": "هكس-1-اين", "hindi": "हेक्स-1-ाइन", "russian": "гекс-1-ин", "chinese": "己-1-炔", "indonesian": "heks-1-ina", "bengali": "হেক্স-১-াইন" },
  "hex-2-ino": { "english": "hex-2-yne", "french": "hex-2-yne", "german": "Hex-2-in", "spanish": "hex-2-ino", "arabic": "هكس-2-اين", "hindi": "हेक्स-2-ाइन", "russian": "гекс-2-ин", "chinese": "己-2-炔", "indonesian": "heks-2-ina", "bengali": "হেक्स-২-اين" },
  "hex-3-ino": { "english": "hex-3-yne", "french": "hex-3-yne", "german": "Hex-3-in", "spanish": "hex-3-ino", "arabic": "هكس-3-اين", "hindi": "हेक्स-3-ाइन", "russian": "гекс-3-ин", "chinese": "己-3-炔", "indonesian": "heks-3-ina", "bengali": "হেक्स-৩-اين" },
  "hexan-1-ol": { "english": "hexan-1-ol", "french": "hexan-1-ol", "german": "Hexan-1-ol", "spanish": "hexan-1-ol", "arabic": "هكسان-1-أول", "hindi": "हेक्सेन-1-ओल", "russian": "гексан-1-ол", "chinese": "己醇-1", "indonesian": "heksan-1-ol", "bengali": "হেক্সান-১-অল" },
  "hexan-2-ol": { "english": "hexan-2-ol", "french": "hexan-2-ol", "german": "Hexan-2-ol", "spanish": "hexan-2-ol", "arabic": "هكسان-2-أول", "hindi": "हेक्सेन-2-ओल", "russian": "гексан-2-ол", "chinese": "己醇-2", "indonesian": "heksan-2-ol", "bengali": "হেক্সান-২-অল" },
  "hexan-3-ol": { "english": "hexan-3-ol", "french": "hexan-3-ol", "german": "Hexan-3-ol", "spanish": "hexan-3-ol", "arabic": "هكسان-3-أول", "hindi": "हेक्सेन-3-ओल", "russian": "гексан-3-ol", "chinese": "己醇-3", "indonesian": "heksan-3-ol", "bengali": "হেक्सान-৩-অল" },

  /* --- VARIAÇÕES DE PENTANO (C5) --- */
  "pentano": { "english": "pentane", "french": "pentane", "german": "Pentan", "spanish": "pentano", "arabic": "بنتان", "hindi": "पेंटेन", "russian": "пентан", "chinese": "戊烷", "indonesian": "pentana", "bengali": "পেন্টেন" },
  "pent-1-eno": { "english": "pent-1-ene", "french": "pent-1-ène", "german": "Pent-1-en", "spanish": "pent-1-eno", "arabic": "بنت-1-ين", "hindi": "पेंट-1-इन", "russian": "пент-1-ен", "chinese": "戊-1-烯", "indonesian": "pent-1-ena", "bengali": "পেন্ট-১-ইন" },
  "pent-2-eno": { "english": "pent-2-ene", "french": "pent-2-ène", "german": "Pent-2-en", "spanish": "pent-2-eno", "arabic": "بنت-2-ين", "hindi": "पेंट-2-इन", "russian": "пент-2-ен", "chinese": "戊-2-烯", "indonesian": "pent-2-ena", "bengali": "पेंट-২-ইন" },
  "pent-1-ino": { "english": "pent-1-yne", "french": "pent-1-yne", "german": "Pent-1-in", "spanish": "pent-1-ino", "arabic": "بنت-1-اين", "hindi": "पेंट-1-ाइन", "russian": "пент-1-ин", "chinese": "戊-1-炔", "indonesian": "pent-1-ina", "bengali": "পেন্ট-১-াইন" },
  "pent-2-ino": { "english": "pent-2-yne", "french": "pent-2-yne", "german": "Pent-2-in", "spanish": "pent-2-ino", "arabic": "بنت-2-اين", "hindi": "पेंट-2-ाइन", "russian": "пент-2-ин", "chinese": "戊-2-炔", "indonesian": "pent-2-ina", "bengali": "পেন্ট-২-اين" },
  "pentan-1-ol": { "english": "pentan-1-ol", "french": "pentan-1-ol", "german": "Pentan-1-ol", "spanish": "pentan-1-ol", "arabic": "بنتان-1-أول", "hindi": "पेंटेन-1-ओल", "russian": "пентан-1-ол", "chinese": "戊醇-1", "indonesian": "pentan-1-ol", "bengali": "পেন্টান-১-অল" },
  "pentan-2-ol": { "english": "pentan-2-ol", "french": "pentan-2-ol", "german": "Pentan-2-ol", "spanish": "pentan-2-ol", "arabic": "بنتان-2-أول", "hindi": "पेंटेन-2-ओल", "russian": "пентан-2-ол", "chinese": "戊醇-2", "indonesian": "pentan-2-ol", "bengali": "পেন্টান-২-অল" },

  /* --- VARIAÇÕES DE BUTANO (C4) --- */
  "butano": { "english": "butane", "french": "butane", "german": "Butan", "spanish": "butano", "arabic": "بيوتان", "hindi": "ब्यूटेन", "russian": "бутан", "chinese": "丁烷", "indonesian": "butana", "bengali": "বুটেন" },
  "2-metil-butano": { "english": "2-methylbutane", "french": "2-méthylbutane", "german": "2-Methylbutan", "spanish": "2-metilbutano", "arabic": "2-ميثيل بيوتان", "hindi": "2-मेथिलब्यूटेन", "russian": "2-метилбутан", "chinese": "2-甲基丁烷", "indonesian": "2-metilbutana", "bengali": "২-মিথাইল-বুটেন" },
  "but-1-eno": { "english": "but-1-ene", "french": "but-1-ène", "german": "But-1-en", "spanish": "but-1-eno", "arabic": "بيوت-1-ين", "hindi": "ब्यूट-1-इन", "russian": "бут-1-ен", "chinese": "丁-1-烯", "indonesian": "but-1-ena", "bengali": "বুট-১-ইন" },
  "but-2-eno": { "english": "but-2-ene", "french": "but-2-ène", "german": "But-2-en", "spanish": "but-2-eno", "arabic": "بيوت-2-ين", "hindi": "ब्यूट-2-इन", "russian": "бут-2-ен", "chinese": "丁-2-烯", "indonesian": "but-2-ena", "bengali": "বুট-২-ইন" },
  "but-1-ino": { "english": "but-1-yne", "french": "but-1-yne", "german": "But-1-in", "spanish": "but-1-ino", "arabic": "بيوت-1-اين", "hindi": "ब्यूट-1-ाइन", "russian": "бут-1-ин", "chinese": "丁-1-炔", "indonesian": "but-1-ina", "bengali": "বুট-১-াইন" },
  "but-2-ino": { "english": "but-2-yne", "french": "but-2-yne", "german": "But-2-in", "spanish": "but-2-ino", "arabic": "بيوت-2-اين", "hindi": "ब्यूट-2-ाइन", "russian": "бут-2-ин", "chinese": "丁-2-炔", "indonesian": "but-2-ina", "bengali": "বুট-২-اين" },
  "butan-1-ol": { "english": "butan-1-ol", "french": "butan-1-ol", "german": "Butan-1-ol", "spanish": "butan-1-ol", "arabic": "بيوتان-1-أول", "hindi": "ब्यूटेन-1-ओल", "russian": "бутан-1-ол", "chinese": "丁醇-1", "indonesian": "butan-1-ol", "bengali": "বুটান-১-অল" },
  "butan-2-ol": { "english": "butan-2-ol", "french": "butan-2-ol", "german": "Butan-2-ol", "spanish": "butan-2-ol", "arabic": "بيوتان-2-أول", "hindi": "ब्यूटेन-2-ओल", "russian": "бутан-2-ол", "chinese": "丁醇-2", "indonesian": "butan-2-ol", "bengali": "বুটান-২-অল" },

  /* --- VARIAÇÕES DE PROPANO (C3) --- */
  "propano": { "english": "propane", "french": "propane", "german": "Propan", "spanish": "propano", "arabic": "بروبان", "hindi": "प्रोपेन", "russian": "пропан", "chinese": "丙烷", "indonesian": "propana", "bengali": "প্রোপেন" },
  "prop-1-eno": { "english": "prop-1-ene", "french": "prop-1-ène", "german": "Prop-1-en", "spanish": "prop-1-eno", "arabic": "بروب-1-ين", "hindi": "प्रोपेन-1-इन", "russian": "проп-1-ен", "chinese": "丙-1-烯", "indonesian": "prop-1-ena", "bengali": "প্রোপ-১-ইন" },
  "prop-1-ino": { "english": "prop-1-yne", "french": "prop-1-yne", "german": "Prop-1-in", "spanish": "prop-1-ino", "arabic": "بروب-1-اين", "hindi": "प्रोपेन-1-ाइन", "russian": "проп-1-ин", "chinese": "丙-1-炔", "indonesian": "prop-1-ina", "bengali": "প্রোপ-১-াইন" },
  "propan-1-ol": { "english": "propan-1-ol", "french": "propan-1-ol", "german": "Propan-1-ol", "spanish": "propan-1-ol", "arabic": "بروبان-1-أول", "hindi": "प्रोपेन-1-ओल", "russian": "пропан-1-ол", "chinese": "丙醇-1", "indonesian": "propan-1-ol", "bengali": "প্রোপান-১-অল" },
  "propan-2-ol": { "english": "propan-2-ol", "french": "propan-2-ol", "german": "Propan-2-ol", "spanish": "propan-2-ol", "arabic": "بروبان-2-أول", "hindi": "प्रोपेन-2-ओल", "russian": "пропан-2-ол", "chinese": "丙醇-2", "indonesian": "propan-2-ol", "bengali": "প্রোপান-২-অল" },

  /* --- ALDEÍDOS (al) E CETONAS (ona) --- */
  "propanal": { "english": "propanal", "french": "propanal", "german": "Propanal", "spanish": "propanal", "arabic": "بروبانال", "hindi": "प्रोपेनैल", "russian": "пропаналь", "chinese": "丙醛", "indonesian": "propanal", "bengali": "প্রোপানাল" },
  "propanona": { "english": "propanone", "french": "propanone", "german": "Propanon", "spanish": "propanona", "arabic": "بروبانون", "hindi": "प्रोपेनोन", "russian": "пропанон", "chinese": "丙酮", "indonesian": "propanon", "bengali": "প্রোপানোন" },
  "butanal": { "english": "butanal", "french": "butanal", "german": "Butanal", "spanish": "butanal", "arabic": "بيوتانال", "hindi": "ब्यूटेनैल", "russian": "бутаналь", "chinese": "丁醛", "indonesian": "butanal", "bengali": "বিউটানাল" },
  "butanona": { "english": "butan-2-one", "french": "butan-2-one", "german": "Butanon", "spanish": "butanona", "arabic": "بيوتانون", "hindi": "ब्यूटेनोन", "russian": "бутанон", "chinese": "丁酮", "indonesian": "butanona", "bengali": "বিউটানোন" },
  "pentanal": { "english": "pentanal", "french": "pentanal", "german": "Pentanal", "spanish": "pentanal", "arabic": "بنتانال", "hindi": "पेंटेनैल", "russian": "пентаналь", "chinese": "戊醛", "indonesian": "pentanal", "bengali": "পেন্টানাল" },
  "pentan-2-ona": { "english": "pentan-2-one", "french": "pentan-2-one", "german": "Pentan-2-on", "spanish": "pentan-2-ona", "arabic": "بنتان-2-ون", "hindi": "पेंटेन-2-ओन", "russian": "пентан-2-он", "chinese": "戊酮-2", "indonesian": "pentan-2-on", "bengali": "পেন্টান-২-ওন" },
  "pentan-3-ona": { "english": "pentan-3-one", "french": "pentan-3-one", "german": "Pentan-3-on", "spanish": "pentan-3-ona", "arabic": "بنتان-3-ون", "hindi": "पेंटेन-3-ओन", "russian": "пентан-3-он", "chinese": "戊酮-3", "indonesian": "pentan-3-on", "bengali": "পেন্টান-৩-ওন" },
  "hexanal": { "english": "hexanal", "french": "hexanal", "german": "Hexanal", "spanish": "hexanal", "arabic": "هكسانال", "hindi": "हेक्सेनैल", "russian": "гексаналь", "chinese": "己醛", "indonesian": "hexanal", "bengali": "হেক্সানাল" },
  "hexan-2-ona": { "english": "hexan-2-one", "french": "hexan-2-one", "german": "Hexan-2-on", "spanish": "hexan-2-ona", "arabic": "هكسان-2-ون", "hindi": "हेक्सेन-2-ओन", "russian": "гексан-2-он", "chinese": "己酮-2", "indonesian": "hexan-2-on", "bengali": "হেক্সান-২-ওন" },
  "hexan-3-ona": { "english": "hexan-3-one", "french": "hexan-3-one", "german": "Hexan-3-on", "spanish": "hexan-3-ona", "arabic": "هكسان-3-ون", "hindi": "हेक्सेन-3-ओन", "russian": "гексан-3-он", "chinese": "己酮-3", "indonesian": "hexan-3-on", "bengali": "হেक्सान-৩-ওন" },

  /* --- ÉTERES (oxi) --- */
  "metoximetano": { "english": "methoxymethane", "french": "méthoxyméthane", "german": "Methoxymethan", "spanish": "metoximetano", "arabic": "ميثوكسي ميثان", "hindi": "मेथॉक्सीमेथेन", "russian": "метоксиметан", "chinese": "甲醚", "indonesian": "metoksimetana", "bengali": "মিথোক্সিমিথেন" },
  "metoxietano": { "english": "methoxyethane", "french": "méthoxyéthane", "german": "Methoxyethan", "spanish": "metoxietano", "arabic": "ميثوكسي إيثان", "hindi": "मेथॉक्सीएथेन", "russian": "метоксиэтан", "chinese": "甲乙醚", "indonesian": "metoksietana", "bengali": "মিথোক্সিয়েথেন" },
  "etoxietano": { "english": "ethoxyethane", "french": "éthoxyéthane", "german": "Ethoxyethan", "spanish": "etoxietano", "arabic": "إيثوكسي إيثان", "hindi": "एथॉक्सीएथेन", "russian": "этоксиэтан", "chinese": "乙醚", "indonesian": "etoksetana", "bengali": "ইথোক্সিয়েথেন" },

  /* --- CICLOALCANOS E CICLOALCENOS --- */
  "ciclopropano": { "english": "cyclopropane", "french": "cyclopropane", "german": "Cyclopropan", "spanish": "ciclopropano", "arabic": "سيكلوبروبان", "hindi": "साइक्लोप्रोपेन", "russian": "циклопропан", "chinese": "环丙烷", "indonesian": "siklopropana", "bengali": "সাইক্লোপ্রোপেন" },
  "ciclopropeno": { "english": "cyclopropene", "french": "cyclopropène", "german": "Cyclopropen", "spanish": "ciclopropeno", "arabic": "سيكلوبروبين", "hindi": "साइक्लोप्रोपिन", "russian": "циклопропен", "chinese": "环丙烯", "indonesian": "siklopropena", "bengali": "সাইক্লোপ্রোপিন" },
  "ciclobutano": { "english": "cyclobutane", "french": "cyclobutane", "german": "Cyclobutan", "spanish": "ciclobutano", "arabic": "سيكلوبيوتان", "hindi": "साइक्लोब्यूटेन", "russian": "циклобутан", "chinese": "环丁烷", "indonesian": "siklobutana", "bengali": "সাইক্লোবিউটেন" },
  "ciclobuteno": { "english": "cyclobutene", "french": "cyclobutene", "german": "Cyclobuten", "spanish": "ciclobuteno", "arabic": "سيكلوبيوتين", "hindi": "साइक्लोब्यूटिन", "russian": "циклобутен", "chinese": "环丁烯", "indonesian": "siklobutena", "bengali": "সাইক্লোবিউটিন" },
  "ciclopentano": { "english": "cyclopentane", "french": "cyclopentane", "german": "Cyclopentan", "spanish": "ciclopentano", "arabic": "سيكلوبنتان", "hindi": "साइक्लोपेंटेन", "russian": "циклоपेंटेन", "chinese": "环戊烷", "indonesian": "siklopentana", "bengali": "সাইক্লোপেন্টেন" },
  "ciclopenteno": { "english": "cyclopentene", "french": "cyclopentene", "german": "Cyclopenten", "spanish": "ciclopenteno", "arabic": "سيكلوبنتين", "hindi": "साइक्लोपेंटिन", "russian": "циклопентен", "chinese": "环戊烯", "indonesian": "siklopentena", "bengali": "সাইক্লোপেন্টিন" }


};
