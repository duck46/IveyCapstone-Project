import { useState } from 'react'
import RuleSubmissionForm from './components/RuleSubmissionForm'
import ComplianceDashboard from './components/ComplianceDashboard'
import AssessmentPanel from './components/AssessmentPanel'
import DecisionWorkflow from './components/DecisionWorkflow'
import ChatbotPanel from './components/ChatbotPanel'

const VIEWS = {
  SUBMIT: 'submit',
  REVIEW: 'review',
}

export default function App() {
  const [view, setView] = useState(VIEWS.SUBMIT)
  const [entries, setEntries] = useState([])
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [chatOpen, setChatOpen] = useState(false)

  const handleSubmit = async (formData) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Evaluation failed')

      const newEntry = {
        id: Date.now().toString(),
        assessment: data,
        decision: null,
        submittedAt: new Date().toISOString(),
      }
      setEntries((prev) => [...prev, newEntry])
      setSelectedEntry(newEntry)
      setView(VIEWS.REVIEW)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDecision = (decisionData) => {
    setEntries((prev) =>
      prev.map((e) =>
        e.id === selectedEntry?.id ? { ...e, decision: decisionData } : e
      )
    )
    setSelectedEntry((prev) => (prev ? { ...prev, decision: decisionData } : prev))
  }

  const handleSelectEntry = (entry) => {
    setSelectedEntry(entry)
    setView(VIEWS.REVIEW)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top navbar */}
      <header className="bg-fsra-green text-white shadow-md shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-fsra-gold rounded flex items-center justify-center">
              <svg className="w-5 h-5 text-fsra-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight">Underwriting Rule Assessment</h1>
              <p className="text-green-200 text-xs">FSRA Regulatory Evaluation Tool</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs text-green-200 bg-fsra-green-light px-2 py-1 rounded">
              For Academic Use Only
            </span>
            <button
              onClick={() => setChatOpen(true)}
              className="flex items-center gap-1.5 bg-fsra-gold text-fsra-green font-semibold text-sm px-3 py-1.5 rounded-md hover:bg-fsra-gold-light transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Ask Regulatory Assistant
            </button>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex gap-6">
        {/* Left sidebar: dashboard */}
        <aside className="w-72 shrink-0 hidden lg:flex flex-col">
          <ComplianceDashboard
            entries={entries}
            selectedEntry={selectedEntry}
            onSelect={handleSelectEntry}
            onNewRule={() => setView(VIEWS.SUBMIT)}
          />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {view === VIEWS.SUBMIT ? (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">Submit Rule for Evaluation</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Enter a proposed underwriting decline rule to receive an AI-assisted regulatory assessment
                  across all four evaluation levels.
                </p>
              </div>

              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
                  <span className="font-semibold">Error: </span>{error}
                </div>
              )}

              <div className="card">
                <RuleSubmissionForm onSubmit={handleSubmit} isLoading={isLoading} />
              </div>

              {entries.length > 0 && (
                <div className="mt-4 lg:hidden">
                  <button onClick={() => setView(VIEWS.REVIEW)} className="btn-secondary w-full">
                    View {entries.length} evaluated rule{entries.length > 1 ? 's' : ''}
                  </button>
                </div>
              )}

              {/* Info panel */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="card bg-fsra-green-muted border-fsra-green/20">
                  <h3 className="font-semibold text-fsra-green mb-2 text-sm">IN SCOPE</h3>
                  <p className="text-sm text-gray-700">
                    Underwriting <strong>decline</strong> rules — the insurer's right to decline to offer an
                    auto insurance policy to a consumer.
                  </p>
                </div>
                <div className="card bg-red-50 border-red-200">
                  <h3 className="font-semibold text-red-700 mb-2 text-sm">OUT OF SCOPE</h3>
                  <p className="text-sm text-gray-700">
                    Underwriting <strong>eligibility</strong> rules — criteria to be eligible for optional
                    coverages or coverage limits.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setView(VIEWS.SUBMIT)}
                  className="text-fsra-green hover:text-fsra-green-light text-sm flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  New Rule
                </button>
                <span className="text-gray-300">|</span>
                <h2 className="text-xl font-bold text-gray-900">Assessment Results</h2>
              </div>

              {selectedEntry ? (
                <div className="space-y-6">
                  <AssessmentPanel assessment={selectedEntry.assessment} />
                  <DecisionWorkflow
                    key={selectedEntry.id}
                    assessment={selectedEntry.assessment}
                    onDecision={handleDecision}
                  />
                </div>
              ) : (
                <div className="card text-center py-12">
                  <p className="text-gray-500">Select a rule from the dashboard to view its assessment.</p>
                </div>
              )}

              {/* Mobile dashboard */}
              <div className="mt-6 lg:hidden card">
                <h3 className="font-semibold text-gray-900 mb-3">All Submissions</h3>
                <ComplianceDashboard
                  entries={entries}
                  selectedEntry={selectedEntry}
                  onSelect={handleSelectEntry}
                  onNewRule={() => setView(VIEWS.SUBMIT)}
                />
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Chatbot panel */}
      <ChatbotPanel isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      {/* Chat overlay backdrop */}
      {chatOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 sm:hidden"
          onClick={() => setChatOpen(false)}
        />
      )}
    </div>
  )
}
