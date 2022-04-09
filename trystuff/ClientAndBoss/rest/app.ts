const manager = {
    username: `boss`,
    password: 123,
}
let isManager:boolean = false;

function checkFeilds(ev) {
    ev.preventDefault();
    console.log(ev)
    const username:string = ev.target[0].value
    const password:number = ev.target[1].value

    if (username == manager.username && password == manager.password) {
        console.log("succssfuly logged in!")
        isManager = true;
    }
    else {
        console.log("try again");
        isManager = false;
    }
}