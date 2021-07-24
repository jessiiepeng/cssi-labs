console.log("in viewMessages.js");

var attempts = 0;

function getMessages() {
    console.log("in getMessages()");
    console.log(firebase);
    const messagesRef = firebase.database().ref();
    messagesRef.on('value', (snapshot) => {
        const messages = snapshot.val();
        console.log(messages);
        validateMessages(messages);

        

    })
}

const passcode = document.querySelector("#passcode");
 const passcodeInput = document.querySelector("#passcodeInput");
// const card = document.querySelector("#card");

function validateMessages(messages) {
    let correct = false;
    const passcodeAttempt = document.querySelector("#passcode").value;
    for (message in messages) {
        const messageData = messages[message];
        console.log("Each message data " + messageData);
   
        if (messageData.password === passcodeAttempt) {
            console.log("Correct password!")
            // card.style.display = "";
            correct = true;
            passcode.value="";
            passcode.placeholder ="What's the subject?"
            renderMessageAsHtml(messageData.message, messageData.image);
            
        }
    }
    if (!correct) {
        console.log("Incorrect password!");
        

        passcode.value = "";
        passcode.placeholder = "Not funny enough."
        passcode.classList.add("is-danger");
        attempts = attempts + 1;

       
    }
}

function renderMessageAsHtml(messageContent, imageURL) {
    console.log("render message as html!");
    const kudos = document.querySelector("#kudos");
    console.log(kudos);

    console.log(messageContent);
    kudos.innerHTML = kudos.innerHTML + `<div class="column is-one-fifth mt-4">
        <!-- CARD -->
        <div class="card">
        <div class="card-image">
    <figure class="image is-4by3">
      <img src="${imageURL}" alt="Placeholder image">
    </figure>
  </div>
          <div class="card-content">
            <div class="content">
              <p class="title is-4">${messageContent}</p>
             
            </div>
          </div>
         
        </div>
      </div>`;
    // if(kudos.innerHTML != null) {
    //     kudos.innerHTML = kudos.innerHTML + ` <h2 class="subtitle is-4">${messageContent}</h2>`;
    // } else {
    //     kudos.innerHTML =` <h2 class="subtitle is-4">${messageContent}</h2>`;
    // }
    
    const passcodeInput = document.querySelector("#passcodeInput");
    passcodeInput.style.display = 'none';


}

function goBack() {
    // render input box and hide card
    passcodeInput.style.display = "";
    const kudos = document.querySelector("#kudos");
    kudos.innerHTML = "";
    passcode.classList.remove("is-danger");

}