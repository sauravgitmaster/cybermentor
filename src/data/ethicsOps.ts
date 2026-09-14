import { EthicsOp } from '../types/ethics';

export const ETHICS_OPS: Record<string, EthicsOp> = {
  'ethics-op-whistleblower': {
    id: 'ethics-op-whistleblower',
    code: 'ETH-01',
    title: 'The Grading Engine Vulnerability',
    locationId: 'campus',
    requiredTrust: 15,
    npc: {
      id: 'npc-maya',
      name: 'Maya Chen',
      role: 'Undergraduate Teaching Assistant',
      location: 'Computer Science Dept Room 310',
      status: 'Anxious',
    },
    doctrineBrief: {
      title: 'DOCTRINE // COORDINATED VULNERABILITY DISCLOSURE',
      durationHint: '45 sec',
      facts: [
        'Coordinated Vulnerability Disclosure (CVD) provides vendors a realistic timeline (typically 90 days) to patch before public disclosure.',
        'Immediate uncoordinated full disclosure exposes affected users to active exploitation before a defensive patch exists.',
        'Suppression or silence when human safety or sensitive privacy is compromised violates professional codes of ethics (ACM / (ISC)²).',
      ],
      attackerModel:
        'Opportunistic adversaries continuously scrape student forums and public repos for leaked endpoints. An unpatched administrative vulnerability will inevitably be discovered and monetized.',
      whatGoodLooksLike:
        'Document the reproduction steps in a secure encrypted channel, submit to the institutional CISO / security response team, establish a timeline with executive oversight, and seek neutral legal or ombudsman support if administrative retaliation is threatened.',
      relatedAbility: 'REPORT',
    },
    situation:
      'While building a departmental grading assistant tool, Maya discovered an unauthenticated REST API endpoint (/api/v1/students/records?admin=true) that leaks full academic records, disciplinary sanctions, and medical accommodations for all 18,000 enrolled students. When she notified the department chair, he told her: "We are in the middle of our regional accreditation audit. If this leaks, the department loses funding. Keep this between us and delete your notes."',
    stakeholderMap: [
      {
        name: '18,000 Enrolled Students',
        interest: 'FERPA privacy, prevention of identity theft & academic extortion',
        risk: 'Severe privacy violation and reputational injury if endpoint is probed by outside attackers',
      },
      {
        name: 'Department Administration',
        interest: 'Maintaining accreditation funding and department reputation',
        risk: 'Funding loss and public scandal if vulnerability is mismanaged',
      },
      {
        name: 'Maya Chen (Discoverer)',
        interest: 'Academic standing, avoiding retaliatory grade/grant loss, doing what is right',
        risk: 'Retaliation from department chair vs legal exposure for uncoordinated disclosure',
      },
      {
        name: 'Institutional CISO & General Counsel',
        interest: 'Enterprise risk management, legal compliance, vulnerability remediation',
        risk: 'Regulatory fines (FERPA/FTC) if breach occurs under administrative cover-up',
      },
    ],
    artifact: {
      title: 'Department Chair Private Communication & API Payload',
      type: 'chat-log',
      content: `[DIRECT MESSAGE // DEPT CHAIR -> MAYA CHEN]
[14:12] Chair: Maya, I saw your email regarding /api/v1/students/records.
[14:13] Chair: Do NOT file a ticket with Campus IT. We have the ABET accreditation board visiting next Tuesday.
[14:14] Chair: If SecOps launches an audit, they will freeze our server cluster and we will fail the review.
[14:15] Chair: Delete your curl test scripts. We will look at it over the summer. That is an order.

[ATTACHED REPRODUCTION SNIPPET]
$ curl -s -X GET "https://portal.cs.university.edu/api/v1/students/records?export=all" \\
  -H "User-Agent: Mozilla/5.0" | jq '.[0]'
{
  "student_id": "U-2024-8812",
  "name": "REDACTED",
  "gpa": 3.91,
  "accommodations": "Psychiatric disability allowance (Confidential)",
  "financial_aid_ssn_last4": "4912"
}`,
      metadata: {
        classification: 'FERPA CONFIDENTIAL',
        vulnerabilityType: 'Broken Object Level Authorization (BOLA / IDOR)',
        endpoint: 'https://portal.cs.university.edu/api/v1/students/records',
      },
    },
    emphasizedPrinciples: ['harm', 'duty-to-report', 'integrity', 'privacy'],
    options: [
      {
        id: 'A',
        label: 'Post the full API reproduction script anonymously on Reddit to force an instant patch',
        description: 'Publish the curl commands and database screenshot to r/University so the public forces IT to take the server offline.',
        scores: {
          consent: -2,
          harm: -2,
          proportionality: -1,
          'duty-to-report': 0,
          privacy: -2,
          integrity: -1,
          stewardship: -2,
        },
        harmIfChosen:
          'Malicious actors in the subreddit immediately script automated scrapers before IT can take the server down, exfiltrating the entire database of 18,000 student records.',
        betterFraming:
          'Public zero-day disclosure without defense preparation always harms innocent stakeholders more than the targeted administration.',
      },
      {
        id: 'B',
        label: 'Comply with the department chair: delete all notes and stay silent',
        description: 'Respect administrative hierarchy, delete the proof-of-concept scripts, and do not report the vulnerability.',
        scores: {
          consent: -1,
          harm: -2,
          proportionality: 0,
          'duty-to-report': -2,
          privacy: -2,
          integrity: -2,
          stewardship: -2,
        },
        harmIfChosen:
          'Two weeks later, an external ransomware gang discovers the identical open endpoint, exfiltrates the records, and demands $500,000 under threat of leaking student medical files.',
        betterFraming:
          'Obedience to authority does not supersede the ethical imperative to prevent foreseeable catastrophic harm.',
      },
      {
        id: 'C',
        label: 'Demand guaranteed thesis approval and research grant funding before agreeing to fix it',
        description: 'Leverage the discovery as bargaining power against the department leadership.',
        scores: {
          consent: -2,
          harm: -2,
          proportionality: -2,
          'duty-to-report': -2,
          privacy: -1,
          integrity: -2,
          stewardship: -2,
        },
        harmIfChosen:
          'Extortion transforms ethical security research into criminal misconduct under the Computer Fraud and Abuse Act (CFAA), resulting in expulsion and criminal charges.',
        betterFraming:
          'Security research must maintain ethical separation from personal extortion or coercion.',
      },
      {
        id: 'D',
        label: 'Initiate Coordinated Disclosure: Report confidentially to University CISO & Campus Ombudsman',
        description: 'Submit an encrypted vulnerability dossier directly to the campus Central Information Security Office while notifying the university ombudsman to protect against retaliation.',
        scores: {
          consent: 2,
          harm: 2,
          proportionality: 2,
          'duty-to-report': 2,
          privacy: 2,
          integrity: 2,
          stewardship: 2,
        },
        harmIfChosen:
          'The department chair may express brief irritation, but institutional legal and technical frameworks ensure the endpoint is hot-patched within 4 hours without public leak.',
        betterFraming:
          'This balances duty to report, protects 18,000 students from harm, respects proper disclosure channels, and invokes protective whistleblower safeguards.',
      },
    ],
    recommendedOptionId: 'D',
    learningObjective:
      'Understand why Coordinated Vulnerability Disclosure (CVD) and institutional oversight channels protect users while avoiding both reckless zero-day disclosure and complicit silence.',
  },

  'ethics-op-zero-day': {
    id: 'ethics-op-zero-day',
    code: 'ETH-02',
    title: 'The Municipal Infrastructure Exploit Broker',
    locationId: 'digital-city',
    requiredTrust: 25,
    npc: {
      id: 'npc-kiran',
      name: 'Kiran Rao',
      role: 'Industrial Control Systems (ICS) Researcher',
      location: 'Digital City Research Incubator',
      status: 'Conflicted',
    },
    doctrineBrief: {
      title: 'DOCTRINE // EXPLOIT COMMERCE VS RESPONSIBLE DEFENSE',
      durationHint: '45 sec',
      facts: [
        'Exploit brokers acquire weaponizable zero-days to resell to private intelligence firms, state actors, and offensive contractors.',
        'Selling offensive zero-days without vendor knowledge leaves public critical infrastructure permanently defenseless.',
        'The Wassenaar Arrangement and international cybersecurity standards govern the proliferation of dual-use cyber surveillance tools.',
      ],
      attackerModel:
        'Gray-market brokers offer life-changing bounties to independent researchers to divert critical vulnerabilities away from patches and into private exploit arsenals.',
      whatGoodLooksLike:
        'Submit the vulnerability to official vendor bounty programs or national coordination centers (CISA / CERT-CC) where coordinated patching protects critical civil infrastructure.',
      relatedAbility: 'REPORT',
    },
    situation:
      'Kiran discovered an unauthenticated Remote Code Execution (RCE) flaw in SCADA pump firmware utilized by municipal drinking water facilities across 40 regional districts. A representative from "Aegis Cyber Holdings" offers Kiran $75,000 in cryptocurrency for full exclusive weaponized proof-of-concept rights, requiring a signed non-disclosure agreement forbidding vendor notification.',
    stakeholderMap: [
      {
        name: '1.2 Million Regional Residents',
        interest: 'Safe municipal drinking water and uninterrupted utility service',
        risk: 'Chemical dosing manipulation or physical pump destruction if exploit is deployed',
      },
      {
        name: 'SCADA Firmware Vendor',
        interest: 'Product reliability, patch distribution, customer security',
        risk: 'Permanent unpatched vulnerability in active production hardware',
      },
      {
        name: 'Aegis Cyber Holdings (Broker)',
        interest: 'Monetization through resale to offensive intelligence clients',
        risk: 'Loss of investment if vulnerability is patched by vendor',
      },
      {
        name: 'Kiran Rao (Researcher)',
        interest: 'Financial security ($75k payout) vs professional ethics and legal risk',
        risk: 'Potential legal liability under cyber export controls and catastrophic moral harm',
      },
    ],
    artifact: {
      title: 'Confidential Acquisition Term Sheet: Exclusive ICS Weaponization',
      type: 'drive-share',
      content: `CONFIDENTIAL PROPOSAL // AEGIS CYBER HOLDINGS
CLIENT REF: ACH-VULN-2026-901
TARGET ASSET: FlowMaster Pro ICS/SCADA Firmware v4.1 (PLC Remote Command Execution)

OFFER TERMS:
1. Consideration: $75,000 USD payable in Monero (XMR) / Bitcoin upon verification.
2. Deliverable: Functional Python exploit script achieving root shell on remote pump controller.
3. Exclusivity Clause: The Researcher warrants that no disclosure has been or will ever be made
   to the vendor (FlowMaster Systems Inc), CISA, or any academic venue.
4. Breach Penalty: Forfeiture of funds and liquidated damages.

[NOTE: FlowMaster Systems has no official bug bounty program, but CISA maintains ICS-CERT coordination.]`,
      metadata: {
        bountyOffered: '$75,000 USD (Crypto)',
        assetClass: 'Critical Infrastructure SCADA RCE',
        vendorStatus: 'No private bounty program',
      },
    },
    emphasizedPrinciples: ['harm', 'stewardship', 'integrity', 'duty-to-report'],
    options: [
      {
        id: 'A',
        label: 'Accept the $75,000 offer from Aegis Cyber Holdings and sign the exclusivity NDA',
        description: 'Take the money, deliver the exploit code, and agree never to notify the vendor or authorities.',
        scores: {
          consent: -2,
          harm: -2,
          proportionality: -2,
          'duty-to-report': -2,
          privacy: 0,
          integrity: -2,
          stewardship: -2,
        },
        harmIfChosen:
          'The broker resells the exploit to an extortion syndicate. Six months later, a neighboring municipality suffers water supply tampering, causing a boil-water crisis for 300,000 citizens.',
        betterFraming:
          'Profiting from weapons that endanger critical civil infrastructure violates the fundamental ethical obligation to protect human life and safety.',
      },
      {
        id: 'B',
        label: 'Post the full weaponized exploit publicly on GitHub to "prove" the danger to the public',
        description: 'Drop the 0-day publicly on social media and code repositories so municipal operators are forced to unplug their pumps.',
        scores: {
          consent: -1,
          harm: -2,
          proportionality: -2,
          'duty-to-report': -1,
          privacy: 0,
          integrity: -1,
          stewardship: -2,
        },
        harmIfChosen:
          'Within 45 minutes of public posting, automated threat actors scan the internet for connected FlowMaster pumps, locking municipal controllers before city engineers can even download the advisory.',
        betterFraming:
          'Publishing weaponized exploits without a defensive patch in critical infrastructure causes immediate physical danger.',
      },
      {
        id: 'C',
        label: 'Report to CISA / ICS-CERT & coordinate a 90-day responsible embargo with the vendor',
        description: 'Submit an advisory to national infrastructure coordination (CISA ICS-CERT), giving engineers time to build and deploy validated firmware patches.',
        scores: {
          consent: 2,
          harm: 2,
          proportionality: 2,
          'duty-to-report': 2,
          privacy: 1,
          integrity: 2,
          stewardship: 2,
        },
        harmIfChosen:
          'You forfeit the $75,000 gray-market payout, but CISA issues a CVE and coordinates verified firmware updates across all 40 districts, protecting 1.2M citizens.',
        betterFraming:
          'Protecting human safety and public infrastructure is the hallmark of true cybersecurity stewardship.',
      },
      {
        id: 'D',
        label: 'Hack into a local water plant to trigger an intentional harmless alarm as proof',
        description: 'Remotely trigger an RCE alarm on the city pump to scare the city council into paying attention.',
        scores: {
          consent: -2,
          harm: -2,
          proportionality: -2,
          'duty-to-report': -1,
          privacy: -1,
          integrity: -2,
          stewardship: -2,
        },
        harmIfChosen:
          'Unauthorized intrusion into critical infrastructure triggers federal law enforcement response and can inadvertently cause pressure surges or pipe fractures.',
        betterFraming:
          'Never execute unauthorized commands on production critical infrastructure, even with benevolent intent.',
      },
    ],
    recommendedOptionId: 'C',
    learningObjective:
      'Distinguish between ethical vulnerability disclosure through established coordination bodies (CISA/CERT) and illicit gray-market exploit trafficking that endangers civil infrastructure.',
  },

  'ethics-op-credential-scraping': {
    id: 'ethics-op-credential-scraping',
    code: 'ETH-03',
    title: 'The Student Movement OSINT Surveillance Contract',
    locationId: 'digital-city',
    requiredTrust: 30,
    npc: {
      id: 'npc-dante',
      name: 'Dante Rivera',
      role: 'Cyber Intelligence Analyst',
      location: 'Underground Hacker Lab',
      status: 'Pressured',
    },
    doctrineBrief: {
      title: 'DOCTRINE // OSINT, CONSENT & SURVEILLANCE BOUNDARIES',
      durationHint: '45 sec',
      facts: [
        'Public data availability does not equate to unrestricted ethical license for non-consensual surveillance profiling.',
        'Correlating disparate public records (Wi-Fi MAC probes, social sentiment, attendance lists) creates high-resolution surveillance dossiers that infringe on civil liberties.',
        'Security professionals must evaluate the human rights impacts of surveillance contracts under international human rights standards (UNGP / OECD).',
      ],
      attackerModel:
        'Organizations weaponize contracted security analysts to deanonymize, intimidate, and profile political organizers using automated open-source scraping and correlation.',
      whatGoodLooksLike:
        'Decline contracts that target lawful civic assembly and free speech. Refuse to aggregate deanonymizing dossiers without explicit lawful warrant or clear national emergency authorization.',
      relatedAbility: 'TRACE',
    },
    situation:
      'A private corporate security contractor offers Dante $8,000 to construct an automated profiling pipeline. The goal: aggregate student social media posts, cross-reference campus Wi-Fi MAC association logs from public cafes, and compile a deanonymized dossier on organizers of an upcoming peaceful protest regarding university endowment investments.',
    stakeholderMap: [
      {
        name: 'Student Protest Organizers',
        interest: 'First Amendment assembly rights, digital privacy, personal safety',
        risk: 'Targeted academic discipline, physical harassment, or covert corporate blacklisting',
      },
      {
        name: 'Private Security Contractor',
        interest: 'Fulfilling corporate client contract and risk forecasting',
        risk: 'Reputational blowback and potential civil rights litigation',
      },
      {
        name: 'General Student Body',
        interest: 'Right to public expression without warrantless digital tracking',
        risk: 'Chilling effect on civic participation across the university',
      },
      {
        name: 'Dante Rivera (Analyst)',
        interest: 'Contract revenue vs professional reputation and civil liberties ethics',
        risk: 'Complicity in unlawful surveillance and violation of ethical guidelines',
      },
    ],
    artifact: {
      title: 'Contractor Scope of Work: Project "Civic Pulse" Dossier Extraction',
      type: 'log-snippet',
      content: `TASK BRIEF // PROJECT CIVIC PULSE
CONTRACTOR: Vanguard Risk Mitigation LLC
SUBJECT TARGET: "Campus Coalition for Ethical Endowment"

REQUIRED DELIVERABLES:
1. Scrape all public Instagram/Twitter/TikTok profiles tagged with #CampusReform2026.
2. Ingest cafe Wi-Fi probe requests (MAC addresses) collected from student union vicinity.
3. Correlate MAC timestamps with social media upload times to determine real identities of anonymous organizers @WhistleblowerStudent and @CampusVoice.
4. Output comprehensive dossier including dorm addresses, class schedules, and known associates.

BUDGET ALLOCATION: $8,000 USD upon completion.`,
      metadata: {
        classification: 'PROPRIETARY / COMMERCIAL SURVEILLANCE',
        targetActivity: 'Peaceful student protest organizing',
        dataSources: 'Public social media + unencrypted Wi-Fi radio probes',
      },
    },
    emphasizedPrinciples: ['consent', 'privacy', 'proportionality', 'harm'],
    options: [
      {
        id: 'A',
        label: 'Complete the contract and deliver the deanonymized dossier to Vanguard LLC',
        description: 'Argue that because the social media and Wi-Fi airwaves were public, no ethical violation occurred, and collect the $8,000 fee.',
        scores: {
          consent: -2,
          harm: -2,
          proportionality: -2,
          'duty-to-report': 0,
          privacy: -2,
          integrity: -2,
          stewardship: -2,
        },
        harmIfChosen:
          'The dossier is used to target student leaders with doxxing, harassment campaigns, and disciplinary intimidation, suppressing lawful civic discourse across campus.',
        betterFraming:
          'Aggregating disparate data points to deanonymize peaceful activists causes acute personal harm and infringes upon core democratic freedoms.',
      },
      {
        id: 'B',
        label: 'Deliver the dossier to Vanguard, but secretly DM the organizers with a burner account',
        description: 'Fulfill the paid surveillance contract while attempting to balance it by tipping off the students.',
        scores: {
          consent: -1,
          harm: -1,
          proportionality: -1,
          'duty-to-report': 0,
          privacy: -1,
          integrity: -2,
          stewardship: -1,
        },
        harmIfChosen:
          'Playing both sides creates false security for the students while the corporate contractor retains and weaponizes the full targeting dossier anyway.',
        betterFraming:
          'Compromising ethical integrity by delivering harmful intelligence cannot be rectified with secondary covert warnings.',
      },
      {
        id: 'C',
        label: 'Decline the contract and notify Campus Privacy & Civil Liberties Board',
        description: 'Formally reject the surveillance project as an unethical human rights violation and alert the university privacy board regarding commercial probe tracking.',
        scores: {
          consent: 2,
          harm: 2,
          proportionality: 2,
          'duty-to-report': 2,
          privacy: 2,
          integrity: 2,
          stewardship: 2,
        },
        harmIfChosen:
          'You lose the $8,000 fee, but establish an ethical precedent that protects campus civil liberties and shields peaceful students from weaponized profiling.',
        betterFraming:
          'True cyber professionals refuse to prostitute analytical skills for civil rights suppression and surveillance profiling.',
      },
      {
        id: 'D',
        label: 'Deliver intentionally corrupted and fake data to poison Vanguard\'s database',
        description: 'Accept the contract but fill the dossier with synthetic randomized names and false MAC addresses to sabotage the client.',
        scores: {
          consent: 0,
          harm: -1,
          proportionality: -1,
          'duty-to-report': -1,
          privacy: 0,
          integrity: -2,
          stewardship: -1,
        },
        harmIfChosen:
          'Generating false intelligence risks implicating innocent uninvolved third parties whose fake identities happen to match real individuals, resulting in mistaken harassment.',
        betterFraming:
          'Falsification and deceit in professional contracts introduces chaotic collateral harm; clear refusal is the ethical standard.',
      },
    ],
    recommendedOptionId: 'C',
    learningObjective:
      'Recognize that technical feasibility and public data accessibility do not grant moral license to conduct deanonymizing surveillance against lawful democratic assemblies.',
  },
};
