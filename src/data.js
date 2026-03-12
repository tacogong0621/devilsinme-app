export const PHASES = {
  menstrual: {
    key: "menstrual", days: "Days 1–5",
    color: "#e05252", dim: "rgba(224,82,82,0.08)",
    label: "Menstrual", sub: "The reset",
    weather: "Thunderstorm", mood: "Drained · Sensitive · Emotional",
    feel: "Everything hurts and everyone is annoying.",
    hormones: { estrogen: 10, progesterone: 5, serotonin: 20 },
    decisionBlock: true,
    junk: "You're losing blood. The burger, the fries, the chocolate — that's iron and magnesium. Consider it medical.",
    partner: "Heads up — she's on Day 1.\n\nDo: bring food, be warm, ask before touching.\nDon't: say 'you're so sensitive.' Exist quietly.",
    survival: [
      ["Iron & protein", "Non-negotiable replenishment."],
      ["Hot bath", "The most effective cramp relief there is."],
      ["Light walking only", "You've earned the couch."],
      ["No caffeine", "Makes cramping significantly worse."],
      ["Dark chocolate", "Magnesium. Genuinely medicinal."],
      ["Extra sleep", "Your body is shedding a lining. Rest."],
    ],
    why: [
      ["Estrogen", "Crashed", "Mood regulation offline. This is the hard reboot."],
      ["Progesterone", "At zero", "Your body wrapped up this cycle. It's being dramatic."],
      ["Serotonin", "Low", "Drops with estrogen. The happiness signal is weak."],
      ["Prostaglandins", "Spiking", "These cause the contractions. The villain of Day 1."],
    ],
    anim: { estrogen:10, serotonin:10, progesterone:5, devil:95, angel:25, chaos:95, finale:"You're not broken.\nYour body is resetting.\nThis passes." },
  },
  follicular: {
    key: "follicular", days: "Days 6–13",
    color: "#4caf82", dim: "rgba(76,175,130,0.08)",
    label: "Follicular", sub: "The rising",
    weather: "Clearing", mood: "Energized · Creative · Clear",
    feel: "Wait — I actually feel like a person again.",
    hormones: { estrogen: 75, progesterone: 15, serotonin: 80 },
    decisionBlock: false, junk: null,
    partner: "Green light.\n\nShe's in her best phase of the month — high energy, clear head, good mood. Plan something. Have the real conversation. Don't waste the window.",
    survival: [
      ["Intense workouts", "Energy is building — use it."],
      ["New foods, new places", "Digestion is smooth, appetite is good."],
      ["Make the big decision", "Brain is at its absolute clearest."],
      ["Say yes to plans", "Social energy is high. Extraversion peaks here."],
      ["Start the project", "Creative ideas flow most easily now."],
      ["Have the hard talk", "Emotional regulation is at its best."],
    ],
    why: [
      ["Estrogen", "Rising", "Mood, confidence, skin — all climbing."],
      ["Serotonin", "Increasing", "Happiness signal back online."],
      ["Dopamine", "Active", "Motivation, focus, pleasure — all switched on."],
      ["Testosterone", "Slight boost", "Drive and confidence quietly building."],
    ],
    anim: { estrogen:75, serotonin:80, progesterone:15, devil:15, angel:90, chaos:10, finale:"Your hormones are rising.\nThis is your window.\nUse it." },
  },
  ovulation: {
    key: "ovulation", days: "Days 14–16",
    color: "#e09b3d", dim: "rgba(224,155,61,0.08)",
    label: "Ovulation", sub: "The peak",
    weather: "Peak sunshine", mood: "Confident · Magnetic · Unstoppable",
    feel: "I am that girl. Everything is possible.",
    hormones: { estrogen: 100, progesterone: 30, serotonin: 95 },
    decisionBlock: false, junk: null,
    partner: "She's ovulating.\n\nPeak energy, peak confidence, peak magnetism. Great time for a date, a trip, anything fun. She's radiant and you'll notice.",
    survival: [
      ["Present and pitch", "Persuasion and charisma are at their peak."],
      ["High-intensity training", "Body is at absolute peak performance."],
      ["Negotiate", "You're naturally convincing right now. Use it."],
      ["Take photos", "Skin, eyes, energy — genuinely at their best."],
      ["Lean into romance", "Magnetic pull is real. Work with it."],
      ["Eat zinc", "Oysters, pumpkin seeds — support ovulation."],
    ],
    why: [
      ["LH", "Surging", "Triggers ovulation. Also the 'I can do anything' feeling."],
      ["Estrogen", "Peak", "Beauty, confidence, social energy — all maxed."],
      ["Testosterone", "Peak", "Drive, assertiveness, that magnetic quality."],
      ["Serotonin", "Maximum", "Life genuinely feels good right now."],
    ],
    anim: { estrogen:100, serotonin:95, progesterone:30, devil:5, angel:100, chaos:5, finale:"Everything is firing.\nYou are at peak biology.\nThis is your moment." },
  },
  luteal_early: {
    key: "luteal_early", days: "Days 17–24",
    color: "#8b6fd4", dim: "rgba(139,111,212,0.08)",
    label: "Early Luteal", sub: "The shift",
    weather: "Cloudy", mood: "Slower · Introverted · Craving comfort",
    feel: "Something is shifting. I'm tired and want snacks.",
    hormones: { estrogen: 60, progesterone: 80, serotonin: 50 },
    decisionBlock: false,
    junk: "The sugar craving is a real blood sugar issue — hormones are shifting how your body regulates glucose. The macaron is fine.",
    partner: "Heads up — luteal phase has started.\n\nKeep the compliments coming. Reduce criticism. Bring food home without being asked. You've been warned.",
    survival: [
      ["Yoga and stretching", "Lowers cortisol before things escalate."],
      ["Magnesium and nuts", "Supports the shift, reduces bloating."],
      ["Gentler exercise", "Pilates and swimming over HIIT."],
      ["Write it down", "Get the emotions out of your head."],
      ["Chamomile at night", "Reduces anxiety, improves sleep."],
      ["Less scrolling", "Sensitivity is up. Social media will not help."],
    ],
    why: [
      ["Progesterone", "Rising", "Sedating — calming, but also draining."],
      ["Estrogen", "Falling", "Serotonin drops with it."],
      ["Serotonin", "Declining", "That 'blah for no reason' feeling starts here."],
      ["Cortisol", "More reactive", "Small things feel bigger than they are."],
    ],
    anim: { estrogen:60, serotonin:50, progesterone:80, devil:50, angel:50, chaos:50, finale:"The shift has begun.\nBe extra gentle\nwith yourself." },
  },
  luteal_late: {
    key: "luteal_late", days: "Days 25–28",
    color: "#c94f4f", dim: "rgba(201,79,79,0.08)",
    label: "Late Luteal", sub: "The storm",
    weather: "Severe storm", mood: "Explosive · Maximum sensitivity",
    feel: "Bloated, exhausted, can't sleep. And his breathing is too loud.",
    hormones: { estrogen: 15, progesterone: 10, serotonin: 10 },
    decisionBlock: true,
    junk: "Ramen, fried chicken, ice cream — this is emergency serotonin support. Diet resumes next week. Non-negotiable.",
    partner: "Emergency.\n\nPeak PMS. Do all the chores. Buy food without being asked. Ask 'what do you need?' and mean it.\n\nNever say: 'why are you so sensitive' or 'is it that time of month.'\n\nSurvive this. You'll both be fine in a few days.",
    survival: [
      ["Sauna or hot bath tonight", "The most effective thing you can do right now."],
      ["Walk alone for 30 minutes", "Endorphins are the only real antidote."],
      ["Protein and complex carbs", "Stable blood sugar stabilizes mood."],
      ["Off social media", "Sensitivity plus comparison equals disaster."],
      ["Epsom salt bath", "Reduces bloating and calms the nervous system."],
      ["In bed by 10pm", "Sleep loss makes PMS catastrophically worse."],
    ],
    why: [
      ["Estrogen", "Crashed", "Takes serotonin and dopamine with it."],
      ["Progesterone", "Crashed", "GABA disrupted — anxiety, insomnia, irritability."],
      ["Serotonin", "Rock bottom", "The biochemical reason your partner annoys you."],
      ["Cortisol", "Elevated", "Everything feels like a threat. System on high alert."],
    ],
    anim: { estrogen:15, serotonin:10, progesterone:10, devil:100, angel:5, chaos:100, finale:"You're not broken.\nYour hormones crashed.\nThis is temporary." },
  },
};

export const PARTNER_TEMPLATES = {
  menstrual: {
    tone: "Low energy / reset mode",
    messages: [
      "Day 1. System reboot in progress. Please provide food and minimal conversation.",
      "Energy level: 12%. If it's not urgent, it can wait until next week.",
      "I'm currently powered by painkillers and snacks. Please be gentle.",
      "If I fall asleep randomly, it's not personal. It's biology.",
      "Hard conversations not available today. Please try again in 5 days.",
    ]
  },
  luteal_late: {
    tone: "Threat detection system: activated",
    messages: [
      "Current status: everything is slightly annoying. Proceed carefully.",
      "Serotonin levels are low. Please avoid sarcasm.",
      "If I say something dramatic, please remember I also cried at a commercial earlier.",
      "Warning: small issues may feel like national emergencies today.",
      "If I seem angry — I am. Sad — I am. Fine — I'm not. Good luck out there.",
      "I'm sad but there's nothing to fix. Just sit near me and don't offer solutions.",
      "I don't need advice. I need proximity and maybe a warm drink.",
    ]
  },
  follicular: {
    tone: "Energy returning / brain clear",
    messages: [
      "Update: mood stabilizing. I'm open to plans and ideas again.",
      "This is the phase where I forgive many things.",
      "Good news: I'm in my best phase. Bad news: you have 7 days to fix everything you've been avoiding.",
      "Green light. Whatever you've been wanting to ask — now is literally the best time.",
    ]
  },
  ovulation: {
    tone: "Confidence + social energy",
    messages: [
      "Reminder: this is the charming version of me.",
      "I feel incredible and I want to do something. Anywhere. Tonight. Suggest something good.",
      "If you want to impress me, today is a strong opportunity.",
      "Mood: confident, social, optimistic. Use this wisely.",
    ]
  },
  luteal_early: {
    tone: "Shifting — handle with care",
    messages: [
      "Energy is dipping. Low-effort plans preferred this week.",
      "I may need more reassurance than usual. That's all.",
      "Best approach this week: less talk, more snacks.",
      "Things that were fine last week may not be fine this week. Adjust accordingly.",
      "Verbal communication is temporarily offline. Nods and snacks accepted.",
      "Can we go outside and not talk? Just walk next to each other.",
    ]
  },
};

export const SYMPTOMS = [
  { id:"brain_fog",  label:"Brain fog" },
  { id:"temp",       label:"Temp dysregulation" },
  { id:"irritable",  label:"Irritable" },
  { id:"sad",        label:"Low mood" },
  { id:"bloat",      label:"Bloating" },
  { id:"craving",    label:"Cravings" },
  { id:"insomnia",   label:"Can't sleep" },
  { id:"headache",   label:"Headache" },
  { id:"low_energy", label:"Low energy" },
  { id:"anxious",    label:"Anxious" },
  { id:"slow",       label:"Moving slow" },
  { id:"good",       label:"Feeling good" },
];

export function phaseForDay(d) {
  if (d<=5) return PHASES.menstrual;
  if (d<=13) return PHASES.follicular;
  if (d<=16) return PHASES.ovulation;
  if (d<=24) return PHASES.luteal_early;
  return PHASES.luteal_late;
}
