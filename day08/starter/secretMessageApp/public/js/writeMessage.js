const test = "test";
var MD5 = new Hashes.MD5().hex(test);
console.log(MD5);
const submitMessage = () => {
    const passcodeInput = document.querySelector('#passcode');
    const messageInput = document.querySelector('#message');
     const imageInput = document.querySelector('#image');

    
    firebase.database().ref().push({
        password: passcodeInput.value,
        message: messageInput.value,
        image: imageInput.value
    });

    passcodeInput.value="";
    messageInput.value="";
    imageInput.value="";


    
};
const message = document.querySelector('#message');
const warningChar = document.querySelector("#warningChar");
const submitButton = document.querySelector("#submitButton");
message.addEventListener("input", e => {
    console.log("message changed");
    if (message.value.length > 50) {
        warningChar.innerHTML = "<p> You went over the limit! </p>";
        submitButton.disabled = true;
    }
    else{
        warningChar.innerHTML = "";
        submitButton.disabled = false;
    }
})

