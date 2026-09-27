# TradeLink B2B Marketplace

A comprehensive industrial B2B marketplace platform with both prototype and production systems.

## Repository Structure

```
LST-COM/
├── /prototype          ← Interactive React prototype (deployed to GitHub Pages)
│   ├── src/           ← React components and pages
│   ├── vite.config.ts ← Build configuration
│   ├── package.json   ← Prototype dependencies
│   └── README.md      ← Prototype documentation
├── /backend           ← Real production API (Node/Express or other)
├── /web               ← Real production frontend
└── ci/                ← Shared GitHub Actions workflows
```

## Prototype (Demo)

The prototype is a **fully interactive React application** demonstrating the complete marketplace workflow:
- **Buyer Portal** — Create RFQs, browse marketplace, manage quotes
- **Seller Portal** — View RFQs, submit quotes, manage products
- **Admin Console** — Manage platform, view transactions, activity feed

**Live Demo:** https://cxsmtp.github.io/LST-COM/

**Setup & Details:** See `/prototype/README.md` and `/prototype/DEMO_GUIDE.md`

## Production System

The real system is being built in parallel with separate backend, database, and authentication.

### Getting Started

**Prototype development:**
```bash
cd prototype
npm install
npm run dev      # Start dev server on http://localhost:5173
npm run build    # Build for production
npm run preview  # Preview production build
```

**Deploying prototype to GitHub Pages:**
```bash
cd prototype
npm run build
cd ..
git subtree push --prefix prototype/dist origin gh-pages
```

## Technology Stack

**Prototype:**
- React 18 with TypeScript
- Tailwind CSS for styling
- Vite for build tooling
- Lucide React for icons

**Production (TBD):**
- Backend: [To be determined]
- Frontend: [To be determined]
- Database: [To be determined]
- Auth: [To be determined]

## Next Steps

1. Prototype remains live on GitHub Pages for business partner demos
2. Real production system development begins
3. Feature enhancements guided by user feedback
4. Migration plan from prototype to production system

---

For detailed prototype documentation, see `/prototype/README.md`.
