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
const card = document.querySelector("#card");

function validateMessages(messages) {
    let correct = false;
    const passcodeAttempt = document.querySelector("#passcode").value;
    for (message in messages) {
        const messageData = messages[message];
        console.log("Each message data " + messageData);
        if (messageData.password === passcodeAttempt) {
            console.log("Correct password!")
            card.style.display = "";
            correct = true;
            passcode.value="";
            passcode.placeholder ="What's the subject?"
            renderMessageAsHtml(messageData.message);
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

function renderMessageAsHtml(messageContent) {
    const passcodeInput = document.querySelector("#passcodeInput");
    passcodeInput.style.display = 'none';
    const messageDiv = document.querySelector("#message");
    messageDiv.innerHTML = messageContent;

}

function goBack() {
    // render input box and hide card
    passcodeInput.style.display = "";
    card.style.display="none";

    passcode.classList.remove("is-danger");

}