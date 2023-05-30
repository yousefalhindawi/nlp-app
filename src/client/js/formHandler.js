import { displayResults, displayError } from "./displayResults";

async function handleSubmit(event) {
  event.preventDefault();
  try {
    const inputText = document.getElementById("article").value;
    if (inputText.trim() === "") {
      displayError("Please enter an article");
      return;
    }
    const response = await fetch("/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ article: inputText }),
    });

    const data = await response.json();
    displayResults(data);
  } catch (error) {
    displayError("An error occurred while processing the request");
  }
}

export { handleSubmit };
