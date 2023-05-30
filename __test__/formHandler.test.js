import { handleSubmit } from "../src/client/js/formHandler";
import { displayResults, displayError } from "../src/client/js/displayResults";

jest.mock("../src/client/js/displayResults", () => ({
  displayResults: jest.fn(),
  displayError: jest.fn(),
}));

describe("handleSubmit", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="form">
        <input type="text" id="article" value="Some article"/>
      </form>
      <div id="results"></div>
    `;
  });

  test("displays error message if input is empty", async () => {
    // Modify the input value to be empty
    document.getElementById("article").value = "";
    // Call the handleSubmit function
    await handleSubmit(new Event("submit"));
    // Verify that the error message is displayed
    expect(displayError).toHaveBeenCalledWith("Please enter an article");
    expect(displayResults).not.toHaveBeenCalled();

    // Clean up the mocks
    displayError.mockClear();
    displayResults.mockClear();
  });

  test("displays error message when request fails", async () => {
    // Mock the fetch function to return a failed response
    global.fetch = jest.fn().mockRejectedValueOnce();

    // Call the handleSubmit function
    await handleSubmit(new Event("submit"));

    // Verify that the error message is displayed
    expect(displayError).toHaveBeenCalledWith(
      "An error occurred while processing the request"
    );
    expect(displayResults).not.toHaveBeenCalled();

    // Clean up the mocks
    global.fetch.mockRestore();
    displayError.mockClear();
    displayResults.mockClear();
  });

  test("displays results when request is successful", async () => {
    // Mock the fetch function to return a successful response
    const mockData = {
      subjectivity: "subjective",
      agreement: "disagreement",
      irony: "ironic",
      confidence: 0.75,
    };
    global.fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
      json: () => Promise.resolve(mockData),
    });

    // Call the handleSubmit function
    await handleSubmit(new Event("submit"));

    // Verify that the results are displayed
    expect(displayError).not.toHaveBeenCalled();
    expect(displayResults).toHaveBeenCalledWith(mockData);

    // Clean up the mocks
    global.fetch.mockRestore();
    displayError.mockClear();
    displayResults.mockClear();
  });
});
