"""
Known approved underwriting decline rules in Ontario auto insurance.
Used for precedent checking (Level 1 evaluation).
"""

APPROVED_RULES = [
    {
        "rule": "1 or more Criminal Code convictions in the preceding 3 years",
        "category": "Criminal History",
        "notes": "Directly related to driver risk and insurance fraud exposure.",
    },
    {
        "rule": "2 or more at-fault accidents in the preceding 3 years",
        "category": "Driving Record",
        "notes": "Strong actuarial link to future claims exposure.",
    },
    {
        "rule": "2 minor convictions within the preceding 3 years and 2 cancellations for non-payment of premium within the preceding 3 years",
        "category": "Combined Risk Factors",
        "notes": "Combination of driving record and payment history indicating elevated risk.",
    },
    {
        "rule": "1 at-fault accident in the preceding 5 years and 1 minor conviction within the preceding 3 years and 2 cancellations for non-payment of premium within the preceding 3 years",
        "category": "Combined Risk Factors",
        "notes": "Multi-factor rule combining accident history, convictions, and cancellations.",
    },
    {
        "rule": "1 or more convictions for auto insurance fraud in the preceding 10 years",
        "category": "Fraud History",
        "notes": "Direct risk relevance; fraud convictions are a clear indicator of moral hazard.",
    },
    {
        "rule": "Any automobile used for commercial purposes",
        "category": "Vehicle Use",
        "notes": "Commercial use requires commercial auto insurance; different risk profile.",
    },
    {
        "rule": "Used on a racetrack, or in any race, speed test, or competition",
        "category": "Vehicle Use",
        "notes": "Extreme risk exposure not contemplated under personal auto policies.",
    },
    {
        "rule": "Vehicles used for the purpose for which they were not designed",
        "category": "Vehicle Use",
        "notes": "Misuse increases risk of mechanical failure and accidents.",
    },
    {
        "rule": "If no driver of the vehicle insured under the contract holds a valid Canadian licence to drive",
        "category": "Licence Status",
        "notes": "Legally required; unlicensed driving is a statutory violation.",
    },
    {
        "rule": "Vehicles used for police work",
        "category": "Vehicle Use",
        "notes": "Police vehicles have specialized risk profiles covered under fleet/government insurance.",
    },
    {
        "rule": "Failure to pay any outstanding premiums owed to the insurer or its affiliated companies for the same named insured",
        "category": "Payment History",
        "notes": "Directly related to contract obligations and payment risk.",
    },
    {
        "rule": "Improper class of license or invalid license",
        "category": "Licence Status",
        "notes": "Statutory requirement; driving with improper licence increases risk.",
    },
    {
        "rule": "Any vehicle modified for speed or used for racing",
        "category": "Vehicle Modification",
        "notes": "Speed modifications materially change the vehicle's risk profile.",
    },
    {
        "rule": "Any vehicle with unacceptable customizations or modifications",
        "category": "Vehicle Modification",
        "notes": "Non-standard modifications may void safety certifications and increase risk.",
    },
    {
        "rule": "Use of personal vehicle for package delivery or ride-sharing on a part-time basis",
        "category": "Vehicle Use",
        "notes": "Commercial use element requires commercial insurance classification.",
    },
    {
        "rule": "Any rebuilt vehicle without satisfactory inspection and certification",
        "category": "Vehicle Condition",
        "notes": "Rebuilt vehicles without proper certification may have compromised safety features.",
    },
    {
        "rule": "A pattern of at-fault accidents and tickets over a 3-year period",
        "category": "Driving Record",
        "notes": "Pattern indicates persistent high-risk driving behaviour.",
    },
    {
        "rule": "A combination of at-fault accidents or tickets over a short period AND cancellations for missed payments",
        "category": "Combined Risk Factors",
        "notes": "Multi-dimensional risk indicator combining driving and financial risk.",
    },
]
