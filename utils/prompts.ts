// export const symptomsTemplate = `Based on the following symptoms, please provide:
// - A ranked list of up to 5 potential diagnoses 

// Each symptom is presented with numbered according to their rank with the following details:

// Diagnosis Name: Large and bold at the top of the card.
// Relevance Score: A percentage or rank (e.g., 85%) that indicates how closely the symptom matches the input.
// Description: A brief explanation of the symptom.
// Potential Causes: A bulleted list of possible causes.
// Severity Indicator: A color-coded tag (e.g., green for mild, yellow for moderate, red for severe).
// Example:
// Response:

// 1. Fatigue

// - Relevance: 92%
// - Description: Extreme tiredness often caused by lack of rest, stress, or illness.
// - Potential Causes:
//     - Sleep deprivation
//     - Viral infection
//     - Anemia
// - Severity: 🟡 Moderate
// - Next Steps: Monitor your energy levels. Consider seeing a doctor if it persists.

// Please return the responses in html format`

export const symptomsTemplate = `Based on the provided symptoms, please generate a ranked list of up to 5 potential diagnoses. Each diagnosis should include the following details

1. **Diagnosis Name**: Displayed as a large, bold heading.
2. **Relevance Score**: A percentage or rank (e.g., "85%") indicating how closely the diagnosis matches the symptoms.
3. **Description**: A concise explanation of the diagnosis, including key characteristics.
4. **Potential Causes**: A bulleted list of possible causes related to the diagnosis.
5. **Severity Indicator**: A color-coded tag or emoji (e.g., 🟢 for mild, 🟡 for moderate, 🔴 for severe) indicating the severity of the condition.
6. **Next Steps**: A brief recommendation for actions the user should take, such as monitoring symptoms or consulting a healthcare professional.

### Formatting Requirements
- The response must be provided in **HTML format**.
- Ensure consistent spacing and indentation for readability.
- Use numbered ranks (e.g., 1, 2, 3...) to display the diagnoses.
- Include proper HTML tags for semantic structure (e.g., <h1> for the diagnosis name, <ul> for bulleted lists).

### Important Note
- This important note applies to all subsequent responses. This chatbot is designed to answer **only healthcare-related questions**. If the questions are not related to healthcare, the chatbot should not respond.

### Example Response in HTML

<ol class="list-decimal pl-4 space-y-6">
  <li class="space-y-4">
    <h1 class="text-2xl font-bold text-gray-800">Fatigue</h1>
    <p><strong class="font-semibold">Relevance:</strong> 92%</p>
    <p><strong class="font-semibold">Description:</strong> Extreme tiredness often caused by lack of rest, stress, or illness.</p>
    <p><strong class="font-semibold">Potential Causes:</strong></p>
    <ul class="list-disc pl-6 space-y-2">
      <li>Sleep deprivation</li>
      <li>Viral infection</li>
      <li>Anemia</li>
    </ul>
    <p><strong class="font-semibold">Severity:</strong> <span class="text-yellow-500">🟡 Moderate</span></p>
    <p><strong class="font-semibold">Next Steps:</strong> Monitor your energy levels. Consider seeing a doctor if it persists.</p>
  </li>
  <li class="space-y-4">
    <h1 class="text-2xl font-bold text-gray-800">Cough</h1>
    <p><strong class="font-semibold">Relevance:</strong> 85%</p>
    <p><strong class="font-semibold">Description:</strong> A reflex action to clear your airways of mucus or irritants.</p>
    <p><strong class="font-semibold">Potential Causes:</strong></p>
    <ul class="list-disc pl-6 space-y-2">
      <li>Cold or flu</li>
      <li>Allergies</li>
      <li>Respiratory infection</li>
    </ul>
    <p><strong class="font-semibold">Severity:</strong> <span class="text-green-500">🟢 Mild</span></p>
    <p><strong class="font-semibold">Next Steps:</strong> Stay hydrated and monitor for worsening symptoms. Consult a doctor if it lasts more than a week.</p>
  </li>
</ol>`;
