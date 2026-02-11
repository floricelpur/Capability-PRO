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
}

function createLeftColumn() {
    const leftColumn = document.getElementById('left-column');
    
    leftColumn.innerHTML = `
        <div class="card">
            <div class="card-header">
                <i class="fas fa-sliders-h"></i> Specification Type
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label class="form-label">Type:</label>
                    <select class="form-select" id="specType">
                        <option value="bilateral">Bilateral (LSL and USL)</option>
                        <option value="unilateral_lsl">Unilateral LSL only</option>
                        <option value="unilateral_usl">Unilateral USL only</option>
                    </select>
                </div>
                <button class="btn btn-outline-info btn-sm w-100" onclick="showSpecTypeInfo()">
                    <i class="fas fa-info-circle"></i> What is Specification Type?
                </button>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <i class="fas fa-ruler-combined"></i> Specification Limits
            </div>
            <div class="card-body">
                <div class="row g-2">
                    <div class="col-6">
                        <label class="form-label">LSL:</label>
                        <input type="text" class="form-control" id="lsl" autocomplete="off">
                    </div>
                    <div class="col-6">
                        <label class="form-label">USL:</label>
                        <input type="text" class="form-control" id="usl" autocomplete="off">
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <i class="fas fa-expand-alt"></i> Value Range Limits
            </div>
            <div class="card-body">
                <div class="row g-2">
                    <div class="col-6">
                        <label class="form-label">Min Value:</label>
                        <input type="text" class="form-control" id="minVal" autocomplete="off">
                    </div>
                    <div class="col-6">
                        <label class="form-label">Max Value:</label>
                        <input type="text" class="form-control" id="maxVal" autocomplete="off">
                    </div>
                </div>
                <div class="mt-2">
                    <small id="rangeInfo" class="highlight-red">
                        <i class="fas fa-lock"></i> Values STRICTLY between Min and Max
                    </small>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <i class="fas fa-cog"></i> Setup Parameters
            </div>
            <div class="card-body">
                <div class="row g-2 mb-2">
                    <div class="col-6">
                        <label class="form-label">Target Cpk:</label>
                        <input type="text" class="form-control" id="targetCpk" autocomplete="off">
                    </div>
                    <div class="col-6">
                        <label class="form-label">Decimals:</label>
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
                        <label class="form-label">Sample Size:</label>
                        <input type="text" class="form-control" id="sampleSize" autocomplete="off">
                    </div>
                    <div class="col-6">
                        <label class="form-label">Subgroup Size:</label>
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

                <div class="slider-container mb-2">
                    <span class="slider-label">Sigma %:</span>
                    <input type="range" class="form-range" id="sigmaSlider" min="5" max="80" value="20">
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
                        <i class="fas fa-rocket"></i> GENERATE VALUES
                    </button>
                    <button class="btn btn-danger btn-lg" id="stopBtn" onclick="stopGeneration()" disabled>
                        <i class="fas fa-stop"></i> STOP
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
                        <span class="badge bg-success me-1">—</span> Mean &nbsp;&nbsp;
                        <span class="badge bg-danger me-1">—</span> LSL/USL &nbsp;&nbsp;
                        <span class="badge bg-warning me-1">—</span> Target &nbsp;&nbsp;
                        <span class="badge bg-primary me-1">▇</span> Data &nbsp;&nbsp;
                        <span class="badge bg-danger me-1">—</span> Normal Curve
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

                <div class="row g-2 mb-3">
                    <div class="col-6">
                        <label class="form-label">Cpk Tolerance:</label>
                        <select class="form-select" id="tolerance">
                            <option>0.001</option>
                            <option>0.005</option>
                            <option selected>0.01</option>
                            <option>0.05</option>
                            <option>0.1</option>
                        </select>
                    </div>
                    <div class="col-6">
                        <label class="form-label">Max Iterations:</label>
                        <input type="text" class="form-control" id="maxIterations" autocomplete="off">
                    </div>
                </div>

                <div class="form-check form-switch mb-3">
                    <input class="form-check-input" type="checkbox" id="autoAdjust" checked>
                    <label class="form-check-label" for="autoAdjust">
                        Auto-adjust to achieve target Cpk
                    </label>
                </div>

                <div class="row g-2 mb-3">
                    <div class="col-6">
                        <label class="form-label">Adjustment Factor:</label>
                        <input type="text" class="form-control" id="adjFactor" autocomplete="off">
                    </div>
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
                rangeInfo.innerHTML = '<i class="fas fa-lock"></i> Values STRICTLY between Min and Max';
                rangeInfo.className = 'highlight-red';
            } else {
                rangeInfo.innerHTML = '<i class="fas fa-unlock"></i> Values can be outside Min-Max';
                rangeInfo.className = 'highlight-green';
            }
        } else if (e.target.id === 'specType') {
            updateSpecTypeUI();
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
    const hasLsl = specType !== 'unilateral_usl';
    const hasUsl = specType !== 'unilateral_lsl';
    const target = specType === 'bilateral' ? (lsl + usl) / 2 : meanVal;

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
    const curveScale = (maxBinHeight * 0.7) / maxPDF;

    // Generate normal distribution curve aligned with bin centers
    const curveData = binEdges.slice(0, -1).map((edge, i) => {
        const mid = edge + binWidth / 2;
        const pdf = normalPDF(mid, meanVal, stdDevOverall);
        return pdf * curveScale;
    });

    // Create reference lines data
    const createLineData = (value) => {
        if (isNaN(value)) return null;
        return binEdges.slice(0, -1).map(edge => {
            const mid = edge + binWidth / 2;
            const diff = Math.abs(mid - value);
            // Mark position of reference line
            return diff < binWidth * 0.1 ? maxBinHeight * 0.95 : null;
        });
    };

    const datasets = [
        {
            label: 'Frequency',
            data: bins,
            backgroundColor: 'rgba(77, 171, 247, 0.7)',
            borderColor: 'rgba(77, 171, 247, 1)',
            borderWidth: 1,
            barPercentage: 0.85,
            categoryPercentage: 0.9,
            type: 'bar'
        },
        {
            label: 'Normal Distribution',
            data: curveData,
            borderColor: '#e74c3c',
            borderWidth: 2.5,
            backgroundColor: 'rgba(231, 76, 60, 0.05)',
            fill: false,
            pointRadius: 0,
            tension: 0.3,
            type: 'line'
        }
    ];

    // Add Mean line
    datasets.push({
        label: `Mean: ${formatNumber(meanVal, decimals)}`,
        data: labels.map(label => {
            const val = parseFloat(label);
            const diff = Math.abs(val * 1 - meanVal);
            return diff < binWidth * 0.15 ? maxBinHeight * 0.88 : null;
        }),
        borderColor: '#20c997',
        borderWidth: 2.5,
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
        type: 'line'
    });

    // Add LSL line
    if (hasLsl && !isNaN(lsl)) {
        datasets.push({
            label: `LSL: ${formatNumber(lsl, decimals)}`,
            data: labels.map(label => {
                const val = parseFloat(label);
                const diff = Math.abs(val * 1 - lsl);
                return diff < binWidth * 0.15 ? maxBinHeight * 0.82 : null;
            }),
            borderColor: '#e74c3c',
            borderWidth: 2.5,
            borderDash: [8, 4],
            pointRadius: 0,
            fill: false,
            type: 'line'
        });
    }

    // Add USL line
    if (hasUsl && !isNaN(usl)) {
        datasets.push({
            label: `USL: ${formatNumber(usl, decimals)}`,
            data: labels.map(label => {
                const val = parseFloat(label);
                const diff = Math.abs(val * 1 - usl);
                return diff < binWidth * 0.15 ? maxBinHeight * 0.76 : null;
            }),
            borderColor: '#e74c3c',
            borderWidth: 2.5,
            borderDash: [8, 4],
            pointRadius: 0,
            fill: false,
            type: 'line'
        });
    }

    // Add Target line
    if (specType === 'bilateral') {
        datasets.push({
            label: `Target: ${formatNumber(target, decimals)}`,
            data: labels.map(label => {
                const val = parseFloat(label);
                const diff = Math.abs(val * 1 - target);
                return diff < binWidth * 0.15 ? maxBinHeight * 0.70 : null;
            }),
            borderColor: '#f39c12',
            borderWidth: 2,
            borderDash: [6, 3],
            pointRadius: 0,
            fill: false,
            type: 'line'
        });
    }

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
                    maxHeight: 60,
                    labels: {
                        font: { size: 10, weight: 'bold' },
                        usePointStyle: true,
                        padding: 12
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0,0,0,0.85)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(255,255,255,0.2)',
                    borderWidth: 1,
                    titleFont: { size: 12, weight: 'bold' },
                    bodyFont: { size: 11 },
                    padding: 10,
                    callbacks: {
                        title: function(context) {
                            const idx = context[0].dataIndex;
                            const lower = binEdges[idx];
                            const upper = binEdges[idx + 1];
                            return `Range: ${formatNumber(lower, decimals)} - ${formatNumber(upper, decimals)}`;
                        },
                        label: function(context) {
                            if (!context.dataset.type || context.dataset.type === 'bar') {
                                const value = context.parsed.y;
                                const pct = ((value / n) * 100).toFixed(1);
                                return `Count: ${value} (${pct}%)`;
                            }
                            return context.dataset.label || '';
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Measured Value',
                        font: { weight: 'bold', size: 12 }
                    },
                    grid: { color: 'rgba(0,0,0,0.05)' }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Frequency',
                        font: { weight: 'bold', size: 12 }
                    },
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    suggestedMax: maxBinHeight * 1.1
                }
            }
        }
    });

    histogramChart.update();
}

// ========== MODAL FUNCTIONS ==========
function showStatInfo(statName) {
    const info = statInfo[statName];
    if (!info) return;

    document.getElementById('infoModalTitle').textContent = `📊 Information: ${statName}`;
    document.getElementById('infoModalBody').innerHTML = `
        <div style="padding: 20px;">
            <h5 style="color: #667eea;">${info.title}</h5>
            <p style="font-size: 14px; line-height: 1.6;">${info.explanation}</p>
            ${info.formula ? `<hr><p><strong>Formula:</strong><br><code style="background: #f8f9fa; padding: 8px; border-radius: 4px; display: block;">${info.formula}</code></p>` : ''}
        </div>
    `;

    const modal = new bootstrap.Modal(document.getElementById('infoModal'));
    modal.show();
}

function showSpecTypeInfo() {
    document.getElementById('infoModalTitle').textContent = 'ℹ️ Specification Types Information';
    document.getElementById('infoModalBody').innerHTML = `
        <div style="padding: 20px;">
            <h5 style="color: #667eea;">Specification Types:</h5>
            <p><strong>Bilateral (LSL and USL)</strong>: Both lower and upper specification limits are defined.<br>
            • Example: Diameter must be between 10.0 and 10.2 mm</p>
            <p><strong>Unilateral LSL only</strong>: Only lower specification limit is defined.<br>
            • Example: Strength must be at least 100 MPa (no upper limit)</p>
            <p><strong>Unilateral USL only</strong>: Only upper specification limit is defined.<br>
            • Example: Impurity must be no more than 0.5% (no lower limit)</p>
            <p><i>Select the type that matches your process requirements.</i></p>
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