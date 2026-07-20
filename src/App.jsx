import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

function App() {
  // Existing Squad Data
  const [roster, setRoster] = useState([
    { id: 1, name: 'Basit Meer', role: 'Batsman' },
    { id: 2, name: 'Hussain Mughal', role: 'Batting Allrounder' },
    { id: 3, name: 'Haji Akbar', role: 'Batting Allrounder' },
    { id: 4, name: 'Basit Abbasi', role: 'Batsman' },
    { id: 5, name: 'Ghazanfar Ali', role: 'Batsman' },
    { id: 6, name: 'Kolfi Waro', role: 'Batsman' },
    { id: 7, name: 'Azzizullah', role: 'Bowling Allrounder' },
  ]);

  // AI Feature State
  const [opponentName, setOpponentName] = useState("");
  const [pitchCondition, setPitchCondition] = useState("Flat Pitch");
  const [aiStrategy, setAiStrategy] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  // AI Generation Function
  const generateMatchStrategy = async () => {
    if (!opponentName) {
      alert("Please enter an opponent team name first!");
      return;
    }
    
    setIsAiLoading(true);
    try {
      // Connects securely using your hidden API Key
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

      const prompt = `You are an expert Tape Ball Cricket Coach and Strategist. 
      Analyze the following match details and provide a sharp, aggressive, and highly actionable pre-match strategy for our squad. 
      Keep the advice focused on tape ball tactics (e.g., bowling tight yorkers, clearing boundaries, running fast, handling the modified tape ball weight).
      Format your response with clear headings or bullet points. Keep it under 150 words.
      
      Opponent Team: ${opponentName}. Pitch Condition: ${pitchCondition}.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setAiStrategy(response.text());
    } catch (error) {
      console.error("AI Error:", error);
      setAiStrategy("Failed to generate strategy. Please check your API key connection.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-400">CricStrat AI</h1>
          <p className="text-sm text-slate-400">Live Team Roster & Analytics Portal</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 p-4 rounded-lg shadow-md border border-slate-700">
            <h3 className="text-xs font-semibold text-slate-400 mb-1">TOTAL MATCHES</h3>
            <p className="text-2xl font-bold text-white">2</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-lg shadow-md border border-slate-700">
            <h3 className="text-xs font-semibold text-slate-400 mb-1">WIN RATE</h3>
            <p className="text-2xl font-bold text-emerald-400">100%</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-lg shadow-md border border-slate-700">
            <h3 className="text-xs font-semibold text-slate-400 mb-1">HIGHEST SCORE</h3>
            <p className="text-2xl font-bold text-blue-400">180</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-lg shadow-md border border-slate-700">
            <h3 className="text-xs font-semibold text-slate-400 mb-1">ACTIVE ROSTER</h3>
            <p className="text-2xl font-bold text-yellow-500">12</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left Column (Forms & AI) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            
            {/* Add Player Form */}
            <div className="bg-slate-800 p-5 rounded-lg shadow-md border border-slate-700">
              <h2 className="text-lg font-bold mb-4 text-white">Add Team Member</h2>
              <div className="mb-3">
                <label className="block text-xs font-semibold mb-1 text-slate-400">PLAYER NAME</label>
                <input type="text" placeholder="e.g., Mohammad Rizwan" className="w-full p-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500" />
              </div>
              <div className="mb-4">
                <label className="block text-xs font-semibold mb-1 text-slate-400">ROLE / POSITION</label>
                <select className="w-full p-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500">
                  <option>Batsman</option>
                  <option>Bowling Allrounder</option>
                  <option>Batting Allrounder</option>
                  <option>Bowler</option>
                </select>
              </div>
              <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold py-2 rounded transition-colors">
                Add to Squad
              </button>
            </div>

            {/* AI Match Strategist Panel */}
            <div className="bg-slate-800 p-5 rounded-lg shadow-md border border-emerald-500/30 relative overflow-hidden">
              {/* Subtle AI Glow effect */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl"></div>
              
              <h2 className="text-lg font-bold mb-2 text-emerald-400 relative z-10">🤖 AI Match Strategist</h2>
              <p className="text-xs text-slate-400 mb-4 relative z-10">Generate custom tape-ball game plans.</p>
              
              <div className="mb-3 relative z-10">
                <label className="block text-xs font-semibold mb-1 text-slate-400">OPPONENT TEAM</label>
                <input 
                  type="text" 
                  placeholder="e.g., Star Cricket Club" 
                  className="w-full p-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  value={opponentName}
                  onChange={(e) => setOpponentName(e.target.value)}
                />
              </div>
              
              <div className="mb-4 relative z-10">
                <label className="block text-xs font-semibold mb-1 text-slate-400">PITCH CONDITION</label>
                <select 
                  className="w-full p-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  value={pitchCondition}
                  onChange={(e) => setPitchCondition(e.target.value)}
                >
                  <option value="Flat Pitch">Flat Pitch (High Scoring)</option>
                  <option value="Dusty/Rough">Dusty/Rough (Spin/Cutters)</option>
                  <option value="Short Boundaries">Short Boundaries</option>
                </select>
              </div>

              <button 
                onClick={generateMatchStrategy}
                disabled={isAiLoading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold py-2 rounded transition-colors disabled:opacity-50 relative z-10"
              >
                {isAiLoading ? "Analyzing..." : "Generate Game Plan"}
              </button>

              {aiStrategy && (
                <div className="mt-4 p-3 bg-slate-900 border border-emerald-500/30 rounded text-sm whitespace-pre-line text-slate-300 relative z-10">
                  <strong className="block text-emerald-400 mb-2">📋 Coach's Plan:</strong>
                  {aiStrategy}
                </div>
              )}
            </div>

          </div>

          {/* Right Column (Roster Table) */}
          <div className="md:col-span-8">
            <div className="bg-slate-800 rounded-lg shadow-md border border-slate-700 overflow-hidden">
              <div className="p-4 border-b border-slate-700 bg-slate-800/50">
                <h2 className="text-lg font-bold text-white">Squad Roster (12)</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-max">
                  <thead>
                    <tr className="bg-slate-900/80 text-slate-400 text-xs uppercase">
                      <th className="p-4 font-semibold">No.</th>
                      <th className="p-4 font-semibold">Player Name</th>
                      <th className="p-4 font-semibold">Role / Position</th>
                      <th className="p-4 font-semibold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {roster.map((player) => (
                      <tr key={player.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                        <td className="p-4 text-slate-400">{player.id}</td>
                        <td className="p-4 font-medium text-slate-200">{player.name}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs border ${
                            player.role === 'Batsman' ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' :
                            player.role === 'Batting Allrounder' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10' :
                            'border-purple-500/30 text-purple-400 bg-purple-500/10'
                          }`}>
                            {player.role}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <button className="text-slate-500 hover:text-red-400 transition-colors" title="Remove Player">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;