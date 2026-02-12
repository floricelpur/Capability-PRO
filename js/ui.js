// ========== STATISTICS INFORMATION ==========
const statInfo = {
    "LSL": {
        title: "Lower Specification Limit",
        explanation: "The minimum acceptable value for the process. Values below LSL are considered non-conforming.",
        formula: "LSL = Minimum acceptable value"
    },
    "USL": {
        title: "Upper Specification Limit",
        explanation: "The maximum acceptable value for the process. Values above USL are considered non-conforming.",
        formula: "USL = Maximum acceptable value"
    },
    "Target": {
        title: "Target Value",
        explanation: "The desired process mean, typically the midpoint between LSL and USL.",
        formula: "Target = (LSL + USL) / 2"
    },
    "Mean": {
        title: "Sample Mean",
        explanation: "The arithmetic average of all generated values. Calculated as sum of values divided by count.",
        formula: "Mean = (Σxᵢ) / n"
    },
    "Sample N": {
        title: "Sample Size",
        explanation: "Number of data points in the sample. Larger samples provide more reliable statistics.",
        formula: "n = Count(values)"
    },
    "Mean to Target": {
        title: "Mean to Target",
        explanation: "Difference between actual mean and target value. Measures process centering.",
        formula: "Mean to Target = Mean - Target"
    },
    "StdDev(Overall)": {
        title: "Overall Standard Deviation",
        explanation: "Standard deviation of all data points (long-term variation). Includes all sources of variation.",
        formula: "σ_overall = √[Σ(xᵢ - μ)² / (n-1)]"
    },
    "StdDev(Within)": {
        title: "Within Subgroup Standard Deviation",
        explanation: "Standard deviation within subgroups (short-term variation). Represents inherent process capability.",
        formula: "For subgroup size > 1: Uses pooled standard deviation<br>For subgroup size = 1: Uses average moving range"
    },
    "Cp": {
        title: "Process Capability",
        explanation: "Measures potential capability if process is centered. Does not consider process centering.",
        formula: "Cp = (USL - LSL) / (6σ_within)"
    },
    "Cpk": {
        title: "Process Capability Index",
        explanation: "Measures actual capability considering centering. Always ≤ Cp.",
        formula: "Cpk = min[(USL - μ)/(3σ_within), (μ - LSL)/(3σ_within)]"
    },
    "Pp": {
        title: "Process Performance",
        explanation: "Similar to Cp but uses overall standard deviation. Measures long-term performance.",
        formula: "Pp = (USL - LSL) / (6σ_overall)"
    },
    "PpK": {
        title: "Process Performance Index",
        explanation: "Similar to Cpk but uses overall standard deviation. Measures long-term performance considering centering.",
        formula: "Ppk = min[(USL - μ)/(3σ_overall), (μ - LSL)/(3σ_overall)]"
    },
    "Cpu": {
        title: "Upper Process Capability",
        explanation: "Capability relative to USL only. Used when only upper specification is relevant.",
        formula: "Cpu = (USL - μ) / (3σ_within)"
    },
    "Cpl": {
        title: "Lower Process Capability",
        explanation: "Capability relative to LSL only. Used when only lower specification is relevant.",
        formula: "Cpl = (μ - LSL) / (3σ_within)"
    },
    "K (Shift)": {
        title: "Process Shift",
        explanation: "How far the mean is from target (as % of tolerance). Measures process centering.",
        formula: "K = |μ - Target| / [(USL - LSL)/2] × 100%"
    },
    "Cr (1/Cp)": {
        title: "Capability Ratio",
        explanation: "Inverse of Cp (smaller is better). Represents proportion of specification width used.",
        formula: "Cr = 1 / Cp"
    }
};

// ========== UI INITIALIZATION ==========
function initializeUI() {
    createLeftColumn();
    createCenterColumn();
    createRightColumn();
    setupLanguageSelector();
}

function createLeftColumn() {
    const leftColumn = document.getElementById('left-column');
    
    leftColumn.innerHTML = `
        <div class="card">
            <div class="card-header">
                <i class="fas fa-sliders-h"></i> <span id="specTypeHeader">${t('specTypeHeader')}</span>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label class="form-label" id="specTypeLabel">${t('specTypeLabel')}</label>
                    <select class="form-select" id="specType">
                        <option value="bilateral">${t('bilateral')}</option>
                        <option value="unilateral_lsl">${t('unilateralLSL')}</option>
                        <option value="unilateral_usl">${t('unilateralUSL')}</option>
                    </select>
                </div>
                <button class="btn btn-outline-info btn-sm w-100" onclick="showSpecTypeInfo()">
                    <i class="fas fa-info-circle"></i> <span>${t('whatIsSpecType')}</span>
                </button>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <i class="fas fa-ruler-combined"></i> <span id="specLimitsHeader">${t('specLimitsHeader')}</span>
            </div>
            <div class="card-body">
                <div class="row g-2">
                    <div class="col-6">
                        <label class="form-label">${t('lslLabel')}</label>
                        <input type="text" class="form-control" id="lsl" autocomplete="off">
                    </div>
                    <div class="col-6">
                        <label class="form-label">${t('uslLabel')}</label>
                        <input type="text" class="form-control" id="usl" autocomplete="off">
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <i class="fas fa-expand-alt"></i> <span id="valueRangeHeader">${t('valueRangeHeader')}</span>
            </div>
            <div class="card-body">
                <div class="row g-2">
                    <div class="col-6">
                        <label class="form-label">${t('minValLabel')}</label>
                        <input type="text" class="form-control" id="minVal" autocomplete="off">
                    </div>
                    <div class="col-6">
                        <label class="form-label">${t('maxValLabel')}</label>
                        <input type="text" class="form-control" id="maxVal" autocomplete="off">
                    </div>
                </div>
                <div class="mt-2">
                    <small id="rangeInfo" class="highlight-red">
                        <i class="fas fa-lock"></i> <span>${t('rangeInfo')}</span>
                    </small>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <i class="fas fa-cog"></i> <span id="setupParamsHeader">${t('setupParamsHeader')}</span>
            </div>
            <div class="card-body">
                <div class="row g-2 mb-2">
                    <div class="col-6">
                        <label class="form-label">${t('targetCpkLabel')}</label>
                        <input type="text" class="form-control" id="targetCpk" autocomplete="off">
                    </div>
                    <div class="col-6">
                        <label class="form-label">${t('decimalsLabel')}</label>
                        <select class="form-select" id="decimals">
                            <option>1</option>
                            <option>2</option>
                            <option selected>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                </div>

                <div class="row g-2 mb-2">
                    <div class="col-6">
                        <label class="form-label">${t('sampleSizeLabel')}</label>
                        <input type="text" class="form-control" id="sampleSize" autocomplete="off">
                    </div>
                    <div class="col-6">
                        <label class="form-label">${t('subgroupSizeLabel')}</label>
                        <select class="form-select" id="subgroupSize">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option selected>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                        </select>
                    </div>
                </div>

                <div class="row g-2 mb-2">
                    <div class="col-6">
                        <label class="form-label">${t('maxIterationsLabel')}</label>
                        <input type="text" class="form-control" id="maxIterations" autocomplete="off">
                    </div>
                    <div class="col-6">
                        <label class="form-label">${t('adjustmentFactorLabel')}</label>
                        <input type="text" class="form-control" id="adjFactor" autocomplete="off">
                    </div>
                </div>

                <div class="row g-2 mb-2">
                    <div class="col-6">
                        <label class="form-label">${t('toleranceLabel')}</label>
                        <input type="text" class="form-control" id="tolerance" autocomplete="off">
                    </div>
                    <div class="col-6">
                        <label class="form-label">${t('sigmaLabel')}</label>
                        <input type="range" class="form-range" id="sigmaSlider" min="5" max="80" value="20" style="margin-top: 8px;">
                    </div>
                </div>
                <div class="text-center">
                    <span id="sigmaValue" class="badge bg-secondary">20%</span>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-body">
                <div class="progress">
                    <div id="progressBar" class="progress-bar" style="width: 0%">0%</div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-body">
                <div class="d-grid gap-2">
                    <button class="btn btn-success btn-lg" id="generateBtn" onclick="generateValues()">
                        <i class="fas fa-rocket"></i> <span class="generateBtn-text">${t('generateBtn')}</span>
                    </button>
                    <button class="btn btn-danger btn-lg" id="stopBtn" onclick="stopGeneration()" disabled>
                        <i class="fas fa-stop"></i> <span class="stopBtn-text">${t('stopBtn')}</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function createCenterColumn() {
    const centerColumn = document.getElementById('center-column');
    
    centerColumn.innerHTML = `
        <div class="card">
            <div class="card-header">
                <i class="fas fa-chart-bar"></i> Process Capability Statistics
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-12">
                        <div class="section-title">Process Data</div>
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col-6">
                        <div class="d-flex align-items-center mb-2">
                            <span class="stat-label">LSL</span>
                            <button class="info-btn" onclick="showStatInfo('LSL')">ℹ</button>
                        </div>
                        <div class="stat-card" id="lslValue">N/A</div>
                    </div>
                    <div class="col-6">
                        <div class="d-flex align-items-center mb-2">
                            <span class="stat-label">USL</span>
                            <button class="info-btn" onclick="showStatInfo('USL')">ℹ</button>
                        </div>
                        <div class="stat-card" id="uslValue">N/A</div>
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col-6">
                        <div class="d-flex align-items-center mb-2">
                            <span class="stat-label">Target</span>
                            <button class="info-btn" onclick="showStatInfo('Target')">ℹ</button>
                        </div>
                        <div class="stat-card" id="targetValue">N/A</div>
                    </div>
                    <div class="col-6">
                        <div class="d-flex align-items-center mb-2">
                            <span class="stat-label">Sample Mean</span>
                            <button class="info-btn" onclick="showStatInfo('Mean')">ℹ</button>
                        </div>
                        <div class="stat-card" id="meanValue">N/A</div>
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col-6">
                        <div class="d-flex align-items-center mb-2">
                            <span class="stat-label">Sample N</span>
                            <button class="info-btn" onclick="showStatInfo('Sample N')">ℹ</button>
                        </div>
                        <div class="stat-card" id="nValue">N/A</div>
                    </div>
                    <div class="col-6">
                        <div class="d-flex align-items-center mb-2">
                            <span class="stat-label">Mean to Target</span>
                            <button class="info-btn" onclick="showStatInfo('Mean to Target')">ℹ</button>
                        </div>
                        <div class="stat-card" id="meanToTargetValue">N/A</div>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-6">
                        <div class="d-flex align-items-center mb-2">
                            <span class="stat-label">StdDev(Overall)</span>
                            <button class="info-btn" onclick="showStatInfo('StdDev(Overall)')">ℹ</button>
                        </div>
                        <div class="stat-card" id="stdOverallValue">N/A</div>
                    </div>
                    <div class="col-6">
                        <div class="d-flex align-items-center mb-2">
                            <span class="stat-label">StdDev(Within)</span>
                            <button class="info-btn" onclick="showStatInfo('StdDev(Within)')">ℹ</button>
                        </div>
                        <div class="stat-card" id="stdWithinValue">N/A</div>
                    </div>
                </div>

                <hr>

                <div class="row mb-3">
                    <div class="col-12">
                        <div class="section-title">Capability Indices</div>
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col-6">
                        <div class="d-flex align-items-center mb-2">
                            <span class="stat-label">Cp</span>
                            <button class="info-btn" onclick="showStatInfo('Cp')">ℹ</button>
                        </div>
                        <div class="stat-card" id="cpValue">N/A</div>
                    </div>
                    <div class="col-6">
                        <div class="d-flex align-items-center mb-2">
                            <span class="stat-label">Cpk</span>
                            <button class="info-btn" onclick="showStatInfo('Cpk')">ℹ</button>
                        </div>
                        <div class="stat-card" id="cpkValue">N/A</div>
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col-6">
                        <div class="d-flex align-items-center mb-2">
                            <span class="stat-label">Pp</span>
                            <button class="info-btn" onclick="showStatInfo('Pp')">ℹ</button>
                        </div>
                        <div class="stat-card" id="ppValue">N/A</div>
                    </div>
                    <div class="col-6">
                        <div class="d-flex align-items-center mb-2">
                            <span class="stat-label">PpK</span>
                            <button class="info-btn" onclick="showStatInfo('PpK')">ℹ</button>
                        </div>
                        <div class="stat-card" id="ppkValue">N/A</div>
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col-6">
                        <div class="d-flex align-items-center mb-2">
                            <span class="stat-label">Cpu</span>
                            <button class="info-btn" onclick="showStatInfo('Cpu')">ℹ</button>
                        </div>
                        <div class="stat-card" id="cpuValue">N/A</div>
                    </div>
                    <div class="col-6">
                        <div class="d-flex align-items-center mb-2">
                            <span class="stat-label">Cpl</span>
                            <button class="info-btn" onclick="showStatInfo('Cpl')">ℹ</button>
                        </div>
                        <div class="stat-card" id="cplValue">N/A</div>
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col-6">
                        <div class="d-flex align-items-center mb-2">
                            <span class="stat-label">K (Shift)</span>
                            <button class="info-btn" onclick="showStatInfo('K (Shift)')">ℹ</button>
                        </div>
                        <div class="stat-card" id="kValue">N/A</div>
                    </div>
                    <div class="col-6">
                        <div class="d-flex align-items-center mb-2">
                            <span class="stat-label">Cr (1/Cp)</span>
                            <button class="info-btn" onclick="showStatInfo('Cr (1/Cp)')">ℹ</button>
                        </div>
                        <div class="stat-card" id="crValue">N/A</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <i class="fas fa-table"></i> Generated Values (click to copy)
            </div>
            <div class="card-body">
                <div style="max-height: 400px; overflow-y: auto;">
                    <table class="table table-striped table-hover" id="valuesTable">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody id="valuesTableBody"></tbody>
                    </table>
                </div>
                <div class="mt-3 d-flex gap-2">
                    <button class="btn btn-primary btn-sm" onclick="copyAllValues()">
                        <i class="fas fa-copy"></i> Copy All
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="clearTable()">
                        <i class="fas fa-trash"></i> Clear
                    </button>
                    <button class="btn btn-success btn-sm" onclick="exportToCSV()">
                        <i class="fas fa-file-export"></i> Export CSV
                    </button>
                </div>
            </div>
        </div>
    `;
}

function createRightColumn() {
    const rightColumn = document.getElementById('right-column');
    
    rightColumn.innerHTML = `
        <div class="card">
            <div class="card-header">
                <i class="fas fa-globe"></i> Language / Limbă
            </div>
            <div class="card-body">
                <div class="btn-group w-100" role="group">
                    <input type="radio" class="btn-check" name="language" id="langEn" value="en" checked>
                    <label class="btn btn-outline-primary" for="langEn">English</label>
                    <input type="radio" class="btn-check" name="language" id="langRo" value="ro">
                    <label class="btn btn-outline-primary" for="langRo">Română</label>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <span><i class="fas fa-chart-histogram"></i> Distribution Histogram</span>
                <button class="btn btn-sm btn-outline-light" onclick="toggleHistogramFullscreen()" title="Toggle fullscreen">
                    <i class="fas fa-expand"></i>
                </button>
            </div>
            <div class="card-body">
                <div id="histogram-container" style="height: 450px; position: relative;">
                    <canvas id="histogramChart"></canvas>
                </div>
                <div class="mt-2 text-center">
                    <small class="text-muted">
                        <span class="badge bg-info me-1">▇</span> Frequency &nbsp;&nbsp;
                        <span class="badge bg-danger me-1">—</span> Normal Distribution (Minitab Style)
                    </small>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <i class="fas fa-tools"></i> Advanced Controls
            </div>
            <div class="card-body">
                <div class="form-check form-switch mb-3">
                    <input class="form-check-input" type="checkbox" id="forceRange" checked>
                    <label class="form-check-label" for="forceRange">
                        <i class="fas fa-lock"></i> Force values strictly between Min and Max
                    </label>
                </div>

                <div class="form-check form-switch mb-3">
                    <input class="form-check-input" type="checkbox" id="autoAdjust" checked>
                    <label class="form-check-label" for="autoAdjust">
                        Auto-adjust to achieve target Cpk
                    </label>
                </div>

                <div class="slider-container mb-3">
                    <span class="slider-label">Distribution Center:</span>
                    <input type="range" class="form-range" id="centerSlider" min="0" max="100" value="50">
                    <span id="centerValue" class="badge bg-secondary">50% (Middle)</span>
                </div>

                <div class="status-box" id="statusDisplay">
                    <i class="fas fa-check-circle"></i> Ready to generate values
                </div>
            </div>
        </div>
    `;
}
    `;
}

// ========== UI EVENT HANDLERS ==========
function setupEventListeners() {
    document.addEventListener('input', function(e) {
        if (e.target.id === 'sigmaSlider') {
            document.getElementById('sigmaValue').textContent = e.target.value + '%';
        } else if (e.target.id === 'centerSlider') {
            const value = parseInt(e.target.value);
            let label = value + '%';
            if (value === 50) label += ' (Middle)';
            else if (value < 50) label += ' (Left)';
            else label += ' (Right)';
            document.getElementById('centerValue').textContent = label;
        }
    });

    document.addEventListener('change', function(e) {
        if (e.target.id === 'forceRange') {
            const rangeInfo = document.getElementById('rangeInfo');
            if (e.target.checked) {
                rangeInfo.innerHTML = '<i class="fas fa-lock"></i> ' + t('rangeInfo');
                rangeInfo.className = 'highlight-red';
            } else {
                rangeInfo.innerHTML = '<i class="fas fa-unlock"></i> Values can be outside Min-Max';
                rangeInfo.className = 'highlight-green';
            }
        } else if (e.target.id === 'specType') {
            updateSpecTypeUI();
        } else if (e.target.name === 'language') {
            setLanguage(e.target.value);
            location.reload();
        }
    });
}

function setupLanguageSelector() {
    const currentLang = getLanguage();
    const langButtons = document.querySelectorAll('input[name="language"]');
    langButtons.forEach(btn => {
        if (btn.value === currentLang) {
            btn.checked = true;
        }
    });
}


function updateSpecTypeUI() {
    const specType = document.getElementById('specType').value;
    const lslInput = document.getElementById('lsl');
    const uslInput = document.getElementById('usl');

    if (specType === 'bilateral') {
        lslInput.disabled = false;
        uslInput.disabled = false;
        lslInput.style.backgroundColor = '';
        uslInput.style.backgroundColor = '';
    } else if (specType === 'unilateral_lsl') {
        lslInput.disabled = false;
        uslInput.disabled = true;
        uslInput.value = '';
        lslInput.style.backgroundColor = '#e8f4fd';
        uslInput.style.backgroundColor = '#f8f9fa';
    } else if (specType === 'unilateral_usl') {
        lslInput.disabled = true;
        uslInput.disabled = false;
        lslInput.value = '';
        lslInput.style.backgroundColor = '#f8f9fa';
        uslInput.style.backgroundColor = '#e8f4fd';
    }
}

function updateValuesTable(values, decimals) {
    const tbody = document.getElementById('valuesTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    values.forEach((value, index) => {
        const row = document.createElement('tr');
        const indexCell = document.createElement('td');
        const valueCell = document.createElement('td');

        indexCell.textContent = index + 1;
        valueCell.textContent = formatNumber(value, decimals);
        valueCell.style.cursor = 'pointer';
        valueCell.title = 'Click to copy';
        valueCell.onclick = () => copyToClipboard(valueCell.textContent);

        row.appendChild(indexCell);
        row.appendChild(valueCell);
        tbody.appendChild(row);
    });
}

function updateHistogram(values, lsl, usl, decimals, minVal, maxVal, forceRange) {
    const ctx = document.getElementById('histogramChart').getContext('2d');
    
    if (histogramChart) {
        histogramChart.destroy();
    }

    const n = values.length;
    const meanVal = values.reduce((a, b) => a + b, 0) / n;
    const [stdDevOverall, stdDevWithin] = calculateBothStandardDeviations(values, 5);
    const specType = getInputValue('specType');

    const binCount = Math.max(8, Math.min(20, Math.ceil(Math.log2(n)) + 1));
    const dataMin = Math.min(...values);
    const dataMax = Math.max(...values);
    const range = dataMax - dataMin;
    const binWidth = range / binCount;
    
    const bins = Array(binCount).fill(0);
    const binEdges = Array(binCount + 1).fill(0).map((_, i) => dataMin + i * binWidth);
    
    values.forEach(value => {
        let binIndex = Math.floor((value - dataMin) / binWidth);
        if (binIndex === binCount) binIndex = binCount - 1;
        bins[binIndex]++;
    });

    const labels = binEdges.slice(0, -1).map((edge, i) => {
        const mid = edge + binWidth / 2;
        return formatNumber(mid, Math.max(2, decimals));
    });

    const maxBinHeight = Math.max(...bins);
    const maxPDF = normalPDF(meanVal, meanVal, stdDevOverall);
    const curveScale = (maxBinHeight * 0.85) / maxPDF;

    // Generate normal distribution curve with more points for smooth curve (Minitab style)
    const curvePoints = [];
    const step = binWidth / 3; // More points for smoother curve
    const curveStart = dataMin - binWidth;
    const curveEnd = dataMax + binWidth;
    
    for (let x = curveStart; x <= curveEnd; x += step) {
        curvePoints.push({
            x: x,
            y: normalPDF(x, meanVal, stdDevOverall) * curveScale
        });
    }

    const datasets = [
        {
            label: t('frequency'),
            data: bins,
            backgroundColor: 'rgba(77, 171, 247, 0.75)',
            borderColor: 'rgba(77, 171, 247, 1)',
            borderWidth: 0.5,
            barPercentage: 0.9,
            categoryPercentage: 0.95,
            type: 'bar'
        },
        {
            label: t('statsTitles')["Normal Distribution"] || 'Normal Distribution',
            data: curvePoints.map(p => p.y),
            borderColor: '#e74c3c',
            borderWidth: 3,
            backgroundColor: 'transparent',
            fill: false,
            pointRadius: 0,
            tension: 0.4,
            type: 'line',
            spanGaps: true,
            xAxisID: 'x2'
        }
    ];

    // Prepare x-axis labels for normal curve
    const normalCurveLabels = curvePoints.map(p => formatNumber(p.x, Math.max(1, decimals)));

    histogramChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    maxHeight: 50,
                    labels: {
                        font: { size: 11, weight: 'bold' },
                        usePointStyle: true,
                        padding: 15,
                        color: '#333'
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(255,255,255,0.3)',
                    borderWidth: 1,
                    titleFont: { size: 13, weight: 'bold' },
                    bodyFont: { size: 12 },
                    padding: 12,
                    callbacks: {
                        title: function(context) {
                            if (context[0].dataset.type === 'bar') {
                                const idx = context[0].dataIndex;
                                const lower = binEdges[idx];
                                const upper = binEdges[idx + 1];
                                return `${t('histogramHeader')}: ${formatNumber(lower, decimals)} - ${formatNumber(upper, decimals)}`;
                            }
                            return context[0].dataset.label || '';
                        },
                        label: function(context) {
                            if (!context.dataset.type || context.dataset.type === 'bar') {
                                const value = context.parsed.y;
                                const pct = ((value / n) * 100).toFixed(1);
                                return `${t('frequency')}: ${value} (${pct}%)`;
                            }
                            return '';
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: t('measuredValue'),
                        font: { weight: 'bold', size: 13, color: '#333' },
                        color: '#333'
                    },
                    grid: { color: 'rgba(0,0,0,0.08)', drawBorder: true },
                    ticks: { font: { size: 10 } }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: t('frequency'),
                        font: { weight: 'bold', size: 13, color: '#333' },
                        color: '#333'
                    },
                    grid: { color: 'rgba(0,0,0,0.08)' },
                    ticks: { font: { size: 10 } },
                    suggestedMax: maxBinHeight * 1.15
                }
            }
        }
    });

    histogramChart.update();
}

// ========== MODAL FUNCTIONS ==========
function showStatInfo(statName) {
    const titles = t('statsTitles');
    const explanations = t('statsExplanations');
    const title = titles[statName] || statName;
    const explanation = explanations[statName] || t('statsTitles')[statName] || '';
    
    document.getElementById('infoModalTitle').textContent = `📊 ${title}`;
    document.getElementById('infoModalBody').innerHTML = `
        <div style="padding: 20px;">
            <h5 style="color: #667eea;">${title}</h5>
            <p style="font-size: 14px; line-height: 1.6;">${explanation}</p>
        </div>
    `;

    const modal = new bootstrap.Modal(document.getElementById('infoModal'));
    modal.show();
}

function showSpecTypeInfo() {
    document.getElementById('infoModalTitle').textContent = `ℹ️ ${t('specTypeTitle')}`;
    document.getElementById('infoModalBody').innerHTML = `
        <div style="padding: 20px;">
            <h5 style="color: #667eea;">${t('specTypeTitle')}</h5>
            <p><strong>${t('bilateral')}</strong>: ${t('bilateral_info')}<br>
            • ${t('bilateral_example')}</p>
            <p><strong>${t('unilateralLSL')}</strong>: ${t('unilateralLSL_info')}<br>
            • ${t('unilateralLSL_example')}</p>
            <p><strong>${t('unilateralUSL')}</strong>: ${t('unilateralUSL_info')}<br>
            • ${t('unilateralUSL_example')}</p>
            <p><i>${t('specTypeSelectHint')}</i></p>
        </div>
    `;

    const modal = new bootstrap.Modal(document.getElementById('infoModal'));
    modal.show();
}

// ========== FULLSCREEN FUNCTIONS ==========
function toggleHistogramFullscreen() {
    const container = document.getElementById('histogram-container');
    const card = container.closest('.card');
    
    if (!document.fullscreenElement) {
        if (card.requestFullscreen) {
            card.requestFullscreen();
        } else if (card.webkitRequestFullscreen) {
            card.webkitRequestFullscreen();
        } else if (card.msRequestFullscreen) {
            card.msRequestFullscreen();
        }
        
        setTimeout(() => {
            container.style.height = '80vh';
            if (histogramChart) {
                histogramChart.resize();
            }
        }, 100);
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        
        container.style.height = '450px';
        if (histogramChart) {
            setTimeout(() => histogramChart.resize(), 100);
        }
    }
}

function handleFullscreenChange() {
    const container = document.getElementById('histogram-container');
    if (!document.fullscreenElement && 
        !document.webkitFullscreenElement && 
        !document.msFullscreenElement) {
        container.style.height = '450px';
        if (histogramChart) {
            setTimeout(() => histogramChart.resize(), 100);
        }
    }
}

// ========== TABLE FUNCTIONS ==========
function copyAllValues() {
    if (generatedValues.length === 0) {
        alert('No values to copy. Generate values first.');
        return;
    }

    const decimals = parseInt(getInputValue('decimals'));
    const valuesStr = generatedValues.map(v => formatNumber(v, decimals)).join('\n');
    copyToClipboard(valuesStr);

    const statusDisplay = document.getElementById('statusDisplay');
    statusDisplay.textContent = `✅ Copied ${generatedValues.length} values to clipboard`;
}

function clearTable() {
    generatedValues = [];
    const tbody = document.getElementById('valuesTableBody');
    if (tbody) tbody.innerHTML = '';
    
    const statusDisplay = document.getElementById('statusDisplay');
    if (statusDisplay) statusDisplay.textContent = 'Table cleared. Ready for new generation.';
    
    showNotification('Table cleared', 'info');
}

function exportToCSV() {
    if (generatedValues.length === 0) {
        alert('No values to export. Generate values first.');
        return;
    }

    const decimals = parseInt(getInputValue('decimals'));
    const csvContent = "Value\n" + generatedValues.map(v => formatNumber(v, decimals)).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cpk_generated_values.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    showNotification(`Exported ${generatedValues.length} values to CSV`, 'success');
}