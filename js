function getAccounts(){
    return JSON.parse(
        localStorage.getItem("accounts") || "{}"
    );
}

function saveAccounts(accounts){
    localStorage.setItem(
        "accounts",
        JSON.stringify(accounts)
    );
}

function createAccount(){

    const user =
        document.getElementById("username").value.trim();

    const pass =
        document.getElementById("password").value;

    if(!user || !pass){
        setStatus("Enter username and password");
        return;
    }

    let accounts = getAccounts();

    if(accounts[user]){
        setStatus("Username already exists");
        return;
    }

    accounts[user] = {
        password: pass,
        notes: ""
    };

    saveAccounts(accounts);

    setStatus("✅ Account created");
}

function login(){

    const user =
        document.getElementById("username").value.trim();

    const pass =
        document.getElementById("password").value;

    let accounts = getAccounts();

    if(
        accounts[user] &&
        accounts[user].password === pass
    ){

        localStorage.setItem(
            "loggedInUser",
            user
        );

        openHub();

    }else{

        setStatus(
            "❌ Wrong username or password"
        );

    }
}

function openHub(){

    const user =
        localStorage.getItem("loggedInUser");

    const accounts =
        getAccounts();

    document.getElementById("loginBox")
        .style.display = "none";

    document.getElementById("hub")
        .style.display = "block";

    document.getElementById("currentUser")
        .innerText = user;

    document.getElementById("notes")
        .value = accounts[user].notes || "";
}

function saveNotes(){

    const user =
        localStorage.getItem("loggedInUser");

    let accounts =
        getAccounts();

    accounts[user].notes =
        document.getElementById("notes").value;

    saveAccounts(accounts);

    alert("Notes saved!");
}

function logout(){

    localStorage.removeItem(
        "loggedInUser"
    );

    location.reload();
}

function setStatus(text){

    document.getElementById("status")
        .innerText = text;
}

window.onload = function(){

    const user =
        localStorage.getItem("loggedInUser");

    if(user){
        openHub();
    }
};
