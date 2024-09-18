function validateLink() {
  const input = document.getElementById("link-input");
  if (input.value) {
    if (isUrlValid(input.value)) {
      handleMessage("process");
    } else {
      handleMessage();
      return;
    }
    const apiUrl = `http://localhost:5000/generate_pdf?url=${input.value}`;
    fetch(apiUrl)
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          // console.log(data.message);
          handleMessage("success");
          input.value = "";
        } else {
          // console.log(data.message);
          handleMessage("failed");
          input.value = "";
        }
      })
      .catch((error) => {
        handleMessage("", `Error in API calling: ${error}`);
        // console.log(`Error in API calling: ${error}`);
      });
  }
}

  function isUrlValid(url) {
    var pattern = new RegExp(
        '^(https?:\\/\\/|www\\.)' + 
        '([a-zA-Z0-9_-]+\\.)+[a-zA-Z]{2,6}' + 
        '(\\/[-a-zA-Z0-9_%@:.~+&=]*)*$' 
    );

    return pattern.test(url);
  }

  function handleMessage(status = "", message = "") {
    const info = document.getElementById("info");
    const button = document.querySelector(".btn");
    const ptag = document.createElement("p");
    ptag.style.fontSize = "small";
    info.innerHTML = "";
    if (status === "process") {
      ptag.innerHTML =
        "We are processing PDF for you, please wait...<br>Time taken may vary on size of content";
      ptag.style.color = "skyblue";
      button.id = "disable-btn";
      button.disabled = true;
    } else if (status === "success") {
      ptag.innerHTML =
        "PDF downloaded successfully, saved in Downloads directory";
      ptag.style.color = "#04c704";
      button.disabled = false;
      button.id = "";
      setTimeout(() => {info.innerHTML = ""}, 3000)
    } else if (status === "failed") {
      ptag.innerHTML = "Something went wrong, please try again";
      ptag.style.color = "red";
      button.disabled = false;
      button.id = "";
      setTimeout(() => {info.innerHTML = ""}, 3000)
    } else {
      ptag.innerHTML = message || "Please enter valid Link";
      ptag.style.color = "red";
      button.disabled = false;
      button.id = "";
      setTimeout(() => {info.innerHTML = ""}, 3000)
    }
    info.append(ptag);
  }
  


  