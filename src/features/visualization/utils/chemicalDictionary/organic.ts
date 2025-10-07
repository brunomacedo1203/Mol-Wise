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
"propano": {
  english: "propane",
  french: "propane",
  german: "Propan",
  spanish: "propano",
  arabic: "بروبان",
  hindi: "प्रोपेन",
  russian: "пропан",
  chinese: "丙烷",
  indonesian: "propana",
  bengali: "প্রোপেন"
},
"butano": {
  english: "butane",
  french: "butane",
  german: "Butan",
  spanish: "butano",
  arabic: "بيوتان",
  hindi: "ब्यूटेन",
  russian: "бутан",
  chinese: "丁烷",
  indonesian: "butana",
  bengali: "বিউটেন"
},
"pentano": {
  english: "pentane",
  french: "pentane",
  german: "Pentan",
  spanish: "pentano",
  arabic: "بنتان",
  hindi: "पेंटेन",
  russian: "пентан",
  chinese: "戊烷",
  indonesian: "pentana",
  bengali: "পেন্টেন"
},
"hexano": {
  english: "hexane",
  french: "hexane",
  german: "Hexan",
  spanish: "hexano",
  arabic: "هيكسان",
  hindi: "हेक्सेन",
  russian: "гексан",
  chinese: "己烷",
  indonesian: "heksana",
  bengali: "হেক্সেন"
},
"heptano": {
  english: "heptane",
  french: "heptane",
  german: "Heptan",
  spanish: "heptano",
  arabic: "هيبتان",
  hindi: "हेप्टेन",
  russian: "гептан",
  chinese: "庚烷",
  indonesian: "heptana",
  bengali: "হেপ্টেন"
},
"octano": {
  english: "octane",
  french: "octane",
  german: "Oktan",
  spanish: "octano",
  arabic: "أوكتان",
  hindi: "ऑक्टेन",
  russian: "октан",
  chinese: "辛烷",
  indonesian: "oktana",
  bengali: "অকটেন"
},
"nonano": {
  english: "nonane",
  french: "nonane",
  german: "Nonan",
  spanish: "nonano",
  arabic: "نونان",
  hindi: "नॉनैन",
  russian: "нонан",
  chinese: "壬烷",
  indonesian: "nonana",
  bengali: "নোনেন"
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
  }
};
