let turn = 0;       // Grey: 1, Navy: -1
let turn_num = 0;
let bd_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];   // present board state
let td_arr = [td0, td1, td2, td3, td4, td5, td6, td7, td8];
let com_turn = 0;
let full_auto = 1;  // com vs com
let auto_start = 1; // auto repeat
let state_seq = [];
let greywin = 0;
let navywin = 0;
let drawgam = 0;

let dt = 50;

// show state
btn3.onclick = function () {
    console.log(bd_arr);
    console.log(turn_num);
}

// stop
btn4.onclick = function () {
    full_auto = 0;
    auto_start = 0;
}

// auto start
btn5.onclick = function () {
    auto_start = 1;
}

// learning
btn6.onclick = function () {
    full_auto = 1;
    auto_start = 1;
}

// waiting(turn == 0), initialization
// restart button,
btn2.onclick = function () {
    turn = 0;
    turn_num = 0;
    state_seq = [];
    for (let i = 0; i < td_arr.length; i++) bd_arr[i] = 0;
    btn2.hidden = "none";
    btn1.hidden = "";
    exp_tb();
    if (auto_start == 1) setTimeout(function () { btn1.onclick(); }, dt * 3);
}

// gaming(turn != 0)
// start button
btn1.onclick = function () {
    turn = 1;
    btn1.hidden = "none";
    btn2.hidden = "";
    com_turn = 1;
    if (com_turn == turn) com_action();
}

// assign event handler.
for (let i = 0; i < td_arr.length; i++) td_arr[i].onclick = click_td;

// td click event handler
function click_td() {
    num = parseInt(this.id.substr(-1, 1));
    if (bd_arr[num] == 0 && turn != 0) {
        bd_arr[num] = turn;
        record_seq();
        turn = -turn;
        turn_num++;
        exp_tb();   // express table color
        bd_state(); // check board state 
    }
}

// express table color
function exp_tb() {
    for (let i = 0; i < bd_arr.length; i++) {
        if (bd_arr[i] == -1) td_arr[i].style.backgroundColor = "navy";
        else if (bd_arr[i] == 1) td_arr[i].style.backgroundColor = "grey";
        else td_arr[i].style.backgroundColor = "white";
    }
}

// check board state
function bd_state() {
    let tmp = chkLine(bd_arr[0] + bd_arr[4] + bd_arr[8]);
    tmp = tmp + chkLine(bd_arr[2] + bd_arr[4] + bd_arr[6]);
    for (let i = 0; i < 3; i++) {
        tmp = tmp + chkLine(bd_arr[i * 3] + bd_arr[i * 3 + 1] + bd_arr[i * 3 + 2]);
        tmp = tmp + chkLine(bd_arr[i] + bd_arr[3 + i] + bd_arr[6 + i]);
    }
    if (tmp > 0.5) setTimeout(function () { btn2.onclick(); }, 0);
    else if (turn_num == 9) {
        // draw
        reward(-100);
        drawgam++;
        setTimeout(function () { inform("Draw!"); }, 0);
        setTimeout(function () { btn2.onclick(); }, 0);
    }
    else {
        // not end
        if (com_turn == turn) com_action();
        else if (full_auto == 1) {
            setTimeout(function () {
                com_action();
                // console.log("2");
            }, dt);
            // console.log("1");
        }
    }
}

// check lines
function chkLine(num) {
    if (num == 3 || num == -3) {
        if (num == 3) {
            // grey win
            reward(1000);
            greywin++;
            setTimeout(function () { inform("Grey Win!"); }, 0);
        }
        else {
            // navy win
            reward(-1000);
            navywin++;
            setTimeout(function () { inform("Navy Win!"); }, 0);
        }
        return 1;
    }
    else return 0;
}

function com_action() {
    let num;
    if (turn == -1) num = navy_policy();
    else if (turn == 1) num = grey_policy();

    if (bd_arr[num] == 0 && turn != 0) {
        bd_arr[num] = turn;
        record_seq();
        turn = -turn;
        turn_num++;
        exp_tb();   // express table color
        bd_state(); // chech board state 
    }
}



function inform(msg) {
    // console.log(bd_arr.slice(0, 3));
    // console.log(bd_arr.slice(3, 6));
    // console.log(bd_arr.slice(6, 9));
    console.log(msg);
    console.log(state_id.length);
    console.log("grey: ", greywin, "navy: ", navywin, "draw game: ", drawgam)
    // alert(msg);
}