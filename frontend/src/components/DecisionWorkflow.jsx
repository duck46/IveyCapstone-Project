import { useState } from 'react'
import { RecommendationBadge } from './FlaggingBadges'

export default function DecisionWorkflow({ assessment, onDecision }) {
  const [decision, setDecision] = useState(null)
  const [notes, setNotes] = useState('')
  const [reviewerName, setReviewerName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!assessment) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!decision) return
    onDecision({ decision, notes, reviewer_name: reviewerName, rule_text: assessment.rule_text })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="card border-l-4 border-l-fsra-green">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-fsra-green-muted rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-fsra-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Decision Recorded</p>
            <p className="text-sm text-gray-600">
              Reviewer decision: <RecommendationBadge recommendation={decision} />
              {reviewerName && <span className="ml-2 text-gray-500">by {reviewerName}</span>}
            </p>
          </div>
        </div>
        {notes && (
          <div className="mt-3 bg-gray-50 rounded p-3 text-sm text-gray-700">
            <span className="font-medium">Notes: </span>{notes}
          </div>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-fsra-green rounded-full flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Human Reviewer Decision</h3>
          <p className="text-xs text-gray-500">Override or confirm the AI recommendation</p>
        </div>
      </div>

      <div className="mb-4 p-3 bg-gray-50 rounded border border-gray-200 text-sm">
        <span className="text-gray-600">AI Recommendation: </span>
        <RecommendationBadge recommendation={assessment.overall_recommendation} />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Decision <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-3 flex-wrap">
          {[
            { value: 'APPROVE', label: 'Approve', color: 'border-green-500 bg-green-50 text-green-800' },
            { value: 'FLAG_FOR_REVIEW', label: 'Request More Info', color: 'border-yellow-500 bg-yellow-50 text-yellow-800' },
            { value: 'DECLINE', label: 'Decline', color: 'border-red-500 bg-red-50 text-red-800' },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setDecision(opt.value)}
              className={`px-4 py-2 rounded-md border-2 text-sm font-medium transition-all ${
                decision === opt.value
                  ? opt.color + ' ring-2 ring-offset-1 ring-current'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400 bg-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reviewer Name <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fsra-green"
            placeholder="Your name"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Reviewer Notes <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fsra-green"
          placeholder="Add notes explaining your decision, any overrides, or requests for additional information..."
        />
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={!decision} className="btn-primary">
          Submit Decision
        </button>
      </div>
    </form>
  )
}
