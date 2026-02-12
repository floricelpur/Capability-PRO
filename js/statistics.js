// ========== STATISTICAL FUNCTIONS ==========

let c4PrimeTable = null;

function initializeC4PrimeTable() {
    c4PrimeTable = {
        2: 0.797850, 3: 0.871530, 4: 0.905763, 5: 0.925222,
        6: 0.937892, 7: 0.946837, 8: 0.953503, 9: 0.958669,
        10: 0.962793, 11: 0.966163, 12: 0.968968, 13: 0.971341,
        14: 0.973375, 15: 0.975137, 16: 0.976679, 17: 0.978039,
        18: 0.979249, 19: 0.980331, 20: 0.981305, 21: 0.982187,
        22: 0.982988, 23: 0.983720, 24: 0.984391, 25: 0.985009,
        26: 0.985579, 27: 0.986107, 28: 0.986597, 29: 0.987054,
        30: 0.987480, 31: 0.987878, 32: 0.988252, 33: 0.988603,
        34: 0.988934, 35: 0.989246, 36: 0.989540, 37: 0.989819,
        38: 0.990083, 39: 0.990333, 40: 0.990571, 41: 0.990797,
        42: 0.991013, 43: 0.991218, 44: 0.991415, 45: 0.991602,
        46: 0.991782, 47: 0.991953, 48: 0.992118, 49: 0.992276,
        50: 0.992428, 51: 0.992573, 52: 0.992713, 53: 0.992848,
        54: 0.992977, 55: 0.993101, 56: 0.993221, 57: 0.993337,
        58: 0.993448, 59: 0.993555, 60: 0.993659, 61: 0.993759,
        62: 0.993855, 63: 0.993948, 64: 0.994038, 65: 0.994125,
        66: 0.994209, 67: 0.994291, 68: 0.994370, 69: 0.994446,
        70: 0.994520, 71: 0.994592, 72: 0.994662, 73: 0.994729,
        74: 0.994795, 75: 0.994858, 76: 0.994920, 77: 0.994980,
        78: 0.995039, 79: 0.995095, 80: 0.995215, 81: 0.995272,
        82: 0.995328, 83: 0.995383, 84: 0.995436, 85: 0.995489,
        86: 0.995539, 87: 0.995589, 88: 0.995638, 89: 0.995685,
        90: 0.995732, 91: 0.995777, 92: 0.995822, 93: 0.995865,
        94: 0.995908, 95: 0.995949, 96: 0.995990, 97: 0.996030,
        98: 0.996069, 99: 0.996108, 100: 0.996145
    };
}

function getC4Prime(N) {
    if (!c4PrimeTable) initializeC4PrimeTable();
    
    if (N in c4PrimeTable) {
        return c4PrimeTable[N];
    } else if (N === 1) {
        return 1.0;
    } else if (N > 100) {
        return 1 - 1 / (4 * N) - 3 / (32 * N * N);
    } else {
        const lower = Math.max(...Object.keys(c4PrimeTable).filter(k => k <= N).map(Number));
        const upper = Math.min(...Object.keys(c4PrimeTable).filter(k => k >= N).map(Number));
        if (lower === upper) return c4PrimeTable[lower];
        const t = (N - lower) / (upper - lower);
        return c4PrimeTable[lower] + t * (c4PrimeTable[upper] - c4PrimeTable[lower]);
    }
}

function calculateBothStandardDeviations(values, subgroupSize) {
    const n = values.length;

    const mean = values.reduce((a, b) => a + b, 0) / n;
    const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (n - 1);
    const stdDevOverall = Math.sqrt(variance);

    let stdDevWithin = stdDevOverall;

    if (subgroupSize === 1) {
        if (n >= 2) {
            let mssdSum = 0;
            for (let i = 1; i < n; i++) {
                const diff = values[i] - values[i - 1];
                mssdSum += diff * diff;
            }
            const mssd = mssdSum / (2 * (n - 1));
            const sqrtMssd = Math.sqrt(mssd);
            const c4Prime = getC4Prime(n);
            stdDevWithin = sqrtMssd / c4Prime;
        }
    } else {
        const k = Math.floor(n / subgroupSize);
        if (k >= 2) {
            let sumWeightedVariances = 0;
            let totalDf = 0;

            for (let i = 0; i < k; i++) {
                const startIdx = i * subgroupSize;
                const endIdx = startIdx + subgroupSize;
                const subgroup = values.slice(startIdx, endIdx);

                if (subgroup.length > 1) {
                    const subgroupMean = subgroup.reduce((a, b) => a + b, 0) / subgroup.length;
                    const ss = subgroup.reduce((a, b) => a + Math.pow(b - subgroupMean, 2), 0);
                    const subgroupVariance = ss / (subgroup.length - 1);

                    const weight = subgroup.length - 1;
                    sumWeightedVariances += weight * subgroupVariance;
                    totalDf += weight;
                }
            }

            if (totalDf > 0) {
                const pooledVariance = sumWeightedVariances / totalDf;
                stdDevWithin = Math.sqrt(pooledVariance);
            }
        }
    }

    return [stdDevOverall, Math.max(stdDevWithin, 0.000001)];
}

function calculateCpk(values, lsl, usl, subgroupSize) {
    if (values.length === 0) return 0;

    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const [_, stdDevWithin] = calculateBothStandardDeviations(values, subgroupSize);

    if (stdDevWithin <= 0) return Infinity;

    const specType = getInputValue('specType');

    if (specType === 'bilateral') {
        const cpu = (usl - mean) / (3 * stdDevWithin);
        const cpl = (mean - lsl) / (3 * stdDevWithin);
        return Math.min(cpu, cpl);
    } else if (specType === 'unilateral_lsl') {
        return (mean - lsl) / (3 * stdDevWithin);
    } else {
        return (usl - mean) / (3 * stdDevWithin);
    }
}

function calculateIQR(values) {
    if (values.length < 4) return values.length > 0 ? (Math.max(...values) - Math.min(...values)) / 2 : 1;
    
    const sorted = [...values].sort((a, b) => a - b);
    const q1 = quantile(sorted, 0.25);
    const q3 = quantile(sorted, 0.75);
    return q3 - q1;
}

function quantile(sorted, p) {
    const index = p * (sorted.length - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    const weight = index - lower;
    
    if (upper >= sorted.length) return sorted[lower];
    if (lower === upper) return sorted[lower];
    
    return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

function normalPDF(x, mean, sigma) {
    if (sigma <= 0) return 0;
    return (1 / (sigma * Math.sqrt(2 * Math.PI))) * 
           Math.exp(-0.5 * Math.pow((x - mean) / sigma, 2));
}

function erf(x) {
    const sign = (x >= 0) ? 1 : -1;
    x = Math.abs(x);
    
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;
    
    const t = 1 / (1 + p * x);
    const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    
    return sign * y;
}

function normalCDF(x, mean, sigma) {
    if (sigma <= 0) return x >= mean ? 1 : 0;
    return 0.5 * (1 + erf((x - mean) / (sigma * Math.sqrt(2))));
}

function calculateAndDisplayStatistics(values, lsl, usl, targetCpk, subgroupSize, decimals) {
    const n = values.length;
    const meanVal = values.reduce((a, b) => a + b, 0) / n;

    const [stdDevOverall, stdDevWithin] = calculateBothStandardDeviations(values, subgroupSize);

    const specType = getInputValue('specType');
    const hasLsl = specType !== 'unilateral_usl';
    const hasUsl = specType !== 'unilateral_lsl';

    let cp, cpu, cpl, cpk, pp, ppu, ppl, ppk;

    if (stdDevWithin > 0) {
        if (specType === 'bilateral') {
            cp = (usl - lsl) / (6 * stdDevWithin);
            cpu = (usl - meanVal) / (3 * stdDevWithin);
            cpl = (meanVal - lsl) / (3 * stdDevWithin);
            cpk = Math.min(cpu, cpl);
        } else if (specType === 'unilateral_lsl') {
            cp = Infinity;
            cpu = Infinity;
            cpl = (meanVal - lsl) / (3 * stdDevWithin);
            cpk = cpl;
        } else {
            cp = Infinity;
            cpl = Infinity;
            cpu = (usl - meanVal) / (3 * stdDevWithin);
            cpk = cpu;
        }
    } else {
        cp = cpu = cpl = cpk = Infinity;
    }

    if (stdDevOverall > 0) {
        if (specType === 'bilateral') {
            pp = (usl - lsl) / (6 * stdDevOverall);
            ppu = (usl - meanVal) / (3 * stdDevOverall);
            ppl = (meanVal - lsl) / (3 * stdDevOverall);
            ppk = Math.min(ppu, ppl);
        } else if (specType === 'unilateral_lsl') {
            pp = Infinity;
            ppu = Infinity;
            ppl = (meanVal - lsl) / (3 * stdDevOverall);
            ppk = ppl;
        } else {
            pp = Infinity;
            ppl = Infinity;
            ppu = (usl - meanVal) / (3 * stdDevOverall);
            ppk = ppu;
        }
    } else {
        pp = ppu = ppl = ppk = Infinity;
    }

    let target, meanToTarget, kValue, crValue;
    if (specType === 'bilateral') {
        target = (usl + lsl) / 2;
        meanToTarget = meanVal - target;
        kValue = Math.abs(meanToTarget) / ((usl - lsl) / 2) * 100;
        crValue = cp > 0 ? 1 / cp : Infinity;
    } else {
        target = meanVal;
        meanToTarget = 0;
        kValue = 0;
        crValue = Infinity;
    }

    updateStatisticDisplay('lslValue', hasLsl ? lsl : 'N/A', decimals);
    updateStatisticDisplay('uslValue', hasUsl ? usl : 'N/A', decimals);
    updateStatisticDisplay('targetValue', target, decimals);
    updateStatisticDisplay('meanValue', meanVal, decimals);
    updateStatisticDisplay('nValue', n, 0);
    updateStatisticDisplay('meanToTargetValue', meanToTarget, decimals);
    // StdDev fields: show with higher precision (7 decimals)
    updateStatisticDisplay('stdOverallValue', stdDevOverall, 7);
    updateStatisticDisplay('stdWithinValue', stdDevWithin, 7);

    // Capability indices: show with maximum 2 decimals
    updateStatisticDisplay('cpValue', cp, 2);
    updateStatisticDisplay('cpkValue', cpk, 2);
    updateStatisticDisplay('ppValue', pp, 2);
    updateStatisticDisplay('ppkValue', ppk, 2);
    updateStatisticDisplay('cpuValue', cpu, 2);
    updateStatisticDisplay('cplValue', cpl, 2);
    updateStatisticDisplay('kValue', kValue, 2);
    updateStatisticDisplay('crValue', crValue, decimals);
}

function updateStatisticDisplay(elementId, value, decimals) {
    const element = document.getElementById(elementId);
    if (!element) return;

    if (value === 'N/A') {
        element.textContent = 'N/A';
        element.className = 'stat-card';
    } else if (value === Infinity || value === -Infinity) {
        element.textContent = '∞';
        element.className = 'stat-card value-bad';
    } else {
        const formattedValue = typeof value === 'number' ? value.toFixed(decimals) : value;
        element.textContent = formattedValue;

        if (elementId.includes('cp') || elementId.includes('pp') || elementId.includes('cpk') || elementId.includes('ppk')) {
            const numValue = parseFloat(value);
            if (numValue >= 1.67) {
                element.className = 'stat-card value-good';
            } else if (numValue >= 1.33) {
                element.className = 'stat-card value-ok';
            } else if (numValue >= 1.0) {
                element.className = 'stat-card value-warning';
            } else {
                element.className = 'stat-card value-bad';
            }
        } else {
            element.className = 'stat-card';
        }
    }
}