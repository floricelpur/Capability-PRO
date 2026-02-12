// ========== LANGUAGE TRANSLATIONS ==========
const translations = {
    en: {
        // Navigation
        appTitle: "Capability PRO",
        versionText: "v1.0 Free",
        githubLink: "GitHub",
        
        // Left Column - Spec Type
        specTypeHeader: "Specification Type",
        specTypeLabel: "Type:",
        bilateral: "Bilateral (LSL and USL)",
        unilateralLSL: "Unilateral LSL only",
        unilateralUSL: "Unilateral USL only",
        whatIsSpecType: "What is Specification Type?",
        
        // Left Column - Spec Limits
        specLimitsHeader: "Specification Limits",
        lslLabel: "LSL:",
        uslLabel: "USL:",
        
        // Left Column - Value Range
        valueRangeHeader: "Value Range Limits",
        minValLabel: "Min Value:",
        maxValLabel: "Max Value:",
        rangeInfo: "Values STRICTLY between Min and Max",
        
        // Left Column - Setup Parameters
        setupParamsHeader: "Setup Parameters",
        targetCpkLabel: "Target Cpk:",
        decimalsLabel: "Decimals:",
        sampleSizeLabel: "Sample Size:",
        subgroupSizeLabel: "Subgroup Size:",
        sigmaLabel: "Sigma %:",
        maxIterationsLabel: "Max Iterations:",
        adjustmentFactorLabel: "Adjustment Factor:",
        toleranceLabel: "Tolerance:",
        
        // Advanced Options
        advancedOptions: "Advanced Options",
        forceRangeMode: "Force Range Mode",
        autoAdjust: "Auto-Adjust Parameters",
        
        // Buttons
        generateBtn: "GENERATE VALUES",
        stopBtn: "STOP",
        copyAll: "Copy All Values",
        clearTable: "Clear Table",
        exportCSV: "Export to CSV",
        toggleFullscreen: "Fullscreen",
        closeBtn: "Close",
        
        // Center Column - Process Capability Statistics
        processCapHeader: "Process Capability Statistics",
        processDataSection: "Process Data",
        capabilityIndicesSection: "Capability Indices",
        lslValue: "LSL",
        uslValue: "USL",
        targetValue: "Target",
        meanValue: "Sample Mean",
        nValue: "Sample N",
        meanToTarget: "Mean to Target",
        stdDevOverall: "StdDev(Overall)",
        stdDevWithin: "StdDev(Within)",
        cpValue: "Cp",
        cpkValue: "Cpk",
        ppValue: "Pp",
        ppkValue: "PpK",
        cpuValue: "Cpu",
        cplValue: "Cpl",
        kValue: "K (Shift)",
        crValue: "Cr (1/Cp)",
        
        // Histogram
        histogramHeader: "Distribution Histogram",
        frequency: "Frequency",
        measuredValue: "Measured Value",
        
        // Right Column
        rightSideHeader: "Quick Actions",
        languageSelector: "Language",
        generatedValuesHeader: "Generated Values",
        noValues: "No values generated yet.",
        
        // Status Display
        restrictedMode: "🔒 RESTRICTED MODE",
        freeMode: "⚡ FREE MODE",
        generating: "Generating values",
        searching: "Searching...",
        targetAchieved: "✅ Target Cpk achieved after",
        attempts: "attempts",
        generationComplete: "✅ Generation complete!",
        allInRange: "all in range",
        someOutsideRange: "some outside range - clipping applied",
        valuesOutsideRange: "values outside range",
        targetCpkAchieved: "Target Cpk achieved:",
        bestCpk: "Best Cpk:",
        mean: "Mean:",
        sigma: "Sigma:",
        stoppedByUser: "Generation stopped by user.",
        generationError: "Generation failed:",
        generationErrorValidation: "Please enter valid numbers for all required fields.",
        bilateralError: "LSL must be less than USL for bilateral specification.",
        cpkLimitError: "⚠️ Cannot achieve target Cpk due to min/max value constraints. The specification limits are too tight relative to the allowed range (Min: {min}, Max: {max}, Range: {range}). Try: 1) Widening Min/Max range, 2) Relaxing Target Cpk, or 3) Widening LSL/USL specifications.",
        
        // Info Button Text
        infoButton: "ℹ",
        
        // Statistics Info
        statsTitles: {
            "LSL": "Lower Specification Limit",
            "USL": "Upper Specification Limit",
            "Target": "Target Value",
            "Mean": "Sample Mean",
            "Sample N": "Sample Size",
            "Mean to Target": "Mean to Target",
            "StdDev(Overall)": "Overall Standard Deviation",
            "StdDev(Within)": "Within Subgroup Standard Deviation",
            "Cp": "Process Capability",
            "Cpk": "Process Capability Index",
            "Pp": "Process Performance",
            "PpK": "Process Performance Index",
            "Cpu": "Upper Process Capability",
            "Cpl": "Lower Process Capability",
            "K (Shift)": "Process Shift",
            "Cr (1/Cp)": "Capability Ratio"
        },
        
        statsExplanations: {
            "LSL": "The minimum acceptable value for the process. Values below LSL are considered non-conforming.",
            "USL": "The maximum acceptable value for the process. Values above USL are considered non-conforming.",
            "Target": "The desired process mean, typically the midpoint between LSL and USL.",
            "Mean": "The arithmetic average of all generated values. Calculated as sum of values divided by count.",
            "Sample N": "Number of data points in the sample. Larger samples provide more reliable statistics.",
            "Mean to Target": "Difference between actual mean and target value. Measures process centering.",
            "StdDev(Overall)": "Standard deviation of all data points (long-term variation). Includes all sources of variation.",
            "StdDev(Within)": "Standard deviation within subgroups (short-term variation). Represents inherent process capability.",
            "Cp": "Measures potential capability if process is centered. Does not consider process centering.",
            "Cpk": "Measures actual capability considering centering. Always ≤ Cp.",
            "Pp": "Similar to Cp but uses overall standard deviation. Measures long-term performance.",
            "PpK": "Similar to Cpk but uses overall standard deviation. Measures long-term performance considering centering.",
            "Cpu": "Capability relative to USL only. Used when only upper specification is relevant.",
            "Cpl": "Capability relative to LSL only. Used when only lower specification is relevant.",
            "K (Shift)": "How far the mean is from target (as % of tolerance). Measures process centering.",
            "Cr (1/Cp)": "Inverse of Cp (smaller is better). Represents proportion of specification width used."
        },
        
        // Specification Type Info
        specTypeTitle: "Specification Types Information",
        bilateral_info: "Bilateral (LSL and USL): Both lower and upper specification limits are defined.",
        bilateral_example: "Example: Diameter must be between 10.0 and 10.2 mm",
        unilateralLSL_info: "Unilateral LSL only: Only lower specification limit is defined.",
        unilateralLSL_example: "Example: Strength must be at least 100 MPa (no upper limit)",
        unilateralUSL_info: "Unilateral USL only: Only upper specification limit is defined.",
        unilateralUSL_example: "Example: Impurity must be no more than 0.5% (no lower limit)",
        specTypeSelectHint: "Select the type that matches your process requirements.",
        
        // Footer
        developedBy: "Developed by Florin Purdea",
        email: "purdeaflorin@gmail.com",
        
        // Notifications
        copiedToClipboard: "✅ Copied to clipboard",
        failedCopy: "❌ Failed to copy to clipboard",
        tableClearedMsg: "Table cleared. Ready for new generation.",
        tableCleared: "Table cleared",
        exportedValues: "Exported {count} values to CSV",
    },
    ro: {
        // Navigation
        appTitle: "Capability PRO",
        versionText: "v1.0 Gratis",
        githubLink: "GitHub",
        
        // Left Column - Spec Type
        specTypeHeader: "Tip de Specificație",
        specTypeLabel: "Tip:",
        bilateral: "Bilateral (LSL și USL)",
        unilateralLSL: "Unilateral LSL doar",
        unilateralUSL: "Unilateral USL doar",
        whatIsSpecType: "Ce este Tipul de Specificație?",
        
        // Left Column - Spec Limits
        specLimitsHeader: "Limite de Specificație",
        lslLabel: "LSL:",
        uslLabel: "USL:",
        
        // Left Column - Value Range
        valueRangeHeader: "Limite de Interval",
        minValLabel: "Valoare Minimă:",
        maxValLabel: "Valoare Maximă:",
        rangeInfo: "Valorile STRICT între Minim și Maxim",
        
        // Left Column - Setup Parameters
        setupParamsHeader: "Parametri de Configurare",
        targetCpkLabel: "Target Cpk:",
        decimalsLabel: "Zecimale:",
        sampleSizeLabel: "Dimensiune Eșantion:",
        subgroupSizeLabel: "Dimensiune Subgrup:",
        sigmaLabel: "Sigma %:",
        maxIterationsLabel: "Iterații Maxime:",
        adjustmentFactorLabel: "Factor de Ajustare:",
        toleranceLabel: "Toleranță:",
        
        // Advanced Options
        advancedOptions: "Opțiuni Avansate",
        forceRangeMode: "Forțează Modul de Interval",
        autoAdjust: "Ajustare Automată Parametri",
        
        // Buttons
        generateBtn: "GENEREAZĂ VALORI",
        stopBtn: "STOP",
        copyAll: "Copiază Toate Valorile",
        clearTable: "Șterge Tabel",
        exportCSV: "Exportă CSV",
        toggleFullscreen: "Ecran Complet",
        closeBtn: "Închide",
        
        // Center Column - Process Capability Statistics
        processCapHeader: "Statistici Privind Capabilitatea Procesului",
        processDataSection: "Date Proces",
        capabilityIndicesSection: "Indici de Capabilitate",
        lslValue: "LSL",
        uslValue: "USL",
        targetValue: "Țintă",
        meanValue: "Media Eșantionului",
        nValue: "Dimensiune Eșantion",
        meanToTarget: "Media la Țintă",
        stdDevOverall: "Devz.Std(Overall)",
        stdDevWithin: "Devz.Std(Within)",
        cpValue: "Cp",
        cpkValue: "Cpk",
        ppValue: "Pp",
        ppkValue: "PpK",
        cpuValue: "Cpu",
        cplValue: "Cpl",
        kValue: "K (Shift)",
        crValue: "Cr (1/Cp)",
        
        // Histogram
        histogramHeader: "Histogramă de Distribuție",
        frequency: "Frecvență",
        measuredValue: "Valoare Măsurată",
        
        // Right Column
        rightSideHeader: "Acțiuni Rapide",
        languageSelector: "Limbă",
        generatedValuesHeader: "Valori Generate",
        noValues: "Nicio valoare generată încă.",
        
        // Status Display
        restrictedMode: "🔒 MOD RESTRICȚIONAT",
        freeMode: "⚡ MOD LIBER",
        generating: "Generare valori",
        searching: "Căutare...",
        targetAchieved: "✅ Cpk țintă atins după",
        attempts: "încercări",
        generationComplete: "✅ Generare completă!",
        allInRange: "toate în interval",
        someOutsideRange: "unele în afara intervalului - decupare aplicată",
        valuesOutsideRange: "valori în afara intervalului",
        targetCpkAchieved: "Cpk țintă atins:",
        bestCpk: "Cel mai bun Cpk:",
        mean: "Media:",
        sigma: "Sigma:",
        stoppedByUser: "Generare oprită de utilizator.",
        generationError: "Generare eșuată:",
        generationErrorValidation: "Vă rugăm introduceți numere valide pentru toate câmpurile necesare.",
        bilateralError: "LSL trebuie să fie mai mic decât USL pentru specificație bilaterală.",
        cpkLimitError: "⚠️ Nu se poate atinge Cpk țintă din cauza constrângerilor intervalului min/max. Limitele de specificație sunt prea strânse în raport cu intervalul permis (Min: {min}, Max: {max}, Interval: {range}). Încercați: 1) Lărgiți intervalul Min/Max, 2) Relaxați Target Cpk, sau 3) Lărgiți specificațiile LSL/USL.",
        
        // Info Button Text
        infoButton: "ℹ",
        
        // Statistics Info
        statsTitles: {
            "LSL": "Limita Inferioare de Specificație",
            "USL": "Limita Superioară de Specificație",
            "Target": "Valoare Țintă",
            "Mean": "Media Eșantionului",
            "Sample N": "Dimensiune Eșantion",
            "Mean to Target": "Media la Țintă",
            "StdDev(Overall)": "Deviație Standard Totală",
            "StdDev(Within)": "Deviație Standard în Interiorul Subgrupului",
            "Cp": "Capabilitate de Proces",
            "Cpk": "Indice de Capabilitate de Proces",
            "Pp": "Performanța Procesului",
            "PpK": "Indice de Performanță a Procesului",
            "Cpu": "Capabilitate Superioară de Proces",
            "Cpl": "Capabilitate Inferioară de Proces",
            "K (Shift)": "Deplasare Proces",
            "Cr (1/Cp)": "Raport de Capabilitate"
        },
        
        statsExplanations: {
            "LSL": "Valoarea minimă acceptabilă pentru proces. Valorile sub LSL sunt considerate neconforme.",
            "USL": "Valoarea maximă acceptabilă pentru proces. Valorile peste USL sunt considerate neconforme.",
            "Target": "Media dorită a procesului, de obicei punctul medial între LSL și USL.",
            "Mean": "Media aritmetică a tuturor valorilor generate. Calculată ca suma valorilor împărțită la număr.",
            "Sample N": "Numărul de puncte de date din eșantion. Eșantioanele mai mari oferă statistici mai fiabile.",
            "Mean to Target": "Diferența dintre media efectivă și valoarea țintă. Măsoară centrarea procesului.",
            "StdDev(Overall)": "Deviația standard a tuturor punctelor de date (variație pe termen lung). Include toate sursele de variație.",
            "StdDev(Within)": "Deviația standard în cadrul subgrupurilor (variație pe termen scurt). Reprezintă capabilitatea inerentă a procesului.",
            "Cp": "Măsoară capabilitatea potențială dacă procesul este centrat. Nu ia în considerare centrarea procesului.",
            "Cpk": "Măsoară capabilitatea efectivă luând în considerare centrarea. Întotdeauna ≤ Cp.",
            "Pp": "Similar cu Cp, dar utilizează deviația standard totală. Măsoară performanța pe termen lung.",
            "PpK": "Similar cu Cpk, dar utilizează deviația standard totală. Măsoară performanța pe termen lung luând în considerare centrarea.",
            "Cpu": "Capabilitate în raport cu USL doar. Utilizată când doar specificația superioară este relevantă.",
            "Cpl": "Capabilitate în raport cu LSL doar. Utilizată când doar specificația inferioară este relevantă.",
            "K (Shift)": "Cât de departe este media de la țintă (ca % din toleranță). Măsoară centrarea procesului.",
            "Cr (1/Cp)": "Inversul Cp (mai mic este mai bun). Reprezintă proporția lățimii specificației utilizate."
        },
        
        // Specification Type Info
        specTypeTitle: "Informații despre Tipurile de Specificație",
        bilateral_info: "Bilateral (LSL și USL): Sunt definite atât limitele inferioare cât și cele superioare.",
        bilateral_example: "Exemplu: Diametrul trebuie să fie între 10.0 și 10.2 mm",
        unilateralLSL_info: "Unilateral LSL doar: Doar limita inferioară este definită.",
        unilateralLSL_example: "Exemplu: Rezistența trebuie să fie cel puțin 100 MPa (fără limită superioară)",
        unilateralUSL_info: "Unilateral USL doar: Doar limita superioară este definită.",
        unilateralUSL_example: "Exemplu: Impuritatea nu trebuie să depășească 0.5% (fără limită inferioară)",
        specTypeSelectHint: "Selectați tipul care se potrivește cerințelor procesului dumneavoastră.",
        
        // Footer
        developedBy: "Dezvoltat de Florin Purdea",
        email: "purdeaflorin@gmail.com",
        
        // Notifications
        copiedToClipboard: "✅ Copiat în clipboard",
        failedCopy: "❌ Copiere eșuată",
        tableClearedMsg: "Tabel șters. Gata pentru nouă generare.",
        tableCleared: "Tabel șters",
        exportedValues: "Exportate {count} valori în CSV",
    }
};

// ========== LANGUAGE MANAGEMENT ==========
let currentLanguage = localStorage.getItem('capabilityProLanguage') || 'ro';

function setLanguage(lang) {
    if (translations[lang]) {
        currentLanguage = lang;
        localStorage.setItem('capabilityProLanguage', lang);
        return true;
    }
    return false;
}

function getLanguage() {
    return currentLanguage;
}

function t(key) {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (let k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            // Fallback to English if key not found
            value = translations['en'];
            for (let fallbackKey of keys) {
                if (value && typeof value === 'object' && fallbackKey in value) {
                    value = value[fallbackKey];
                } else {
                    return key; // Return the key if not found
                }
            }
        }
    }
    return value;
}
