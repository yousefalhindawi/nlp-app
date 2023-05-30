import { displayResults, displayError } from '../src/client/js/displayResults';

describe('displayResults', () => {
  beforeEach(() => {
    // Set up the DOM element for testing
    document.body.innerHTML = `
      <div id="results"></div>
    `;
  });

  test('displays the results correctly', () => {
    const mockData = {
      subjectivity: 'subjective',
      agreement: 'agreement',
      irony: 'ironic',
      confidence: '0.75',
    };

    // Call the displayResults function with mock data
    displayResults(mockData);

    // Verify that the results are displayed correctly in the DOM
    expect(document.getElementById('results').innerHTML).toContain(mockData.subjectivity);
    expect(document.getElementById('results').innerHTML).toContain(mockData.agreement);
    expect(document.getElementById('results').innerHTML).toContain(mockData.irony);
    expect(document.getElementById('results').innerHTML).toContain(mockData.confidence);
  });
});

describe('displayError', () => {
  beforeEach(() => {
    // Set up the DOM element for testing
    document.body.innerHTML = `
      <div id="results"></div>
    `;
  });

  test('displays the error message correctly', () => {
    const errorMessage = 'An error occurred';

    // Call the displayError function with the error message
    displayError(errorMessage);

    // Verify that the error message is displayed correctly in the DOM
    expect(document.getElementById('results').innerHTML).toContain(errorMessage);
    expect(document.getElementById('results').innerHTML).toContain('error');
  });
});

