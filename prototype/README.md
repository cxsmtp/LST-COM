# TradeLink - B2B Industrial Marketplace Prototype

A high-fidelity, interactive React/TypeScript prototype for a B2B industrial marketplace connecting buyers with verified suppliers across steel, building materials, chemicals, and heavy equipment.

**Demo Status**: This is a fully functional prototype with sample data designed for live business partner demonstrations.

## Features

### Three Fully Connected Personas

#### 1. **Buyer Portal** 👤
- Dashboard showing KPIs: Active RFQs, Quotes Received, Open Orders, Procurement Value
- Marketplace discovery with category browsing
- RFQ management system with detailed RFQ view
- Quote comparison interface with supplier ratings and verification status
- Order tracking and history
- Company information management

#### 2. **Seller Portal** 🏢
- Dashboard showing marketplace opportunities and pipeline value
- RFQ and opportunity discovery filtered for relevant suppliers
- Quote submission and management interface
- Company profile with verification status, ratings, and marketplace activity
- Orders won tracking
- Real-time activity monitoring

#### 3. **Admin Console** 📊
- Marketplace overview with KPIs:
  - Registered Buyers, Verified Suppliers
  - Active RFQs, RFQ Value
  - Total Transactions, Marketplace GMV
  - Platform Revenue, Conversion Rate
- Buyer directory with complete listing
- Supplier directory with verification and activity metrics
- RFQ management interface
- Transaction detail view with full timeline
- Live activity feed showing all marketplace events

### Key Features

✅ **Persona Switcher** - Instant context switching in the header
✅ **Connected State** - Actions in one view are reflected in others
✅ **Realistic Data** - 20 buyers, 20 suppliers, 30 RFQs, 50+ quotes, 15 transactions
✅ **Landing Page** - Product vision, categories, business model, and roadmap
✅ **Modern Design** - Premium, clean UI inspired by Stripe/Linear/Amazon Business
✅ **Fully Responsive** - Works on desktop and tablet
✅ **Type-Safe** - Full TypeScript implementation
✅ **No Backend** - Complete client-side prototype

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` and the application will open in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Header.tsx       # Persona switcher and main navigation
│   ├── Card.tsx         # Card component for content sections
│   └── Button.tsx       # Reusable button component
├── pages/               # Main page views
│   ├── LandingPage.tsx  # Public landing page
│   ├── BuyerView.tsx    # Complete buyer portal
│   ├── SellerView.tsx   # Complete seller portal
│   └── AdminView.tsx    # Admin console
├── types.ts             # TypeScript interfaces
├── mockData.ts          # Sample data for all personas
├── App.tsx              # Main app component
├── main.tsx             # React entry point
└── index.css            # Global styles (Tailwind)
```

## Demo Scenario - The Connected Journey

This is the core demo that showcases how the three personas work together:

### Step 1: Buyer Creates RFQ
- Buyer "Alex Thomas" at "Gulf Infrastructure LLC" creates RFQ-10482
- Product: 250 MT Structural Steel ASTM A36
- Delivery: Dubai, UAE by October 15, 2026

### Step 2: Admin Sees New RFQ
- Switch to Admin Console
- See "New RFQ" in Activity Feed
- View RFQ-10482 in RFQ Management showing 12 matched suppliers

### Step 3: Seller Sees Opportunity
- Switch to Seller Portal
- "Emirates Steel" sees the new RFQ from Gulf Infrastructure
- Reviews specifications and buyer details

### Step 4: Seller Submits Quote
- Seller submits quote:
  - $720/MT for 250 MT
  - 5-day delivery
  - Freight included
  - Total: $180,000

### Step 5: Buyer Sees Quote
- Switch back to Buyer Portal
- View "Quotes Received" section
- Compare 4 supplier quotes:
  - Emirates Steel: $720/MT, 5-day delivery ⭐ (Best)
  - Gulf Structural: $705/MT, 8 days
  - Global Steel Trading: $735/MT, 4 days
  - Global Materials: $715/MT, 6 days

### Step 6: Buyer Accepts Quote
- Click "Accept Quote" on Emirates Steel's quote
- Quote status changes to "Accepted"

### Step 7: Admin Sees Transaction
- Switch to Admin Console
- View transaction in "Transactions" tab
- See status: "Quote Accepted"
- Transaction value: $180,000
- Timeline shows complete journey

## Marketplace Concept

### What is TradeLink?

TradeLink is a B2B industrial marketplace that connects procurement professionals with verified industrial suppliers.

**Categories**:
- 🏗️ Steel & Metals - Structural steel, reinforcement, alloys
- 🧱 Cement & Building Materials - Cement, aggregates, bricks
- ⚗️ Industrial Chemicals - Petrochemicals, specialty chemicals
- 🏭 Heavy Machinery & Equipment - Cranes, excavators, loaders

### Business Model

**Revenue Streams**:
1. **Supplier Subscriptions** - Premium listings and RFQ access
2. **Qualified RFQs** - Lead generation for specific opportunities
3. **Transaction Services** - Commission on matched deals (5% default)

**Future Services**:
- Payments and settlement processing
- Logistics partnerships
- Trade financing
- Insurance solutions
- Market intelligence

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library

## Sample Data

The application includes realistic sample data across all personas:

### Locations
Dubai, Abu Dhabi, Sharjah (UAE), Riyadh, Jeddah, Dammam (Saudi Arabia), Doha (Qatar), Muscat (Oman), Mumbai, Delhi (India), Singapore, Cairo, Alexandria (Egypt), Kuwait, Bahrain, Lebanon

### Companies

**Buyers** (20 total):
- Gulf Infrastructure LLC
- Emirates Construction
- Sharjah Industrial Works
- Saudi Development Corp
- Jeddah Steel Mills
- Qatar Industrial Group
- etc.

**Suppliers** (20 total):
- Emirates Steel Industries
- Global Steel Trading
- Saudi Cement Co
- SABIC Chemicals
- Dubai Heavy Equipment
- etc.

## Navigation Guide

### Buyer Portal
1. **Dashboard** - Overview of procurement activity
2. **Marketplace** - Browse categories and discover opportunities
3. **My RFQs** - Create and manage RFQs, view supplier responses
4. **Quotes** - Compare quotes from multiple suppliers
5. **Orders** - Track active orders and delivery status

### Seller Portal
1. **Dashboard** - Opportunities and pipeline metrics
2. **RFQs & Opportunities** - Browse and respond to buyer requirements
3. **My Quotes** - Manage submitted quotes and track status
4. **Products** - List and manage product categories
5. **Orders Won** - Track completed deals
6. **Company Profile** - Manage verification and company information

### Admin Console
1. **Overview** - Marketplace KPIs and high-level metrics
2. **Buyers** - Directory of all registered buyers
3. **Suppliers** - Directory of verified suppliers
4. **RFQs** - Manage active RFQs and matches
5. **Transactions** - View transaction details and timeline
6. **Activity Feed** - Real-time marketplace events

## Demonstration Tips

### For a 3-5 Minute Demo

1. **Start at Landing Page** (30 sec)
   - Show the value proposition and categories

2. **Enter Buyer Portal** (45 sec)
   - Walk through dashboard KPIs
   - Show the "Recent RFQs" section

3. **Switch to Seller Portal** (45 sec)
   - Show "New RFQs & Opportunities"
   - Point out how sellers find buyer requirements

4. **Switch to Admin Console** (90 sec)
   - Show marketplace overview KPIs
   - Show RFQ in the RFQ Management table
   - Switch to Transactions tab
   - Show activity feed at the bottom

5. **Walk Through the Demo Scenario** (60 sec)
   - Show how the three personas connect
   - Demonstrate the RFQ-Quote-Accept flow
   - Highlight the transaction visibility

### Key Points to Emphasize

- **Network Effect**: Platform value comes from buyer-seller matching
- **Transparency**: All parties see relevant transaction status
- **Verification**: Trust through business verification
- **Scalability**: Shows how marketplace operates at scale
- **Revenue Model**: Multiple ways to monetize the network

## Important Notes

⚠️ **Sample Data**: All data shown is demonstration/sample data

🔐 **Security**: This is a prototype - no real authentication or data protection

💾 **Persistence**: All data is stored in React state - refreshing the page resets data

🚀 **Future Features**: Shows "Today/Next/Future" roadmap sections

## Development

### Code Quality

- Full TypeScript implementation
- Component-based architecture
- Reusable UI components
- Clean separation of concerns
- Type-safe throughout

### Styling

- Tailwind CSS for responsive design
- Custom color palette (primary, accent, text colors)
- Consistent spacing and sizing
- Smooth transitions and hover states

### Performance

- Optimized build (~240KB JS, ~16KB CSS gzipped)
- Fast dev server with hot reload
- Minimal dependencies

## Customization

### Changing Sample Data

Edit `src/mockData.ts` to:
- Add/modify buyers, sellers, RFQs
- Change company names and locations
- Adjust pricing and quantities
- Modify categories

### Styling

Edit `tailwind.config.js` to:
- Change color scheme
- Adjust font family
- Modify spacing scale
- Add custom components

### Adding Features

The prototype is designed to be extensible. To add features:
1. Create new components in `src/components/`
2. Add new pages in `src/pages/`
3. Update types in `src/types.ts`
4. Extend mock data as needed

## License

This is a demonstration prototype created for business partner evaluation.

---

**Created for**: TRADELINK Business Partner Presentation
**Demo Status**: Production-ready prototype
**Last Updated**: September 2025
