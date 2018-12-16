let turn = 0;       // 1: Navy, -1: Grey
let turn_num = 0;
let bd_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let td_arr = [td0, td1, td2, td3, td4, td5, td6, td7, td8];


// td click event handler
function click_td() {
    num = parseInt(this.id.substr(-1, 1));
    if (bd_arr[num] == 0 && turn != 0) {
        bd_arr[num] = turn;
        turn = -turn;
        turn_num++;
        exp_tb();
        bd_state();
    }
}

// express table color
function exp_tb() {
    for (let i = 0; i < bd_arr.length; i++) {
        if (bd_arr[i] == 1) td_arr[i].style.backgroundColor = "navy";
        else if (bd_arr[i] == -1) td_arr[i].style.backgroundColor = "grey";
        else td_arr[i].style.backgroundColor = "white";
    }
}

for (let i = 0; i < td_arr.length; i++) td_arr[i].onclick = click_td;

// start button
btn1.onclick = function () {
    turn = 1;
    btn1.hidden = "none";
    btn2.hidden = "";
}

// restart button
btn2.onclick = function () {
    turn = 0;
    turn_num = 0;
    for (let i = 0; i < td_arr.length; i++) bd_arr[i] = 0;
    exp_tb();
    btn2.hidden = "none";
    btn1.hidden = "";
}

// show state
btn3.onclick = function () {
    console.log(bd_arr);
    console.log(turn_num);
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
        setTimeout(function () { alert("Draw!"); }, 0);
        setTimeout(function () { btn2.onclick(); }, 0);
    }
    else {
    }
}

// check line
function chkLine(num) {
    if (num == 3 || num == -3) {
        if (num == 3) {
            // navy win
            setTimeout(function () { alert("Navy Win!"); }, 0);
        }
        else {
            // grey win
            setTimeout(function () { alert("Grey Win!"); }, 0);
        }
        return 1;
    }
    else return 0;
}
