<div align="center">
  
  <h1>SeizureSafe: Advanced Epilepsy Care Platform</h1>

  <p>
    <strong>A modern, patient-centric digital health platform designed for caregivers, families, and patients.</strong>
  </p>

  <p>
    <i>Delivered as a Solo Freelance Project • Phase 1 completed in a <b>72-Hour Sprint</b> • Full-Stack Implementation</i>
  </p>

  <br />

  <table>
    <tr>
      <td><b>Role</b></td>
      <td>Full-Stack Developer, UI/UX Designer, System Architect (4th-Year Student)</td>
    </tr>
    <tr>
      <td><b>Tech Stack</b></td>
      <td>React.js, Firebase (Auth, Firestore), openFDA API, RxNav API</td>
    </tr>
    <tr>
      <td><b>Timeline</b></td>
      <td>72 Hours (Intensive Phase 1 Sprint)</td>
    </tr>
    <tr>
      <td><b>Target Audience</b></td>
      <td>Caregivers, Parents, Family Members, and Patients [cite: 6]</td>
    </tr>
  </table>
</div>

<hr />

<h2>Project Overview</h2>
<p>
  SeizureSafe is a comprehensive platform built to bridge the gap between complex medical data and everyday patient safety. The application was completely engineered from the ground up as a premium healthcare dashboard[cite: 14]. 
</p>
<p>
  <strong>Solo Engineering Highlight:</strong> Balancing my 4th-year academic studies with freelance work, I single-handedly engineered this complete medical platform in a 72-hour intensive sprint. I handled the responsive UI/UX design, the backend architecture using Firebase, and complex API integrations to build a real-time Drug Interaction Engine. This project demonstrates my ability to independently deliver a full-stack product under tight deadlines.
</p>

<hr />

<h2>Key Features & Functionality (Phase 1)</h2>

<h3>1. Dynamic & Personalized Onboarding</h3>
<ul>
  <li><b>Role-Based Profiles:</b> Custom authentication and flows for Patients, Parents, Caregivers, or Friends[cite: 4, 30, 31, 32, 33, 34, 35].</li>
  <li><b>Medical Context:</b> Captures patient age groups [cite: 36], specific epilepsy types [cite: 41], and current medications[cite: 49].</li>
  <li><b>Smart Homepage:</b> The dashboard dynamically shifts its content based on the user's profile, providing age-specific tips[cite: 55, 70].</li>
</ul>

<h3>2. Advanced Drug Interaction Engine</h3>
<p>Engineered a real-time interaction checker leveraging multiple medical APIs for patient safety.</p>
<ul>
  <li><b>Multi-API Integration:</b> Uses <code>RxNorm/RxNav</code> for drug name normalization [cite: 104] and <code>openFDA</code> to fetch real-time drug labels, contraindications, and food/alcohol warnings[cite: 108, 109, 111, 112, 114].</li>
  <li><b>Custom Epilepsy Rules DB:</b> A database tracking specific epilepsy interactions[cite: 118].</li>
  <li><b>Clear Severity Coding:</b> Results are displayed using a strict medical color code: Green (Safe), Yellow (Caution), Orange (Warning), Red (Dangerous)[cite: 16, 17, 18, 19].</li>
</ul>

<h3>3. Comprehensive Medication Manager</h3>
<ul>
  <li><b>Timeline View:</b> Organizes the patient's daily regimen by Morning, Afternoon, Evening, and Bedtime[cite: 130, 131, 132, 133, 134, 135].</li>
  <li><b>Smart Alerts:</b> Automatically scans the active medication list and alerts users to duplicate medications, sedation risks, or dangerous interactions[cite: 156, 157, 158, 159].</li>
</ul>

<h3>4. Seizure Emergency Triage Questionnaire</h3>
<ul>
  <li>A guided, high-stress-optimized questionnaire (Yes/No format) for caregivers during or immediately after a seizure event[cite: 167, 169].</li>
  <li>Evaluates factors like duration (>5 mins), breathing, and pregnancy to output an immediate Red/Yellow/Green emergency action plan[cite: 170, 173, 175, 177].</li>
</ul>

<h3>5. Clinical Awareness & First Aid Hub</h3>
<ul>
  <li>Highly visual guides on what to do (and what NOT to do) during a seizure[cite: 183, 190].</li>
  <li>Myth vs. Fact cards, emergency checklists, and family awareness planning tools[cite: 85, 86].</li>
</ul>

<hr />

<h2>UI/UX Philosophy: "Calm & Safe"</h2>
<p>
  Designed a responsive UI/UX focused on accessibility for the target audience.
</p>
<ul>
  <li><b>Accessibility First:</b> Large readable text, high contrast, and easy tap targets optimized for mobile-first usage[cite: 10, 22, 23, 24].</li>
  <li><b>Calm Aesthetics:</b> Uses a clean medical theme, soft colors, rounded cards, and subtle shadows to reduce cognitive load[cite: 9].</li>
</ul>

<hr />

<h2>Technical Architecture (Full-Stack)</h2>

<details>
  <summary><b>Click to view Backend & Database Schema Details</b></summary>
  <br />
  <p>The backend is fully powered by <b>Firebase</b> (Authentication, Firestore Database) with a custom normalized schema to handle complex medical intersections:</p>
  <ul>
    <li><code>medications</code>: Tracks generic/brand names, dosages, and timing[cite: 229].</li>
    <li><code>drug_interactions</code>: Maps Drug A to Drug B with severity descriptors[cite: 230].</li>
    <li><code>food_interactions</code>: Maps medications to dietary habits (e.g., dairy)[cite: 231].</li>
    <li><code>epilepsy_types</code>: Connects specific diagnoses to common triggers and symptoms[cite: 232].</li>
  </ul>
</details>

<hr />

<h2>Phase 2: Future Roadmap</h2>
<p>
  While Phase 1 successfully established the core full-stack architecture in just 72 hours, Phase 2 is planned to include:
</p>
<ul>
  <li><b>Automated Push Notifications:</b> Real-time reminders for missed doses and schedule changes[cite: 239, 240, 243].</li>
  <li><b>Seizure Tracking Diary:</b> A calendar-based logging system to track frequency, duration, and potential triggers over time.</li>
  <li><b>Caregiver Syncing:</b> Allowing multiple family members to link to a single patient profile to share monitoring duties.</li>
  <li><b>Doctor Export:</b> Generating PDF reports of medication history and seizure logs to hand directly to neurologists.</li>
</ul>

<hr />

<div align="center">
  <p><b>Developed by Duaa Abd-Elati Abd-Elazeem</b></p>
  <p><i>4th-Year Student | Full-Stack Developer | UI/UX Designer</i></p>
</div>
