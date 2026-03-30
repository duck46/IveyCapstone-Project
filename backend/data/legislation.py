"""
Ontario auto insurance legislation, regulations, and FSRA guidance.
Used as reference material in AI evaluation prompts.
"""

LEGISLATION = [
    {
        "name": "Insurance Act, R.S.O. 1990, c. I.8",
        "short_name": "Insurance Act",
        "description": "The primary legislation governing insurance in Ontario, including the Take All Comers Rule which prohibits insurers from declining auto insurance except under approved circumstances.",
        "relevance": "Core legislation; Take All Comers Rule; underwriting rule approval requirements",
    },
    {
        "name": "Ontario Human Rights Code, R.S.O. 1990, c. H.19",
        "short_name": "Human Rights Code",
        "description": "Prohibits discrimination based on protected grounds including race, ancestry, place of origin, colour, ethnic origin, citizenship, creed, sex, sexual orientation, gender identity, age, marital status, family status, and disability.",
        "relevance": "Protected grounds; anti-discrimination requirements; proxy discrimination",
    },
    {
        "name": "Canadian Charter of Rights and Freedoms",
        "short_name": "Canadian Charter",
        "description": "Protects fundamental rights and freedoms; relevant to rules that may disproportionately impact protected groups.",
        "relevance": "Constitutional rights; equality provisions (s.15); fundamental justice",
    },
    {
        "name": "Compulsory Automobile Insurance Act, R.S.O. 1990, c. C.25",
        "short_name": "CAIA",
        "description": "Requires all drivers to carry mandatory auto insurance. Reinforces the obligation of insurers to provide coverage broadly.",
        "relevance": "Mandatory insurance requirement; access to coverage",
    },
    {
        "name": "Motor Vehicle Accident Claims Act, R.S.O. 1990, c. M.41",
        "short_name": "MVACA",
        "description": "Provides compensation to victims of accidents involving uninsured or unidentified vehicles.",
        "relevance": "Uninsured motorist scenarios; residual market obligations",
    },
    {
        "name": "Financial Services Regulatory Authority of Ontario Act, 2016, S.O. 2016, c. 37, Sched. 8",
        "short_name": "FSRA Act",
        "description": "Establishes FSRA as the regulator with mandate to protect consumers and ensure fair treatment in financial services.",
        "relevance": "FSRA mandate; regulatory authority; consumer protection objectives",
    },
    {
        "name": "Automobile Insurance Rate Stabilization Act, 2003, S.O. 2003, c. 9",
        "short_name": "AIRSA",
        "description": "Governs rate stabilization for automobile insurance in Ontario.",
        "relevance": "Rate regulation; pricing constraints",
    },
    {
        "name": "R.R.O. 1990, Reg. 664: Automobile Insurance",
        "short_name": "Reg. 664",
        "description": "Key regulation under the Insurance Act setting out rules for automobile insurance, including risk classification variables.",
        "relevance": "Risk classification; permitted rating variables; underwriting criteria",
    },
    {
        "name": "O. Reg. 777/93: Statutory Conditions - Automobile Insurance",
        "short_name": "O. Reg. 777/93",
        "description": "Sets out mandatory statutory conditions that must appear in every auto insurance policy in Ontario.",
        "relevance": "Policy conditions; cancellation rights; insured obligations",
    },
    {
        "name": "Filing Guidelines for Underwriting Rules (FSRA)",
        "short_name": "Underwriting Filing Guidelines",
        "description": "FSRA guidance on how insurers must file proposed underwriting rules, including required supporting documentation and analysis.",
        "relevance": "Filing requirements; actuarial support requirements; approval process",
    },
    {
        "name": "Underwriting Technical Notes (FSRA)",
        "short_name": "Underwriting Technical Notes",
        "description": "Technical guidance from FSRA on underwriting practices and requirements.",
        "relevance": "Technical standards; documentation requirements",
    },
    {
        "name": "Principles-based Regulation (FSRA)",
        "short_name": "Principles-based Regulation",
        "description": "FSRA guidance establishing principles-based approach to regulation focused on fair consumer outcomes.",
        "relevance": "Regulatory principles; fair consumer outcomes framework",
    },
    {
        "name": "Fair Treatment of Consumers in Insurance (FSRA)",
        "short_name": "Fair Treatment Guidance",
        "description": "FSRA guidance on ensuring fair treatment of consumers throughout the insurance lifecycle.",
        "relevance": "Consumer fairness standards; conduct requirements",
    },
    {
        "name": "Proposed Guidance: Automobile Insurance Rating and Underwriting Supervision Guidance (FSRA)",
        "short_name": "Rating and Underwriting Supervision Guidance",
        "description": "FSRA's proposed guidance on supervising automobile insurance rating and underwriting practices.",
        "relevance": "Supervisory expectations; compliance standards; consumer outcome metrics",
    },
    {
        "name": "Take-All-Comers Thematic Review Report (FSRA)",
        "short_name": "Take-All-Comers Report",
        "description": "FSRA's thematic review examining industry compliance with the Take All Comers Rule.",
        "relevance": "Industry compliance; common issues identified; FSRA expectations",
    },
    {
        "name": "Unfair or Deceptive Acts or Practices Rule (FSRA)",
        "short_name": "UDAP Rule",
        "description": "FSRA rule prohibiting unfair or deceptive acts and practices in insurance.",
        "relevance": "Prohibited practices; consumer harm; transparency requirements",
    },
    {
        "name": "Highway Traffic Act, R.S.O. 1990, c. H.8",
        "short_name": "Highway Traffic Act",
        "description": "Governs road use in Ontario including licensing requirements, traffic violations, and vehicle standards.",
        "relevance": "Licence requirements; traffic offences; vehicle regulations",
    },
    {
        "name": "Private Passenger Automobile Filing Guidelines - Major (FSRA)",
        "short_name": "Major Filing Guidelines",
        "description": "FSRA guidelines for major filings related to private passenger automobile insurance.",
        "relevance": "Filing requirements; documentation standards",
    },
]
