import { useState } from 'react'

const EXAMPLE_RULES = [
  'Deny insurance to anyone who has driven a red car in the past 5 years',
  '2 or more at-fault accidents in the preceding 3 years',
  'Deny insurance to any driver who has never had auto insurance before',
  '1 or more Criminal Code convictions in the preceding 3 years',
  'Deny insurance to anyone who has changed insurers more than twice in 10 years',
  'Any automobile used for commercial purposes',
  'Deny insurance to drivers who were accused of a crime but not convicted',
]

export default function RuleSubmissionForm({ onSubmit, isLoading }) {
  const [ruleText, setRuleText] = useState('')
  const [insurerName, setInsurerName] = useState('')
  const [rationale, setRationale] = useState('')
  const [actuarialData, setActuarialData] = useState(false)
  const [showExamples, setShowExamples] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!ruleText.trim()) return
    onSubmit({ rule_text: ruleText, insurer_name: insurerName || null, supporting_rationale: rationale || null, actuarial_data_provided: actuarialData })
  }

  const useExample = (example) => {
    setRuleText(example)
    setShowExamples(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700">
            Proposed Underwriting Decline Rule <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => setShowExamples(!showExamples)}
            className="flex items-center gap-1.5 text-xs font-medium bg-fsra-gold text-fsra-green px-3 py-1.5 rounded-full hover:brightness-95 transition-all shadow-sm"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {showExamples ? 'Hide examples' : 'Try an example'}
          </button>
        </div>

        {showExamples && (
          <div className="mb-2 border border-gray-200 rounded-md p-3 bg-gray-50 space-y-1">
            {EXAMPLE_RULES.map((ex, i) => (
              <button
                key={i}
                type="button"
                onClick={() => useExample(ex)}
                className="block w-full text-left text-xs text-gray-700 hover:text-fsra-green hover:bg-fsra-green-muted px-2 py-1.5 rounded transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        )}

        <textarea
          value={ruleText}
          onChange={(e) => setRuleText(e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fsra-green focus:border-transparent"
          placeholder="e.g. Deny insurance to any driver with 2 or more at-fault accidents in the preceding 3 years"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Insurer Name <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={insurerName}
            onChange={(e) => setInsurerName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fsra-green focus:border-transparent"
            placeholder="e.g. Ontario Mutual Insurance"
          />
        </div>

        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={actuarialData}
              onChange={(e) => setActuarialData(e.target.checked)}
              className="w-4 h-4 text-fsra-green border-gray-300 rounded focus:ring-fsra-green"
            />
            <span className="text-sm text-gray-700">Actuarial data provided by insurer</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Insurer's Supporting Rationale <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          value={rationale}
          onChange={(e) => setRationale(e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fsra-green focus:border-transparent"
          placeholder="Describe the insurer's stated justification for this rule..."
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400 italic">
          AI responses may take 15–30 seconds on the free tier.
        </p>
        <button type="submit" disabled={isLoading || !ruleText.trim()} className="btn-primary flex items-center gap-2">
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Evaluating...
            </>
          ) : (
            'Evaluate Rule'
          )}
        </button>
      </div>
    </form>
  )
}
