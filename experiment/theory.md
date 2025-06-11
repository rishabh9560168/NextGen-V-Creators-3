
# Study of Multi-stage Amplifiers (Frequency Response)

##  Objective
To study the frequency response of multi-stage amplifiers and understand how cascading amplifier stages affects gain, bandwidth, and signal fidelity.

---

##  Theory

###  What is a Multi-stage Amplifier?
A **multi-stage amplifier** consists of two or more amplifier stages connected in series (cascaded), where the output of one stage is fed as input to the next. This is done to:
- Achieve higher voltage gain
- Improve bandwidth or input/output impedance
- Tailor frequency response for specific applications

Each stage may be:
- Common emitter (CE)
- Common base (CB)
- Common collector (CC)
- Or a combination (e.g., CE-CE, CE-CB)

---

###  Frequency Response
Frequency response is a measure of the amplifier's gain over a range of input frequencies. It typically shows:
- **Low-frequency fall-off** due to coupling and bypass capacitors
- **Mid-frequency flat region** (constant gain)
- **High-frequency roll-off** due to parasitic capacitance

**Key terms:**
- **Bandwidth (BW):** Range of frequencies over which the gain remains above 70.7% of the maximum gain (i.e., -3 dB point)
- **Cut-off frequencies (f<sub>L</sub> and f<sub>H</sub>):** Lower and upper -3 dB points
- **Midband gain:** Gain in the flat portion of the frequency response curve

---

##  Simulation Description

In this simulation:
- Users can select the number of stages (2 or 3)
- Each stage's gain, input/output impedance, and coupling method can be visualized
- Frequency response is plotted as a **Bode plot (Gain vs. Frequency)**

Features:
- Real-time waveform and Bode plot visualization
- Adjustable frequency input
- Stage-wise gain display
- Multilingual voice/text-based guidance

---

##  Observations

Users should observe:
- The effect of adding more amplifier stages
- The narrowing of bandwidth with increased gain
- The shift in -3 dB cut-off points

---

##  Applications

- Audio amplifiers
- Communication systems
- Instrumentation systems
- RF and high-frequency circuit design

---

##  References

1. Sedra & Smith – *Microelectronic Circuits*
2. Boylestad & Nashelsky – *Electronic Devices and Circuit Theory*
3. Online Electronics Virtual Labs – NPTEL/IEEE resources

---
