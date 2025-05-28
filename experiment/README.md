# 📘 Steps to Create the Experiment: Study of Multi-stage Amplifiers (Frequency Response)

Welcome to the development guide for the experiment **"Study of Multi-stage Amplifiers (Frequency Response)"**. This experiment is designed for the Virtual Labs project and helps learners understand how multi-stage amplifier circuits behave across different frequency ranges.

---

## ✅ Understand the Experiment Repository

Familiarize yourself with the standard structure of Virtual Labs repositories. This experiment should follow the same layout and structure as provided in the [VLEAD development documentation](https://vlead.vlabs.ac.in/development/#development-process) and [template repository](https://github.com/virtual-labs-cms/exp-template).

---

## 🏗 Repository Branch Structure

Each experiment repository contains the following branches:

- **dev**: Active development work.
- **testing**: Staging area for reviewed and tested code.
- **gh-pages**: GitHub Pages deployment.
- **main**: Stable, production-ready version.

> **Note**: Perform all changes in the `dev` branch. After local and peer testing, merge into `testing` to preview on GitHub Pages.

---

## 📂 Files and Structure to Maintain

Your repository should contain the following files/folders with meaningful content:

### 1. `aim.md`
State the core educational objective—i.e., to study the frequency response characteristics of multi-stage amplifiers.

### 2. `experiment-name.md`
Use a clear and simple name: **"Study of Multi-stage Amplifiers (Frequency Response)"**

### 3. `pretest.json` & `posttest.json`
- Pretest: Questions to assess prerequisite knowledge on amplifier basics and frequency response.
- Posttest: Questions to test understanding after simulation and theory.
> Format: JSON array of question objects with `question`, `answers`, and `correctAnswer`.

See the [Quiz Format Guide](https://github.com/virtual-labs/ph3-lab-mgmt/blob/dev/docs/quiz.md) for implementation details.

### 4. `theory.md`
Explain:
- Concepts of frequency response
- Gain vs. frequency characteristics
- Purpose of cascading multiple amplifier stages
- Effects of coupling, bypass, and inter-stage loading

Use illustrations, equations (LaTeX), and graphs where appropriate.

### 5. `procedure.md`
List step-by-step actions for using the simulation:
- Input signal selection
- Adjusting frequency sweep
- Observing gain variation per stage
- Interpreting Bode plots
- Analyzing overall system response

### 6. `simulation/` Folder

Must include:

- `index.html`: Main simulation interface (mandatory)
- `css/`: Styling resources
- `js/`: Simulation logic (gain calculation, frequency plot rendering)
- `images/`: Diagrams, waveform illustrations, Bode plots, etc.

### 7. `reference.md`
List books, papers, datasheets, and web resources used to develop the theory and simulation.

---

## ✅ Do’s and ❌ Don’ts

### ✅ Do’s
- Develop only in the `dev` branch
- Use clean folder structure
- Validate all JSON (via [jsonlint](https://jsonlint.com/))
- Create clear UI for each amplifier stage and its gain behavior
- Simulate both individual and combined frequency responses

### ❌ Don’ts
- Avoid modifying or deleting `gh-pages` branch
- Don’t rename critical files like `index.html`
- Don’t hard-code values—use dynamic controls for inputs and frequencies

---

## 📚 Further References

- [Virtual Labs Onboarding Process](https://vlead.vlabs.ac.in/development/#onboarding-process)
- [Virtual Labs Hosting Guide](https://vlead.vlabs.ac.in/development/#hosting-process)
- [Sample Simulation](https://virtual-labs.github.io/exp-adder-circuit-iiith/)

---

Feel free to modify the simulation complexity or interactivity level as long as the pedagogical goal is met: demonstrating **frequency-dependent behavior** of **multi-stage amplifier circuits**.
