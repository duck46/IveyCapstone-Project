"""
FSRA Principles and Fair Consumer Outcomes for automobile insurance underwriting.
Used in Level 2 evaluation (Stretch).
"""

PRINCIPLES = [
    {
        "name": "Accurate Pricing and Underwriting",
        "fairness_outcome": (
            "Premiums and coverages closely reflect consumers' individual risk profile. "
            "Risk profiles are determined by driving behavior, experience, driving distance, "
            "location, vehicle, and other relevant risk factors."
        ),
        "evaluation_questions": [
            "Does the rule use factors that accurately reflect individual driving risk?",
            "Are the criteria objectively measurable and directly linked to risk?",
            "Does the rule avoid penalizing consumers for factors unrelated to their driving behaviour?",
        ],
    },
    {
        "name": "Absence of Unfair Discrimination, Bias, or Proxies",
        "fairness_outcome": (
            "Rating and underwriting practices are free from unfair discrimination and bias. "
            "Decisions are not directly or indirectly influenced by protected grounds under the "
            "Ontario Human Rights Code. Criteria are not used that are direct or indirect proxies "
            "for protected or prohibited variables."
        ),
        "evaluation_questions": [
            "Could this rule disproportionately impact any group protected under the Human Rights Code?",
            "Is the rule a proxy for race, ethnicity, immigration status, age, gender, or other protected grounds?",
            "Could newly licensed drivers or new Canadians be unfairly impacted?",
        ],
    },
    {
        "name": "Accessible Products and Coverages",
        "fairness_outcome": (
            "Rating and underwriting practices balance pricing accuracy with accessibility and suitability. "
            "Decisions would not unfairly impact the ability of consumers to access critical auto insurance coverages."
        ),
        "evaluation_questions": [
            "Does the rule restrict access to mandatory auto insurance without sufficient justification?",
            "Are there consumers who would be unreasonably denied coverage under this rule?",
            "Does the rule maintain the spirit of the Take All Comers obligation?",
        ],
    },
    {
        "name": "Cost Mitigation",
        "fairness_outcome": (
            "Insurers prevent unnecessary and excessive costs from being passed onto consumers."
        ),
        "evaluation_questions": [
            "Is the rule designed to genuinely reduce claims costs or insurer risk?",
            "Would the rule create unnecessary administrative burden passed to consumers?",
            "Is the cost justification proportionate to the risk being mitigated?",
        ],
    },
    {
        "name": "Balanced Profitability and Consumer Interests",
        "fairness_outcome": (
            "Insurers balance their needs for sustainable growth and profitability with fair treatment of consumers. "
            "Premiums are based on reasonable profit assumptions."
        ),
        "evaluation_questions": [
            "Does the rule serve the insurer's profitability at the expense of consumer fairness?",
            "Is the rule balanced between risk management and consumer access?",
            "Does the insurer's rationale reflect a reasonable business need or primarily profit motivation?",
        ],
    },
    {
        "name": "Clear Consumer Communications",
        "fairness_outcome": (
            "Communications impacting policyholder rights are clear and timely. Consumers can access "
            "information to understand factors influencing pricing, underwriting and implications for "
            "future claims. Communications are delivered through convenient mediums utilizing current technology."
        ),
        "evaluation_questions": [
            "Is the rule clearly defined and understandable to consumers?",
            "Could the language be interpreted in multiple ways (vague language concern)?",
            "Would consumers be clearly informed about why they are being declined?",
        ],
    },
]

REJECTION_REASONS = [
    {
        "name": "Not Risk-Relevant",
        "description": "The proposed rule is not based on any characteristic of the insured that is relevant to the risk.",
        "examples": ["Denying insurance based on car color", "Denying based on personal aesthetics or preferences"],
    },
    {
        "name": "Vague Language",
        "description": "The vagueness and ambiguity of the language used in the rule might invite a multiplicity of interpretations.",
        "examples": ["'Unacceptable driving history' without clear definition", "'Inappropriate use of vehicle' without specification"],
    },
    {
        "name": "Copycat Rule",
        "description": "The rule might inappropriately refer to the actions of another insurer as the sole justification.",
        "examples": ["'Same as Insurer X's rule' without independent actuarial support"],
    },
    {
        "name": "Human Rights Violation",
        "description": "Any grounds which transgress the Human Rights Code and the Canadian Charter of Rights and Freedoms.",
        "examples": [
            "Denying based on ethnicity, religion, gender, or other protected grounds",
            "Rules that act as proxies for protected characteristics",
        ],
    },
    {
        "name": "Contrary to Legislation",
        "description": "The rule is contrary to current legislation such as the Insurance Act, UDAP, or published FSRA guidance.",
        "examples": [
            "Rules that violate the Take All Comers requirement",
            "Rules inconsistent with FSRA's published underwriting guidance",
        ],
    },
    {
        "name": "Discriminatory Impact",
        "description": "The rule may decline newly licensed drivers or drivers 'new' to Canada, or disproportionately impact vulnerable groups.",
        "examples": [
            "Denying insurance to anyone without a Canadian driving history",
            "Rules that disproportionately exclude new immigrants or young drivers",
        ],
    },
]
