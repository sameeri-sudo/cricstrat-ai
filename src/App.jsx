import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

function App() {
  // Player States
  const [players, setPlayers] = useState([])
  const [loadingPlayers, setLoadingPlayers] = useState(true)
  const [newName, setNewName] = useState('')
  const [newRole, setNewRole] = useState('Batsman')
  const [submitting, setSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  // Match States
  const [matches, setMatches] = useState([])
  const [loadingMatches, setLoadingMatches] = useState(true)
  const [newOpponent, setNewOpponent] = useState('')
  const [newMatchDate, setNewMatchDate] = useState(new Date().toISOString().split('T')[0])
  const [newResult, setNewResult] = useState('Win')
  const [newRuns, setNewRuns] = useState('')
  const [submittingMatch, setSubmittingMatch] = useState(false)

  useEffect(() => {
    fetchPlayers()
    fetchMatches()
  }, [])

  async function fetchPlayers() {
    try {
      setLoadingPlayers(true)
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('id', { ascending: true })

      if (error) throw error
      if (data) setPlayers(data)
    } catch (error) {
      console.error('Error fetching players:', error.message)
    } finally {
      setLoadingPlayers(false)
    }
  }

  async function fetchMatches() {
    try {
      setLoadingMatches(true)
      const { data, error } = await supabase
        .from('matches')
        .select('*')
        .order('match_date', { ascending: false })

      if (error) throw error
      if (data) setMatches(data)
    } catch (error) {
      console.error('Error fetching matches:', error.message)
    } finally {
      setLoadingMatches(false)
    }
  }

  async function handleAddPlayer(e) {
    e.preventDefault()
    if (!newName.trim()) return

    try {
      setSubmitting(true)
      const { data, error } = await supabase
        .from('players')
        .insert([{ name: newName.trim(), role: newRole }])
        .select()

      if (error) throw error
      
      if (data) {
        setPlayers([...players, ...data])
        setNewName('')
      }
    } catch (error) {
      console.error('Error adding player:', error.message)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDeletePlayer(id) {
    const confirmDelete = window.confirm("Are you sure you want to remove this player from the squad?")
    if (!confirmDelete) return

    try {
      setDeletingId(id)
      const { error } = await supabase
        .from('players')
        .delete()
        .eq('id', id)

      if (error) throw error
      setPlayers(players.filter(player => player.id !== id))
    } catch (error) {
      console.error('Error deleting player:', error.message)
      alert('Failed to delete player.')
    } finally {
      setDeletingId(null)
    }
  }

  async function handleAddMatch(e) {
    e.preventDefault()
    if (!newOpponent.trim() || !newRuns) return

    try {
      setSubmittingMatch(true)
      const { data, error } = await supabase
        .from('matches')
        .insert([{ 
          opponent: newOpponent.trim(), 
          match_date: newMatchDate,
          result: newResult,
          runs_scored: parseInt(newRuns)
        }])
        .select()

      if (error) throw error
      
      if (data) {
        setMatches([data[0], ...matches])
        setNewOpponent('')
        setNewRuns('')
      }
    } catch (error) {
      console.error('Error adding match:', error.message)
    } finally {
      setSubmittingMatch(false)
    }
  }

  // --- DERIVED ANALYTICS ---
  const totalMatches = matches.length;
  const wins = matches.filter(m => m.result?.toLowerCase() === 'win' || m.result?.toLowerCase() === 'won').length;
  const winRate = totalMatches > 0 ? Math.round((wins / totalMatches) * 100) : 0;
  const highestScore = matches.length > 0 ? Math.max(...matches.map(m => m.runs_scored || 0)) : 0;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 font-sans">
      <header className="max-w-5xl mx-auto mb-8 border-b border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold text-emerald-400 tracking-tight">
          CricStrat AI
        </h1>
        <p className="text-slate-400 text-sm mt-1">Live Team Roster & Analytics Portal</p>
      </header>

      <main className="max-w-5xl mx-auto space-y-6">
        
        {/* --- NEW ANALYTICS DASHBOARD --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 border border-slate-700/50 rounded-xl p-4 shadow-lg">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Matches</p>
            <p className="text-3xl font-extrabold text-white">{totalMatches}</p>
          </div>
          <div className="bg-slate-800 border border-slate-700/50 rounded-xl p-4 shadow-lg">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Win Rate</p>
            <p className="text-3xl font-extrabold text-emerald-400">{winRate}%</p>
          </div>
          <div className="bg-slate-800 border border-slate-700/50 rounded-xl p-4 shadow-lg">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Highest Score</p>
            <p className="text-3xl font-extrabold text-sky-400">{highestScore}</p>
          </div>
          <div className="bg-slate-800 border border-slate-700/50 rounded-xl p-4 shadow-lg">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Active Roster</p>
            <p className="text-3xl font-extrabold text-amber-400">{players.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Management Panel Forms */}
          <div className="space-y-6">
            
            {/* Add Player Form */}
            <div className="bg-slate-800 rounded-xl border border-slate-700/50 shadow-xl p-6 h-fit">
              <h2 className="text-xl font-bold text-white mb-4">Add Team Member</h2>
              <form onSubmit={handleAddPlayer} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Player Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Mohammad Rizwan"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Role / Position
                  </label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                    disabled={submitting}
                  >
                    <option value="Batsman">Batsman</option>
                    <option value="Bowler">Bowler</option>
                    <option value="All-Rounder">All-Rounder</option>
                    <option value="Batting Allrounder">Batting Allrounder</option>
                    <option value="Bowling Allrounder">Bowling Allrounder</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-800 text-slate-950 font-bold py-2.5 px-4 rounded-lg text-sm transition-colors shadow-lg shadow-emerald-500/10"
                >
                  {submitting ? 'Registering...' : 'Add to Squad'}
                </button>
              </form>
            </div>

            {/* Add Match Form */}
            <div className="bg-slate-800 rounded-xl border border-slate-700/50 shadow-xl p-6 h-fit">
              <h2 className="text-xl font-bold text-white mb-4">Log Match Result</h2>
              <form onSubmit={handleAddMatch} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Opponent Team
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Star Cricket Club"
                    value={newOpponent}
                    onChange={(e) => setNewOpponent(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors text-sm"
                    disabled={submittingMatch}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newMatchDate}
                      onChange={(e) => setNewMatchDate(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-sky-500 transition-colors text-sm"
                      disabled={submittingMatch}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Runs Scored
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 140"
                      value={newRuns}
                      onChange={(e) => setNewRuns(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors text-sm"
                      disabled={submittingMatch}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Result
                  </label>
                  <select
                    value={newResult}
                    onChange={(e) => setNewResult(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-sky-500 transition-colors text-sm"
                    disabled={submittingMatch}
                  >
                    <option value="Win">Win</option>
                    <option value="Loss">Loss</option>
                    <option value="Tie">Tie / Draw</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={submittingMatch}
                  className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-800 text-slate-950 font-bold py-2.5 px-4 rounded-lg text-sm transition-colors shadow-lg shadow-sky-500/10"
                >
                  {submittingMatch ? 'Saving...' : 'Save Match'}
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: Tables */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Squad Roster Table */}
            <div className="bg-slate-800 rounded-xl border border-slate-700/50 shadow-xl overflow-hidden">
              <div className="px-6 py-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Squad Roster ({players.length})</h2>
                {loadingPlayers && <span className="text-xs text-emerald-400 animate-pulse">Syncing...</span>}
              </div>

              {loadingPlayers ? (
                <div className="p-12 text-center text-slate-400">Loading squad database...</div>
              ) : players.length === 0 ? (
                <div className="p-12 text-center text-slate-400">No players found in database.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900/50 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                        <th className="py-3 px-6 w-16">No.</th>
                        <th className="py-3 px-6">Player Name</th>
                        <th className="py-3 px-6">Role / Position</th>
                        <th className="py-3 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/40">
                      {players.map((player, index) => (
                        <tr key={player.id} className="hover:bg-slate-700/30 transition-colors">
                          <td className="py-4 px-6 font-mono text-slate-500 text-sm">{index + 1}</td>
                          <td className="py-4 px-6 font-semibold text-white">{player.name}</td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              player.role?.toLowerCase().includes('allrounder') || player.role?.toLowerCase().includes('all-rounder')
                                ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                                : player.role?.toLowerCase() === 'batsman'
                                ? 'bg-sky-400/10 text-sky-400 border border-sky-400/20'
                                : 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20'
                            }`}>
                              {player.role}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button
                              onClick={() => handleDeletePlayer(player.id)}
                              disabled={deletingId === player.id}
                              className="text-slate-500 hover:text-rose-400 transition-colors p-1 rounded-md hover:bg-rose-500/10 disabled:text-slate-700"
                              title="Remove Player"
                            >
                              {deletingId === player.id ? (
                                <span className="text-xs animate-pulse">...</span>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Match History Table */}
            <div className="bg-slate-800 rounded-xl border border-slate-700/50 shadow-xl overflow-hidden">
              <div className="px-6 py-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Match History</h2>
                {loadingMatches && <span className="text-xs text-emerald-400 animate-pulse">Syncing...</span>}
              </div>

              {loadingMatches ? (
                <div className="p-12 text-center text-slate-400">Loading match database...</div>
              ) : matches.length === 0 ? (
                <div className="p-12 text-center text-slate-400">No match records found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900/50 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                        <th className="py-3 px-6">Date</th>
                        <th className="py-3 px-6">Opponent</th>
                        <th className="py-3 px-6">Runs Scored</th>
                        <th className="py-3 px-6">Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/40">
                      {matches.map((match) => (
                        <tr key={match.id} className="hover:bg-slate-700/30 transition-colors">
                          <td className="py-4 px-6 text-sm text-slate-300">{match.match_date}</td>
                          <td className="py-4 px-6 font-semibold text-white">{match.opponent}</td>
                          <td className="py-4 px-6 text-slate-300 font-mono">{match.runs_scored}</td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              match.result?.toLowerCase() === 'win' || match.result?.toLowerCase() === 'won'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : match.result?.toLowerCase() === 'loss' || match.result?.toLowerCase() === 'lost'
                                ? 'bg-rose-500/20 text-rose-400'
                                : 'bg-slate-500/20 text-slate-300'
                            }`}>
                              {match.result}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

export default App