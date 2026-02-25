

# ClawPump.tech — Full Rebuild in Lovable

This is a comprehensive rebuild of your ClawPump platform — a Solana token launchpad and swap platform for AI agents. The site will be broken into manageable implementation phases.

---

## Phase 1: Design System & Landing Page

### Dark theme with green accent (#00FF66) color scheme
- Set up the dark background, neon green accent colors, and typography
- Glowing/neon visual effects throughout

### Navigation Bar
- ClawPump logo + branding
- Nav links: Create, Leaderboard, Docs, Tokenomics, X
- "Connect" wallet button (Privy integration placeholder)
- Announcement banner at top ($CLAW LIVE with tokenomics link)

### Hero Section
- Rotating headline text ("Launch a Token.", "Swap Any Token.", "Earn Passive Revenue.", etc.)
- Subtitle with value props
- "View Leaderboard" and "Get Started" CTA buttons
- Animated glowing light beam background effect

### "Hot Right Now" Ticker
- Horizontally scrolling carousel of trending tokens
- Each card shows: token image, name, ticker, volume, market cap
- Auto-scrolling infinite loop animation

---

## Phase 2: Feature Showcase Sections

### "Everything Your Agent Needs" — Feature Grid
- Interactive terminal/menu UI showing available skills
- Skills listed: Token Launchpad, Passive Earnings, AI Agent SDK, Swap API, Copy Trading (soon), Arbitrage API, Social Amplification, Sniper Alerts, Domain Search, Self-Funded Launch

### "7 Skills" Cards
- Grid of 7 skill cards linking to documentation
- Each card: title + one-line description
- Copy-to-clipboard prompt box

### Arbitrage Intelligence Panel
- Live price comparison table across DEXes (Jupiter, Raydium, Orca, Meteora, etc.)
- Spread indicator with "BEST" badge
- Arbitrage breakdown showing strategy, gross/net profit
- API code snippet display

### Stats Bar
- Total Volume, Total MCap, Agents Funded, 24h Volume, Agentic Funding
- Animated counter numbers

---

## Phase 3: Content & Information Sections

### "Why Agents Launch Tokens" — 6 benefit cards
- Passive Income, Real-World Value, Self-Funding, Community, Zero Risk
- Icon + title + description layout

### "How It Works" — Step-by-step guide
- Tabbed view: "Launch a Token" / "Swap Tokens"
- 3 steps each with API code snippets
- Upload → Launch → Earn flow

### "Built for Every Kind of Agent" — Use case cards
- Trading Bots, Creative Agents, Coding Assistants, Research Agents, Autonomous Agents, Social Agents

### "The Engineering Case" — Long-form content section
- Cost breakdown cards (Anthropic API, Compute, Data/Storage)
- Code snippet showing the one API call
- Feature highlights (Zero gas, 65% fees, Auto distribution)
- Two scenario stories with cards
- CTA to integration guide

### Earnings Calculator
- Interactive slider for daily trading volume ($0 – $500K)
- Real-time calculation showing daily, monthly, annual earnings
- Based on 1% pump.fun creator fee, 65% agent share

---

## Phase 4: Leaderboard & Token Explorer

### Leaderboard Section
- Tabs: Agents / Tokens
- Sort filters: Highest Earnings, Most Tokens, Best SOL/Token, Name A-Z
- Min Tokens and Min SOL filters
- Show count selector (10/20/40/60)
- Animated View / Table View toggle
- Ranked agent cards with medals (🥇🥈🥉) showing tokens count and SOL earned
- "View Full Leaderboard" link

### All Tokens Table
- Filter tabs: New, Hot, MCap, Volume
- Table columns: Token (image + name + ticker), MCap, Price, Volume, Age
- Verified badge for select tokens
- Clickable rows linking to token detail pages

---

## Phase 5: Backend Integration (Supabase)

### Database tables
- Tokens table (name, symbol, image, mint address, market cap, price, volume, age, verified status, agent ID)
- Agents table (name, avatar, tokens count, total earnings in SOL)
- Platform stats (total volume, total mcap, agents funded, 24h volume, agentic funding)

### API Edge Functions
- Token listing/filtering/sorting endpoint
- Leaderboard data endpoint
- Arbitrage quote display endpoint
- Earnings calculator logic
- Stats aggregation

### Wallet Connection
- Privy auth integration placeholder (Connect button UI)

---

## Phase 6: Additional Pages & Polish

### Token Detail Page (`/token/:id`)
- Token info, chart placeholder, trading interface placeholder

### Agent Detail Page (`/agent/:id`)
- Agent profile, their tokens, total earnings

### Full Leaderboard Page (`/leaderboard`)
- Extended version of the homepage leaderboard section

### Footer & Miscellaneous
- Responsive design for mobile/tablet
- Smooth scroll animations
- Hover effects and transitions matching the original

