# CAPSTONE_SPEC.md — PeaceBond

## 1. Project Name
PeaceBond — A Dignified Path Home

---

## 2. Problem Statement
In conflict-affected regions across Africa, former fighters who attempt to return to civilian life often face rejection, stigma, and lack of economic opportunity. Without structured reintegration pathways, many are pushed back into cycles of violence, while communities remain trapped in fear and mistrust.

Existing peacebuilding tools mainly focus on preventing conflict or documenting violence, but rarely address what happens after conflict ends: rebuilding trust, repairing harm, and restoring dignity.

---

## 3. Solution Overview
PeaceBond is a web-based PeaceTech application that creates structured, community-centered reintegration pathways for former fighters.

The system generates a “PeaceBond” — a restorative agreement that includes:
- 3 repair actions tied to the harm caused
- A community reconciliation ritual
- A small reintegration support grant (mocked in demo)
- A completion certificate

The goal is to transform conflict resolution into a visible, trackable, and dignified process of repair.

---

## 4. Core Idea
Instead of punishment or exclusion, PeaceBond focuses on:
- repair of harm
- accountability through action
- community-led reconciliation
- restoration of dignity

It reframes justice as a shared community process rather than a punitive system.

---

## 5. User Journey

### Step 1: Entry
A mediator, elder, or returning fighter opens the app and enters:
- Fighter name (optional)
- Description of harm (e.g. theft, violence, militia activity)
- Community type
- Optional skill (e.g. farming, carpentry)

---

### Step 2: PeaceBond Generation
The system generates:
- 3 repair actions based on keyword matching
- A community ritual (e.g. shared meal, handshake, planting a tree)
- A mock micro-grant amount ($20–$50)

---

### Step 3: Completion Tracking
The user tracks progress over time:
- checkboxes for each repair action
- progress bar updates dynamically
- progress is stored locally or in backend

---

### Step 4: Completion
When all actions are completed:
- system shows “PeaceBond Completed”
- mock micro-grant notification appears
- user can generate certificate

---

### Step 5: Certificate
A downloadable PDF certificate is generated using jsPDF:
- includes fighter name
- completed repair actions
- ritual description
- completion status
- community acknowledgment

---

## 6. Target Users
- Community elders
- Peace mediators
- NGOs working in conflict resolution
- Returning former fighters
- Local governance and reconciliation groups

---

## 7. Technical Architecture

### Frontend (React + Vite)
- Landing page
- Input form
- PeaceBond output display
- Progress tracker
- Certificate generator UI
- Completed PeaceBonds view

### Backend (Node.js + Express + MongoDB)
- REST API for PeaceBonds
- Storage of PeaceBond records
- Update progress and completion state

### Data Flow
1. User submits harm description
2. Backend generates PeaceBond using rule-based templates
3. Frontend displays result
4. User updates progress
5. Backend updates record
6. Certificate generated on completion

---

## 8. PeaceBond Generation Logic

PeaceBond generation is rule-based using keyword matching:

- theft / livestock → restitution + rebuilding + peace circles
- militia / armed → testimony + mentoring + reconciliation ritual
- fight / violence → apology + mediation + peace circle
- destruction → repair work + labor contribution
- verbal threats → apology + dialogue sessions
- land disputes → mediation + boundary resolution

No AI models or external APIs are used.

---

## 9. Design Principles

- Warm, human-centered UI
- Earth-tone color palette (brown, beige, green, orange)
- Mobile-first layout
- Soft cards and rounded UI elements
- Calm and respectful tone
- Avoid corporate or surveillance-like aesthetics

---

## 10. Constraints

- No authentication system
- No external AI APIs
- No real payment integration (mock grant only)
- No complex infrastructure or microservices
- Must remain a lightweight MVP
- Must work as a demo end-to-end

---

## 11. Impact Alignment (OSF Mission)

PeaceBond directly supports the mission of transformative peacebuilding by:

- Shifting focus from punishment to restoration
- Supporting community-led reconciliation processes
- Giving former fighters a structured path back into society
- Promoting dignity and reintegration over exclusion
- Reducing risk of re-recruitment into armed groups

It aligns with principles of:
- reparative justice
- local ownership of peace processes
- youth reintegration
- community healing

---

## 12. Demo Script (2 Minutes)

1. Open PeaceBond homepage
2. Enter:
   “Stole goats during militia raid”
3. Click “Generate PeaceBond”
4. Show generated:
   - 3 repair actions
   - ritual
   - grant amount
5. Tick completion boxes
6. Progress reaches 100%
7. Click “Release Grant” → mock notification appears
8. Download certificate PDF
9. Closing statement:
   “Peace is not the absence of war. It is the presence of repair.”

---

## 13. Limitations

- Micro-grant is simulated (no real financial system)
- Rule-based logic may not capture complex real-world cases
- No multilingual support in current version
- Requires smartphone or browser access

---

## 14. Future Improvements

- Integration with mobile money APIs (M-Pesa, Orange Money)
- Voice input for low-literacy users
- NGO dashboard for tracking reintegration cases
- Offline-first mobile app version

---

## 15. Summary

PeaceBond demonstrates how simple, structured digital tools can support post-conflict reintegration by combining:
- restorative justice principles
- community accountability
- and accessible technology

It is a proof-of-concept for how technology can support dignity-centered peacebuilding in real-world communities.