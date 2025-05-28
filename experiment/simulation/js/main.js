//Your JavaScript goes in here
// Multi-Stage Amplifier Laboratory - Main JavaScript

class AmplifierLab {
    constructor() {
        this.frequency = 20;
        this.currentLanguage = 'both';
        this.measurements = [];
        this.isRunning = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateDisplay();
        this.drawWaveform();
        this.drawBodePlot();
        this.updateStageAnalysis();
    }

    setupEventListeners() {
        // Frequency slider
        const frequencySlider = document.getElementById('frequencySlider');
        frequencySlider.addEventListener('input', (e) => {
            this.frequency = parseInt(e.target.value);
            this.updateDisplay();
            this.drawWaveform();
            this.drawBodePlot();
            this.updateStageAnalysis();
            this.announceFrequencyChange();
        });

        // Action buttons
        document.getElementById('startTourBtn').addEventListener('click', () => this.startGuidedTour());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetLab());
        document.getElementById('repeatBtn').addEventListener('click', () => this.repeatInstructions());

        // Language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentLanguage = e.target.dataset.lang;
                this.updateLanguageDisplay();
            });
        });

        // Concept explanation buttons
        document.querySelectorAll('.concept-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.explainConcept(e.target.dataset.concept);
            });
        });

        // Tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
                
                e.target.classList.add('active');
                document.getElementById(e.target.dataset.tab).classList.add('active');
            });
        });
    }

    calculateGain(freq) {
        const centerFreq = 40; // kHz
        const bandwidth = 30; // kHz
        const maxGain = 25; // dB
        
        // Gaussian-like response with some high-frequency rolloff
        const normalizedFreq = (freq - centerFreq) / (bandwidth / 2);
        const gaussianResponse = Math.exp(-0.5 * normalizedFreq * normalizedFreq);
        
        // Add high-frequency rolloff
        const highFreqRolloff = 1 / (1 + Math.pow(freq / 80, 2));
        
        return maxGain * gaussianResponse * highFreqRolloff;
    }

    updateDisplay() {
        const gain = this.calculateGain(this.frequency);
        
        document.getElementById('frequencyDisplay').textContent = `${this.frequency} kHz`;
        document.getElementById('currentFreq').textContent = `${this.frequency} kHz`;
        document.getElementById('currentGain').textContent = `${gain.toFixed(2)} dB`;
        
        // Update measurements
        const existingIndex = this.measurements.findIndex(m => m.freq === this.frequency);
        if (existingIndex >= 0) {
            this.measurements[existingIndex] = { freq: this.frequency, gain };
        } else {
            this.measurements.push({ freq: this.frequency, gain });
            this.measurements.sort((a, b) => a.freq - b.freq);
        }
    }

    updateLanguageDisplay() {
        const languageMap = {
            'english': 'English',
            'hindi': 'हिंदी',
            'both': 'Both'
        };
        document.getElementById('currentLanguage').textContent = languageMap[this.currentLanguage];
    }

    drawWaveform() {
        const canvas = document.getElementById('waveformCanvas');
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, width, height);

        // Draw grid
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1;
        
        // Vertical grid lines
        for (let x = 0; x <= width; x += 40) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        
        // Horizontal grid lines
        for (let y = 0; y <= height; y += 30) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // Draw center line
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();

        // Calculate gain
        const gain = this.calculateGain(this.frequency);
        const linearGain = Math.pow(10, gain / 20);

        // Draw input signal (smaller amplitude, blue)
        const inputAmplitude = 40;
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
            const t = x / width;
            const y = height / 2 + inputAmplitude * Math.sin(2 * Math.PI * this.frequency * t * 2);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Draw output signal (amplified, green)
        const outputAmplitude = Math.max(linearGain * 8, 5); // Scale for display
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
            const t = x / width;
            const y = height / 2 + outputAmplitude * Math.sin(2 * Math.PI * this.frequency * t * 2);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Draw labels
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '12px monospace';
        ctx.fillText('Input Signal', 10, 20);
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(100, 12, 20, 3);
        
        ctx.fillStyle = '#e2e8f0';
        ctx.fillText('Output Signal', 10, 40);
        ctx.fillStyle = '#10b981';
        ctx.fillRect(110, 32, 20, 3);

        // Display frequency and gain info
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '14px monospace';
        ctx.fillText(`f = ${this.frequency} kHz`, width - 120, 20);
        ctx.fillText(`Gain = ${gain.toFixed(1)} dB`, width - 120, 40);
    }

    drawBodePlot() {
        const canvas = document.getElementById('bodeCanvas');
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const margin = { top: 20, right: 30, bottom: 50, left: 60 };
        const plotWidth = width - margin.left - margin.right;
        const plotHeight = height - margin.top - margin.bottom;

        // Clear canvas
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, width, height);

        // Draw background grid
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1;

        // Vertical grid lines (frequency)
        for (let i = 0; i <= 10; i++) {
            const x = margin.left + (i / 10) * plotWidth;
            ctx.beginPath();
            ctx.moveTo(x, margin.top);
            ctx.lineTo(x, height - margin.bottom);
            ctx.stroke();
        }

        // Horizontal grid lines (gain)
        for (let i = 0; i <= 8; i++) {
            const y = margin.top + (i / 8) * plotHeight;
            ctx.beginPath();
            ctx.moveTo(margin.left, y);
            ctx.lineTo(width - margin.right, y);
            ctx.stroke();
        }

        // Draw axes
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        // Y axis
        ctx.moveTo(margin.left, margin.top);
        ctx.lineTo(margin.left, height - margin.bottom);
        // X axis
        ctx.lineTo(width - margin.right, height - margin.bottom);
        ctx.stroke();

        // Draw axis labels
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Frequency (kHz)', width / 2, height - 10);

        ctx.save();
        ctx.translate(20, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Gain (dB)', 0, 0);
        ctx.restore();

        // Draw frequency scale
        ctx.textAlign = 'center';
        for (let i = 0; i <= 10; i++) {
            const freq = (i / 10) * 100;
            const x = margin.left + (i / 10) * plotWidth;
            ctx.fillText(freq.toString(), x, height - margin.bottom + 20);
        }

        // Draw gain scale
        ctx.textAlign = 'right';
        for (let i = 0; i <= 8; i++) {
            const gain = 30 - (i / 8) * 40; // 30 to -10 dB range
            const y = margin.top + (i / 8) * plotHeight;
            ctx.fillText(gain.toFixed(0), margin.left - 10, y + 4);
        }

        // Generate curve points
        const curvePoints = [];
        for (let freq = 1; freq <= 100; freq += 1) {
            const gain = this.calculateGain(freq);
            curvePoints.push({ freq, gain });
        }

        // Plot response curve
        if (curvePoints.length > 1) {
            ctx.strokeStyle = '#06b6d4';
            ctx.lineWidth = 3;
            ctx.beginPath();

            curvePoints.forEach((point, index) => {
                const x = margin.left + (point.freq / 100) * plotWidth;
                let gainDb = point.gain;
                // Clamp gain to display range
                gainDb = Math.max(-10, Math.min(30, gainDb));
                const y = margin.top + ((30 - gainDb) / 40) * plotHeight;

                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.stroke();
        }

        // Draw measurement points
        this.measurements.forEach((point) => {
            const x = margin.left + (point.freq / 100) * plotWidth;
            let gainDb = point.gain;
            gainDb = Math.max(-10, Math.min(30, gainDb));
            const y = margin.top + ((30 - gainDb) / 40) * plotHeight;

            ctx.fillStyle = point.freq === this.frequency ? '#ef4444' : '#06b6d4';
            ctx.beginPath();
            ctx.arc(x, y, point.freq === this.frequency ? 6 : 4, 0, 2 * Math.PI);
            ctx.fill();
        });

        // Draw current frequency marker
        const currentX = margin.left + (this.frequency / 100) * plotWidth;
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(currentX, margin.top);
        ctx.lineTo(currentX, height - margin.bottom);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw -3dB line
        const minus3dbGain = Math.max(this.calculateGain(40) - 3, -10);
        const minus3dbY = margin.top + ((30 - minus3dbGain) / 40) * plotHeight;
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 1;
        ctx.setLineDash([10, 5]);
        ctx.beginPath();
        ctx.moveTo(margin.left, minus3dbY);
        ctx.lineTo(width - margin.right, minus3dbY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Add legend
        ctx.fillStyle = '#fbbf24';
        ctx.font = '10px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('-3dB Bandwidth', margin.left + 10, minus3dbY - 5);
    }

    updateStageAnalysis() {
        const totalGain = this.calculateGain(this.frequency);
        const stage1Gain = totalGain * 0.6;
        const stage2Gain = totalGain * 0.4;
        const linearGain = Math.pow(10, totalGain / 20);

        document.getElementById('stage1Gain').textContent = `${stage1Gain.toFixed(2)} dB`;
        document.getElementById('stage2Gain').textContent = `${stage2Gain.toFixed(2)} dB`;
        document.getElementById('totalGain').textContent = `${totalGain.toFixed(2)} dB`;
        document.getElementById('currentFreqStage').textContent = this.frequency;
        document.getElementById('linearGain').textContent = linearGain.toFixed(2);
    }

    // Voice Control Methods
    speak(text, options = {}) {
        if (!window.speechSynthesis) {
            console.warn('Speech synthesis not supported');
            return;
        }

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = options.rate || 0.9;
        utterance.pitch = options.pitch || 1.0;
        utterance.volume = options.volume || 0.8;
        utterance.lang = 'en-US';

        window.speechSynthesis.speak(utterance);
    }

    speakHindi(text, options = {}) {
        if (!window.speechSynthesis) {
            console.warn('Speech synthesis not supported');
            return;
        }

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = options.rate || 0.8;
        utterance.pitch = options.pitch || 1.0;
        utterance.volume = options.volume || 0.8;
        utterance.lang = 'hi-IN';

        window.speechSynthesis.speak(utterance);
    }

    speakInSelectedLanguage(englishText, hindiText) {
        if (this.currentLanguage === 'english') {
            this.speak(englishText);
        } else if (this.currentLanguage === 'hindi') {
            this.speakHindi(hindiText);
        } else if (this.currentLanguage === 'both') {
            this.speak(englishText);
            setTimeout(() => {
                this.speakHindi(hindiText);
            }, englishText.length * 50);
        }
    }

    startGuidedTour() {
        this.isRunning = true;
        const englishText = "Welcome to the Multi-stage Amplifier Laboratory. " +
            "This virtual lab will guide you through studying frequency response characteristics. " +
            "You can adjust the input frequency using the slider and observe real-time changes " +
            "in the waveform display and Bode plot. " +
            "Pay attention to how the gain varies across different frequencies.";
        
        const hindiText = "मल्टी-स्टेज एम्प्लीफायर प्रयोगशाला में आपका स्वागत है। " +
            "यह वर्चुअल लैब आपको फ्रीक्वेंसी रिस्पांस विशेषताओं का अध्ययन करने में मदद करेगी। " +
            "आप स्लाइडर का उपयोग करके इनपुट फ्रीक्वेंसी को समायोजित कर सकते हैं।";

        this.speakInSelectedLanguage(englishText, hindiText);
    }

    announceFrequencyChange() {
        const gain = this.calculateGain(this.frequency);
        const gainDb = gain.toFixed(1);
        const englishText = `Frequency set to ${this.frequency} kilohertz. ` +
            `The amplifier gain is now ${gainDb} decibels. ` +
            `${this.frequency < 20 ? 'This is in the low frequency region. ' : 
              this.frequency > 60 ? 'This is in the high frequency region. ' : 
              'This is near the center frequency where gain is maximum. '}`;

        const hindiText = `फ्रीक्वेंसी ${this.frequency} किलोहर्ट्ज़ पर सेट की गई है। ` +
            `एम्प्लीफायर गेन अब ${gainDb} डेसिबल है। ` +
            `${this.frequency < 20 ? 'यह कम फ्रीक्वेंसी क्षेत्र में है। ' : 
              this.frequency > 60 ? 'यह उच्च फ्रीक्वेंसी क्षेत्र में है। ' : 
              'यह केंद्रीय फ्रीक्वेंसी के पास है जहाँ गेन अधिकतम है। '}`;

        this.speakInSelectedLanguage(englishText, hindiText);
    }

    resetLab() {
        this.measurements = [];
        this.frequency = 20;
        document.getElementById('frequencySlider').value = 20;
        this.isRunning = false;
        this.updateDisplay();
        this.drawWaveform();
        this.drawBodePlot();
        this.updateStageAnalysis();

        const englishText = "Simulation has been reset. " +
            "All measurements cleared. " +
            "You can now start a new frequency sweep analysis.";
        
        const hindiText = "सिमुलेशन रीसेट कर दिया गया है। " +
            "सभी मापन साफ़ कर दिए गए हैं। " +
            "अब आप नया फ्रीक्वेंसी स्वीप विश्लेषण शुरू कर सकते हैं।";

        this.speakInSelectedLanguage(englishText, hindiText);
    }

    repeatInstructions() {
        const englishText = "Instructions: Use the frequency slider to sweep from 1 to 100 kilohertz. " +
            "Observe the oscilloscope for waveform changes and monitor the Bode plot " +
            "for gain variation. Study how each amplifier stage contributes to the total gain. " +
            "The center frequency around 40 kilohertz provides maximum amplification.";
        
        const hindiText = "निर्देश: 1 से 100 किलोहर्ट्ज़ तक फ्रीक्वेंसी स्लाइडर का उपयोग करें। " +
            "वेवफॉर्म परिवर्तन के लिए ऑसिलोस्कोप देखें और गेन वेरिएशन के लिए बोडे प्लॉट की निगरानी करें। " +
            "40 किलोहर्ट्ज़ के आसपास केंद्रीय फ्रीक्वेंसी अधिकतम एम्प्लीफिकेशन प्रदान करती है।";

        this.speakInSelectedLanguage(englishText, hindiText);
    }

    explainConcept(concept) {
        const explanations = {
            bode: {
                english: "A Bode plot shows the frequency response of the amplifier. " +
                        "The horizontal axis represents frequency in kilohertz, " +
                        "while the vertical axis shows gain in decibels. " +
                        "The curve shape reveals the amplifier's bandwidth characteristics.",
                hindi: "बोडे प्लॉट एम्प्लीफायर की फ्रीक्वेंसी रिस्पांस को दिखाता है। " +
                      "क्षैतिज अक्ष किलोहर्ट्ज़ में फ्रीक्वेंसी को दर्शाता है, " +
                      "जबकि ऊर्ध्वाधर अक्ष डेसिबल में गेन दिखाता है।"
            },
            stages: {
                english: "This two-stage amplifier uses a common emitter first stage " +
                        "for high gain and a common base second stage for bandwidth extension. " +
                        "The total gain is the sum of individual stage gains in decibels.",
                hindi: "यह दो-चरणीय एम्प्लीफायर उच्च गेन के लिए कॉमन एमिटर पहले चरण " +
                      "और बैंडविड्थ विस्तार के लिए कॉमन बेस दूसरे चरण का उपयोग करता है।"
            },
            frequency: {
                english: "As input frequency changes, the amplifier gain varies. " +
                         "At very low and high frequencies, gain decreases due to " +
                         "coupling capacitors and transistor limitations. " +
                         "Maximum gain occurs at the center frequency.",
                hindi: "जैसे-जैसे इनपुट फ्रीक्वेंसी बदलती है, एम्प्लीफायर गेन बदलता है। " +
                      "बहुत कम और उच्च फ्रीक्वेंसी पर, गेन कम हो जाता है।"
            }
        };

        const explanation = explanations[concept];
        if (explanation) {
            this.speakInSelectedLanguage(explanation.english, explanation.hindi);
        } else {
            this.speakInSelectedLanguage(
                "Concept explanation not available.",
                "अवधारणा स्पष्टीकरण उपलब्ध नहीं है।"
            );
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AmplifierLab();
});

