// let submit=document.getElementById("submit")
// submit.addEventListener("click", SendEmail);
function SendEmail(){ 
    console.log("working");
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "ritikservices@gmail.com", //Non valid + Test
        Password : "C8E3C9C337BC379BD8D0CDB2B0FB5ED62E49",
        To : 'bwubts19200@brainwareuniversity.ac.in',
        From : "bwubts19200@brainwareuniversity.ac.in",
        Subject : "work",
        Body : "Working"
    }).then(
      message => alert(message)
    );    
}
