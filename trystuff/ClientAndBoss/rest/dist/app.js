var manager = {
    username: "boss",
    password: 123
};
var isManager = false;
function checkFeilds(ev) {
    ev.preventDefault();
    console.log(ev);
    var username = ev.target[0].value;
    var password = ev.target[1].value;
    if (username == manager.username && password == manager.password) {
        console.log("succssfuly logged in!");
        isManager = true;
    }
    else {
        console.log("try again");
        isManager = false;
    }
}
