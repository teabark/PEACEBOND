const peacebondTemplates = [
  {
    category: "theft_livestock",
    keywords: ["theft", "stole", "stolen", "livestock", "cattle", "goat", "sheep"],
    repairActions: [
      "Return or replace what was taken through an agreed community process.",
      "Help rebuild trust with the affected household through practical support.",
      "Join a guided conversation with elders or mediators to name the harm clearly.",
    ],
    ritual: "A small restitution gathering where the item, value, or apology is received with witnesses.",
    grant: {
      amount: 120,
      currency: "USD",
      purpose: "Shared tools or materials that support restitution and rebuilding.",
    },
  },
  {
    category: "militia_armed",
    keywords: ["militia", "armed", "fighter", "weapon", "combatant", "rebel"],
    repairActions: [
      "Give a guided testimony that acknowledges harm without glorifying violence.",
      "Mentor a younger community member toward nonviolent choices.",
      "Take part in a supervised service day that supports a public community need.",
    ],
    ritual: "A community witnessing circle where testimony is heard and a peaceful role is affirmed.",
    grant: {
      amount: 180,
      currency: "USD",
      purpose: "Training materials or livelihood support tied to peaceful reintegration.",
    },
  },
  {
    category: "violence_fight",
    keywords: ["violence", "fight", "fighting", "assault", "hit", "injured", "beating"],
    repairActions: [
      "Offer a direct apology in a mediated setting if the harmed person agrees.",
      "Attend a peace circle focused on responsibility and future safety.",
      "Complete a helpful task chosen by the affected person or community mediator.",
    ],
    ritual: "A peace circle where both safety commitments and repair actions are spoken aloud.",
    grant: {
      amount: 100,
      currency: "USD",
      purpose: "Community peace circle materials and practical repair support.",
    },
  },
  {
    category: "destruction",
    keywords: ["destruction", "destroyed", "damaged", "burned", "broke", "vandalized"],
    repairActions: [
      "Help repair or replace the damaged property with supervised labor.",
      "Contribute time to a shared community rebuilding activity.",
      "Meet with those affected to agree on what repair will feel meaningful.",
    ],
    ritual: "A rebuilding day that ends with a shared meal or blessing for restored safety.",
    grant: {
      amount: 150,
      currency: "USD",
      purpose: "Basic materials for repair work and community labor.",
    },
  },
  {
    category: "verbal_threats",
    keywords: ["threat", "threats", "verbal", "insult", "intimidated", "harassed"],
    repairActions: [
      "Make a clear apology for the words used and the fear they caused.",
      "Join a mediation session to agree on respectful future contact.",
      "Support a community dialogue about dignity and nonviolent speech.",
    ],
    ritual: "A mediation meeting where harmful words are replaced with public commitments to respect.",
    grant: {
      amount: 80,
      currency: "USD",
      purpose: "Mediation support and materials for a respectful dialogue session.",
    },
  },
  {
    category: "land_dispute",
    keywords: ["land", "boundary", "farm", "field", "plot", "dispute", "property"],
    repairActions: [
      "Participate in boundary mediation with trusted local witnesses.",
      "Listen to each side's history of the land without interruption.",
      "Help document a simple agreement for future use of the disputed space.",
    ],
    ritual: "A boundary walk where agreed markers are recognized by both families or groups.",
    grant: {
      amount: 130,
      currency: "USD",
      purpose: "Boundary markers, meeting costs, and dialogue materials.",
    },
  },
];

const defaultTemplate = {
  category: "community_repair",
  keywords: [],
  repairActions: [
    "Meet with a mediator to name the harm and hear who was affected.",
    "Complete one practical act of service chosen through community dialogue.",
    "Share a respectful apology or commitment that focuses on future peace.",
  ],
  ritual: "A quiet reconciliation meeting where repair commitments are witnessed.",
  grant: {
    amount: 90,
    currency: "USD",
    purpose: "Basic materials for community repair and mediation.",
  },
};

module.exports = {
  defaultTemplate,
  peacebondTemplates,
};
