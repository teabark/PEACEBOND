# AGENTS.md — PeaceBond

## 1. Project Goal
Build PeaceBond, a PeaceTech web application that helps communities reintegrate former fighters through restorative justice.

The app generates structured PeaceBonds containing:
- 3 repair actions
- a community ritual
- a mock micro-grant
- a completion certificate

This is a hackathon MVP for the Andela X OpenAI Codex competition.

---

## 2. Core Principle
PeaceBond is not a technical product first — it is a human-centered peacebuilding tool.

All outputs must prioritize:
- dignity over punishment
- reconciliation over enforcement
- simplicity over complexity
- emotional clarity over technical depth

---

## 3. Tech Stack
Frontend:
- React app
- Tailwind CSS
- Axios
- React Router DOM
- jsPDF

Backend:
- Node.js (LTS)
- Express
- MongoDB (Mongoose)

No authentication required.

---

## 4. Architecture Rules
- Keep frontend and backend fully separated
- Use REST API only
- No external AI APIs
- Use rule-based template system for PeaceBond generation
- Do NOT introduce unnecessary services or layers

---

## 5. Core Application Flow
The system must support this full user journey:

1. User enters harm description
2. System generates PeaceBond:
   - repair actions
   - ritual
   - grant amount
3. User tracks completion via checkboxes
4. Progress reaches 100%
5. Mock “grant release” notification appears
6. PDF certificate is generated and downloaded

---

## 6. PeaceBond Logic Rules
All PeaceBonds must be generated using keyword-based templates:

- theft / livestock → restitution + rebuilding
- militia / armed → testimony + mentoring
- violence / fight → apology + peace circles
- destruction → repair + labor
- verbal threats → apology + mediation
- land disputes → boundary mediation + dialogue

No AI or external inference systems should be used.

---

## 7. UI Guidelines
- Warm earth-tone palette
- Mobile-first design
- Soft shadows and rounded cards
- Human-centered language
- Calm, respectful visual tone

Avoid:
- corporate dashboards
- aggressive UI styling
- overly complex layouts

---

## 8. Backend Rules
- Use simple Express controllers
- Keep API minimal:
  /api/peacebonds CRUD endpoints
- Store only essential fields
- Validate minimal inputs only

---

## 9. Frontend Rules
- Functional React components only
- Keep components small and reusable
- Use Tailwind for all styling
- Axios for API calls
- Maintain clear separation of:
  - pages
  - components
  - utils

---

## 10. Development Constraints
- No overengineering
- No unnecessary abstractions
- No authentication system
- No real payment integration
- No external AI APIs
- Must work as a demo offline after initial load

---

## 11. Testing & Debugging
- Prefer simplicity over formal testing frameworks
- If issues arise:
  - fix directly
  - do not refactor unrelated code
- Ensure end-to-end demo flow always works

---

## 12. When a Task is Completed
Every response must:
1. Explain what was built
2. List modified files
3. Confirm demo impact
4. Suggest next step

Do NOT expand scope unless requested.

---

## 13. Success Criteria
The project is successful if a user can:
- generate a PeaceBond
- complete repair actions
- reach 100% progress
- receive a certificate
- understand the story of reintegration clearly