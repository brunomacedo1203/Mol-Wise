// src/features/visualization/utils/chemicalDictionary/lexicon.ts
// 🌍 Léxico multilíngue expandido de íons químicos com suporte a normalização e variações sem acento

export const LEXICON: Record<
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
  }
> = {
  // ⚗️ ÂNIONS COMUNS
  "nitrato": { english: "nitrate", french: "nitrate", german: "Nitrat", spanish: "nitrato", arabic: "نترات", hindi: "नाइट्रेट", russian: "нитрат", chinese: "硝酸根", indonesian: "nitrat", bengali: "নাইট্রেট" },
  "nitrito": { english: "nitrite", french: "nitrite", german: "Nitrit", spanish: "nitrito", arabic: "نتريت", hindi: "नाइट्राइट", russian: "нитрит", chinese: "亚硝酸根", indonesian: "nitrit", bengali: "নাইট্রাইট" },
  "sulfato": { english: "sulfate", french: "sulfate", german: "Sulfat", spanish: "sulfato", arabic: "كبريتات", hindi: "सल्फेट", russian: "сульфат", chinese: "硫酸根", indonesian: "sulfat", bengali: "সালফেট" },
  "sulfito": { english: "sulfite", french: "sulfite", german: "Sulfit", spanish: "sulfito", arabic: "كبريتيت", hindi: "सल्फाइट", russian: "сульфит", chinese: "亚硫酸根", indonesian: "sulfit", bengali: "সালফাইট" },
  "cloreto": { english: "chloride", french: "chlorure", german: "Chlorid", spanish: "cloruro", arabic: "كلوريد", hindi: "क्लोराइड", russian: "хлорид", chinese: "氯化物", indonesian: "klorida", bengali: "ক্লোরাইড" },
  "fluoreto": { english: "fluoride", french: "fluorure", german: "Fluorid", spanish: "fluoruro", arabic: "فلوريد", hindi: "फ्लोराइड", russian: "фторид", chinese: "氟化物", indonesian: "fluorida", bengali: "ফ্লোরাইড" },
  "brometo": { english: "bromide", french: "bromure", german: "Bromid", spanish: "bromuro", arabic: "بروميد", hindi: "ब्रोमाइड", russian: "бромид", chinese: "溴化物", indonesian: "bromida", bengali: "ব্রোমাইড" },
  "iodeto": { english: "iodide", french: "iodure", german: "Iodid", spanish: "yoduro", arabic: "يوديد", hindi: "आयोडाइड", russian: "йодид", chinese: "碘化物", indonesian: "iodida", bengali: "আয়োডাইড" },
  "perclorato": { english: "perchlorate", french: "perchlorate", german: "Perchlorat", spanish: "perclorato", arabic: "بركلورات", hindi: "परक्लोरेट", russian: "перхлорат", chinese: "高氯酸盐", indonesian: "perklorat", bengali: "পারক্লোরেট" },
  "hipoclorito": { english: "hypochlorite", french: "hypochlorite", german: "Hypochlorit", spanish: "hipoclorito", arabic: "هيبوكلوريت", hindi: "हाइपोक्लोराइट", russian: "гипохлорит", chinese: "次氯酸盐", indonesian: "hipoklorit", bengali: "হাইপোক্লোরাইট" },
  "permanganato": { english: "permanganate", french: "permanganate", german: "Permanganat", spanish: "permanganato", arabic: "برمنجنات", hindi: "परमैंगनेट", russian: "перманганат", chinese: "高锰酸盐", indonesian: "permanganat", bengali: "পারম্যাঙ্গানেট" },
  "cromato": { english: "chromate", french: "chromate", german: "Chromat", spanish: "cromato", arabic: "كرومات", hindi: "क्रोमेट", russian: "хромат", chinese: "铬酸盐", indonesian: "kromat", bengali: "ক্রোমেট" },
  "dicromato": { english: "dichromate", french: "dichromate", german: "Dichromat", spanish: "dicromato", arabic: "ثنائي الكرومات", hindi: "डाइक्रोमेट", russian: "дихромат", chinese: "重铬酸盐", indonesian: "dikromat", bengali: "ডাইক্ৰোমেট" },
  "cianeto": { english: "cyanide", french: "cyanure", german: "Cyanid", spanish: "cianuro", arabic: "سيانيد", hindi: "साइनाइड", russian: "цианид", chinese: "氰化物", indonesian: "sianida", bengali: "সায়ানাইড" },
  "tiocianato": { english: "thiocyanate", french: "thiocyanate", german: "Thiocyanat", spanish: "tiocianato", arabic: "ثायोसायनेट", hindi: "थायोसायनेट", russian: "тиоцианат", chinese: "硫氰酸盐", indonesian: "tiocyanat", bengali: "থায়োসায়ানেট" },
  "silicato": { english: "silicate", french: "silicate", german: "Silikat", spanish: "silicato", arabic: "سيليكات", hindi: "सिलिकेट", russian: "силикат", chinese: "硅酸盐", indonesian: "silikat", bengali: "সিলিকেট" },
  "borato": { english: "borate", french: "borate", german: "Borate", spanish: "borato", arabic: "بورات", hindi: "बोरेट", russian: "борат", chinese: "硼酸盐", indonesian: "borat", bengali: "বোরেট" },
  "arsenato": { english: "arsenate", french: "arséniate", german: "Arsenat", spanish: "arseniato", arabic: "زرنيخات", hindi: "आर्सेनेट", russian: "арсенат", chinese: "砷酸盐", indonesian: "arsenat", bengali: "আর্সেনেট" },
  "molibdato": { english: "molybdate", french: "molybdate", german: "Molybdat", spanish: "molibdato", arabic: "موليبديت", hindi: "मोलिब्डेट", russian: "молибдат", chinese: "钼酸盐", indonesian: "molibdat", bengali: "মোলিবডেট" },
  "vanadato": { english: "vanadate", french: "vanadate", german: "Vanadat", spanish: "vanadato", arabic: "فانادات", hindi: "वानडेट", russian: "ванадат", chinese: "钒酸盐", indonesian: "vanadat", bengali: "ভানাডেট" },

  // ⚙️ CÁTIONS COMUNS E METÁLICOS
  "hidrogênio": { english: "hydrogen", french: "hydrogène", german: "Wasserstoff", spanish: "hidrógeno", arabic: "هيدروجين", hindi: "हाइड्रोजन", russian: "водород", chinese: "氢", indonesian: "hidrogen", bengali: "হাইড্রোজেন" },
  "litio": { english: "lithium", french: "lithium", german: "Lithium", spanish: "litio", arabic: "ليثيوم", hindi: "लिथियम", russian: "литий", chinese: "锂", indonesian: "litium", bengali: "লিথিয়াম" },
  "berilio": { english: "beryllium", french: "béryllium", german: "Beryllium", spanish: "berilio", arabic: "بريليوم", hindi: "बेरीलियम", russian: "бериллий", chinese: "铍", indonesian: "berilium", bengali: "বেরিলিয়াম" },
  "magnésio": { english: "magnesium", french: "magnésium", german: "Magnesium", spanish: "magnesio", arabic: "مغنيسيوم", hindi: "मैग्नीशियम", russian: "магний", chinese: "镁", indonesian: "magnesium", bengali: "ম্যাগনেসিয়াম" },
  "calcio": { english: "calcium", french: "calcium", german: "Calcium", spanish: "calcio", arabic: "كالسيوم", hindi: "कैल्शियम", russian: "кальций", chinese: "钙", indonesian: "kalsium", bengali: "ক্যালসিয়াম" },
  "estrôncio": { english: "strontium", french: "strontium", german: "Strontium", spanish: "estroncio", arabic: "سترونتيوم", hindi: "स्ट्रोंटियम", russian: "стронций", chinese: "锶", indonesian: "stronsium", bengali: "স্ট্রনশিয়াম" },
  "bario": { english: "barium", french: "baryum", german: "Barium", spanish: "bario", arabic: "باريوم", hindi: "बेरियम", russian: "барий", chinese: "钡", indonesian: "barium", bengali: "বেরিয়াম" },
  "manganês": { english: "manganese", french: "manganèse", german: "Mangan", spanish: "manganeso", arabic: "منغنيز", hindi: "मैंगनीज", russian: "марганец", chinese: "锰", indonesian: "mangan", bengali: "ম্যানগানিজ" },
  "cromo": { english: "chromium", french: "chrome", german: "Chrom", spanish: "cromo", arabic: "كروم", hindi: "क्रोमियम", russian: "хром", chinese: "铬", indonesian: "kromium", bengali: "ক্রোমিয়াম" },
  "ferro": { english: "iron", french: "fer", german: "Eisen", spanish: "hierro", arabic: "حديد", hindi: "लोहा", russian: "железо", chinese: "铁", indonesian: "besi", bengali: "লোহা" },
  "cobalto": { english: "cobalt", french: "cobalt", german: "Kobalt", spanish: "cobalto", arabic: "كوبالت", hindi: "कोबाल्ट", russian: "кобальт", chinese: "钴", indonesian: "kobalt", bengali: "কোবাল্ট" },
  "niquel": { english: "nickel", french: "nickel", german: "Nickel", spanish: "níquel", arabic: "نيكل", hindi: "निकल", russian: "никель", chinese: "镍", indonesian: "nikel", bengali: "নিকেল" },
  "cobre": { english: "copper", french: "cuivre", german: "Kupfer", spanish: "cobre", arabic: "نحاس", hindi: "तांबा", russian: "медь", chinese: "铜", indonesian: "tembaga", bengali: "তামা" },
  "zinco": { english: "zinc", french: "zinc", german: "Zink", spanish: "zinc", arabic: "زنك", hindi: "जिंक", russian: "цинк", chinese: "锌", indonesian: "seng", bengali: "জিঙ্ক" },
  "prata": { english: "silver", french: "argent", german: "Silber", spanish: "plata", arabic: "فضة", hindi: "चांदी", russian: "серебро", chinese: "银", indonesian: "perak", bengali: "রূপা" },
  "ouro": { english: "gold", french: "or", german: "Gold", spanish: "oro", arabic: "ذهب", hindi: "सोना", russian: "золото", chinese: "金", indonesian: "emas", bengali: "সোনা" },
  "platina": { english: "platinum", french: "platine", german: "Platin", spanish: "platino", arabic: "بلاتين", hindi: "प्लैटिनम", russian: "платина", chinese: "铂", indonesian: "platina", bengali: "প্লাটিনাম" },
  "mercurio": { english: "mercury", french: "mercure", german: "Quecksilber", spanish: "mercurio", arabic: "زئبق", hindi: "पारा", russian: "ртуть", chinese: "汞", indonesian: "raksa", bengali: "পারদ" },
  "estanho": { english: "tin", french: "étain", german: "Zinn", spanish: "estaño", arabic: "قصدير", hindi: "टिन", russian: "олово", chinese: "锡", indonesian: "timah", bengali: "টিন" },
  "chumbo": { english: "lead", french: "plomb", german: "Blei", spanish: "plomo", arabic: "رصاص", hindi: "सीसा", russian: "свинец", chinese: "铅", indonesian: "timbal", bengali: "সীসা" },
  "bismuto": { english: "bismuth", french: "bismuth", german: "Wismut", spanish: "bismuto", arabic: "بيزموت", hindi: "बिस्मथ", russian: "висмут", chinese: "铋", indonesian: "bismut", bengali: "বিসমাথ" },
  "titanio": { english: "titanium", french: "titane", german: "Titan", spanish: "titanio", arabic: "تيتانيوم", hindi: "टाइटेनियम", russian: "титан", chinese: "钛", indonesian: "titanium", bengali: "টাইটানিয়াম" },
  "uranio": { english: "uranium", french: "uranium", german: "Uran", spanish: "uranio", arabic: "يورانيوم", hindi: "यूरेनियम", russian: "уран", chinese: "铀", indonesian: "uranium", bengali: "ইউরেনিয়াম" }
};

/**
 * 🔤 Mapeia um termo em português (com ou sem acento) para o nome em inglês.
 */
export function mapToEnglish(term: string): string | null {
  const normalized = term
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // remove acentos
  return LEXICON[normalized]?.english ?? null;
}
