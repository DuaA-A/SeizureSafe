const fs = require('fs');

const arPath = './src/locales/ar.json';
const enPath = './src/locales/en.json';

const interactionsDataAr = {
  "desc": {
    "ccbCarba": "خطر تسمم شديد: أدوية الضغط ترفع نسبة التجريتول في الدم لمستويات سامة خلال 48 ساعة.",
    "stJohnsAED": "عشبة القديس يوحنا تحفز إنزيمات الكبد وتدمر فعالية أدوية الصرع وحبوب منع الحمل.",
    "theoAED": "أدوية الصرع تسرع تكسير دواء الربو (الثيوفيلين) قبل أن يعالج الرئتين.",
    "metroPheny": "الفلاجيل يمنع الكبد من التخلص من الفينيتوين (Epanutin) مما يسبب تراكمه السام.",
    "inhAED": "مثبط قوي جداً للإنزيمات يرفع مستويات أدوية الصرع لمستويات خطيرة.",
    "psyCarba": "تثبيط نخاع العظم (Bone Marrow Suppression): دمج يدمر كرات الدم البيضاء تماماً.",
    "diuAED": "خطر نقص الصوديوم الحاد في الدم (Hyponatremia) واختلال أملاح المخ.",
    "reducedEfficacy": "تفاعل يقلل من فعالية الدواء الآخر بشكل كبير.",
    "increasedLevels": "تفاعل يرفع مستوى الدواء الآخر لمستويات قد تكون سامة.",
    "aspirinValproate": "الأسبرين يرفع مستويات الفالبورات في الدم مما قد يسبب تسمماً كبدياً.",
    "oldGenGeneric": "هذا الدواء من الجيل القديم الذي يتم استقلابه في الكبد بقوة.",
    "newGenGeneric": "دواء من الجيل الحديث، يعتبر آمناً بشكل عام مع معظم الأدوية."
  },
  "mechanism": {
    "ccbCarba": "أدوية الضغط هذه تعطل إنزيمات الكبد (CYP3A4) تماماً، مما يرفع نسبة التجريتول في الدم لمستويات التسمم خلال 48 ساعة.",
    "stJohnsAED": "هذه العشبة محفز شرس لإنزيمات الكبد، تقوم بتنظيف الدم من أدوية الصرع تماماً.",
    "theoAED": "أدوية الصرع الكلاسيكية تقوم بتكسير دواء الربو بسرعة فائقة قبل أن يعالج الرئتين.",
    "metroPheny": "الفلاجيل يمنع الكبد من التخلص من الفينيتوين، فيتراكم في الدم.",
    "inhAED": "INH مثبط قوي جداً للإنزيمات؛ يعتمد التفاعل على جينات المريض (Slow Acetylators).",
    "psyCarba": "الكاربامازيبين والكلوزابين كلاهما يسببان أثراً جانبياً مميتاً وهو تثبيط نخاع العظم.",
    "diuAED": "أدوية الصرع هذه تسبب نقص الصوديوم، وإضافة مدرات البول تؤدي لجفاف وهبوط حاد في أملاح المخ.",
    "oldGenGeneric": "يؤثر بشكل كبير على إنزيمات الكبد (CYP450) إما بالتثبيط أو التحفيز.",
    "newGenGeneric": "يُفرز غالباً عن طريق الكلى ولا يتدخل في مسارات استقلاب الكبد المعتادة."
  },
  "demo": {
    "ccbCarba": {
      "female": "الإناث/الحوامل: قد يسبب تسمماً عصبياً للأم ونقص أكسجين للجنين بسبب بطء ضربات قلب الأم.",
      "senior": "كبار السن: هبوط حاد في ضربات القلب (Bradycardia)، غيبوبة، وسقوط مميت.",
      "child": "الأطفال: فشل قلبي وتنفسي سريع في حال التناول الخاطئ."
    },
    "stJohnsAED": {
      "female": "الإناث: خطر مضاعف؛ حدوث تشنجات بسبب فشل الدواء، وحدوث حمل غير مرغوب بسبب فشل حبوب منع الحمل.",
      "male": "الذكور: انخفاض فعالية دواء الصرع وعودة التشنجات.",
      "pregnant": "الحوامل: يسبب انقباضات رحمية وفقدان السيطرة على الصرع."
    },
    "theoAED": {
      "child": "الأطفال: أزمات ربو حادة واختناق ليلي نتيجة تكسير دواء الربو.",
      "senior": "كبار السن: مرضى السدة الرئوية (COPD) سيعانون من فشل تنفسي لأن دواء الرئة لا يعمل.",
      "pregnant": "الحوامل: نقص الأكسجين بسبب أزمة الربو يهدد حياة الجنين مباشرة."
    },
    "metroPheny": {
      "child": "الأطفال: تسمم عصبي (الطفل يترنح ولا يستطيع المشي) نتيجة تراكم الفينيتوين.",
      "pregnant": "الحوامل: زيادة نسبة الفينيتوين تزيد من مخاطر التشوهات الجنينية."
    },
    "inhAED": {
      "genetic": "الجينات: مرضى Slow Acetylators عرضة لتسمم مميت في غضون أيام.",
      "child": "الأطفال: يتطلب حجراً طبياً ومراقبة مستوى الدواء يومياً في المستشفى."
    },
    "psyCarba": {
      "general": "الجميع: متلازمة (Agranulocytosis)؛ فقدان المناعة الكامل، وأي ميكروب قد يصبح مميتاً.",
      "senior": "كبار السن: وفاة سريعة بسبب العدوى أو الالتهاب الرئوي لانعدام المناعة."
    },
    "diuAED": {
      "senior": "كبار السن: نقص الصوديوم يسبب تورم الدماغ، غيبوبة، ونوبات صرع مستمرة.",
      "female": "الإناث: أكثر عرضة لاختلال الأملاح بسبب التغيرات الهرمونية الدورية."
    },
    "oldGenGeneric": {
      "general": "توقع نسبة تفاعل 90% مع أي دواء كبدي آخر."
    },
    "newGenGeneric": {
      "senior": "كبار السن: يتأثر فقط بوظائف الكلى، لذا يجب مراقبة كفاءة الكلى لديهم."
    }
  },
  "emergency": {
    "ccbCarba": "التوجه للطوارئ فوراً لعمل تخطيط قلب (ECG) وقياس مستوى التجريتول. استبدل الدواء بـ Amlodipine.",
    "stJohnsAED": "إيقاف المكمل فوراً. في حال التشنجات، توجه للمستشفى لأخذ جرعة إنقاذية وريدية.",
    "theoAED": "استخدم بخاخات موضعية (Inhalers) بدلاً من الأقراص لأنها لا تتفاعل مع أدوية الصرع.",
    "metroPheny": "استخدم مضادات بكتيرية لا تتفاعل مع الكبد، أو خفض الجرعة مع المراقبة الدقيقة.",
    "inhAED": "طوارئ تنفسية وعصبية؛ إيقاف فوري وتدفق وريدي للسوائل ومراقبة حثيثة.",
    "psyCarba": "دمج ممنوع دولياً (Contraindicated). التوجه فوراً للعناية المركزة في حال الحمى أو التهاب الحلق.",
    "diuAED": "التوجه للطوارئ لقياس 'صوديوم الدم'. يتم العلاج بتعليق محاليل ملحية مركزة ببطء شديد.",
    "oldGenGeneric": "إذا ظهرت أعراض غير معتادة أو طفح جلدي، راجع طبيبك فوراً لعمل فحوصات وظائف الكبد."
  },
  "comment": {
    "ccbCarba": "خطر حرج! أدوية الضغط ترفع التجريتول لمستويات سامة. راجع الطوارئ فوراً.",
    "stJohnsAED": "خطر عالي! العشبة تدمر فعالية دواء الصرع ومنع الحمل. توقف عنها فوراً.",
    "theoAED": "خطر عالي! دواء الصرع يعطل مفعول دواء الربو. استخدم بخاخات موضعية.",
    "metroPheny": "خطر عالي! الفلاجيل يسبب تراكم الفينيتوين السام. استشر طبيبك لتغيير المطهر.",
    "inhAED": "خطر حرج! أدوية السل ترفع مستويات دواء الصرع لمستويات قاتلة.",
    "psyCarba": "دمج مميت! يدمر خلايا المناعة في نخاع العظم. ممنوع تماماً.",
    "diuAED": "خطر عالي! دمج يسبب نقص صوديوم حاد وتورم في المخ. راقب أملاح الدم.",
    "contraceptives": "خطر حمل غير مرغوب فيه لأن الدواء يقلل من فعالية وسيلة منع الحمل.",
    "bloodThinners": "خطر تجلط الدم لأن الدواء يقلل من فعالية مسيلات الدم.",
    "lamotrigineSJS": "خطر طفح جلدي قاتل (متلازمة ستيفن جونسون). اطلب الطوارئ فوراً عند رؤية طفح.",
    "oldGenGeneric": "توقع تفاعل بنسبة 90% مع الأدوية الكبدية الأخرى. يجب المراقبة.",
    "newGenGeneric": "هذا الدواء آمن بنسبة 95% ولا يتأثر بوظائف الكبد."
  }
};

const interactionsDataEn = {
  "desc": {
    "ccbCarba": "Severe Toxicity Risk: Blood pressure drugs raise Tegretol levels to toxic levels within 48 hours.",
    "stJohnsAED": "St. John's Wort triggers liver enzymes, destroying the efficacy of AEDs and birth control pills.",
    "theoAED": "Epilepsy drugs accelerate the breakdown of asthma drugs (Theophylline) before they can treat the lungs.",
    "metroPheny": "Flagyl prevents the liver from clearing Phenytoin (Epanutin), leading to toxic accumulation.",
    "inhAED": "Very strong enzyme inhibitor that raises epilepsy drug levels to dangerous heights.",
    "psyCarba": "Bone Marrow Suppression: Combination completely destroys white blood cells.",
    "diuAED": "Risk of acute Hyponatremia (low sodium) and brain salt imbalance.",
    "reducedEfficacy": "Significantly reduces the efficacy of the other drug.",
    "increasedLevels": "Increases levels of the other drug to potentially toxic heights.",
    "aspirinValproate": "Aspirin increases Valproate levels, risking hepatotoxicity.",
    "oldGenGeneric": "This is an older generation AED heavily metabolized in the liver.",
    "newGenGeneric": "Newer generation AED, generally safe with most medications."
  },
  "mechanism": {
    "ccbCarba": "These BP drugs completely disable liver enzymes (CYP3A4), raising Tegretol blood levels to toxic levels.",
    "stJohnsAED": "This herb is a fierce inducer of liver enzymes, effectively cleaning AEDs out of the blood.",
    "theoAED": "Classic AEDs break down asthma drugs too rapidly for them to exert a therapeutic effect.",
    "metroPheny": "Flagyl inhibits the metabolism of Phenytoin, causing it to accumulate in the blood.",
    "inhAED": "INH is a potent enzyme inhibitor; interaction depends on the patient's genetics (Slow Acetylators).",
    "psyCarba": "Both Carbamazepine and Clozapine cause bone marrow suppression as a lethal side effect.",
    "diuAED": "These AEDs cause low sodium, and adding diuretics leads to dehydration and acute brain salt depletion.",
    "oldGenGeneric": "Significantly impacts liver enzymes (CYP450) either by inhibition or induction.",
    "newGenGeneric": "Excreted mostly via kidneys and does not interfere with standard liver metabolic pathways."
  },
  "demo": {
    "ccbCarba": {
      "female": "Females/Pregnancy: May cause neurological toxicity in mothers and oxygen deprivation in fetuses.",
      "senior": "Seniors: Severe Bradycardia (low heart rate), coma, and lethal falls.",
      "child": "Children: Rapid heart and respiratory failure in case of accidental ingestion."
    },
    "stJohnsAED": {
      "female": "Females: Double risk; seizures due to AED failure and unplanned pregnancy due to birth control failure.",
      "male": "Males: Reduced efficacy of AEDs and recurrence of seizures.",
      "pregnant": "Pregnancy: Causes uterine contractions and loss of seizure control."
    },
    "theoAED": {
      "child": "Children: Acute asthma attacks and nocturnal suffocation due to rapid drug breakdown.",
      "senior": "Seniors: COPD patients will suffer respiratory failure as the lung medication fails.",
      "pregnant": "Pregnancy: Oxygen deprivation due to asthma attacks directly threatens the fetus."
    },
    "metroPheny": {
      "child": "Children: Neurological toxicity (staggering, unable to walk) due to Phenytoin accumulation.",
      "pregnant": "Pregnancy: Increased Phenytoin levels raise the risk of fetal malformations."
    },
    "inhAED": {
      "genetic": "Genetics: Slow Acetylators are prone to lethal toxicity within days.",
      "child": "Children: Requires medical isolation and daily monitoring of drug levels in the hospital."
    },
    "psyCarba": {
      "general": "Everyone: Agranulocytosis syndrome; complete loss of immunity, minor microbes become lethal.",
      "senior": "Seniors: Rapid death from infection or pneumonia due to lack of immunity."
    },
    "diuAED": {
      "senior": "Seniors: Severe low sodium causes brain swelling, coma, and continuous seizures.",
      "female": "Females: More prone to electrolyte imbalance due to cyclic hormonal changes."
    },
    "oldGenGeneric": {
      "general": "Expect a 90% interaction rate with any other hepatic drug."
    },
    "newGenGeneric": {
      "senior": "Seniors: Impacted only by kidney function. Monitor renal clearance."
    }
  },
  "emergency": {
    "ccbCarba": "Go to the ER immediately for an ECG and Tegretol level measurement. Switch to Amlodipine.",
    "stJohnsAED": "Stop the supplement immediately. In case of seizures, go to the hospital for an IV rescue dose.",
    "theoAED": "Use topical inhalers instead of tablets as they do not interact with AEDs via the liver.",
    "metroPheny": "Use antibacterials that do not interact with the liver, or reduce the dose with close monitoring.",
    "inhAED": "Respiratory and neurological emergency; immediate cessation and IV fluid support.",
    "psyCarba": "Contraindicated globally. Go to ICU immediately if fever or severe sore throat occurs.",
    "diuAED": "Go to the ER for blood sodium measurement. Treated with slow infusion of hypertonic saline.",
    "oldGenGeneric": "If unusual symptoms or skin rash occur, see your doctor immediately for liver function tests."
  },
  "comment": {
    "ccbCarba": "Critical risk! BP drugs raise Tegretol to toxic levels. Go to ER immediately.",
    "stJohnsAED": "High risk! Herb destroys AED and birth control efficacy. Stop immediately.",
    "theoAED": "High risk! AED disables asthma drug. Use topical inhalers.",
    "metroPheny": "High risk! Flagyl causes toxic Phenytoin accumulation. Consult doctor for alternative.",
    "inhAED": "Critical risk! TB drugs raise AED levels to lethal heights.",
    "psyCarba": "Lethal combination! Destroys immune cells in bone marrow. Strictly contraindicated.",
    "diuAED": "High risk! Causes acute low sodium and brain swelling. Monitor electrolytes.",
    "contraceptives": "Risk of unplanned pregnancy as drug reduces contraceptive efficacy.",
    "bloodThinners": "Risk of blood clots as drug reduces blood thinner efficacy.",
    "lamotrigineSJS": "Risk of lethal skin rash (SJS). Seek ER immediately if rash appears.",
    "oldGenGeneric": "Expect 90% interaction rate with other hepatic drugs. Monitoring required.",
    "newGenGeneric": "This drug is 95% safe and unaffected by liver function."
  }
};

try {
  const arData = JSON.parse(fs.readFileSync(arPath, 'utf8'));
  arData.interactions = interactionsDataAr;
  
  if (!arData.checker.emergency) {
    arData.checker.emergency = {
      "label": "إجراءات الطوارئ (Error Handling):",
      "title": "بروتوكول الطوارئ: ماذا تفعل إذا تناولت الدواء بالفعل؟",
      "steps": [
        "لا تتوقف عن تناول أي دواء للصرع فجأة دون استشارة طبية، لأن التوقف المفاجئ قد يسبب نوبات صرع مستمرة مهددة للحياة.",
        "اتصل بطبيبك المعالج أو الصيدلي فوراً لإبلاغه بالتداخل الدوائي الذي اكتشفته ومناقشة البدائل الآمنة.",
        "راقب ظهور أي أعراض تسمم مثل: زغللة العين، الدوار الشديد، القيء المستمر، أو الطفح الجلدي المفاجئ.",
        "في حال حدوث تداخل 'خطير جداً' (Severe)، توجه إلى أقرب قسم طوارئ مع إحضار قائمة أدويتك الحالية."
      ]
    };
  }
  if (!arData.checker.mechanism) arData.checker.mechanism = "آلية التفاعل (Mechanism):";
  if (!arData.checker.demographics) arData.checker.demographics = "تفاصيل ديموغرافية (الفئات العمرية والنوع):";
  
  fs.writeFileSync(arPath, JSON.stringify(arData, null, 2));

  const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  enData.interactions = interactionsDataEn;
  
  if (!enData.checker.emergency) {
    enData.checker.emergency = {
      "label": "Emergency Protocol (Error Handling):",
      "title": "Emergency Protocol: What to do if you already took the drug?",
      "steps": [
        "DO NOT stop taking any epilepsy medication abruptly without medical consultation; sudden withdrawal can trigger life-threatening status epilepticus.",
        "Contact your treating physician or pharmacist immediately to report the interaction and discuss safe alternatives.",
        "Monitor for toxicity symptoms: double vision, severe dizziness, persistent vomiting, or sudden rash.",
        "In case of a 'Critical' (Severe) interaction, go to the nearest emergency department and bring your medication packages."
      ]
    };
  }
  if (!enData.checker.mechanism) enData.checker.mechanism = "Interaction Mechanism:";
  if (!enData.checker.demographics) enData.checker.demographics = "Demographic Details (Age & Gender):";
  
  fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
  
  console.log("Locales updated successfully!");
} catch(e) {
  console.error("Error updating locales: ", e);
}
