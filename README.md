# 🏏 CricStrat AI 🤖
### Live Team Roster & Analytics Portal

A complete, working full-stack application built for local tape-ball cricket teams (like the Nasarpur Strikers) to manage squads, track matches, and utilize custom AI-driven match strategies.

---

## 🔗 Live Deployment & Code Links
* **Live Web Application URL:** [https://cricstrat-ai.vercel.app](https://cricstrat-ai.vercel.app)
* **Public GitHub Repository:** [https://github.com/sameeri-sudo/cricstrat-ai](https://github.com/sameeri-sudo/cricstrat-ai)

---

## 🎯 The Real-World Problem Solved
Managing amateur sports squads is typically unorganized. Team leads rely on scattered chats or paper logs to track player roles, active availability, and match records. Furthermore, captains lack analytical tools to synthesize upcoming pitch dynamics or opponents into structured tactics. 

**CricStrat AI** bridges this gap by offering an intuitive, central hub accessible via mobile or desktop to track active squad rosters, visualize high-level match history metrics, and instantly generate custom, tactical game plans right on the boundary line.

---

## ✨ Core Features
* **Dynamic Squad Roster Control:** Central layout showing active squad members alongside color-coded indicators highlighting their key playing roles.
* **Intelligent Form Control Interface:** Fast-input modal cards enabling administrators to append new active playing resources or instantly select criteria parameters for analysis.
* **On-Demand AI Coach Analysis:** An interactive custom-prompted strategy terminal embedded inside the main interface layout that analyzes pitch conditions and specific opponents.

---

## 🤖 The AI Feature & Prompt Engineering
The application integrates the active **Google Gemini 3.5 Flash** model via the `@google/generative-ai` SDK client directly inside the front-end interface layer. 

**The System Persona Prompt Inside the Code:**
\`\`\`javascript
const prompt = \`You are an expert Tape Ball Cricket Coach and Strategist. 
Analyze the following match details and provide a sharp, aggressive, and highly actionable pre-match strategy for our squad. 
Keep the advice focused on tape ball tactics (e.g., bowling tight yorkers, clearing boundaries, running fast, handling the modified tape ball weight).
Format your response with clear headings or bullet points. Keep it under 150 words.

Opponent Team: \${opponentName}. Pitch Condition: \${pitchCondition}.\`;
\`\`\`

---

## 🛠️ Tools, Services, & Models Used
* **Frontend Framework:** React.js (Vite)
* **Styling Engine:** Tailwind CSS 
* **Cloud Database Engine:** Supabase PostgreSQL Client
* **AI Processing Model:** Google Gemini 3.5 Flash
* **Hosting Platform:** Vercel Global Edge Network

---

## 🛠️ How to Setup and Run the Project Locally

Follow these straightforward steps to boot up the project files inside your local machine workspace environment:

### 1. Clone the Files
\`\`\`bash
git clone https://github.com/sameeri-sudo/cricstrat-ai.git
cd cricstrat-ai
\`\`\`

### 2. Set Up Environment Keys
Create a \`.env.local\` text document within the primary root architecture of your directory and insert your access tokens:
\`\`\`env
VITE_SUPABASE_URL=your_supabase_url_address
VITE_SUPABASE_ANON_KEY=your_supabase_public_api_key
VITE_GEMINI_API_KEY=your_google_studio_ai_key
\`\`\`

### 3. Install Module Packages & Boot Development Server
\`\`\`bash
npm install
npm run dev
\`\`\`
Open your internet browser to \`http://localhost:5173\` to see the localized platform running!