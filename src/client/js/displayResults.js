function displayResults(data) {
    const resultsContainer = document.getElementById('results');
  
    resultsContainer.innerHTML = `
      <p>Subjectivity: ${data.subjectivity}</p>
      <p>Agreement: ${data.agreement}</p>
      <p>Irony: ${data.irony}</p> 
      <p>Confidence: ${data.confidence}</p>
    `;
  }
  
  function displayError(message) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = `<p class="error">${message}</p>`;
  }
  
  export { displayResults, displayError };