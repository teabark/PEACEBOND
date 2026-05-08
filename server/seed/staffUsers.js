require("dotenv").config();

const mongoose = require("mongoose");
const PeaceBond = require("../models/PeaceBond");
const StaffUser = require("../models/StaffUser");

const demoStaffUsers = [
  {
    name: "Alice Kamau",
    email: "alice@peacebond.org",
    password: "123456",
    role: "Community Elder Mediator",
    title: "Livestock and Land Repair Mediator",
    communityFocus: "Pastoral communities, livestock restitution, and boundary dialogue",
  },
  {
    name: "John Mwangi",
    email: "john@peacebond.org",
    password: "123456",
    role: "Coastal Reconciliation Mediator",
    title: "Fishing Livelihoods Mediator",
    communityFocus: "Fishing repair, coastal reconciliation, and market peace circles",
  },
  {
    name: "Fatima Noor",
    email: "fatima@peacebond.org",
    password: "123456",
    role: "Youth Reintegration Mediator",
    title: "Youth Reintegration and Anti-Recruitment Mediator",
    communityFocus: "Youth return, nonviolence mentoring, and armed group recovery",
  },
];

function daysAgo(days) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

function buildPeaceBondCase({
  category,
  communityResponse = "",
  communityType,
  completedActions,
  completionDaysAgo,
  demoSeedKey,
  explanation,
  fighterName,
  grantAmount,
  grantPurpose,
  harmDescription,
  nationality,
  phoneNumber,
  repairActions,
  ritual,
  severity,
  staffRecommendation = "",
  staffSummary = "",
}) {
  const completedCount = completedActions.filter(Boolean).length;
  const progress = Math.round((completedCount / 3) * 100);
  const isComplete = progress === 100 && completedActions.every(Boolean);
  const completedAt = isComplete ? daysAgo(completionDaysAgo || 2) : null;

  return {
    category,
    communityType,
    completedActions,
    completedAt,
    completionReport: {
      communityResponse,
      staffRecommendation,
      summary: staffSummary,
    },
    completionReviewed: isComplete,
    demoSeedKey,
    explanation,
    fighterName,
    grant: {
      amount: grantAmount,
      currency: "USD",
      purpose: grantPurpose,
    },
    grantAmount,
    grantPurpose,
    grantReleased: isComplete,
    grantReleasedAt: isComplete ? completedAt : null,
    harmDescription,
    nationality,
    phoneNumber,
    progress,
    repairActions,
    reportSubmitted: isComplete,
    reportSubmittedAt: isComplete ? completedAt : null,
    ritual,
    severity,
  };
}

const demoPeaceBondCases = [
  {
    staffEmail: "alice@peacebond.org",
    caseData: buildPeaceBondCase({
      category: "theft_livestock",
      communityType: "Pastoral community",
      completedActions: [true, true, false],
      demoSeedKey: "demo-alice-livestock-restitution",
      explanation:
        "This PeaceBond supports restitution without humiliation. The plan focuses on replacing livestock value through supervised labor, family dialogue, and a witnessed peace circle.",
      fighterName: "Daniel Lokiru",
      grantAmount: 42,
      grantPurpose: "Reintegration support for goat feed, transport, and basic herding tools.",
      harmDescription:
        "Daniel admitted taking two goats during a night dispute between neighboring families. The affected household wants restitution and a mediated return to shared grazing routines.",
      nationality: "Kenyan",
      phoneNumber: "+254 711 204 118",
      repairActions: [
        "Agree on a restitution schedule with the affected household, elders, and mediator.",
        "Complete supervised herding support and water-carrying labor for the affected family.",
        "Attend a peace circle where both families confirm the repair agreement and future grazing boundaries.",
      ],
      ritual:
        "A restitution gathering where elders witness the repair plan and both households share a meal after the final action.",
      severity: "moderate",
    }),
  },
  {
    staffEmail: "alice@peacebond.org",
    caseData: buildPeaceBondCase({
      category: "land_dispute",
      communityType: "Rural village",
      completedActions: [true, false, false],
      demoSeedKey: "demo-alice-land-boundary",
      explanation:
        "This PeaceBond pauses retaliation and invites both households into boundary mediation, practical repair, and witnessed dialogue.",
      fighterName: "Beatrice Naliaka",
      grantAmount: 25,
      grantPurpose: "Support for boundary marker materials and transport to mediation meetings.",
      harmDescription:
        "A disputed farm boundary led Beatrice to remove marker stones from a neighbor's field. The families agreed to a mediator-led boundary walk.",
      nationality: "Kenyan",
      phoneNumber: "+254 733 918 402",
      repairActions: [
        "Attend a boundary mediation meeting with elders and affected household representatives.",
        "Help restore agreed boundary markers using simple materials provided through mediation.",
        "Confirm a temporary land-use agreement during a witnessed family dialogue.",
      ],
      ritual:
        "A boundary walk where both families recognize agreed markers and speak future land-use commitments.",
      severity: "low",
    }),
  },
  {
    staffEmail: "john@peacebond.org",
    caseData: buildPeaceBondCase({
      category: "destruction_property",
      communityResponse:
        "Fishing representatives reported that the repair work reduced tension at the landing site. The affected boat owner accepted the apology and welcomed continued peaceful work.",
      communityType: "Coastal fishing community",
      completedActions: [true, true, true],
      completionDaysAgo: 5,
      demoSeedKey: "demo-john-fishing-net-repair",
      explanation:
        "This PeaceBond centers practical repair of fishing equipment, respectful accountability, and a public acknowledgment of restored livelihood safety.",
      fighterName: "Peter Odhiambo",
      grantAmount: 39,
      grantPurpose: "Reintegration starter support for net mending supplies and safe transport to fishing work.",
      harmDescription:
        "Peter damaged fishing nets after a shoreline argument, leaving another fisher unable to work for several days. The community requested repair labor and mediated reconciliation.",
      nationality: "Kenyan",
      phoneNumber: "+254 722 640 903",
      repairActions: [
        "Meet the affected fisher with a mediator and acknowledge the damage caused.",
        "Complete supervised net repair labor until the damaged equipment is usable again.",
        "Attend a shoreline peace circle where fishers confirm safety and shared landing-site rules.",
      ],
      ritual:
        "A shoreline reconciliation circle where repaired nets are returned and both parties affirm peaceful fishing routines.",
      severity: "moderate",
      staffRecommendation:
        "Based on the completed repair pathway, PeaceBond staff recommend continued inclusion in fishing work and follow-up support from the landing-site mediation group.",
      staffSummary:
        "Peter completed all assigned repair actions with consistent attendance. He participated in supervised net repair, accepted responsibility in mediation, and joined the shoreline peace circle respectfully.",
    }),
  },
  {
    staffEmail: "john@peacebond.org",
    caseData: buildPeaceBondCase({
      category: "verbal_threats",
      communityType: "Market town",
      completedActions: [true, false, false],
      demoSeedKey: "demo-john-market-threats",
      explanation:
        "This PeaceBond responds to threatening words with mediation, nonviolent communication, and a clear commitment to respectful contact.",
      fighterName: "Asha Mbaraka",
      grantAmount: 23,
      grantPurpose: "Transport support for mediation check-ins and peaceful market re-entry.",
      harmDescription:
        "Asha made verbal threats during a market dispute over fish sales. Vendors asked for a mediated apology and a respectful contact agreement.",
      nationality: "Tanzanian",
      phoneNumber: "+255 746 120 884",
      repairActions: [
        "Offer a clear mediated apology for the words used and the fear caused.",
        "Agree on respectful market contact boundaries with vendor representatives present.",
        "Complete a follow-up check-in with the mediator to confirm the agreement is being honored.",
      ],
      ritual:
        "A mediation meeting where harmful words are replaced with public commitments to respect.",
      severity: "low",
    }),
  },
  {
    staffEmail: "fatima@peacebond.org",
    caseData: buildPeaceBondCase({
      category: "militia_armed",
      communityResponse:
        "Youth mentors and elders acknowledged Samuel's testimony and service work. The community agreed to support continued mentoring while maintaining nonviolence check-ins.",
      communityType: "Border community",
      completedActions: [true, true, true],
      completionDaysAgo: 9,
      demoSeedKey: "demo-fatima-youth-reintegration",
      explanation:
        "This PeaceBond supports return from armed group involvement through accountability testimony, supervised service, youth mentoring, and community witnessing.",
      fighterName: "Samuel Ochieng",
      grantAmount: 80,
      grantPurpose: "Reintegration support for carpentry tools and youth mentoring transport.",
      harmDescription:
        "Samuel returned after militia involvement and wants to rebuild trust with youth leaders and families affected by recruitment pressure.",
      nationality: "Ugandan",
      phoneNumber: "+256 770 430 119",
      repairActions: [
        "Give formal accountability testimony before mediators, elders, and youth safety representatives.",
        "Complete an extended supervised service plan repairing the community youth hall.",
        "Mentor at-risk youth toward nonviolent choices with weekly mediator oversight.",
      ],
      ritual:
        "A community witnessing circle where testimony is heard and a peaceful youth mentoring role is affirmed.",
      severity: "high",
      staffRecommendation:
        "PeaceBond staff recommend continued reintegration support, youth mentoring supervision, and inclusion in nonviolent livelihood training.",
      staffSummary:
        "Samuel completed the full restorative pathway, including accountability testimony, supervised repair of the youth hall, and three youth mentoring sessions with mediator oversight.",
    }),
  },
  {
    staffEmail: "fatima@peacebond.org",
    caseData: buildPeaceBondCase({
      category: "destruction_property",
      communityType: "Urban settlement",
      completedActions: [true, true, false],
      demoSeedKey: "demo-fatima-property-repair",
      explanation:
        "This PeaceBond turns property damage into practical repair, peer accountability, and a visible commitment to peaceful neighborhood return.",
      fighterName: "Mariam Aluel",
      grantAmount: 47,
      grantPurpose: "Support for paint, replacement boards, and supervised repair transport.",
      harmDescription:
        "Mariam broke a kiosk door during a youth group confrontation. The owner requested repair labor and a mediated safety commitment before full return.",
      nationality: "South Sudanese",
      phoneNumber: "+211 922 640 511",
      repairActions: [
        "Join the kiosk owner and mediator to agree on a practical repair schedule.",
        "Complete supervised repair labor until the kiosk door is safe and usable.",
        "Attend a neighborhood check-in where the repaired kiosk and future safety commitments are acknowledged.",
      ],
      ritual:
        "A rebuilding acknowledgment where neighbors witness the repaired kiosk and the safety commitment.",
      severity: "moderate",
    }),
  },
];

async function seedStaffUsers() {
  const results = [];
  const staffByEmail = {};

  for (const staffUser of demoStaffUsers) {
    const existingStaffUser = await StaffUser.findOne({ email: staffUser.email });

    if (existingStaffUser) {
      existingStaffUser.set({
        communityFocus: staffUser.communityFocus,
        role: staffUser.role,
        title: staffUser.title,
      });
      await existingStaffUser.save();
      staffByEmail[staffUser.email] = existingStaffUser;
      results.push({ email: staffUser.email, status: "updated" });
      continue;
    }

    const createdStaffUser = await StaffUser.create(staffUser);
    staffByEmail[staffUser.email] = createdStaffUser;
    results.push({ email: staffUser.email, status: "created" });
  }

  return { results, staffByEmail };
}

async function seedPeaceBondCases(staffByEmail) {
  const results = [];

  for (const demoCase of demoPeaceBondCases) {
    const staffUser = staffByEmail[demoCase.staffEmail];

    if (!staffUser) {
      results.push({
        key: demoCase.caseData.demoSeedKey,
        status: "skipped - staff not found",
      });
      continue;
    }

    const existingCase = await PeaceBond.findOne({
      demoSeedKey: demoCase.caseData.demoSeedKey,
    });

    if (existingCase) {
      results.push({ key: demoCase.caseData.demoSeedKey, status: "already exists" });
      continue;
    }

    await PeaceBond.create({
      ...demoCase.caseData,
      createdBy: staffUser._id,
    });

    results.push({ key: demoCase.caseData.demoSeedKey, status: "created" });
  }

  return results;
}

async function seedDemoData() {
  const { results: staffResults, staffByEmail } = await seedStaffUsers();
  const caseResults = await seedPeaceBondCases(staffByEmail);

  return {
    cases: caseResults,
    staff: staffResults,
  };
}

async function runSeed() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is required to seed demo data.");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  const results = await seedDemoData();

  results.staff.forEach((result) => {
    console.log(`staff ${result.email}: ${result.status}`);
  });
  results.cases.forEach((result) => {
    console.log(`case ${result.key}: ${result.status}`);
  });

  await mongoose.disconnect();
}

if (require.main === module) {
  runSeed()
    .then(() => {
      console.log("Demo data seed complete.");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Demo data seed failed:", error.message);
      process.exit(1);
    });
}

module.exports = {
  demoPeaceBondCases,
  demoStaffUsers,
  seedDemoData,
  seedPeaceBondCases,
  seedStaffUsers,
};
