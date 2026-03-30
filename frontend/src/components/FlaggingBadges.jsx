export function StatusBadge({ status }) {
  const map = {
    PASS: 'badge-pass',
    FLAG: 'badge-flag',
    FAIL: 'badge-fail',
  }
  const icons = { PASS: '✓', FLAG: '⚠', FAIL: '✗' }
  return (
    <span className={map[status] || 'badge-flag'}>
      {icons[status]} {status}
    </span>
  )
}

export function RecommendationBadge({ recommendation }) {
  const map = {
    APPROVE: 'badge-approve',
    FLAG_FOR_REVIEW: 'badge-review',
    DECLINE: 'badge-decline',
  }
  const icons = { APPROVE: '✓', FLAG_FOR_REVIEW: '⚠', DECLINE: '✗' }
  const labels = { APPROVE: 'Approve', FLAG_FOR_REVIEW: 'Flag for Review', DECLINE: 'Decline' }
  return (
    <span className={map[recommendation] || 'badge-review'}>
      {icons[recommendation]} {labels[recommendation] || recommendation}
    </span>
  )
}

export function RejectionReasonTag({ reason }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700 border border-red-200 mr-1 mb-1">
      {reason}
    </span>
  )
}

export function ScoreBar({ score, dark = false }) {
  const color =
    score >= 80 ? 'bg-green-400' : score >= 60 ? 'bg-yellow-400' : score >= 40 ? 'bg-orange-400' : 'bg-red-400'
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1.5">
        <span className={dark ? 'text-green-200' : 'text-gray-600'}>Compliance Score</span>
        <span className={`font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>{Math.round(score)}/100</span>
      </div>
      <div className={`w-full rounded-full h-3 ${dark ? 'bg-green-900' : 'bg-gray-200'}`}>
        <div
          className={`${color} h-3 rounded-full transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}
