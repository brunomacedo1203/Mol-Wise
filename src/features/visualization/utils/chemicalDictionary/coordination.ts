// src/features/visualization/utils/chemicalDictionary/coordination.ts
// 🌍 Dicionário multilíngue de compostos de coordenação

export const COORDINATION_DICTIONARY: Record<
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
  // ⚗️ Complexos de cobre
  "hexaaquacobre(ii)": {
    english: "hexaaquacopper(ii)",
    french: "hexaaquacuivre(ii)",
    german: "Hexaaquakupfer(ii)",
    spanish: "hexaacuacobre(ii)",
    arabic: "هيكسا أكوا نحاس (ii)",
    hindi: "हेक्साएक्वाकॉपर (ii)",
    russian: "гексааквакомплекс меди(ii)",
    chinese: "六水铜(II)",
    indonesian: "heksaaquacopper(ii)",
    bengali: "হেক্সাএকুয়াকপার (ii)"
  },
  "tetraaminacobre(ii)": {
    english: "tetraamminecopper(ii)",
    french: "tétraamminecuivre(ii)",
    german: "Tetraamminkupfer(ii)",
    spanish: "tetraaminacobre(ii)",
    arabic: "تترا أمين نحاس (ii)",
    hindi: "टेट्रामाइनकॉपर (ii)",
    russian: "тетраамминмедь(ii)",
    chinese: "四氨铜(II)",
    indonesian: "tetraamminetembaga(ii)",
    bengali: "টেট্রাঅ্যামিনকপার (ii)"
  },
  "diaminadicloretocobre(ii)": {
    english: "diammine dichlorocopper(ii)",
    french: "diammine dichlorocuivre(ii)",
    german: "Diammindichlorkupfer(ii)",
    spanish: "diaminadicloretocobre(ii)",
    arabic: "ثنائي أمين ثنائي كلورو نحاس (ii)",
    hindi: "डायमाइन डाइक्लोरोकॉपर (ii)",
    russian: "диамминдихлормедь(ii)",
    chinese: "二氨二氯铜(II)",
    indonesian: "diammina diklorotembaga(ii)",
    bengali: "ডায়ামিন ডাইক্লোরোকপার (ii)"
  },
  "tetraaminadicloretocobre(ii)": {
    english: "tetraammine dichlorocopper(ii)",
    french: "tétraammine dichlorocuivre(ii)",
    german: "Tetraammindichlorkupfer(ii)",
    spanish: "tetraaminadicloretocobre(ii)",
    arabic: "تترا أمين ثنائي كلورو نحاس (ii)",
    hindi: "टेट्रामाइन डाइक्लोरोकॉपर (ii)",
    russian: "тетраамминдихлормедь(ii)",
    chinese: "四氨二氯铜(II)",
    indonesian: "tetraammina diklorotembaga(ii)",
    bengali: "টেট্রাঅ্যামিন ডাইক্লোরোকপার (ii)"
  },
  "hexacianoferrato(ii) de potássio": {
    english: "potassium hexacyanoferrate(ii)",
    french: "hexacyanoferrate(ii) de potassium",
    german: "Kaliumhexacyanoferrat(ii)",
    spanish: "hexacianoferrato(ii) de potasio",
    arabic: "هيكساسيانوفيرات (ii) البوتاسيوم",
    hindi: "पोटेशियम हेक्सासायनोफेरट (ii)",
    russian: "гексацианоферрат(II) калия",
    chinese: "亚铁氰化钾",
    indonesian: "kalium heksasianoferat(ii)",
    bengali: "পটাসিয়াম হেক্সাসায়ানোফেরেট (ii)",
    commonName: "ferrocianeto de potássio"
  },
  "hexacianoferrato(iii) de potássio": {
    english: "potassium hexacyanoferrate(iii)",
    french: "hexacyanoferrate(iii) de potassium",
    german: "Kaliumhexacyanoferrat(iii)",
    spanish: "hexacianoferrato(iii) de potasio",
    arabic: "هيكساسيانوفيرات (iii) البوتاسيوم",
    hindi: "पोटेशियम हेक्सासायनोफेरट (iii)",
    russian: "гексацианоферрат(III) калия",
    chinese: "铁氰化钾",
    indonesian: "kalium heksasianoferat(iii)",
    bengali: "পটাসিয়াম হেক্সাসায়ানোফেরেট (iii)",
    commonName: "ferricianeto de potássio"
  },
  "hexacianoferrato(iii) de sódio": {
    english: "sodium hexacyanoferrate(iii)",
    french: "hexacyanoferrate(iii) de sodium",
    german: "Natriumhexacyanoferrat(iii)",
    spanish: "hexacianoferrato(iii) de sodio",
    arabic: "هيكساسيانوفيرات (iii) الصوديوم",
    hindi: "सोडियम हेक्सासायनोफेरट (iii)",
    russian: "гексацианоферрат(III) натрия",
    chinese: "铁氰化钠",
    indonesian: "natrium heksasianoferat(iii)",
    bengali: "সোডিয়াম হেক্সাসায়ানোফেরেট (iii)",
    commonName: "ferricianeto de sódio"
  },

  // 🔵 Complexos de níquel e cobalto
  "tetraaminaníquel(ii)": {
    english: "tetraamminenickel(ii)",
    french: "tétraamminenickel(ii)",
    german: "Tetraamminnickel(ii)",
    spanish: "tetraaminaníquel(ii)",
    arabic: "تترا أمين نيكل (ii)",
    hindi: "टेट्रामाइन निकल (ii)",
    russian: "тетраамминникель(ii)",
    chinese: "四氨镍(II)",
    indonesian: "tetraamminenikel(ii)",
    bengali: "টেট্রাঅ্যামিননিকেল (ii)"
  },
  "hexaaminacobalto(iii)": {
    english: "hexaamminecobalt(iii)",
    french: "hexaamminecobalt(iii)",
    german: "Hexaamminkobalt(iii)",
    spanish: "hexaaminacobalto(iii)",
    arabic: "هيكسا أمين كوبالت (iii)",
    hindi: "हेक्सामाइन कोबाल्ट (iii)",
    russian: "гексаамминкобальт(iii)",
    chinese: "六氨钴(III)",
    indonesian: "heksaamminakobalt(iii)",
    bengali: "হেক্সাঅ্যামিনকোবাল্ট (iii)"
  },
  "pentaaminanitratocobalto(iii)": {
    english: "pentaammine nitrate cobalt(iii)",
    french: "pentaammine nitrate de cobalt(iii)",
    german: "Pentaamminnitratkobalt(iii)",
    spanish: "pentaaminanitratocobalto(iii)",
    arabic: "بنتا أمين نترات كوبالت (iii)",
    hindi: "पेंटामाइन नाइट्रेट कोबाल्ट (iii)",
    russian: "пентаамминнитраткобальт(iii)",
    chinese: "五氨硝酸钴(III)",
    indonesian: "pentaammina nitrat kobalt(iii)",
    bengali: "পেন্টাঅ্যামিন নাইট্রেট কোবাল্ট (iii)"
  },
  "tris(etilenodiamina)cobalto(iii)": {
    english: "tris(ethylenediamine)cobalt(iii)",
    french: "tris(éthylènediamine)cobalt(iii)",
    german: "Tris(ethylendiamin)kobalt(iii)",
    spanish: "tris(etilenodiamina)cobalto(iii)",
    arabic: "تريس (إيثيلين ديامين) كوبالت (iii)",
    hindi: "ट्रिस (एथिलीनडायमाइन) कोबाल्ट (iii)",
    russian: "трис(этилендиамин)кобальт(iii)",
    chinese: "三(乙二胺)钴(III)",
    indonesian: "tris(etilenediamina)kobalt(iii)",
    bengali: "ট্রিস (ইথিলিনডায়ামিন) কোবাল্ট (iii)"
  },

  // ⚗️ Complexos de platina
  "diaminadicloretoplatina(ii)": {
    english: "diammine dichloroplatinum(ii)",
    french: "diammine dichloroplatine(ii)",
    german: "Diammindichloroplatin(ii)",
    spanish: "diaminadicloretoplatina(ii)",
    arabic: "ثنائي أمين ثنائي كلورو بلاتين (ii)",
    hindi: "डायमाइन डाइक्लोरोप्लैटिनम (ii)",
    russian: "диамминдихлорплатина(ii)",
    chinese: "二氨二氯铂(II)",
    indonesian: "diammina dikloroplatina(ii)",
    bengali: "ডায়ামিন ডাইক্লোরোপ্লাটিনাম (ii)",
    commonName: "cisplatina"
  },
  "tetraaminaplatina(ii)": {
    english: "tetraammineplatinum(ii)",
    french: "tétraammineplatine(ii)",
    german: "Tetraamminplatin(ii)",
    spanish: "tetraaminaplatina(ii)",
    arabic: "تترا أمين بلاتين (ii)",
    hindi: "टेट्रामाइन प्लेटिनम (ii)",
    russian: "тетраамминплатина(ii)",
    chinese: "四氨铂(II)",
    indonesian: "tetraamminaplatina(ii)",
    bengali: "টেট্রাঅ্যামিনপ্লাটিনাম (ii)"
  },

  // 🧲 Complexos de ferro
  "tris(oxalato)ferrato(iii) de potássio": {
    english: "potassium tris(oxalato)ferrate(iii)",
    french: "tris(oxalato)ferrate(iii) de potassium",
    german: "Kaliumtris(oxalato)ferrat(iii)",
    spanish: "tris(oxalato)ferrato(iii) de potasio",
    arabic: "تريس (أوكسالاتو) فيرات (iii) البوتاسيوم",
    hindi: "पोटेशियम ट्रिस (ऑक्सालेटो) फेरट (iii)",
    russian: "трис(оксалато)феррат(III) калия",
    chinese: "三(草酸根)铁(III)钾",
    indonesian: "kalium tris(oksalato)ferat(iii)",
    bengali: "পটাসিয়াম ট্রিস (অক্সালাটো) ফেরেট (iii)"
  },

  // ⚛️ Complexos mistos
  "tris(acetilacetonato)cobalto(iii)": {
    english: "tris(acetylacetonato)cobalt(iii)",
    french: "tris(acétylacétonato)cobalt(iii)",
    german: "Tris(acetylacetonato)kobalt(iii)",
    spanish: "tris(acetilacetonato)cobalto(iii)",
    arabic: "تريس (أسيتيل أسيتوناتو) كوبالت (iii)",
    hindi: "ट्रिस (एसेटाइलएसेटोनाटो) कोबाल्ट (iii)",
    russian: "трис(ацетилацетонато)кобальт(iii)",
    chinese: "三(乙酰丙酮)钴(III)",
    indonesian: "tris(asetilasetonato)kobalt(iii)",
    bengali: "ট্রিস (অ্যাসিটাইলঅ্যাসিটোনাটো) কোবাল্ট (iii)"
  },
  "tris(acetilacetonato)ferro(iii)": {
    english: "tris(acetylacetonato)iron(iii)",
    french: "tris(acétylacétonato)fer(iii)",
    german: "Tris(acetylacetonato)eisen(iii)",
    spanish: "tris(acetilacetonato)hierro(iii)",
    arabic: "تريس (أسيتيل أسيتوناتو) حديد (iii)",
    hindi: "ट्रिस (एसेटाइलएसेটोनাটো) आयরन (iii)",
    russian: "трис(ацетилацетонато)железо(iii)",
    chinese: "三(乙酰丙酮)铁(III)",
    indonesian: "tris(asetilasetonato)besi(iii)",
    bengali: "ট্রিস (অ্যাসিটাইলঅ্যাসিটোনাটো) লোহা (iii)"
  }
};
