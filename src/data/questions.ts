import { QAItem, ContentPolicy, CrisisResource } from '../types';

export const CONTENT_POLICY: ContentPolicy = {
  title: {
    en: 'Educational & Safety Policy',
    ta: 'கல்வி மற்றும் பாதுகாப்பு கொள்கை',
    tanglish: 'Educational & Safety Policy'
  },
  disclaimer: {
    en: 'CareBuddy is strictly an educational tool designed for adolescents aged 13–18. It does not provide medical diagnoses, treatment, or clinical prescriptions. Always consult a qualified healthcare professional or school doctor for medical concerns.',
    ta: 'கேர்பட்டி (CareBuddy) என்பது 13–18 வயதுடைய பள்ளி மாணவர்களுக்கான கல்வி மற்றும் விழிப்புணர்வு வழிகாட்டி மட்டுமே. இது மருத்துவ நோயறிதல் அல்லது சிகிச்சைகளை வழங்காது. உடல்நலம் தொடர்பான சந்தேகங்களுக்கு தகுதியான மருத்துவரை அணுகவும்.',
    tanglish: 'CareBuddy vandhu 13-18 vayasu school pasangalukana educational tool mattum thaan. Idhu medical diagnosis illana treatment tharaadhu. Medical doubt irundha doctor ah dhaan paarkanum.'
  },
  educationalPurpose: {
    en: 'Developed to empower South Indian school students with evidence-based, culturally sensitive health guidance in English, Tamil, and Tanglish.',
    ta: 'தென்னிந்திய பள்ளி மாணவர்களுக்கு ஆங்கிலம், தமிழ் மற்றும் டாங்க்லிஷ் (Tanglish) மொழிகளில் ஆதாரப்பூர்வமான ஆரோக்கிய வழிகாட்டுதலை வழங்கும் நோக்கில் உருவாக்கப்பட்டது.',
    tanglish: 'South Indian school students ku English, Tamil matrum Tanglish la correct-aana health awareness tharadhukaaga uruvakkappattadhu.'
  },
  medicalReferences: [
    'World Health Organization (WHO) Adolescent Health Guidelines',
    'Centers for Disease Control and Prevention (CDC) Youth Health Resources',
    'American Academy of Pediatrics (AAP) Adolescent Development',
    'Tele-MANAS National Mental Health Program (Government of India)'
  ],
  helplines: {
    telemanas: '14416 / 1800-891-4416',
    kiran: '1800-599-0019',
    childline: '1098',
    sneha: '044-24640050'
  }
};

export const CRISIS_RESOURCES: CrisisResource[] = [
  {
    id: 'telemanas',
    name: 'Tele-MANAS (Govt. of India)',
    phone: '14416',
    tollFree: true,
    hours: '24/7 Free Call',
    description: {
      en: 'Government of India national mental health helpline providing confidential support in Tamil and English.',
      ta: 'இந்திய அரசின் 24/7 இலவச மனநல உதவி எண். தமிழில் ரகசிய ஆலோசனை பெறலாம்.',
      tanglish: 'Govt 24/7 free mental health helpline. Tamil and English la confidential-a pesalaam.'
    }
  },
  {
    id: 'kiran',
    name: 'KIRAN Mental Health Helpline',
    phone: '1800-599-0019',
    tollFree: true,
    hours: '24/7 Toll-Free',
    description: {
      en: 'National helpline by Ministry of Social Justice for psychological first-aid and crisis prevention.',
      ta: 'மத்திய சமூக நீதி அமைச்சகத்தின் 24/7 மனநல உதவி மற்றும் அவசர ஆலோசனை எண்.',
      tanglish: 'Govt helpline for stress, anxiety and psychological support.'
    }
  },
  {
    id: 'childline',
    name: 'Childline India',
    phone: '1098',
    tollFree: true,
    hours: '24/7 Emergency Support',
    description: {
      en: 'Free emergency phone service for children and teens under 18 needing protection and guidance.',
      ta: '18 வயதுக்குட்பட்ட மாணவர்களுக்கான இலவச 24/7 அவசர பாதுகாப்பு சேவை.',
      tanglish: '18 vayasu kulla irukkura pasangalukana free emergency support.'
    }
  },
  {
    id: 'sneha',
    name: 'Sneha India (Tamil Nadu Helpline)',
    phone: '044-24640050',
    tollFree: false,
    hours: '24/7 Support in Tamil Nadu',
    description: {
      en: 'Tamil Nadu based emotional support helpline for emotional distress and suicidal thoughts.',
      ta: 'மன அழுத்தத்தில் இருக்கும் மாணவர்களுக்கான தமிழ்நாட்டின் 24/7 அன்பான உதவி மையம்.',
      tanglish: 'Tamil Nadu emotional crisis helpline. Call panni manasu vittu pesalaam.'
    }
  }
];

export const VETTED_QUESTIONS: QAItem[] = [
  // PUBERTY MALE (1 - 5)
  {
    id: 'puberty_male_1',
    category: 'puberty_male',
    genderTarget: 'male',
    question: {
      en: 'Sleep-time bodily changes & natural hormonal fluid release in boys',
      ta: 'இரவுநேர உடல் மாற்றங்கள் மற்றும் ஹார்மோன் திரவ வெளியேற்றம்',
      tanglish: 'Sleep time body changes & nightfall in boys'
    },
    answer: {
      en: 'Nightfall or wet dreams are 100% natural and normal during adolescent growth. As a boy’s body produces testosterone and sperm, extra fluid releases automatically during sleep. It is not a disease, weakness, or harm to your body. No medicine is needed.',
      ta: 'தூக்கத்தில் திரவம் வெளியேறுவது (Nightfall) பருவமடைதலின் போது 100% இயல்பானது. உடலில் டெஸ்டோஸ்டிரோன் ஹார்மோன் சுரக்கும் போது, தூக்கத்தில் தானாகவே திரவம் வெளியேறும். இது நோயோ பலவீனமோ அல்ல. இதற்கு மருத்துவ சிகிச்சை தேவையில்லை.',
      tanglish: 'Aam, nightfall completely normal dhaan! Puberty age la body testosterone produce pannumpodhu thookathil fluid thaanaga veliyerum. Idhu noi illa, weakness um illa. Medicine edhum thevai illai.'
    },
    summary: {
      en: 'Nighttime fluid release is normal bodily self-regulation during male puberty with zero harm.',
      ta: 'தூக்கத்தில் திரவம் வெளியேறுவது பருவமடைதலின் இயல்பான உடல் மாற்றம்.',
      tanglish: 'Nightfall vandhu puberty la sethukolla vendiya normal bodily change dhaan.'
    },
    tags: ['wet dream', 'nightfall', 'semen', 'puberty', 'testosterone', 'nightfall in boys', 'swapnadhosham', 'thookathil vinai', 'sleep time body changes'],
    sources: ['WHO Health Topic: Adolescent Development', 'CDC Male Reproductive Health']
  },
  {
    id: 'puberty_male_2',
    category: 'puberty_male',
    genderTarget: 'male',
    question: {
      en: 'Voice deepening & vocal cord pitch changes during teenage growth',
      ta: 'பருவமடைதலில் குரல் மாற்றம் மற்றும் தடிமனாகும் நிலை',
      tanglish: 'Voice pitch & voice deepening in growing boys'
    },
    answer: {
      en: 'During puberty (ages 13–16), your larynx (voice box) grows larger due to testosterone. As vocal cords stretch, your voice may temporarily squeak or crack before settling into a deeper tone. It takes a few months to stabilize naturally.',
      ta: 'பருவமடைதலின் போது குரல்வளை (Larynx) ஹார்மோன்களால் வளர்கிறது. இதனால் குரல் தற்காலிகமாக உடைந்து, பின்னர் கம்பீரமான தடிமனான குரலாக மாறும். இது சில மாதங்களில் சீராகிவிடும்.',
      tanglish: 'Puberty time la voice box (larynx) perusaagum. Vocal cords stretch aaga aaga voice sella sella maarum. Bayapada thevai illai!'
    },
    summary: {
      en: 'Voice cracking is caused by normal growth of the larynx during puberty.',
      ta: 'குரல்வளை வளர்ச்சியால் குரல் தற்காலிகமாக மாறுகிறது.',
      tanglish: 'Voice box grow aagura nala voice break aagudhu, totally normal.'
    },
    tags: ['voice break', 'voice crack', 'deep voice', 'throat', 'kural maatram', 'kural maarudhal', 'sound change'],
    sources: ['AAP Adolescent Health Manual']
  },
  {
    id: 'puberty_male_3',
    category: 'puberty_male',
    genderTarget: 'male',
    question: {
      en: 'Timeline for facial hair growth (mustache & beard) in boys',
      ta: 'மீசை மற்றும் தாடி வளர்ச்சித் தொடக்கம் மற்றும் பராமரிப்பு',
      tanglish: 'Mustache & beard growth timeline in growing boys'
    },
    answer: {
      en: 'Facial and body hair growth varies greatly depending on genetics. Most boys see upper lip hair around 14–15, with beard hair developing between ages 16 and 20. Shaving earlier does NOT make hair grow thicker.',
      ta: 'மீசை மற்றும் தாடி வளர்ச்சி மரபணுவை (Genetics) பொறுத்தது. 14–16 வயதில் லேசான மீசையும், 16–18+ வயதில் தாடியும் வளரும். அடிக்கடி ஷேவிங் செய்வதால் முடி அடர்த்தியாக வளராது.',
      tanglish: 'Meesai thaadi valarchiyae genetics nala thaan decide aagum. 14-16 age la meesai thodangum. Shaving panna mudhi thaduppaagum nu solradhu poiyana myth!'
    },
    summary: {
      en: 'Facial hair timeline depends on genetics; shaving does not speed growth.',
      ta: 'மீசை வளர்ச்சி மரபணுவை பொறுத்தது. ஷேவிங் செய்வதால் முடி அடர்த்தியாகாது.',
      tanglish: 'Genetics nala dhaan beard growth decide aagum. Shaving myth nambadhiga.'
    },
    tags: ['mustache', 'beard', 'facial hair', 'pubic hair', 'meesai', 'thaadi', 'udal mudi', 'shaving myth'],
    sources: ['CDC Adolescent Development Guidelines']
  },
  {
    id: 'puberty_male_4',
    category: 'puberty_male',
    genderTarget: 'male',
    question: {
      en: 'Understanding involuntary bodily changes & classroom discomfort in boys',
      ta: 'மாணவர்களுக்கு வகுப்பறையில் ஏற்படும் தன்னிச்சையான உடல் மாற்றங்கள்',
      tanglish: 'Involuntary bodily changes & class discomfort in boys'
    },
    answer: {
      en: 'Involuntary erections happen unexpectedly due to hormonal surges and increased blood circulation during teenage years. They are completely natural and unprompted. Stay calm, adjust your posture/bag, and shift your focus; it subsides naturally in 1–2 minutes.',
      ta: 'பருவவயதில் ஹார்மோன் மாற்றங்களால் தன்னிச்சையாக திடீர் விறைப்பு ஏற்படுவது இயல்பானது. இது உங்கள் கட்டுப்பாட்டில் இல்லாதது. அமைதியாக உங்கள் கவனத்தை வேறு விஷயத்தில் திருப்பினால் 1–2 நிமிடங்களில் இயல்பு நிலைக்கு திரும்பிவிடும்.',
      tanglish: 'Hormones fluctuations nala unwanted time la erection aagalam. Idhu natural dhaan! Mind ah padippil illana matha vishayathula thiruppina 1-2 mins la normal aagidum.'
    },
    summary: {
      en: 'Involuntary erections are normal hormonal responses during male adolescence.',
      ta: 'கட்டுப்பாடற்ற விறைப்பு ஹார்மோன்களின் இயல்பான தாக்கம்.',
      tanglish: 'Involuntary erections completely normal hormone activity.'
    },
    tags: ['erection', 'random erection', 'class discomfort', 'viraipu', 'suyam', 'lingam', 'hormones'],
    sources: ['AAP Adolescent Sexual Health']
  },
  {
    id: 'puberty_male_5',
    category: 'puberty_male',
    genderTarget: 'male',
    question: {
      en: 'Temporary chest tissue changes (Gynecomastia) in growing boys',
      ta: 'வளரும் ஆண்களுக்கு மார்பகப் பகுதியில் ஏற்படும் தற்காலிக திசு மாற்றங்கள்',
      tanglish: 'Teen chest tissue changes (Gynecomastia) in boys'
    },
    answer: {
      en: 'Temporary breast tissue swelling in boys is called Gynecomastia. It affects over 50% of teenage boys during puberty as estrogen and testosterone levels fluctuate. It usually disappears on its own within 6 to 18 months without medical intervention.',
      ta: 'பருவமடைதலின் போது சிறுவர்களுக்கு மார்பகப் பகுதியில் லேசான தசை வீக்கம் (Gynecomastia) தோன்றுவது இயல்பானது. ஹார்மோன்கள் சீரடையும் போது 6–18 மாதங்களில் இது தானாகவே மறைந்துவிடும்.',
      tanglish: 'Gynecomastia nu solla koodiya mild chest tissue swelling 50% boys ku puberty la varum. 6-18 months la தானாகவே சரியாயிடும், bayapada வேண்டாம்.'
    },
    summary: {
      en: 'Teen chest tissue swelling (Gynecomastia) resolves naturally over time.',
      ta: 'மார்பக வீக்கம் ஹார்மோன் மாற்றத்தால் தற்காலிகமாக தோன்றி தானாக மறையும்.',
      tanglish: 'Teenage chest swelling temporary hormone fluctuation dhaan.'
    },
    tags: ['gynecomastia', 'chest pain', 'nipple soreness', 'marbu veakkam', 'chest swelling', 'breast tissue'],
    sources: ['WHO Adolescent Endocrine Development']
  },

  // PUBERTY FEMALE (6 - 11)
  {
    id: 'puberty_female_1',
    category: 'puberty_female',
    genderTarget: 'female',
    question: {
      en: 'Relieving period cramps & abdominal pain during monthly cycles',
      ta: 'மாதவிடாய் வலி மற்றும் அடிவயிறு அசௌகரியத்தைக் குறைக்கும் வழிகள்',
      tanglish: 'Relieving period cramps & stomach pain in girls'
    },
    answer: {
      en: 'Period cramps happen when the uterus contracts to shed its lining. To relieve pain: 1) Place a hot water bag on your lower abdomen. 2) Drink warm water or herbal ginger tea. 3) Do light walking or stretching. If pain is severe, consult a physician.',
      ta: 'மாதவிடாய் காலத்தில் கருப்பை சுருங்குவதால் வலி ஏற்படுகிறது. நிவாரணம் பெற: 1) அடிவயிற்றில் மிதமான வெந்நீர் ஒத்தடம் கொடுக்கவும். 2) சுடுதண்ணீர் அல்லது இஞ்சி டீ குடிக்கவும். 3) லேசான நடைபயிற்சி செய்யவும். வலி மிகவும் அதிகமாக இருந்தால் மருத்துவரை அணுகவும்.',
      tanglish: 'Uterus shed aagumbodhu cramps varudhu. 1) Hot water bag vekkalam. 2) Warm water and ginger tea kudikkalam. 3) Light stretching panna pain kuraiyum.'
    },
    summary: {
      en: 'Use heat therapy, warm fluids, and light movement for period cramps relief.',
      ta: 'வெந்நீர் ஒத்தடம் மற்றும் சூடான பானங்கள் மாதவிடாய் வலியை குறைக்கும்.',
      tanglish: 'Hot water bottle matrum warm water cramps pain ah nalla tharudhum.'
    },
    tags: ['period cramps', 'cramps', 'mathavidai valiy', 'stomach pain', 'menses pain', 'hot water bag'],
    sources: ['CDC Women Health', 'WHO Menstrual Hygiene Guidelines']
  },
  {
    id: 'puberty_female_6',
    category: 'puberty_female',
    genderTarget: 'female',
    question: {
      en: 'Feeling feverish, body aches, or temperature changes during period ("Period Flu")',
      ta: 'மாதவிடாய் காலத்தில் காய்ச்சல், உடல் வலி அல்லது உடல் சூடு அதிகரிப்பது (Period Flu)',
      tanglish: 'Feeling feverish, body aches or temperature during period (Period Flu)'
    },
    answer: {
      en: 'Feeling feverish, warm, or getting body aches right before or during your period is very common and often called "Period Flu". Progesterone hormone fluctuations after ovulation slightly raise core body temperature and cause mild fatigue. Drink warm water, get 8-10 hours rest, and stay hydrated. If fever exceeds 101°F (38.3°C) or is accompanied by severe chills, consult a physician.',
      ta: 'மாதவிடாய்க்கு முன் அல்லது மாதவிடாய் காலத்தில் லேசான காய்ச்சல் போன்ற உணர்வும் உடல் வலியும் ஏற்படுவது (Period Flu) ஹார்மோன் மாற்றங்களால் தோன்றும் இயல்பான நிகழ்வு. மிதமான சுடுதண்ணீர் குடித்து நன்கு ஓய்வு எடுக்கவும். காய்ச்சல் 101°F ஐ தாண்டினால் மருத்துவரை அணுகவும்.',
      tanglish: 'Period time la feverish ah, body pain or temperature feel aaguradhukku progesterone hormone rise aaguradhu dhaan kaaranam (Period Flu). Warm water kudichu nalla rest edunga. High fever irundha doctor ah paarkalam.'
    },
    summary: {
      en: 'Mild feverish feelings during periods are caused by progesterone shifts ("Period Flu"); rest and stay hydrated.',
      ta: 'மாதவிடாய் காய்ச்சல் ஹார்மோன் மாற்றங்களால் தோன்றும் தற்காலிக நிலை.',
      tanglish: 'Period flu is caused by hormone changes. Rest and warm fluids help.'
    },
    tags: [
      'fever', 'period fever', 'fever during period', 'menstrual cycle fever', 
      'period flu', 'feverish', 'body pain during period', 'temperature during period', 
      'mathavidai kaaichal', 'fever in menstrual cycle', 'fever for sometimes during my menstrual cycle'
    ],
    sources: ['WHO Women Health Guidelines', 'AAP Adolescent Gynecology']
  },
  {
    id: 'puberty_female_2',
    category: 'puberty_female',
    genderTarget: 'female',
    question: {
      en: 'Managing irregular period cycles during initial high school years',
      ta: 'ஆரம்ப மாதவிடாய் ஆண்டுகளில் சுழற்சி சீரற்றதாக இருப்பதன் காரணம்',
      tanglish: 'Managing irregular period dates in starting years'
    },
    answer: {
      en: 'It is very common for periods to be irregular during the first 1 to 3 years after menarche (first period). Your ovaries and brain are still coordinating hormone signals. A cycle can range from 21 to 45 days naturally.',
      ta: 'முதல் மாதவிடாய்க்குப் பிந்தைய 1–3 ஆண்டுகளில் சுழற்சி சீரற்று இருப்பது மிகவும் இயல்பானது. உடலில் ஹார்மோன்கள் சீராக ஒருங்கிணைக்க நேரம் எடுக்கும். ஒரு சுழற்சி 21 முதல் 45 நாட்கள் வரை இருக்கலாம்.',
      tanglish: 'First period vandha அப்புறம் 1-3 years period dates maari maari varradhu normal. Body hormone system set aaga time edukum.'
    },
    summary: {
      en: 'Irregular cycles in early years are completely normal while hormones adjust.',
      ta: 'ஆரம்ப ஆண்டுகளில் மாதவிடாய் சீரற்று இருப்பது இயல்பானது.',
      tanglish: 'Starting years la irregular periods normal hormonal development.'
    },
    tags: ['irregular period', 'cycle gap', 'mathavidai', 'date thallipodhu', 'menarche', 'menses cycle'],
    sources: ['AAP Adolescent Gynecology']
  },
  {
    id: 'puberty_female_3',
    category: 'puberty_female',
    genderTarget: 'female',
    question: {
      en: 'Understanding natural clear discharge & intimate wellness in girls',
      ta: 'இயற்கையான திரவ வெளியேற்றம் மற்றும் பெண்களுக்கான ஆரோக்கிய பராமரிப்பு',
      tanglish: 'Natural clear discharge & intimate wellness in girls'
    },
    answer: {
      en: 'Clear or milky white, odorless vaginal discharge is totally healthy! It keeps intimate tissues clean and lubricated. However, if it turns yellow/green, smells foul, or causes severe itching, consult a doctor for a minor infection.',
      ta: 'தெளிவான அல்லது பால் போன்ற வெள்ளைப்படுதல் யோனியை சுத்தமாக வைத்திருக்கும் இயற்கையான திரவம். ஆனால் துர்நாற்றம், மஞ்சள் நிறம் அல்லது அரிப்பு இருந்தால் மருத்துவரை அணுக வேண்டும்.',
      tanglish: 'Clear or white color discharge completely healthy dhaan. Idhu vagina wa clean ah vechirkum. Bad smell or itching irundha doctor ah paarkalam.'
    },
    summary: {
      en: 'Clear odorless discharge is normal hygiene; foul smell or itch needs checkup.',
      ta: 'துர்நாற்றமில்லாத வெள்ளைப்படுதல் ஆரோக்கியமானது; அரிப்பு இருந்தால் மருத்துவர் தேவை.',
      tanglish: 'Odorless white discharge healthy! Foul smell irundha consult doctor.'
    },
    tags: ['white discharge', 'vellai padudhal', 'discharge', 'paduthal', 'white stain', 'intimate hygiene'],
    sources: ['WHO Adolescent Health', 'CDC Gynecological Health']
  },
  {
    id: 'puberty_female_4',
    category: 'puberty_female',
    genderTarget: 'female',
    question: {
      en: 'How to track & calculate monthly cycle dates accurately',
      ta: 'மாதவிடாய் சுழற்சியின் நாட்களை எவ்வாறு சரியாக கணக்கிடுவது',
      tanglish: 'How to track monthly period cycle dates'
    },
    answer: {
      en: 'Day 1 of your cycle is the FIRST day bleeding begins. Count total days until the first day of your NEXT period. Normal cycles range between 21 and 35 days. Mark the dates on a calendar or diary.',
      ta: 'இரத்தம் தொடங்கும் முதல் நாளே "நாள் 1" (Day 1) ஆகும். அடுத்த மாதவிடாயின் முதல் நாள் வரையுள்ள நாட்களை எண்ண வேண்டும். வழக்கமாக 21 முதல் 35 நாட்கள் வரை இருக்கும்.',
      tanglish: 'Ratham varra 1st day dhaan Day 1. Adutha menses start aagura day varaikkum count pannanum. Normal cycle 21 to 35 days irukkum.'
    },
    summary: {
      en: 'Count cycle length from first day of bleeding to first day of next period.',
      ta: 'மாதவிடாய் தொடங்கிய முதல் நாளில் இருந்து அடுத்த மாதவிடாய் வரை கணக்கிட வேண்டும்.',
      tanglish: 'First day of bleeding la irundhu next period start day varai count pannunga.'
    },
    tags: ['period tracker', 'cycle counting', 'mathavidai date', 'menses tracking', 'calendar tracking'],
    sources: ['CDC Reproductive Health']
  },
  {
    id: 'puberty_female_5',
    category: 'puberty_female',
    genderTarget: 'female',
    question: {
      en: 'Breast tenderness & pre-menstrual physical changes in girls',
      ta: 'மாதவிடாய்க்கு முன் மார்பகப் பகுதியில் ஏற்படும் லேசான வலி',
      tanglish: 'Breast tenderness & pre-period physical changes in girls'
    },
    answer: {
      en: 'Estrogen and progesterone hormones rise right before your period, causing fluid retention in breast tissue. This makes breasts feel slightly swollen or heavy. Wearing a soft, well-fitted cotton bra helps relieve discomfort.',
      ta: 'மாதவிடாய்க்கு முன் ஈஸ்ட்ரோஜன் மற்றும் புரோஜெஸ்டிரோன் ஹார்மோன்கள் அதிகரிப்பதால் மார்பகங்களில் லேசான வலியும் கனத்த உணர்வும் ஏற்படும். மிருதுவான பருத்தி (Cotton) உள்ளாடை அணிவது ஆறுதல் தரும்.',
      tanglish: 'Period start aagura 1 week munnadi hormones increase aaguradhala breast tender ah irukkum. Soft cotton bra wear panna comfortable ah irukkum.'
    },
    summary: {
      en: 'Hormonal peaks before periods cause temporary breast tenderness.',
      ta: 'ஹார்மோன் மாற்றங்களால் மாதவிடாய்க்கு முன் மார்பக வலி ஏற்படுவது இயல்பு.',
      tanglish: 'Period ku munnadi hormonal rise nala breast tenderness normal.'
    },
    tags: ['breast soreness', 'breast pain', 'marbagam valiy', 'period symptoms', 'bra fit'],
    sources: ['AAP Adolescent Health']
  },

  // HYGIENE (12 - 16)
  {
    id: 'hygiene_1',
    category: 'hygiene',
    genderTarget: 'both',
    question: {
      en: 'Preventing sweat accumulation & body odor after active school hours',
      ta: 'பள்ளி வகுப்பிற்கு பின் வியர்வை துர்நாற்றத்தை தடுக்கும் சுகாதார முறைகள்',
      tanglish: 'Preventing sweat smell & body odor after school'
    },
    answer: {
      en: 'Body odor is caused when skin bacteria break down sweat. Prevention tips: 1) Bath twice daily with mild soap, especially armpits and groin. 2) Wear clean, dry cotton uniforms. 3) Use an anti-bacterial soap or deodorant roll-on.',
      ta: 'வியர்வையில் பாக்டீரியா சேர்வதால் துர்நாற்றம் ஏற்படுகிறது. 1) தினமும் இருமுறை குளிக்கவும். 2) சுத்தமான பருத்தி உடைகளை அணியவும். 3) அக்குள் மற்றும் தொடை இடுக்குகளை சுத்தமாக வைத்திருக்கவும்.',
      tanglish: 'Vervai la bacteria peruguvadhala body odor varudhu. 1) Daily 2 times bath pannunga. 2) Cotton dress wear pannunga. 3) Underarms clean ah vekkunm.'
    },
    summary: {
      en: 'Bathe twice daily and wear breathable cotton clothes to control body odor.',
      ta: 'தினமும் இருவேளை குளிப்பதும் பருத்தி ஆடைகள் அணிவதும் துர்நாற்றத்தை போக்கும்.',
      tanglish: 'Daily 2 times bath and cotton clothes wear panna body odor poidum.'
    },
    tags: ['body odor', 'vervai', 'vervai duretram', 'sweat smell', 'deodorant', 'hygiene'],
    sources: ['WHO Hygiene Guidelines']
  },
  {
    id: 'hygiene_2',
    category: 'hygiene',
    genderTarget: 'male',
    question: {
      en: 'Personal intimate hygiene & skin care routines for adolescent boys',
      ta: 'ஆண் மாணவர்களுக்கான தனிப்பட்ட தூய்மை மற்றும் சுகாதார பராமரிப்பு',
      tanglish: 'Boys personal intimate hygiene & body care guide'
    },
    answer: {
      en: 'Wash gently with plain warm water daily during your bath. If your foreskin retracts naturally, pull it back gently to wash away natural smegma buildup, then pull it forward again. Avoid harsh scented soaps that cause skin irritation.',
      ta: 'தினமும் குளிக்கும் போது வெதுவெதுப்பான நீரால் மெதுவாக கழுவவும். சுற்றிலும் சேரும் அழுக்கை சோப்பு இல்லாமல் நீரால் சுத்தம் செய்யவும். அதிக வீரியமிக்க கெமிக்கல் சோப்புகளை தவிர்க்கவும்.',
      tanglish: 'Daily bath pannumpodhu warm water vechu gently wash pannunga. Excessive strong chemical soap use panna koodadhu.'
    },
    summary: {
      en: 'Use warm water daily to gently clean male intimate areas without harsh soaps.',
      ta: 'வெதுவெதுப்பான நீரால் மென்மையாக ஆண் உறுப்பை சுத்தம் செய்ய வேண்டும்.',
      tanglish: 'Gentle warm water vechu private parts clean pannungaa.'
    },
    tags: ['male hygiene', 'foreskin cleaning', 'smegma', 'lingam sugham', 'private parts clean'],
    sources: ['CDC Male Personal Hygiene']
  },
  {
    id: 'hygiene_3',
    category: 'hygiene',
    genderTarget: 'female',
    question: {
      en: 'Sanitary napkin care & intimate hygiene during monthly cycles',
      ta: 'மாதவிடாய் நாட்களுக்கான சுகாதாரம் மற்றும் பராமரிப்பு வழிமுறைகள்',
      tanglish: 'Sanitary pad hygiene & care routine during monthly cycles'
    },
    answer: {
      en: '1) Change sanitary pad every 4–6 hours, even on light flow days. 2) Wash intimate areas from front to back with clean water to avoid UTI infections. 3) Wrap used pads in paper and discard in trash bin—never flush!',
      ta: '1) 4–6 மணி நேரத்திற்கு ஒருமுறை பேட் (Sanitary pad) மாற்றவும். 2) தொற்றுநோயைத் தவிர்க்க முன் பகுதியில் இருந்து பின்னோக்கி நீரால் கழுவவும். 3) பயன்படுத்திய பேடை காகிதத்தில் சுற்றி குப்பைத்தொட்டியில் போடவும்.',
      tanglish: '1) 4-6 hours ku orumurai pad maathanum. 2) Front to back water vechu wash pannanum infection varama irukka. 3) Pad ah dustbin la dhaan podanum, flush panna koodadhu.'
    },
    summary: {
      en: 'Change pads every 4-6 hours and wash front-to-back to prevent infection.',
      ta: '4-6 மணி நேரத்திற்கு ஒருமுறை பேட் மாற்றி சுத்தமாக கழுவ வேண்டும்.',
      tanglish: '4-6 hours ku pad maathi front to back wash pannanum.'
    },
    tags: ['period hygiene', 'sanitary napkin', 'pad change', 'pad mathudhal', 'uti prevention'],
    sources: ['WHO Menstrual Hygiene Manual']
  },
  {
    id: 'hygiene_4',
    category: 'hygiene',
    genderTarget: 'both',
    question: {
      en: 'Maintaining fresh breath & oral hygiene in school classrooms',
      ta: 'வாய் துர்நாற்றத்தை போக்கி சுவாசத்தை புத்துணர்ச்சியாக வைக்கும் வழி',
      tanglish: 'Maintaining fresh breath & oral hygiene in school'
    },
    answer: {
      en: 'Bad breath is caused by mouth bacteria, food trapped in teeth, or dry mouth. Tips: 1) Brush teeth twice daily (morning & night). 2) Scrape your tongue clean daily. 3) Drink 2–3 liters of water to keep saliva flowing.',
      ta: 'வாய் துர்நாற்றத்தைத் தவிர்க்க: 1) தினமும் காலை மற்றும் இரவில் பல் துலக்கவும். 2) நாக்கை தினமும் சுத்தப்படுத்தவும் (Tongue cleaner). 3) போதுமான அளவு தண்ணீர் குடிக்கவும்.',
      tanglish: '1) Daily morning and night brush pannanum. 2) Tongue cleaner vechu tongue clean pannanum. 3) Plenty water kudicha bad breath poidum.'
    },
    summary: {
      en: 'Brush twice daily, clean your tongue, and stay hydrated for fresh breath.',
      ta: 'இருவேளை பல் துலக்குதலும் நாக்கு சுத்தமும் வாய் துர்நாற்றத்தை போக்கும்.',
      tanglish: 'Twice daily brushing matrum tongue cleaner bad breath ah prevent pannum.'
    },
    tags: ['bad breath', 'halitosis', 'vaai duretram', 'tongue cleaner', 'brushing teeth'],
    sources: ['AAP Oral Health Guidelines']
  },
  {
    id: 'hygiene_5',
    category: 'hygiene',
    genderTarget: 'female',
    question: {
      en: 'Sanitary napkin replacement frequency & UTI infection prevention',
      ta: 'சுகாதார பேட் மாற்றும் கால இடைவெளி மற்றும் தொற்றுத் தடுப்பு',
      tanglish: 'Sanitary napkin change duration & UTI infection prevention'
    },
    answer: {
      en: 'Wearing a pad longer than 6 hours traps moisture and blood, creating a breeding ground for dangerous bacteria and fungus. This causes painful rashes, vaginal itching, and urinary tract infections (UTI).',
      ta: '6 மணி நேரத்திற்கு மேல் ஒரே பேடை பயன்படுத்தினால் பாக்டீரியா மற்றும் பூஞ்சை தொற்றுப்பட்டு அரிப்பு, தடிப்புகள் மற்றும் சிறுநீர் பாதை தொற்று (UTI) ஏற்படும்.',
      tanglish: '6 hours ku mela pad maathama irundha bacterial & fungal infection varum. Itching matrum rash aagum. Regular ah pad maathanum.'
    },
    summary: {
      en: 'Overusing pads causes bacterial infections, rashes, and UTIs.',
      ta: 'ஒரே பேடை நீண்ட நேரம் வைத்தால் தொற்று மற்றும் தடிப்புகள் உருவாகும்.',
      tanglish: 'Long time pad use panna bacteria perugi infection varum.'
    },
    tags: ['pad change', 'pad safety', 'uti risk', 'rash', 'sanitary pad', 'infections'],
    sources: ['WHO Menstrual Safety Guidelines']
  },

  // SKIN & HAIR (17 - 22)
  {
    id: 'skin_hair_1',
    category: 'skin_hair',
    genderTarget: 'both',
    question: {
      en: 'Adolescent acne care & safe facial skin maintenance tips',
      ta: 'பருக்கள் (Pimples/Acne) வரக் காரணமும் பாதுகாப்பான பராமரிப்பும்',
      tanglish: 'Teen acne care & pimple prevention tips'
    },
    answer: {
      en: 'Hormones during puberty cause oil glands to produce excess sebum, clogging pores with dead skin cells. Tips: 1) Wash face twice daily with mild soap. 2) NEVER squeeze or pop pimples—it causes permanent dark scars! 3) Keep hair clean and off your forehead.',
      ta: 'ஹார்மோன்களால் தோலில் எண்ணெய் சுரப்பு அதிகமாகி துளைகள் அடைபடுவதால் பருக்கள் வருகின்றன. 1) தினமும் இருமுறை முகம் கழுவவும். 2) பருக்களை கிள்ளவோ உடைக்கவோ கூடாது; கிள்ளினால் நிரந்தர தழும்பு ஏற்படும்.',
      tanglish: 'Puberty hormones nala oily skin aagi pores block aagum. 1) Gentle ah face wash pannunga. 2) Pimples ah POP/கிள்ளவே கூடாது, scar aagidum!'
    },
    summary: {
      en: 'Wash face gently twice daily and never pop pimples to prevent scarring.',
      ta: 'முகத்தை சுத்தமாக கழுவவும், பருக்களை கிள்ளவே கூடாது.',
      tanglish: 'Face clean ah vechiko, pimple ah kiḷla koodadhu!'
    },
    tags: ['pimples', 'acne', 'parukkal', 'mugam parukkal', 'oily skin', 'popping pimples', 'skincare'],
    sources: ['CDC Skin Care Guidelines', 'AAP Dermatology']
  },
  {
    id: 'skin_hair_2',
    category: 'skin_hair',
    genderTarget: 'both',
    question: {
      en: 'Managing facial oiliness & shine during long school hours',
      ta: 'அதிக எண்ணெய் பசை உள்ள முகத்தை எவ்வாறு பராமரிப்பது',
      tanglish: 'Managing facial oiliness during school hours'
    },
    answer: {
      en: 'Oily skin is normal in teens. Avoid washing face more than 2-3 times a day as over-washing makes skin produce MORE oil! Blot face with clean paper handkerchiefs or plain water rinses.',
      ta: 'அதிகமாக முகம் கழுவினால் சருமம் மேலும் எண்ணெயை சுரக்கும். தினமும் 2–3 முறைக்கு மேல் சோப்பு போட வேண்டாம். சுத்தமான கைக்குட்டையால் முகத்தை மென்மையாக துடைக்கவும்.',
      tanglish: 'Over ah face wash panna body innum adhigama oil produce pannum. Clean handkerchief vechu gently wipe pannunga.'
    },
    summary: {
      en: 'Do not over-wash oily skin; rinse gently 2-3 times daily.',
      ta: 'அதிகம் முகம் கழுவுவதை தவிர்த்து 2-3 முறை மட்டும் கழுவவும்.',
      tanglish: '2-3 times mela face wash pannadhiga, oil innum jaasthi aagum.'
    },
    tags: ['oily skin', 'ennai mugam', 'face oil', 'cleanser', 'skincare tips'],
    sources: ['AAP Dermatology Guidelines']
  },
  {
    id: 'skin_hair_3',
    category: 'skin_hair',
    genderTarget: 'both',
    question: {
      en: 'Controlling dandruff & scalp itchiness in teenagers',
      ta: 'பொடுகு (Dandruff) வரக் காரணம் மற்றும் உச்சந்தலை அரிப்பை தடுக்கும் வழி',
      tanglish: 'Controlling dandruff & scalp itchiness in students'
    },
    answer: {
      en: 'Dandruff is caused by an overgrowth of natural yeast (Malassezia) on oily scalp skin. Wash hair 2-3 times a week with an anti-dandruff shampoo containing Zinc Pyrithione or Ketoconazole. Avoid putting thick heavy oil directly on itchy scalp.',
      ta: 'தலையில் இயற்கையாக இருக்கும் பூஞ்சை அதிகரிப்பதால் பொடுகு ஏற்படுகிறது. வாரத்திற்கு 2–3 முறை பொடுகு எதிர்ப்பு ஷாம்பு பயன்படுத்தவும். தலையில் அதிக எண்ணெய் வைப்பதை தவிர்க்கவும்.',
      tanglish: 'Scalp la yeast fungal excess aaguradhala podugu varudhu. Anti-dandruff shampoo week 2-3 times use panna podugu control aagum.'
    },
    summary: {
      en: 'Use anti-dandruff shampoo 2-3 times a week and avoid excess heavy hair oil.',
      ta: 'பொடுகு எதிர்ப்பு ஷாம்பு பயன்படுத்தி தலையை சுத்தமாக வைக்கவும்.',
      tanglish: 'Anti-dandruff shampoo use panni scalp ah clean ah vechikonga.'
    },
    tags: ['dandruff', 'thalai podugu', 'podugu', 'scalp itch', 'anti dandruff shampoo', 'hair care'],
    sources: ['CDC Skin & Scalp Health']
  },
  {
    id: 'skin_hair_4',
    category: 'skin_hair',
    genderTarget: 'both',
    question: {
      en: 'Understanding temporary hair shedding during board exam stress',
      ta: 'தேர்வு மன அழுத்தத்தால் ஏற்படும் தற்காலிக முடி உதிர்வு',
      tanglish: 'Hair fall during board exam stress & recovery'
    },
    answer: {
      en: 'Exam stress causes temporary hair shedding called Telogen Effluvium. Stress pushes hair follicles into a resting phase. Once exams finish and sleep/nutrition improve, hair will regrow naturally. Eat iron and protein rich foods (eggs, spinach, pulses).',
      ta: 'தேர்வு மன அழுத்தத்தால் தலைமுடி தற்காலிகமாக உதிரும். பயப்படத் தேவையில்லை! மன அழுத்தம் குறைந்து சத்தான உணவு சாப்பிட்டால் முடி மீண்டும் இயல்பாக வளரும்.',
      tanglish: 'Exam stress nala temporary hair fall aagum. Stress kammi aagi nalla thookam matrum protein food sapatta hair regrowth aagum.'
    },
    summary: {
      en: 'Stress-induced hair fall is temporary; regrows with proper nutrition and rest.',
      ta: 'மன அழுத்த முடி உதிர்வு தற்காலிகமானது. சத்தான உணவால் சரியாகும்.',
      tanglish: 'Stress hair loss temporary dhaan, good diet and sleep la regain aagum.'
    },
    tags: ['hair fall', 'mudi kottudhal', 'hair loss', 'exam stress hair loss', 'telogen effluvium'],
    sources: ['WHO Stress & Physical Health']
  },
  {
    id: 'skin_hair_5',
    category: 'skin_hair',
    genderTarget: 'both',
    question: {
      en: 'Care for post-acne dark marks & hyperpigmentation on face',
      ta: 'முகத்தில் உள்ள பரு தழும்புகள் (Dark spots) மற்றும் பராமரிப்பு',
      tanglish: 'Care for post-pimple dark marks & facial spots'
    },
    answer: {
      en: 'No! Post-acne marks (hyperpigmentation) fade gradually over 3 to 6 months. Apply sunscreen or wear a scarf/cap under strong Tamil Nadu sunlight. Avoid dangerous fairing creams containing steroids.',
      ta: 'இல்லை! பரு தழும்புகள் 3–6 மாதங்களில் தானாகவே மறையும். வெயிலில் செல்லும்போது முகத்தை மூடவும். ஆபத்தான ஃபேர்னஸ் கிரீம்களைப் பயன்படுத்த வேண்டாம்.',
      tanglish: 'Dark spots 3-6 months la natural ah fade aagum. Steroid fairness creams nambi kedaichadhalam podadhiga.'
    },
    summary: {
      en: 'Pimple marks fade over months naturally; avoid harmful steroid bleaching creams.',
      ta: 'பரு தழும்புகள் தானாகவே மறையும், போலி கிரீம்களை தவிர்க்கவும்.',
      tanglish: 'Pimple marks fade over time naturally, chemical fairness creams thavirkavum.'
    },
    tags: ['dark spots', 'karumai', 'karumpulligal', 'pimple mark', 'hyperpigmentation', 'sunscreen'],
    sources: ['AAP Skin Health']
  },
  {
    id: 'skin_hair_6',
    category: 'skin_hair',
    genderTarget: 'both',
    question: {
      en: 'Care for swelling, minor bumps, or pimples around upper lip & face',
      ta: 'மேல் உதடு அல்லது முகத்தில் வீக்கம் மற்றும் பருக்கள் பராமரிப்பு',
      tanglish: 'Care for upper lip swelling, bumps & pimples on face'
    },
    answer: {
      en: 'Swelling or bumps around the upper lip are usually caused by clogged pores (acne/pimples), minor insect bites, hair removal/shaving irritation, or cold sores. Wash the area gently with mild soap and cool water. Avoid squeezing or picking at lip bumps to prevent scarring and infection.',
      ta: 'மேல் உதட்டில் வீக்கம் அல்லது கொப்பளம் ஏற்படுவது வழக்கமாக அடைபட்ட துளைகள் (பருக்கள்), பூச்சிக்கடி அல்லது முடி அகற்றுதலால் ஏற்படும் தற்காலிக அலர்ஜி. மிதமான சோப்பு மற்றும் நீரால் மென்மையாக கழுவவும். கிள்ளவே கூடாது.',
      tanglish: 'Upper lip la swelling illana bump varuvadharku acne, insect bite or thread irritation kaaranamaagalaam. Gentle ah cold water vechu wash pannunga. Pimple ah pop panna koodadhu.'
    },
    summary: {
      en: 'Lip bumps are usually harmless pimples or minor skin irritation; keep clean and do not pop.',
      ta: 'உதட்டு வீக்கம் வழக்கமாக பருக்கள் அல்லது பூச்சிக் கடியால் ஏற்படும் தற்காலிக பிரச்சனை.',
      tanglish: 'Upper lip swelling usually minor acne or irritation dhaan, clean ah vechiko.'
    },
    tags: ['swelling on upper lips', 'upper lip', 'lip swelling', 'lip bump', 'pimple on lip', 'lip acne', 'swelling on face', 'lip irritation', 'swelling on my upper lips'],
    sources: ['AAP Dermatology Guidelines', 'CDC Skin Care']
  },

  // NUTRITION & SLEEP (23 - 27)
  {
    id: 'nutrition_sleep_1',
    category: 'nutrition_sleep',
    genderTarget: 'both',
    question: {
      en: 'Optimal nightly sleep duration for adolescent brain performance',
      ta: 'மாணவர்களின் மூளை சுறுசுறுப்பிற்கு தேவையான இரவுநேர தூக்கம்',
      tanglish: 'Nightly sleep duration for teen brain performance'
    },
    answer: {
      en: 'Teenagers aged 13–18 require 8 to 10 hours of uninterrupted sleep for brain growth and memory consolidation. Lack of sleep causes poor exam focus, irritability, and dark eye circles. Avoid mobile screens 1 hour before bed.',
      ta: 'மாணவர்கள் தினமும் 8 முதல் 10 மணி நேரம் தூங்க வேண்டும். தூக்கமின்மை ஞாபக மறதி மற்றும் கோபத்தை உண்டாக்கும். தூங்குவதற்கு 1 மணி நேரத்திற்கு முன் மொபைல் போன் பார்ப்பதைத் தவிர்க்கவும்.',
      tanglish: 'Teenagers ku daily 8 to 10 hours thookam mandatory! Screen time thookathukku 1 hour munnadi off pannanum.'
    },
    summary: {
      en: 'Teenagers need 8-10 hours of sleep for brain performance and growth.',
      ta: 'மூளை வளர்ச்சிக்கு தினமும் 8-10 மணி நேர தூக்கம் அவசியம்.',
      tanglish: '8-10 hours sleep student performance ku romba mukkiyam.'
    },
    tags: ['sleep', 'thookam', '8 to 10 hours', 'screen time', 'insomnia', 'tiredness'],
    sources: ['CDC Sleep Guidelines for Teens', 'WHO Adolescent Brain Health']
  },
  {
    id: 'nutrition_sleep_2',
    category: 'nutrition_sleep',
    genderTarget: 'both',
    question: {
      en: 'Improving study focus & concentration during late-night prep',
      ta: 'இரவுநேர படிப்பில் கவனச்சிதறல் இல்லாமல் கவனம் செலுத்தும்Pomodoro முறை',
      tanglish: 'Improving study focus & concentration during exam prep'
    },
    answer: {
      en: '1) Use the Pomodoro Technique: Study 25 minutes, then take a 5-minute break. 2) Keep your mobile in another room. 3) Splash cold water on your eyes and drink water instead of drinking excessive caffeine or tea.',
      ta: '1) 25 நிமிடங்கள் படித்து 5 நிமிடங்கள் ஓய்வு எடுக்கவும் (Pomodoro முறை). 2) மொபைல் போனை தூரமாக வைக்கவும். 3) காஃபின் பானங்களை தவிர்த்து தண்ணீர் குடிக்கவும்.',
      tanglish: '1) 25 mins padichutu 5 mins break edunga. 2) Phone ah vera room la veingada. 3) Cold water splash panni hydra-a irunga.'
    },
    summary: {
      en: 'Use 25-minute study intervals, minimize phone distraction, and stay hydrated.',
      ta: '25 நிமிட இடைவெளியில் படித்து மொபைல் கவனச்சிதறலை தவிர்க்கவும்.',
      tanglish: '25 min study cycles and zero phone distraction for best focus.'
    },
    tags: ['study focus', 'padipil dhyanam', 'concentration', 'exam stress', 'memory', '10th board prep'],
    sources: ['AAP Adolescent Learning & Brain Function']
  },
  {
    id: 'nutrition_sleep_3',
    category: 'nutrition_sleep',
    genderTarget: 'both',
    question: {
      en: 'Preventing morning assembly dizziness & anemia in school students',
      ta: 'காலை இறைவணக்கக் கூட்டத்தில் தலைச்சுற்றல் மற்றும் சோர்வு தடுத்தல்',
      tanglish: 'Preventing morning assembly dizziness & anemia'
    },
    answer: {
      en: 'This is often due to low blood sugar (skipping breakfast) or low iron levels (Anemia). Tips: 1) NEVER skip morning breakfast! 2) Eat iron-rich local foods like drumstick leaves (murungai keerai), dates, jaggery, and sundal.',
      ta: 'காலை உணவை தவிர்க்கும் போதும் அல்லது ரத்த சோகையினாலும் (Anemia) மயக்கம் வரும். 1) காலை உணவை எப்போதும் தவிர்க்காதீர்கள்! 2) முருங்கைக்கீரை, பேரீச்சம்பழம், சுண்டல் போன்ற இரும்புச்சத்து நிறைந்த உணவுகளை சாப்பிடவும்.',
      tanglish: 'Breakfast skip panna or iron deficiency (ratha sogai) irundha dizziness varum. Morning breakfast thavirkkaadheega! Murungai keerai and dates nalla saapduga.'
    },
    summary: {
      en: 'Dizziness is caused by skipped breakfast or iron deficiency; eat greens and dates.',
      ta: 'காலை உணவை தவிர்க்காமல் முருங்கைக்கீரை மற்றும் பேரீச்சம்பழம் உண்ண வேண்டும்.',
      tanglish: 'Never skip breakfast! Eat iron rich foods like drumstick leaves & dates.'
    },
    tags: ['dizzy', 'anemia', 'ratha sogai', 'tiredness', 'skipping breakfast', 'iron deficiency', 'murungai keerai'],
    sources: ['WHO Anemia Prevention in Adolescents']
  },
  {
    id: 'nutrition_sleep_4',
    category: 'nutrition_sleep',
    genderTarget: 'both',
    question: {
      en: 'Balanced nutrition & physical habits for healthy growth in teens',
      ta: 'உயரம் மற்றும் எலும்பு வலிமை அதிகரிக்கும் புரத ஊட்டச்சத்துக்கள்',
      tanglish: 'Balanced nutrition & habits for healthy growth in teens'
    },
    answer: {
      en: 'Height depends 80% on genetics, but full growth potential requires: 1) Protein (milk, paneer, eggs, chana, dal). 2) Calcium & Vitamin D (sunlight, milk, sesame seeds). 3) Regular outdoor games like basketball, skipping, or swimming.',
      ta: 'உயரம் மரபணுவை பொறுத்தது. ஆயினும் முழுமையான வளர்ச்சிக்கு: 1) புரதம் (பால், முட்டை, பருப்பு). 2) கால்சியம் (பால், எள்). 3) தினமும் வெளிப்புற உடற்பயிற்சி அல்லது விளையாட்டுகளில் ஈடுபடவும்.',
      tanglish: 'Genetics main thaan. Protein (milk, egg, chana) matrum Calcium foods saapdanum. Daily outdoor skipping or sports aadanum.'
    },
    summary: {
      en: 'Protein, calcium, sunlight, and outdoor physical activity maximize growth potential.',
      ta: 'புரதம், கால்சியம் மற்றும் உடற்பயிற்சி முழுமையான வளர்ச்சியை தரும்.',
      tanglish: 'Good protein, calcium diet and outdoor sports maximize height growth.'
    },
    tags: ['height growth', 'nutrition', 'saappadu', 'sathana unavu', 'calcium', 'protein', 'bone health'],
    sources: ['WHO Adolescent Nutrition']
  },
  {
    id: 'nutrition_sleep_5',
    category: 'nutrition_sleep',
    genderTarget: 'both',
    question: {
      en: 'Hydration benefits for body temperature regulation & skin health',
      ta: 'உடல் சூடு மற்றும் சரும ஆரோக்கியத்திற்கு நீர் அருந்துவதன் நன்மைகள்',
      tanglish: 'Hydration benefits for body heat & skin health'
    },
    answer: {
      en: 'Yes! Drinking 2.5 to 3 liters of water daily helps flush out toxins, prevents constipation, reduces skin dryness, and keeps your body temperature regulated under hot climate conditions.',
      ta: 'ஆம்! தினமும் 2.5 முதல் 3 லிட்டர் தண்ணீர் குடிப்பது உடலில் உள்ள நச்சுக்களை வெளியேற்றி, மலச்சிக்கல், உடல் சூடு மற்றும் சரும வறட்சியைக் குறைக்கும்.',
      tanglish: 'Aam! Daily 2.5 to 3 liters water kudicha body heat thaniyum, constipation pogum, skin hydrated ah irukkum.'
    },
    summary: {
      en: 'Drink 2.5–3 liters of water daily for body temperature control and healthy skin.',
      ta: 'தினமும் 2.5-3 லிட்டர் தண்ணீர் குடிப்பது உடலுக்கு நல்லது.',
      tanglish: 'Daily 2.5-3L water is essential for body heat control.'
    },
    tags: ['water', 'thanneer', 'body heat', 'udhar choodu', 'hydration', 'acne care'],
    sources: ['CDC Hydration & Youth Health']
  },

  // EMOTIONAL WELL-BEING (28 - 32)
  {
    id: 'emotional_1',
    category: 'emotional',
    genderTarget: 'both',
    question: {
      en: 'Understanding teenage emotional shifts, mood swings & anger control',
      ta: 'வளர்இளம் பருவத்தினரின் மனநிலை மாற்றம் மற்றும் கோபக் கட்டுப்பாடு',
      tanglish: 'Understanding teen mood swings & anger management'
    },
    answer: {
      en: 'Fluctuating hormones (estrogen & testosterone) combined with brain restructuring during teenage years cause rapid emotional shifts. It is not your fault. When angry: practice deep breathing (4-7-8 method) or walk away for 5 minutes before responding.',
      ta: 'ஹார்மோன் மாற்றங்களால் மூளையின் உணர்ச்சி பகுதி தூண்டப்படுவதால் கோபம் வருகிறது. கோபம் வரும்போது ஆழமாக மூச்சு பயிற்சி செய்யவும் அல்லது 5 நிமிடங்கள் அமைதியாக இருக்கவும்.',
      tanglish: 'Hormones fluctuations and brain development nala mood swings aagudhu. Kobam varumbodhu deep breath edungada or 5 mins silent ah irunga.'
    },
    summary: {
      en: 'Hormonal fluctuations cause mood swings; practice deep breathing when angry.',
      ta: 'ஹார்மோன் மாற்றத்தால் ஏற்படும் கோபத்திற்கு மூச்சு பயிற்சி சிறந்தது.',
      tanglish: 'Hormone changes cause mood swings, deep breathing helps stay calm.'
    },
    tags: ['mood swings', 'kobam', 'mananilai maarudhal', 'anger management', 'emotional control', 'hormones'],
    sources: ['WHO Adolescent Mental Health Guidelines']
  },
  {
    id: 'emotional_2',
    category: 'emotional',
    genderTarget: 'both',
    question: {
      en: 'Coping with board exam pressure & managing academic expectations',
      ta: 'பொதுத்தேர்வு பயம் மற்றும் பெற்றோர் எதிர்பார்ப்பை கையாள்வது எப்படி',
      tanglish: 'Coping with board exam stress & academic pressure'
    },
    answer: {
      en: 'Remember: Your marks do NOT define your entire future or self-worth. Tips: 1) Talk openly with your parents about your realistic targets. 2) Break study schedules into small daily tasks. 3) Take short breaks and walk outdoors.',
      ta: 'நினைவில் கொள்க: மதிப்பெண்கள் மட்டுமே உங்கள் வாழ்க்கை அல்ல! பெற்றோரிடம் உங்கள் சூழ்நிலையை வெளிப்படையாகப் பேசுங்கள். பாடங்களை சிறு சிறு பகுதிகளாகப் பிரித்து படிக்கவும்.',
      tanglish: 'Marks mattum வாழ்க்கை இல்லை! Parents kitta open ah pesunga. Everyday small syllabus complete panni confidence ஏத்துங்க.'
    },
    summary: {
      en: 'Marks do not define your worth. Communicate openly and study in small chunks.',
      ta: 'மதிப்பெண் உங்கள் திறமையை தீர்மானிக்காது. பெற்றொரிடம் வெளிப்படையாக பேசுங்கள்.',
      tanglish: 'Marks don\'t define your life. Break study plan into daily goals.'
    },
    tags: ['exam stress', 'parikshai bayam', 'board exam pressure', 'parental pressure', 'anxiety'],
    sources: ['Tele-MANAS Youth Counseling Guidelines']
  },
  {
    id: 'emotional_3',
    category: 'emotional',
    genderTarget: 'both',
    question: {
      en: 'Overcoming body image insecurity & height/weight comparison in school',
      ta: 'உயரம் அல்லது எடையை ஒப்பிட்டு ஏற்படும் தாழ்வுமனப்பான்மை தடுத்தல்',
      tanglish: 'Overcoming body image comparison & height/weight worry'
    },
    answer: {
      en: 'Every individual grows at a unique rate during puberty! Some teens spurt early at 13, while others spurt later at 16 or 17. Stop comparing yourself with classmates. Focus on healthy food, outdoor sports, and loving your unique body.',
      ta: 'ஒவ்வொருவரின் உடல் வளர்ச்சியும் வெவ்வேறு வயதில் நடக்கும். சிலருக்கு 13 வயதிலும் சிலருக்கு 16 வயதிலும் வளர்ச்சி வேகமெடுக்கும். ஒப்பீட்டை நிறுத்தி ஆரோக்கியமான உணவை உண்ணுங்கள்.',
      tanglish: 'Ellarumey ஒரே மாதிரியா grow aaga maattanga. Compare panradha நிறுத்துங்க! Good nutrition and self-confidence is key.'
    },
    summary: {
      en: 'Growth timelines differ for everyone; avoid comparisons and stay active.',
      ta: 'ஒவ்வொருவருக்கும் வளர்ச்சி வேகம் வேறுபடும். ஒப்பீடுகளை தவிர்க்கவும்.',
      tanglish: 'Everyone grows at their own pace during puberty. Be confident!'
    },
    tags: ['body image', 'height', 'edai', 'body confidence', 'comparison', 'thazhvu manappanmai'],
    sources: ['AAP Adolescent Body Image & Self Esteem']
  },
  {
    id: 'emotional_4',
    category: 'emotional',
    genderTarget: 'both',
    question: {
      en: 'Building peer confidence & standing firm against negative pressure',
      ta: 'நண்பர்களின் தவறான வற்புறுத்தலுக்கு (Peer Pressure) "வேண்டாம்" என்று சொல்லும் துணிவு',
      tanglish: 'Building peer confidence & saying NO to negative pressure'
    },
    answer: {
      en: 'True friends will respect your boundaries! Practice a direct response: "No thanks, I don\'t want to get into trouble." If they persist, walk away and spend time with classmates who support your goals.',
      ta: 'உண்மையான நண்பர்கள் உங்கள் முடிவை மதிப்பார்கள். "வேண்டாம், எனக்கு இதில் விருப்பமில்லை" என்று உறுதியாக சொல்லுங்கள். வற்புறுத்தினால் அந்த இடத்திலிருந்து விலகி விடுங்கள்.',
      tanglish: 'True friends ungala force panna maattanga. Firm ah "No, enaku ishtam illa" nu sollunga. Ignore panradhu thappe illa.'
    },
    summary: {
      en: 'Say NO firmly to bad habits; real friends will respect your boundaries.',
      ta: 'தவறான பழக்கங்களுக்கு உறுதியாக "வேண்டாம்" என்று சொல்ல பழகவும்.',
      tanglish: 'Say a firm NO to bad habits. Real friends will respect your choice.'
    },
    tags: ['peer pressure', 'nanbargal alutham', 'saying no', 'confidence', 'bunking class', 'bad habits'],
    sources: ['WHO Life Skills Education']
  },
  {
    id: 'emotional_5',
    category: 'emotional',
    genderTarget: 'both',
    question: {
      en: 'Overcoming loneliness & accessing confidential mental health support',
      ta: 'தனிமை உணர்வு மற்றும் அவசர மனநல ஆலோசனை வழிகாட்டல்',
      tanglish: 'Overcoming loneliness & accessing Tele-MANAS support'
    },
    answer: {
      en: 'You are NEVER alone, and help is always available. Please talk to a trusted adult, teacher, school counselor, or call the 24/7 free Tele-MANAS helpline at 14416 immediately. Speaking out is a sign of courage, not weakness.',
      ta: 'நீங்கள் தனிமையில் இல்லை! உங்கள் பெற்றோர், ஆசிரியர் அல்லது 14416 (Tele-MANAS) இலவச உதவி எண்ணை தொடர்பு கொண்டு மனவிட்டு பேசுங்கள். உதவி கேட்பது தைரியமான செயல்.',
      tanglish: 'Ninga yaarumey lonely இல்லை! Trusted teacher, parents or 14416 (Tele-MANAS) free helpline ku call panni pesunga. We are here for you!'
    },
    summary: {
      en: 'Reach out to trusted adults or call Tele-MANAS (14416) for free support.',
      ta: 'தனிமை உணர்வு ஏற்பட்டால் 14416 என்ற இலவச உதவி எண்ணை அழைக்கவும்.',
      tanglish: 'Call free Tele-MANAS helpline 14416 when feeling down or lonely.'
    },
    tags: ['lonely', 'thanimai', 'sadness', 'kavalai', 'helpline 14416', 'emotional support', 'tele-manas'],
    sources: ['Tele-MANAS National Mental Health Program']
  }
];
