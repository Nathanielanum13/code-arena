document.addEventListener("DOMContentLoaded", () => {
  const targetNode = document.getElementById("response-message");

  // Options for the observer (specify the types of mutations you're interested in)
  const config = { attributes: true, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {

        const alertContainer = document.getElementById('alerts')
        console.log(alertContainer, 'What is you')


        const alertContent = targetNode.innerHTML

        alertContainer.appendChild = alertContent
        // targetNode.innerHTML = ``

        // document.body.appendChild(alertEl)

        setTimeout(() => {
            alertContainer.innerHTML = ``
        }, 5000)

      } else if (mutation.type === "attributes") {
        console.log("Attributes of the target node have changed.");
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);


  const button = document.getElementById("button");
//   const alertClose = document.getElementById("alert-close");
  let counter = 0

  button.addEventListener("click", () => {
    counter++
    targetNode.innerHTML = `<div class="alert">Counter now updated to ${counter} <span id="alert-close">x</span></div>`
  })

//   alertClose.addEventListener("click", () => {
//     targetNode.innerHTML = ``
//   })

});
