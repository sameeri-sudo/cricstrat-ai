import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navigation Bar */}
      <header className="bg-emerald-600 text-white p-4 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black tracking-tight">CricStrat AI</h1>
            <p className="text-sm font-medium opacity-80">Nasarpur Strikers & Local League Hub</p>
          </div>
          <button className="bg-white text-emerald-700 px-4 py-2 rounded-md font-bold text-sm shadow hover:bg-slate-100 transition">
            New Match
          </button>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="max-w-4xl mx-auto p-4 sm:p-6 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Roster */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold mb-2">Team Roster</h2>
            <p className="text-slate-600 text-sm mb-4">Manage players, roles, and availability.</p>
            <button className="w-full bg-slate-100 text-slate-700 py-2 rounded font-semibold hover:bg-slate-200 transition">
              View Squad
            </button>
          </div>

          {/* Card 2: AI Lineup Generator */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold mb-2">AI Lineup Strategist</h2>
            <p className="text-slate-600 text-sm mb-4">Generate the optimal playing XI.</p>
            <button className="w-full bg-emerald-600 text-white py-2 rounded font-semibold hover:bg-emerald-700 transition">
              Ask AI
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;