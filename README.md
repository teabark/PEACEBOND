# PeaceBond

PeaceBond is a PeaceTech proof-of-concept for guiding former fighters through
restorative reintegration. Staff mediators can create a PeaceBond case, generate
three repair actions from rule-based templates, track completion, release a mock
reintegration grant, and download a completion certificate.

## Demo Flow

1. Start the backend and frontend.
2. Log in with a seeded demo staff account.
3. Create a PeaceBond with rehabilitatee details, community type, skills,
   severity, and harm description.
4. Open the repair workspace from Active Cases.
5. Mark all three repair actions complete.
6. Confirm the mock grant release notice appears.
7. Download the PDF certificate.

## Demo Staff Accounts

- Alice Kamau, Livestock and Land Repair Mediator: `alice@peacebond.org` / `123456`
- John Mwangi, Fishing Livelihoods Mediator: `john@peacebond.org` / `123456`
- Fatima Noor, Youth Reintegration and Anti-Recruitment Mediator: `fatima@peacebond.org` / `123456`

The backend seeds these demo mediators and realistic assigned PeaceBond cases
after MongoDB connects. Run `npm run seed:demo` from `server/` to seed manually.

## Run Locally

Backend:

```bash
cd server
npm install
npm run dev
```

Frontend:

```bash
cd client
npm install
npm run dev
```

The frontend uses `VITE_API_URL` when present, otherwise it calls
`http://localhost:5000/api`.

## PeaceBond Logic

Generation is rule-based only. Harm descriptions are matched against keyword
templates for theft or livestock harm, militia or armed activity, violence,
destruction, verbal threats, land disputes, or a general community repair path.
Severity adjusts the mock grant amount without using external AI services.
