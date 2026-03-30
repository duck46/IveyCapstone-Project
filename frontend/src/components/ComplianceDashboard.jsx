import { RecommendationBadge, ScoreBar } from './FlaggingBadges'

function StatusDot({ recommendation, humanDecision }) {
  const effective = humanDecision || recommendation
  const colors = {
    APPROVE: 'bg-green-400',
    FLAG_FOR_REVIEW: 'bg-yellow-400',
    DECLINE: 'bg-red-400',
  }
  return <span className={`inline-block w-2.5 h-2.5 rounded-full ${colors[effective] || 'bg-gray-400'}`} />
}

function RuleCard({ entry, onSelect, isActive }) {
  const humanDecision = entry.decision?.decision
  const effectiveRec = humanDecision || entry.assessment.overall_recommendation

  return (
    <button
      onClick={() => onSelect(entry)}
      className={`w-full text-left p-4 rounded-lg border transition-all ${
        isActive
          ? 'border-fsra-green bg-fsra-green-muted shadow-sm'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start gap-3">
        <StatusDot recommendation={entry.assessment.overall_recommendation} humanDecision={humanDecision} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {entry.assessment.rule_text}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {entry.assessment.insurer_name || 'Unknown insurer'} • {new Date(entry.submittedAt).toLocaleTimeString()}
          </p>
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <RecommendationBadge recommendation={effectiveRec} />
            {humanDecision && humanDecision !== entry.assessment.overall_recommendation && (
              <span className="text-xs text-gray-500">(AI: <RecommendationBadge recommendation={entry.assessment.overall_recommendation} />)</span>
            )}
          </div>
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full ${
                    entry.assessment.overall_score >= 80 ? 'bg-green-500' :
                    entry.assessment.overall_score >= 60 ? 'bg-yellow-500' :
                    entry.assessment.overall_score >= 40 ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${entry.assessment.overall_score}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 shrink-0">{Math.round(entry.assessment.overall_score)}/100</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}

export default function ComplianceDashboard({ entries, selectedEntry, onSelect, onNewRule }) {
  const counts = {
    total: entries.length,
    approve: entries.filter(e => (e.decision?.decision || e.assessment.overall_recommendation) === 'APPROVE').length,
    review: entries.filter(e => (e.decision?.decision || e.assessment.overall_recommendation) === 'FLAG_FOR_REVIEW').length,
    decline: entries.filter(e => (e.decision?.decision || e.assessment.overall_recommendation) === 'DECLINE').length,
  }

  return (
    <div className="flex flex-col h-full">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-green-700">{counts.approve}</p>
          <p className="text-xs text-green-600">Approve</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-yellow-700">{counts.review}</p>
          <p className="text-xs text-yellow-600">Review</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-red-700">{counts.decline}</p>
          <p className="text-xs text-red-600">Decline</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-700">
          Submissions ({counts.total})
        </h2>
        <button onClick={onNewRule} className="text-xs btn-primary py-1 px-3">
          + New Rule
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
          <div className="w-12 h-12 bg-fsra-green-muted rounded-full flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-fsra-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-sm text-gray-500 mb-1">No rules evaluated yet</p>
          <p className="text-xs text-gray-400">Submit a rule to begin the assessment workflow</p>
        </div>
      ) : (
        <div className="space-y-2 overflow-y-auto flex-1">
          {[...entries].reverse().map((entry) => (
            <RuleCard
              key={entry.id}
              entry={entry}
              onSelect={onSelect}
              isActive={selectedEntry?.id === entry.id}
            />
          ))}
        </div>
      )}
    </div>
  )
}
