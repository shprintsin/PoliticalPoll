const answers=[
    { label: "לא מסכים בכלל", value: "1" },
    { label: "קצת מסכים", value: "2" },
    { label: "נייטרלי", value: "3" },
    { label: "מסכים", value: "4" },
    { label: "מאוד מסכים", value: "5" }
  ]

  

export interface Answer {
  label: string;
  value: string;
}

export interface Question {
  field: string;
  Question: string;
  answers: Answer[];
  selectedValue?: string;
}

export interface Score {
  result: number;
  total: number;
}

export type Results = Record<string, Score>;

export const questionsData: Question[] = [
  {
    field: "legal",
    Question: "האם תפקידו המרכזי של בית משפט עליון במדינה דמוקרטית הוא להגן על זכויות מיעוטים ופרטים מפני עריצות הרוב הפוליטי?",
    answers: answers,
  },
  {
    field: "legal",
    Question: "האם עיגון חוקתי של זכויות אדם וביקורת שיפוטית אפקטיבית הם כלים חיוניים למניעת ריכוז כוח יתר בידי הרשות המבצעת?",
    answers: answers,
  },
  {
    field: "legal",
    Question: "האם הקפדה על שלטון החוק וזכויות אדם, גם בהקשרים ביטחוניים, מחזקת את מעמדה הבינלאומי של ישראל ואת חוסנה המוסרי?",
    answers: answers,
  },
  {
    field: "politics",
    Question: "האם המשך השליטה הצבאית על מיליוני פלסטינים ללא זכויות אזרח מלאות מערער את היסודות הדמוקרטיים והיהודיים של מדינת ישראל בטווח הארוך?",
    answers: answers,
  },
  {
    field: "politics",
    Question: "האם על ישראל לנקוט יוזמות מדיניות אקטיביות לקידום הסדר עם הפלסטינים, גם בהיעדר 'פרטנר אידיאלי' בצד השני?",
    answers: answers,
  },
  {
    field: "politics",
    Question: "האם ההשקעה המסיבית בהתנחלויות בגדה המערבית באה על חשבון פיתוח אזורי הפריפריה בתוך הקו הירוק ופוגעת בסיכוי להסדר עתידי?",
    answers: answers,
  },
  {
    field: "economics",
    Question: "האם התערבות מדינתית להבטחת שכר מינימום הוגן, זכויות סוציאליות והתאגדות עובדים חיונית לאיזון פערי הכוחות הטבעיים בשוק העבודה?",
    answers: answers,
  },
  {
    field: "economics",
    Question: "האם מערכת מס פרוגרסיבית, בה בעלי הכנסות גבוהות ותאגידים משלמים יותר, חיונית למימון שירותים ציבוריים איכותיים ולצמצום פערים חברתיים?",
    answers: answers,
  },
  {
    field: "economics",
    Question: "האם ארגוני עובדים חזקים הם משקל נגד הכרחי לכוחם של מעסיקים גדולים ותאגידים, ותורמים לשמירה על תנאי העסקה הוגנים?",
    answers: answers,
  },
  {
    field: "economics",
    Question: "האם על המדינה לשקול הגנה על תעשיות מקומיות חיוניות ועל ביטחון תזונתי, גם אם הדבר כרוך בהגבלות מסוימות על סחר חופשי?",
    answers: answers,
  },
  {
    field: "socity",
    Question: "האם יש להבטיח לכל אזרח חופש בחירה מלא בנושאי אישות, כולל האפשרות לנישואים אזרחיים וגירושין אזרחיים, ללא קשר למוסדות דתיים?",
    answers: answers,
  },
  {
    field: "socity",
    Question: "האם הפעלת תחבורה ציבורית בשבת, באופן שאינו כופה על שומרי שבת, חיונית לקידום שוויון חברתי, חופש תנועה וצמצום זיהום אוויר?",
    answers: answers,
  },
  {
    field: "socity",
    Question: "האם על המדינה לחלק את משאביה באופן שוויוני בין כלל אזרחיה התורמים לחברה, ללא העדפה של אורח חיים או מגזר מסוים על פני אחרים?",
    answers: answers,
  },
  {
    field: "socity",
    Question: "האם אחריותה המוסרית של ישראל, כמדינה שקמה על רקע רדיפות, כוללת מתן מקלט הוגן לפליטים ומבקשי מקלט על פי אמות מידה בינלאומיות?",
    answers: answers,
  },
];

