const API_KEY = "MmFf1X54yhcPsslXkFtFtQ-4PH4";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"))

document.getElementById("status").addEventListener("click", e => getStatus(e));
document.getElementById("submit").addEventListener("click", e => postForm(e));

function processOptions(form) {
  let optArray = [];
  for (let entry of form.entries()) {
    if (entry[0] === "options") {
      optArray.push(entry[1])
    }
  }
  form.delete("options")
  form.append("options", optArray.join())
  return form 
}

async function postForm(e) {
  const form = processOptions(new FormData(document.getElementById("checksform")));

  const response = await fetch(API_URL, {
                              method: "POST",
                              headers: {
                                "Authorization": API_KEY,
                                },
                                body: form,
  })

  const data = await response.json();

  if (response.ok) {
    displayErrors(data)
  }else {
    displayExceptions(data)
    throw new Error(data.error)
  }
            
}

function displayExceptions(data) {
  document.getElementById("resultsModalTitle").innerHTML = `An Error Occured`
  document.getElementById("results-content").innerHTML = `<div>The API returned status code ${data.status_code}</div><div>Error Number: <b>${data.error_no}</b></div><div>Error Text: <b>${data.error}</b></div>`
  resultsModal.show();
}

function displayErrors(data) {
  let heading = `JSHint results for ${data.file}`;

  if(data.total_errors === 0) {
    results = `<div class="no_errors">No errors reported!</div>`
  } else {
    results = `<div>Total Errors: <span class=error_count">${data.total_errors}</span></div>`
    for (let error of data.error_list) {
      results += `<div>At line <span class="line">${error.line}</span>,`;
      results += `Column <span class="column">${error.col}</span></div>`
      results += `<div class="error">${error.error}</div>`
    }
  }
  document.getElementById("resultsModalTitle").innerHTML = heading;
  document.getElementById("results-content").innerHTML = results;
  resultsModal.show();
  
}

async function getStatus(e) {
  const queryString = `${API_URL}?api_key=${API_KEY}`;

  const response = await fetch(queryString);

  const data = await response.json();

  if (response.ok) {
    displayStatus(data.expiry)
  } else {
    throw new Error(data.error);
  }
}

function displayStatus(data){ 
  document.getElementById("resultsModalTitle").innerHTML = `<h1>API Key Status</h1>`
  document.getElementById("results-content").innerHTML = `<p>Your key is valid until</p><p>${data}</p>`
  resultsModal.show();
}

const response = fetch("https://ci-jshint.herokuapp.com/api", {
                        method: "POST",
                        headers: {
                                    "Authorization": API_KEY,
                                 }
                        })
            