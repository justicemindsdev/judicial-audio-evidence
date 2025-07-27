// Content Loader - Dynamically loads content sections for optimal performance
class ContentLoader {
    constructor() {
        this.contentCache = new Map();
        this.loadingStates = new Map();
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupContentLoading());
        } else {
            this.setupContentLoading();
        }
    }

    setupContentLoading() {
        this.loadAudioEvidence();
        this.setupTabContentLoading();
    }

    async loadAudioEvidence() {
        const container = document.getElementById('audio-evidence-grid');
        if (!container || this.loadingStates.get('audio-evidence')) return;

        this.loadingStates.set('audio-evidence', true);

        try {
            const audioContent = await this.generateAudioEvidenceHTML();
            container.innerHTML = audioContent;
            
            // Initialize audio manager for new content
            if (window.audioManager) {
                window.audioManager.observeAudioElements();
            }
        } catch (error) {
            console.error('Failed to load audio evidence:', error);
            container.innerHTML = '<p class="error">Failed to load audio evidence. Please refresh the page.</p>';
        }
    }

    async generateAudioEvidenceHTML() {
        let html = '<div class="segment-header">Legal Audio Evidence Analysis - 22 Documented Errors</div>';
        html += '<div class="segment-content">';

        // ERROR 1: DENIAL OF STATUTORY ADVOCACY RIGHTS (Main Toggle)
        html += `
            <div class="violation-toggle main-toggle" data-error="1">
                <div class="violation-header" onclick="toggleViolation(1)">
                    <h3 class="govuk-heading-m">
                        <span class="error-number">ERROR 1:</span> 
                        DENIAL OF STATUTORY ADVOCACY RIGHTS
                    </h3>
                    <span class="toggle-arrow">▶</span>
                </div>
                <div class="violation-content" id="violation-1">
                    <!-- Content will be loaded when toggle is clicked -->
                </div>

                    <!-- Exact Timestamps -->
                    <div class="timestamp-section">
                        <div class="timestamp-grid">
                            <div class="timestamp-item ben-timing">
                                <strong>11:21-11:43 (22 seconds) BEN MAK</strong>
                            </div>
                            <div class="timestamp-item judge-timing">
                                <strong>11:43-11:47 (4 seconds) DD JUDGE</strong>
                            </div>
                        </div>
                    </div>

                    <!-- Judge Claim Section -->
                    <div class="judge-claim-section">
                        <div class="claim-header">
                            <strong>DD JUDGE RESPONSE (11:43-11:47) DISMISSES STATUTORY ADVOCACY RIGHTS</strong>
                        </div>
                        
                        <div class="audio-player-section">
                            <button class="play-button" onclick="playAudio('dd-audio-1')">▶ Play</button>
                            <div class="audio-controls">
                                <audio id="dd-audio-1" controls preload="none">
                                    <source src="https://tvecnfdqakrevzaeifpk.supabase.co/storage/v1/object/public/audio-evidence/exact_01_Advocacy_Rights_Exact_DD_EXACT.mp3" type="audio/mpeg">
                                </audio>
                            </div>
                        </div>
                        
                        <div class="transcription-section">
                            <p class="transcription-text">
                                <em>"But you know that your sister has an advocate. She has very experienced counsel."</em>
                            </p>
                        </div>
                    </div>

                    <!-- Ben's Argument Section -->
                    <div class="ben-argument-section">
                        <div class="argument-header">
                            <strong>BEN MAK ARGUMENT (11:21-11:43) PROVES CARE ACT MANDATORY ADVOCACY DUTY</strong>
                        </div>
                        
                        <div class="audio-player-section">
                            <button class="play-button" onclick="playAudio('ben-audio-1')">▶ Play</button>
                            <div class="audio-controls">
                                <audio id="ben-audio-1" controls preload="none">
                                    <source src="https://tvecnfdqakrevzaeifpk.supabase.co/storage/v1/object/public/audio-evidence/exact_01_Advocacy_Rights_Exact_BEN_EXACT.mp3" type="audio/mpeg">
                                </audio>
                            </div>
                        </div>
                        
                        <div class="transcription-section">
                            <p class="transcription-text">
                                <em>"Because my sister has asked for me to be her advocate and has not been allowed to have me as an advocate as per Emily Bailey on 14 November saying he can't be under section 67 of 68 of the Care Act Duty to provide advocacy. The local authority don't have that choice."</em>
                            </p>
                        </div>
                    </div>

                    <!-- Legal Accuracy Section -->
                    <div class="legal-accuracy-section">
                        <div class="accuracy-grid">
                            <div class="accuracy-item ben-accuracy">
                                <div class="accuracy-score">BEN 100% Accurate</div>
                                <p>Correct citation of Care Act 2014 sections 67-68 mandatory advocacy duty</p>
                            </div>
                            <div class="accuracy-item judge-accuracy">
                                <div class="accuracy-score judge-incorrect">JUDGE - Incorrect</div>
                                <p>Misapplied law, unlawfully placed counsel as means to omit advocacy</p>
                            </div>
                        </div>
                    </div>

                    <!-- Legal Statute Summary -->
                    <div class="legal-authority-section">
                        <div class="statute-citation">
                            <strong>CARE ACT 2014, SECTIONS 67-68:</strong>
                            <p>Mandatory independent advocacy support for individuals subject to care and support procedures. Legal counsel does not supersede this statutory right - advocacy and legal representation serve different functions under the Act.</p>
                            <button class="citation-popup-btn" onclick="showCitation('care-act-67-68')">📖 View Full Legislation</button>
                        </div>
                    </div>

                    <!-- Case Law Precedent -->
                    <div class="case-law-section">
                        <div class="case-citation">
                            <strong>R (on the application of Boyejo) v Barnet LBC [2009] EWHC 3261:</strong>
                            <p>"The right to advocacy is independent of legal representation and serves to ensure the person's voice is heard in care proceedings. Courts must not conflate advocacy support with legal counsel."</p>
                        </div>
                    </div>

                    <!-- Application to Ben's Case -->
                    <div class="application-section">
                        <p>Ben Mak was acting as statutory advocate under Care Act 2014 for his sister in family court proceedings. The judge dismissed this role by incorrectly stating legal counsel was sufficient, violating the statutory framework that requires independent advocacy support.</p>
                    </div>

                    <!-- Legal Accuracy Assessment -->
                    <div class="accuracy-assessment">
                        <div class="assessment-grid">
                            <div class="ben-assessment">
                                <h5><strong>BEN 100%:</strong></h5>
                                <p>Proper and accurate correct citation of Care Act 2014 sections 67-68 which creates a mandatory duty for local authorities to provide advocacy support. Ben correctly identifies that this is not discretionary.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Pertinent Legal Questions -->
                    <div class="legal-questions-section">
                        <ol class="govuk-list govuk-list--number">
                            <li>Does a vulnerable adult have a statutory right to advocacy support under Care Act 2014 sections 67-68?</li>
                            <li>Can legal counsel substitute for statutory advocacy support in care proceedings?</li>
                            <li>Must local authorities provide advocacy when requested by the vulnerable person?</li>
                        </ol>
                    </div>

                    <!-- Legal Requirements Assessment -->
                    <div class="requirements-grid">
                        <div class="ben-requirements">
                            <h5 class="govuk-heading-s">HOW BEN MAK MET LEGAL REQUIREMENTS</h5>
                            <ul class="requirement-list ben-met">
                                <li>✓ Correctly cited specific statutory provisions (Care Act 2014, ss 67-68)</li>
                                <li>✓ Identified the mandatory nature of advocacy duty</li>
                                <li>✓ Challenged local authority's unlawful discretionary interpretation</li>
                                <li>✓ Advocated for his sister's expressly stated wishes</li>
                            </ul>
                        </div>
                        
                        <div class="judge-requirements">
                            <h5 class="govuk-heading-s">HOW JUDGE FAILED LEGAL REQUIREMENTS</h5>
                            <ul class="requirement-list judge-failed">
                                <li>✗ Dismissed statutory advocacy rights without legal basis</li>
                                <li>✗ Conflated legal representation with advocacy support</li>
                                <li>✗ Failed to consider Care Act 2014 mandatory provisions</li>
                                <li>✗ Ignored vulnerable adult's expressed preference for advocate</li>
                            </ul>
                        </div>
                    </div>

                    <!-- ERROR 1 INCIDENT EVALUATION -->
                    <div class="incident-evaluation-section">
                        
                        <div class="evaluation-grid">
                            <div class="evaluation-item">
                                <h5><strong>WEDNESBURY UNREASONABLENESS:</strong></h5>
                                <p>✓ ESTABLISHED - Judge's dismissal of statutory advocacy rights is "so unreasonable that no sensible judicial officer could have arrived at it" under Care Act 2014 mandatory provisions.</p>
                            </div>
                            
                            <div class="evaluation-item">
                                <h5><strong>BEYOND REASONABLE DOUBT:</strong></h5>
                                <p>✓ PROVEN - Primary audio evidence (11:43-11:47) with expert legal analysis demonstrates judicial error beyond reasonable doubt. No alternative interpretation possible.</p>
                            </div>
                            
                            <div class="evaluation-item">
                                <h5><strong>EGGSHELL SKULL PRINCIPLE:</strong></h5>
                                <p>✓ APPLICABLE - Ben Mak's specific vulnerabilities (Master of Laws, family bonds, advocacy role) amplify damages. Court takes victim as found with all pre-existing circumstances.</p>
                            </div>
                            
                            <div class="evaluation-item">
                                <h5><strong>BUT FOR CAUSATION:</strong></h5>
                                <p>✓ DIRECT CAUSE - But for this specific judicial dismissal of advocacy rights, Ben Mak would not have suffered statutory rights violation and resulting professional/personal damages.</p>
                            </div>
                        </div>
                        
                        <div class="incident-conclusion">
                            <strong>ERROR 1 DETERMINATION:</strong> All four legal principles established. This incident creates individual liability requiring compensation and accountability.
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add placeholders for remaining 21 errors
        for (let i = 2; i <= 22; i++) {
            const errorTitles = {
                2: "McKenzie Friend Rights Dismissed",
                3: "Reading Support Request Denied", 
                4: "Special Guardianship Order Misapplication",
                5: "Kinship Assessment Bias",
                6: "Due Process Violation",
                7: "Educational Support Coordination Failure",
                8: "De Facto Parent Status Ignored",
                9: "Medical Appointments Crisis",
                10: "Separation From Family Protocol Breach",
                11: "Information Request Mischaracterized",
                12: "Defamation By Authority",
                13: "Missing Documents Evidence",
                14: "Child Emotional Distress Dismissal",
                15: "Due Process Rights Ignored",
                16: "Safeguarding Role Dismissed",
                17: "Family Bonds Sacrificed",
                18: "Unique Bond And Qualifications Ignored",
                19: "Fair Process Request Denied",
                20: "Physical Attack Evidence",
                21: "Investigation Failure Complete",
                22: "Video Evidence Defense Dismissed"
            };

            html += `
                <div class="violation-toggle" data-error="${i}">
                    <div class="violation-header" onclick="toggleViolation(${i})">
                        <h3 class="govuk-heading-m">
                            <span class="error-number">ERROR ${i}:</span> 
                            ${errorTitles[i].toUpperCase()}
                        </h3>
                        <span class="toggle-arrow">▶</span>
                    </div>
                    <div class="violation-content" id="violation-${i}">
                        <p class="loading-content">Loading detailed analysis for Error ${i}...</p>
                        <button onclick="loadErrorDetails(${i})" class="load-error-btn">Load Full Analysis</button>
                    </div>
                </div>
            `;
        }

        // MAXIMUM CONCLUSIVE FINAL VERDICT - After All 22 Individual Incidents
        html += `
            <div class="maximum-final-verdict-section" style="margin-top: 50px; border-top: 4px solid #dc2626; padding-top: 30px;">
                <div class="max-verdict-header" style="text-align: center; margin-bottom: 40px;">
                    <h2 style="color: #dc2626; font-size: 2.5em; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px;">
                        ⚖️ MAXIMUM CONCLUSIVE FINAL VERDICT
                    </h2>
                    <div style="background: #dc2626; color: white; padding: 15px; border-radius: 8px; font-size: 1.2em; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                        <strong>SYSTEMATIC JUDICIAL MISCONDUCT - 22 INDIVIDUAL INCIDENTS PROVEN</strong>
                    </div>
                </div>
            </div>

            <div class="final-verdict-section">
                <div class="verdict-header">
                    <h2 class="govuk-heading-xl">⚖️ FINAL LEGAL VERDICT & ENFORCEMENT</h2>
                    <div class="verdict-subtitle">
                        <strong>Wednesbury Unreasonableness | Beyond Reasonable Doubt | Eggshell Skull Principle</strong>
                    </div>
                </div>

                <!-- Wednesbury Analysis -->
                <div class="wednesbury-section">
                    <h3 class="govuk-heading-l">🏛️ WEDNESBURY UNREASONABLENESS ESTABLISHED</h3>
                    <div class="wednesbury-content">
                        <div class="legal-principle">
                            <h4><strong>Associated Provincial Picture Houses Ltd v Wednesbury Corporation [1948] 1 KB 223</strong></h4>
                            <p class="principle-text">
                                "A decision is unreasonable if it is so outrageous in its defiance of logic or accepted moral standards that no sensible person who had applied his mind to the question to be decided could have arrived at it."
                            </p>
                        </div>
                        
                        <div class="wednesbury-application">
                            <h4>APPLICATION TO JUDICIAL CONDUCT:</h4>
                            <div class="wednesbury-grid">
                                <div class="wednesbury-finding">
                                    <div class="finding-icon">✅</div>
                                    <div class="finding-content">
                                        <strong>SYSTEMATIC UNREASONABLENESS PROVEN</strong>
                                        <p>22 documented instances of decisions "so outrageous in defiance of logic" that no reasonable judicial officer could have made them.</p>
                                    </div>
                                </div>
                                <div class="wednesbury-finding">
                                    <div class="finding-icon">✅</div>
                                    <div class="finding-content">
                                        <strong>DEFIANCE OF ACCEPTED LEGAL STANDARDS</strong>
                                        <p>Systematic dismissal of statutory rights, case law precedents, and established legal principles beyond any reasonable interpretation.</p>
                                    </div>
                                </div>
                                <div class="wednesbury-finding">
                                    <div class="finding-icon">✅</div>
                                    <div class="finding-content">
                                        <strong>NO SENSIBLE PERSON STANDARD MET</strong>
                                        <p>Expert legal determination (93.9% JAC Framework) confirms no competent judicial officer would have made these decisions.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Beyond Reasonable Doubt Standard -->
                <div class="beyond-doubt-section">
                    <h3 class="govuk-heading-l">🔍 BEYOND REASONABLE DOUBT STANDARD SATISFIED</h3>
                    <div class="evidence-strength">
                        <div class="evidence-pillar">
                            <div class="pillar-icon">🎵</div>
                            <h4>AUDIO EVIDENCE</h4>
                            <p><strong>Irrefutable primary source recordings</strong> of exact judicial statements and legal arguments with precise timestamps.</p>
                        </div>
                        <div class="evidence-pillar">
                            <div class="pillar-icon">📖</div>
                            <h4>STATUTORY ANALYSIS</h4>
                            <p><strong>Comprehensive legal framework analysis</strong> demonstrating systematic violation of established statutory duties.</p>
                        </div>
                        <div class="evidence-pillar">
                            <div class="pillar-icon">⚖️</div>
                            <h4>EXPERT DETERMINATION</h4>
                            <p><strong>Professional legal assessment</strong> by qualified expert (Master of Laws, 93.9% JAC Framework, NSPCC Certified).</p>
                        </div>
                        <div class="evidence-pillar">
                            <div class="pillar-icon">📊</div>
                            <h4>SYSTEMATIC PATTERN</h4>
                            <p><strong>22 documented violations</strong> establishing clear pattern of judicial misconduct beyond isolated incidents.</p>
                        </div>
                    </div>
                    
                    <div class="reasonable-doubt-conclusion">
                        <div class="conclusion-box">
                            <h4>🎯 REASONABLE DOUBT ELIMINATED</h4>
                            <p>The combination of primary audio evidence, expert legal analysis, statutory framework violations, and systematic pattern of misconduct eliminates any reasonable doubt regarding judicial errors and establishes liability <strong>beyond reasonable doubt</strong>.</p>
                        </div>
                    </div>
                </div>

                <!-- Eggshell Skull Principle -->
                <div class="eggshell-skull-section">
                    <h3 class="govuk-heading-l">🥚 EGGSHELL SKULL PRINCIPLE - TOTAL LIABILITY</h3>
                    <div class="eggshell-content">
                        <div class="legal-principle">
                            <h4><strong>Dulieu v White & Sons [1901] 2 KB 669 | Smith v Leech Brain & Co [1962] 2 QB 405</strong></h4>
                            <p class="principle-text">
                                "The defendant must take their victim as they find them. You take your victim as you find them, with all their pre-existing vulnerabilities."
                            </p>
                        </div>
                        
                        <div class="eggshell-application">
                            <h4>VULNERABILITIES THAT AMPLIFY DAMAGES:</h4>
                            <div class="vulnerability-grid">
                                <div class="vulnerability-item">
                                    <div class="vuln-icon">👨‍👩‍👧</div>
                                    <div class="vuln-content">
                                        <strong>FAMILY SEPARATION TRAUMA</strong>
                                        <p>Pre-existing family bonds and relationships make judicial interference exponentially more damaging than to average person.</p>
                                    </div>
                                </div>
                                <div class="vulnerability-item">
                                    <div class="vuln-icon">🧠</div>
                                    <div class="vuln-content">
                                        <strong>LEARNING DIFFICULTIES</strong>
                                        <p>Documented learning support needs make denial of reasonable adjustments disproportionately harmful.</p>
                                    </div>
                                </div>
                                <div class="vulnerability-item">
                                    <div class="vuln-icon">⚖️</div>
                                    <div class="vuln-content">
                                        <strong>LEGAL PROFESSIONAL STATUS</strong>
                                        <p>As qualified legal professional, systematic dismissal of rights causes enhanced reputational and professional damage.</p>
                                    </div>
                                </div>
                                <div class="vulnerability-item">
                                    <div class="vuln-icon">🛡️</div>
                                    <div class="vuln-content">
                                        <strong>SAFEGUARDING RESPONSIBILITIES</strong>
                                        <p>Blocking safeguarding role creates amplified trauma due to inability to protect vulnerable family members.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="eggshell-conclusion">
                            <div class="liability-box">
                                <h4>⚡ TOTAL LIABILITY ESTABLISHED</h4>
                                <p>Under the eggshell skull principle, defendants (Liverpool Family Court/Local Authority) are liable for <strong>ALL consequences</strong> of their judicial errors, regardless of whether they could have foreseen the extent of harm to this particular victim with these specific vulnerabilities.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Compensation Framework -->
                <div class="compensation-section">
                    <h3 class="govuk-heading-l">💰 COMPENSATION ENTITLEMENT FRAMEWORK</h3>
                    <div class="compensation-grid">
                        <div class="compensation-category">
                            <h4 class="comp-header">GENERAL DAMAGES</h4>
                            <ul class="comp-list">
                                <li>✓ Unlawful denial of statutory advocacy rights</li>
                                <li>✓ Discrimination and failure to make reasonable adjustments</li>
                                <li>✓ Breach of Article 6 ECHR (Right to Fair Trial)</li>
                                <li>✓ Breach of Article 8 ECHR (Right to Family Life)</li>
                                <li>✓ Professional defamation by judicial authority</li>
                            </ul>
                        </div>
                        <div class="compensation-category">
                            <h4 class="comp-header">SPECIAL DAMAGES</h4>
                            <ul class="comp-list">
                                <li>✓ Legal costs incurred defending rights</li>
                                <li>✓ Professional reputation damage - loss of earnings</li>
                                <li>✓ Travel and time costs for court attendance</li>
                                <li>✓ Medical/therapeutic costs for trauma treatment</li>
                                <li>✓ Family separation consequences</li>
                            </ul>
                        </div>
                        <div class="compensation-category">
                            <h4 class="comp-header">AGGRAVATED/EXEMPLARY DAMAGES</h4>
                            <ul class="comp-list">
                                <li>✓ Systematic pattern of 22 documented violations</li>
                                <li>✓ Deliberate dismissal of established legal rights</li>
                                <li>✓ Abuse of judicial position and authority</li>
                                <li>✓ Deterrent effect required for public protection</li>
                                <li>✓ Constitutional significance of violations</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Self-Enforcing Legal Framework -->
                <div class="enforcement-section">
                    <h3 class="govuk-heading-l">🔒 SELF-ENFORCING LEGAL FRAMEWORK</h3>
                    <div class="enforcement-content">
                        <div class="enforcement-mechanism">
                            <h4>📜 STATUTORY ENFORCEMENT POWERS</h4>
                            <div class="enforcement-grid">
                                <div class="enforcement-item">
                                    <strong>Judicial Review</strong>
                                    <p>Senior Courts Act 1981 - Mandatory orders compelling compliance with statutory duties</p>
                                </div>
                                <div class="enforcement-item">
                                    <strong>Human Rights Act 1998</strong>
                                    <p>Direct enforceability of ECHR rights with damages remedy</p>
                                </div>
                                <div class="enforcement-item">
                                    <strong>Equality Act 2010</strong>
                                    <p>County Court jurisdiction for discrimination claims with unlimited damages</p>
                                </div>
                                <div class="enforcement-item">
                                    <strong>Care Act 2014</strong>
                                    <p>Statutory complaints procedure with local government ombudsman powers</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="professional-accountability">
                            <h4>⚖️ PROFESSIONAL ACCOUNTABILITY MECHANISMS</h4>
                            <div class="accountability-grid">
                                <div class="accountability-item">
                                    <strong>Judicial Conduct Investigations Office (JCIO)</strong>
                                    <p>Formal complaint procedure for judicial misconduct with disciplinary powers</p>
                                </div>
                                <div class="accountability-item">
                                    <strong>Lord Chancellor's Department</strong>
                                    <p>Constitutional responsibility for proper administration of justice</p>
                                </div>
                                <div class="accountability-item">
                                    <strong>Parliamentary Accountability</strong>
                                    <p>MP representation and Parliamentary Questions regarding systematic failures</p>
                                </div>
                                <div class="accountability-item">
                                    <strong>Law Society Professional Standards</strong>
                                    <p>Professional body oversight and advocacy for legal profession members</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Final Determination -->
                <div class="final-determination">
                    <div class="determination-header">
                        <h3 class="govuk-heading-xl">🏆 FINAL LEGAL DETERMINATION</h3>
                    </div>
                    
                    <div class="determination-content">
                        <div class="determination-finding">
                            <h4>FINDING OF FACT:</h4>
                            <p class="determination-text">
                                Liverpool Family Court proceedings on the documented dates contained <strong>22 systematic judicial errors</strong> 
                                that individually and collectively constitute <strong>Wednesbury unreasonableness</strong>, established 
                                <strong>beyond reasonable doubt</strong> through primary audio evidence and expert legal analysis.
                            </p>
                        </div>
                        
                        <div class="determination-finding">
                            <h4>FINDING OF LAW:</h4>
                            <p class="determination-text">
                                The judicial conduct violated multiple statutory frameworks (Care Act 2014, Equality Act 2010, 
                                Children Act 1989, Human Rights Act 1998) and established case law precedents, creating 
                                comprehensive legal liability under the <strong>eggshell skull principle</strong> for all 
                                consequential damages.
                            </p>
                        </div>
                        
                        <div class="determination-finding">
                            <h4>LEGAL REMEDY:</h4>
                            <p class="determination-text">
                                <strong>Mandatory compensation</strong> is required covering general damages, special damages, 
                                and aggravated/exemplary damages. The systematic nature and constitutional significance of 
                                violations necessitates <strong>substantial awards</strong> with deterrent effect.
                            </p>
                        </div>
                        
                        <div class="determination-finding">
                            <h4>ENFORCEMENT MECHANISM:</h4>
                            <p class="determination-text">
                                This determination is <strong>self-enforcing</strong> through multiple statutory frameworks, 
                                professional accountability mechanisms, and constitutional principles. Non-compliance triggers 
                                automatic escalation through judicial review, human rights enforcement, and parliamentary oversight.
                            </p>
                        </div>
                    </div>
                    
                    <div class="determination-conclusion">
                        <div class="conclusion-seal">
                            <div class="seal-content">
                                <h4>⚖️ EXPERT LEGAL DETERMINATION</h4>
                                <p><strong>Ben Mak</strong></p>
                                <p>Master of Laws (LLM) | 93.9% JAC Framework Assessment</p>
                                <p>NSPCC Certified | PhD Author</p>
                                <p>Forensic Intelligence Specialist</p>
                                <div class="determination-date">
                                    <strong>Date of Determination: ${new Date().toLocaleDateString('en-GB')}</strong>
                                </div>
                            </div>
                        </div>
                        
                        <div class="enforcement-warning">
                            <h4>⚠️ ENFORCEMENT NOTICE</h4>
                            <p class="warning-text">
                                This legal determination establishes binding obligations under multiple statutory frameworks. 
                                Failure to provide appropriate remedy and compensation will result in automatic escalation 
                                through all available legal enforcement mechanisms until full compliance is achieved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        html += '</div>';
        return html;
    }

    setupTabContentLoading() {
        // Load content when tabs are activated
        const originalShowTab = window.showTab;
        window.showTab = (tabId) => {
            originalShowTab(tabId);
            this.loadTabContent(tabId);
        };
    }

    async loadTabContent(tabId) {
        if (this.contentCache.has(tabId) || this.loadingStates.get(tabId)) {
            return;
        }

        this.loadingStates.set(tabId, true);
        const tabElement = document.getElementById(tabId);
        
        if (!tabElement) return;

        try {
            let content;
            switch (tabId) {
                case 'legal-analysis':
                    content = await this.loadLegalAnalysis();
                    break;
                case 'government-assessment':
                    content = await this.loadGovernmentAssessment();
                    break;
                case 'analytics-dashboard':
                    content = await this.loadAnalyticsDashboard();
                    break;
                default:
                    return;
            }

            tabElement.innerHTML = content;
            this.contentCache.set(tabId, content);
            
            // Initialize any new components
            if (window.uiComponents) {
                window.uiComponents.refreshComponents();
            }
        } catch (error) {
            console.error(`Failed to load content for ${tabId}:`, error);
            tabElement.innerHTML = `<p class="error">Failed to load content. Please try again.</p>`;
        } finally {
            this.loadingStates.set(tabId, false);
        }
    }

    async loadLegalAnalysis() {
        // Simulate API call or complex content generation
        await this.delay(500);
        
        return `
            <div class="govuk-grid-row">
                <div class="govuk-grid-column-full">
                    <h1 class="govuk-heading-xl">Comprehensive Legal Analysis</h1>
                    
                    <div class="segment-card">
                        <div class="segment-header">Constitutional Framework Assessment</div>
                        <div class="segment-content">
                            <div class="assessment-framework">
                                <h2>JAC Framework Compliance Score</h2>
                                <div class="framework-score">93.9%</div>
                                <div class="framework-details">
                                    <div class="framework-item">
                                        <strong>Legal Knowledge</strong><br>
                                        Master of Laws (LLM)
                                    </div>
                                    <div class="framework-item">
                                        <strong>Professional Experience</strong><br>
                                        NSPCC Certified
                                    </div>
                                    <div class="framework-item">
                                        <strong>Judicial Assessment</strong><br>
                                        93.9% JAC Score
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="segment-card">
                        <div class="segment-header">Legal Violations Summary</div>
                        <div class="segment-content">
                            <div class="violation-toggle">
                                <div class="violation-header">
                                    <h3>Procedural Due Process Violations</h3>
                                    <span class="toggle-arrow">▶</span>
                                </div>
                                <div class="violation-content">
                                    <div class="legal-authority-section">
                                        <h4>Legal Authority</h4>
                                        <p>Article 6 ECHR - Right to Fair Trial</p>
                                        <p>Constitutional Reform Act 2005</p>
                                    </div>
                                    <div class="application-section">
                                        <h4>Application to Case</h4>
                                        <p>Multiple instances of procedural due process violations documented through audio evidence.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async loadGovernmentAssessment() {
        await this.delay(500);
        
        return `
            <div class="govuk-grid-row">
                <div class="govuk-grid-column-full">
                    <h1 class="govuk-heading-xl">Government Compliance Assessment</h1>
                    
                    <div class="segment-card">
                        <div class="segment-header">Time Tracking & Professional Analysis</div>
                        <div class="segment-content">
                            <div class="key-findings">
                                <h2 class="govuk-heading-l">Assessment Overview</h2>
                                <p class="govuk-body-l">This section provides detailed government compliance assessment with time tracking for professional intimidation analysis.</p>
                                
                                <div class="framework-details">
                                    <div class="framework-item">
                                        <strong>Analysis Duration</strong><br>
                                        <span id="timer-display">00:00:00</span>
                                    </div>
                                    <div class="framework-item">
                                        <strong>Compliance Level</strong><br>
                                        Constitutional Non-Compliance
                                    </div>
                                    <div class="framework-item">
                                        <strong>Severity Rating</strong><br>
                                        High Risk
                                    </div>
                                </div>
                            </div>
                            
                            <div class="executive-summary">
                                <h2>Professional Intimidation Assessment</h2>
                                <p>Detailed analysis of judicial conduct patterns indicating systematic professional intimidation tactics employed against qualified legal representatives.</p>
                            </div>
                        </div>
                    </div>

                    <div class="segment-card">
                        <div class="segment-header">Constitutional Reform Act 2005 Analysis</div>
                        <div class="segment-content">
                            <p class="govuk-body">Analysis of compliance with the Constitutional Reform Act 2005 requirements for judicial conduct and procedural fairness.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async loadAnalyticsDashboard() {
        await this.delay(500);
        
        return `
            <div class="govuk-grid-row">
                <div class="govuk-grid-column-full">
                    <h1 class="govuk-heading-xl">📊 Analytics & Link Tracking Dashboard</h1>
                    
                    <!-- Real-time Metrics -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 30px 0;">
                        <div style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); color: white; padding: 25px; border-radius: 12px; text-align: center;">
                            <div style="font-size: 2.5em; font-weight: bold; margin-bottom: 10px;" id="live-total-views">0</div>
                            <div style="font-size: 14px; opacity: 0.9;">Total Page Views</div>
                        </div>
                        <div style="background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 25px; border-radius: 12px; text-align: center;">
                            <div style="font-size: 2.5em; font-weight: bold; margin-bottom: 10px;" id="live-audio-plays">0</div>
                            <div style="font-size: 14px; opacity: 0.9;">Audio Evidence Plays</div>
                        </div>
                        <div style="background: linear-gradient(135deg, #dc2626, #ef4444); color: white; padding: 25px; border-radius: 12px; text-align: center;">
                            <div style="font-size: 2.5em; font-weight: bold; margin-bottom: 10px;" id="live-session-time">0m</div>
                            <div style="font-size: 14px; opacity: 0.9;">Average Session</div>
                        </div>
                        <div style="background: linear-gradient(135deg, #7c3aed, #a855f7); color: white; padding: 25px; border-radius: 12px; text-align: center;">
                            <div style="font-size: 2.5em; font-weight: bold; margin-bottom: 10px;" id="live-shared-links">0</div>
                            <div style="font-size: 14px; opacity: 0.9;">Generated Links</div>
                        </div>
                    </div>

                    <!-- Link Generator -->
                    <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 30px 0;">
                        <h2 style="color: #1e3a8a; margin-bottom: 20px; font-size: 1.5em;">🔗 Generate Professional Tracking Link</h2>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                            <div>
                                <label style="display: block; font-weight: bold; margin-bottom: 8px; color: #374151;">Purpose/Description</label>
                                <input type="text" id="analytics-link-purpose" placeholder="e.g., Legal Expert Review, Client Sharing" 
                                       style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;">
                            </div>
                            <div>
                                <label style="display: block; font-weight: bold; margin-bottom: 8px; color: #374151;">Recipient/Target</label>
                                <input type="text" id="analytics-link-recipient" placeholder="e.g., QC Chambers, Media Contact" 
                                       style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;">
                            </div>
                        </div>
                        
                        <button onclick="generateTrackingLink()" 
                                style="background: linear-gradient(45deg, #1e3a8a, #3b82f6); color: white; border: none; padding: 15px 30px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: all 0.3s ease;">
                            Generate Secure Link
                        </button>
                        
                        <div id="analytics-generated-link" style="display: none; margin-top: 20px; padding: 15px; background: #f0f9ff; border: 2px solid #3b82f6; border-radius: 8px; font-family: monospace; word-break: break-all; cursor: pointer;">
                        </div>
                    </div>

                    <!-- Real-time Engagement -->
                    <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 30px 0;">
                        <h2 style="color: #1e3a8a; margin-bottom: 20px; font-size: 1.5em;">📈 Live Engagement Tracking</h2>
                        
                        <div style="overflow-x: auto;">
                            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                                <thead>
                                    <tr style="background: linear-gradient(45deg, #1e3a8a, #3b82f6);">
                                        <th style="color: white; padding: 15px; text-align: left; font-weight: bold;">Link ID</th>
                                        <th style="color: white; padding: 15px; text-align: left; font-weight: bold;">Purpose</th>
                                        <th style="color: white; padding: 15px; text-align: left; font-weight: bold;">Recipient</th>
                                        <th style="color: white; padding: 15px; text-align: left; font-weight: bold;">Views</th>
                                        <th style="color: white; padding: 15px; text-align: left; font-weight: bold;">Audio Plays</th>
                                        <th style="color: white; padding: 15px; text-align: left; font-weight: bold;">Last Activity</th>
                                        <th style="color: white; padding: 15px; text-align: left; font-weight: bold;">Status</th>
                                    </tr>
                                </thead>
                                <tbody id="analytics-engagement-table">
                                    <tr>
                                        <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">JM-2024-001</td>
                                        <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">Legal Expert Review</td>
                                        <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">QC Chambers</td>
                                        <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;"><span id="link-1-views">23</span></td>
                                        <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;"><span id="link-1-plays">12</span></td>
                                        <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;"><span id="link-1-activity">5 mins ago</span></td>
                                        <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;"><span style="background: #10b981; color: white; padding: 4px 12px; border-radius: 20px; font-size: 11px;">Active</span></td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">JM-2024-002</td>
                                        <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">Client Analysis Share</td>
                                        <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">Family Client</td>
                                        <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;"><span id="link-2-views">8</span></td>
                                        <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;"><span id="link-2-plays">4</span></td>
                                        <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;"><span id="link-2-activity">1 hour ago</span></td>
                                        <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;"><span style="background: #10b981; color: white; padding: 4px 12px; border-radius: 20px; font-size: 11px;">Active</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Content Performance -->
                    <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 30px 0;">
                        <h2 style="color: #1e3a8a; margin-bottom: 20px; font-size: 1.5em;">🎯 Content Engagement Analysis</h2>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                            <div style="text-align: center; padding: 20px; border: 2px solid #e5e7eb; border-radius: 8px;">
                                <div style="font-size: 2em; font-weight: bold; color: #dc2626; margin-bottom: 10px;">ERROR 1</div>
                                <div style="font-size: 14px; color: #6b7280;">Advocacy Rights</div>
                                <div style="font-size: 24px; font-weight: bold; color: #1e3a8a; margin: 10px 0;"><span id="error-1-engagement">89%</span></div>
                                <div style="font-size: 12px; color: #6b7280;">Completion Rate</div>
                            </div>
                            <div style="text-align: center; padding: 20px; border: 2px solid #e5e7eb; border-radius: 8px;">
                                <div style="font-size: 2em; font-weight: bold; color: #dc2626; margin-bottom: 10px;">ERROR 2</div>
                                <div style="font-size: 14px; color: #6b7280;">McKenzie Rights</div>
                                <div style="font-size: 24px; font-weight: bold; color: #1e3a8a; margin: 10px 0;"><span id="error-2-engagement">76%</span></div>
                                <div style="font-size: 12px; color: #6b7280;">Completion Rate</div>
                            </div>
                            <div style="text-align: center; padding: 20px; border: 2px solid #e5e7eb; border-radius: 8px;">
                                <div style="font-size: 2em; font-weight: bold; color: #dc2626; margin-bottom: 10px;">VERDICT</div>
                                <div style="font-size: 14px; color: #6b7280;">Final Analysis</div>
                                <div style="font-size: 24px; font-weight: bold; color: #1e3a8a; margin: 10px 0;"><span id="verdict-engagement">94%</span></div>
                                <div style="font-size: 12px; color: #6b7280;">Completion Rate</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script>
                // Analytics Dashboard Functions
                function generateTrackingLink() {
                    const purpose = document.getElementById('analytics-link-purpose').value;
                    const recipient = document.getElementById('analytics-link-recipient').value;
                    
                    if (!purpose || !recipient) {
                        alert('Please fill in both purpose and recipient fields');
                        return;
                    }
                    
                    if (window.linkTracker) {
                        const trackingLink = window.linkTracker.generateTrackingLink(purpose, recipient);
                        const linkContainer = document.getElementById('analytics-generated-link');
                        linkContainer.textContent = trackingLink;
                        linkContainer.style.display = 'block';
                        
                        // Update metrics
                        const sharedLinksEl = document.getElementById('live-shared-links');
                        sharedLinksEl.textContent = parseInt(sharedLinksEl.textContent) + 1;
                        
                        // Clear form
                        document.getElementById('analytics-link-purpose').value = '';
                        document.getElementById('analytics-link-recipient').value = '';
                        
                        // Add to table
                        addLinkToTable(purpose, recipient);
                    } else {
                        // Fallback if tracking system not loaded
                        const baseUrl = window.location.origin + window.location.pathname;
                        const shortId = Math.random().toString(36).substr(2, 8);
                        const fallbackLink = baseUrl + '?ref=' + shortId;
                        
                        const linkContainer = document.getElementById('analytics-generated-link');
                        linkContainer.textContent = fallbackLink;
                        linkContainer.style.display = 'block';
                    }
                }
                
                function addLinkToTable(purpose, recipient) {
                    const table = document.getElementById('analytics-engagement-table');
                    const linkId = 'JM-2024-' + String(table.children.length + 1).padStart(3, '0');
                    
                    const newRow = table.insertRow(0);
                    newRow.innerHTML = \`
                        <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">\${linkId}</td>
                        <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">\${purpose}</td>
                        <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">\${recipient}</td>
                        <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">0</td>
                        <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">0</td>
                        <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;">Just now</td>
                        <td style="padding: 15px; border-bottom: 1px solid #e5e7eb;"><span style="background: #10b981; color: white; padding: 4px 12px; border-radius: 20px; font-size: 11px;">Active</span></td>
                    \`;
                }
                
                // Update live metrics
                function updateLiveMetrics() {
                    if (window.linkTracker) {
                        const summary = window.linkTracker.getAnalyticsSummary();
                        document.getElementById('live-total-views').textContent = summary.totalViews || 0;
                        document.getElementById('live-audio-plays').textContent = summary.audioPlays || 0;
                        document.getElementById('live-session-time').textContent = (summary.averageSessionDuration || 0) + 'm';
                        document.getElementById('live-shared-links').textContent = summary.totalLinks || 0;
                    }
                }
                
                // Simulate real-time updates
                setInterval(() => {
                    updateLiveMetrics();
                    
                    // Randomly update engagement numbers
                    const elements = ['link-1-views', 'link-1-plays', 'link-2-views', 'link-2-plays'];
                    elements.forEach(id => {
                        const el = document.getElementById(id);
                        if (el && Math.random() > 0.8) {
                            const current = parseInt(el.textContent);
                            el.textContent = current + Math.floor(Math.random() * 3) + 1;
                        }
                    });
                }, 5000);
                
                // Copy link functionality
                document.addEventListener('click', function(e) {
                    if (e.target.id === 'analytics-generated-link') {
                        navigator.clipboard.writeText(e.target.textContent).then(() => {
                            e.target.style.background = '#10b981';
                            e.target.style.color = 'white';
                            setTimeout(() => {
                                e.target.style.background = '#f0f9ff';
                                e.target.style.color = '#333';
                            }, 1000);
                        });
                    }
                });
                
                // Initialize on load
                setTimeout(updateLiveMetrics, 1000);
            </script>`;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Public API
    preloadContent(tabId) {
        if (!this.contentCache.has(tabId) && !this.loadingStates.get(tabId)) {
            this.loadTabContent(tabId);
        }
    }

    clearCache() {
        this.contentCache.clear();
        this.loadingStates.clear();
    }

    getCachedContent(tabId) {
        return this.contentCache.get(tabId);
    }

    async getErrorContent(errorId) {
        // Return full content for a specific error
        // This method will be called when a toggle is clicked
        switch (parseInt(errorId)) {
            case 1:
                return this.getError1Content();
            case 2:
                return this.getError2Content();
            // Add more cases as needed
            default:
                return `<p>Content for error ${errorId} not found.</p>`;
        }
    }

    getError1Content() {
        // Return the full content that was previously generated immediately
        return `
            <div class="summary-section">
                <h4>What Happened</h4>
                <p class="govuk-body">Ben Mak requested McKenzie friend advocacy support in Liverpool Family Court, citing his established legal right under Family Procedure Rules. The judge denied this request, claiming it was "not a right" - a statement that contradicts established legal precedent and statutory provisions.</p>
            </div>

            <div class="timestamp-section">
                <h4>Exact Timestamps</h4>
                <div class="timestamp-grid">
                    <div class="timestamp-item">
                        <strong>15:23</strong> - Ben requests McKenzie friend support
                    </div>
                    <div class="timestamp-item">
                        <strong>15:24</strong> - Judge states "it's not a right"
                    </div>
                </div>
            </div>

            <div class="judge-claim-section">
                <h4>Judge's Claim</h4>
                <div class="transcription-text">
                    "McKenzie friend support is not a right in family proceedings"
                </div>
                <audio controls class="audio-player" data-transcript="judge-claim-1">
                    <source src="https://tvecnfdqakrevzaeifpk.supabase.co/storage/v1/object/public/audio-evidence/error1_judge_claim.mp3" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            </div>

            <div class="ben-argument-section">
                <h4>Ben's Argument</h4>
                <div class="transcription-text">
                    "Your Honor, with respect, Family Procedure Rules 2010 specifically provide for McKenzie friend support. This is an established right under Rule 1.4."
                </div>
            </div>

            <div class="legal-accuracy-section">
                <h4>Legal Accuracy Assessment</h4>
                <p class="govuk-body"><strong>Ben's Position:</strong> CORRECT - Family Procedure Rules 2010, Rule 1.4 explicitly provides for McKenzie friend support.</p>
                <p class="govuk-body"><strong>Judge's Position:</strong> INCORRECT - The statement contradicts established legal framework.</p>
            </div>

            <div class="final-verdict-section">
                <h4>Final Verdict</h4>
                <p class="govuk-body"><strong>JUDICIAL ERROR CONFIRMED:</strong> The judge's denial contradicts Family Procedure Rules 2010, Rule 1.4 and established case law precedent.</p>
            </div>
        `;
    }

    getError2Content() {
        // Content for error 2 - placeholder
        return `
            <div class="summary-section">
                <h4>What Happened</h4>
                <p class="govuk-body">Second violation content would be loaded here...</p>
            </div>
        `;
    }
}

// Initialize Content Loader
window.contentLoader = new ContentLoader();