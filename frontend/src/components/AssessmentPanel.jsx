import { StatusBadge, RecommendationBadge, RejectionReasonTag, ScoreBar } from './FlaggingBadges'

const LEVEL_DESCRIPTIONS = {
  1: 'Checks compliance with Ontario legislation, Human Rights Code, Canadian Charter of Rights and Freedoms, and existing market rules.',
  2: 'Evaluates alignment with FSRA\'s 6 principles and fair consumer outcomes.',
  3: 'Assesses whether the rule is subjective, arbitrary, or lacks a direct link to driver behaviour or claims exposure.',
  4: 'Evaluates the rule against public policy priorities and FSRA\'s consumer protection mandate.',
}

function LevelCard({ result }) {
  const borderColor = result.status === 'PASS'
    ? 'border-l-green-500'
    : result.status === 'FLAG'
    ? 'border-l-yellow-500'
    : 'border-l-red-500'

  return (
    <div className={`card border-l-4 ${borderColor}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Level {result.level}
              {result.level === 1 && (
                <span className="ml-1 text-red-600">(Required)</span>
              )}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900">{result.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{LEVEL_DESCRIPTIONS[result.level]}</p>
        </div>
        <StatusBadge status={result.status} />
      </div>

      <p className="text-sm text-gray-700 mb-3 leading-relaxed">{result.findings}</p>

      {result.relevant_references?.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            References
          </p>
          <ul className="space-y-0.5">
            {result.relevant_references.map((ref, i) => (
              <li key={i} className="text-xs text-fsra-green flex items-start gap-1">
                <span className="mt-0.5">•</span>
                <span>{ref}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.rejection_reasons_identified?.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Issues Identified
          </p>
          <div>
            {result.rejection_reasons_identified.map((reason, i) => (
              <RejectionReasonTag key={i} reason={reason} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function AssessmentPanel({ assessment }) {
  if (!assessment) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-fsra-green text-white">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-fsra-gold-light text-xs font-semibold uppercase tracking-wide mb-1">
              Proposed Rule
            </p>
            <p className="font-medium text-white text-sm leading-relaxed">
              "{assessment.rule_text}"
            </p>
            {assessment.insurer_name && (
              <p className="text-green-200 text-xs mt-1">Insurer: {assessment.insurer_name}</p>
            )}
          </div>
          <div className="text-right shrink-0">
            <p className="text-green-200 text-xs mb-1">AI Recommendation</p>
            <RecommendationBadge recommendation={assessment.overall_recommendation} />
          </div>
        </div>

        <div className="mt-4">
          <ScoreBar score={assessment.overall_score} />
        </div>

        <p className="mt-4 text-green-100 text-sm leading-relaxed">{assessment.summary}</p>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-800">
        <span className="font-semibold">⚠ AI-Assisted Review:</span> {assessment.disclaimer}
      </div>

      {/* Level cards */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Detailed Assessment</h2>
        <div className="space-y-4">
          {assessment.levels.map((level) => (
            <LevelCard key={level.level} result={level} />
          ))}
        </div>
      </div>
    </div>
  )
}
