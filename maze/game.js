// let row = 13, col = 13;
let mz_arr = [];
let td_arr = [];
let agent_ = [0, 0, 0, 0, 0];
// agent_[0]: 0: init, 1: ready to assign, 2: assigned
// agent_[1]: x_present
// agent_[2]: y_present
// agent_[3]: x_init
// agent_[4]: y_init
let state = 0;
// obstacle: 1
// goal: 100
// hell: -100

for (let i = 0; i < row; i++) {
    let tr = document.createElement("tr");
    let mz_elm = [];
    let td_elm = [];
    for (let j = 0; j < col; j++) {
        let td = document.createElement("td");
        td.setAttribute("id", "td" + (i * col + j));
        td.onclick = click_td;  // assign event handler.
        tr.appendChild(td);
        td_elm[j] = td;
        mz_elm[j] = 0;
    }
    tb.appendChild(tr);
    mz_arr[i] = mz_elm;
    td_arr[i] = td_elm;
}

function init_tb() {
    mz_arr[2][2] = 100;
    set_q(2, 2, 100);
    mz_arr[row - 3][col - 3] = -100;
    set_q(row - 3, col - 3, -100);
    mz_arr[4][5] = mz_arr[10][8] = mz_arr[5][7] = mz_arr[3][6] = 1;
    exp_tb();
}

init_tb();

// td click event handler
function click_td() {
    let idlen = this.id.length - 2;
    let id = parseInt(this.id.substr(-idlen, idlen));
    let j = id % col;
    let i = (id - j) / col;

    if (agent_[0] == 1) {
        agent_[0] = 2;
        agent_[3] = agent_[1] = i;
        agent_[4] = agent_[2] = j;
    }
    else {
        if (mz_arr[i][j] == 0) {
            mz_arr[i][j] = state;
            if (state == 100 || state == -100) set_q(i, j, state);
        } else {
            mz_arr[i][j] = 0;
        }
    }
    exp_tb();
}

// express table color
function exp_tb() {
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            // console.log('agent_[0]', agent_[0]);
            if (agent_[0] == 2 && agent_[1] == i && agent_[2] == j) {
                td_arr[i][j].style.backgroundColor = "black";
            } else {
                if (mz_arr[i][j] == 1) td_arr[i][j].style.backgroundColor = "grey";
                else if (mz_arr[i][j] == 100) td_arr[i][j].style.backgroundColor = "navy";
                else if (mz_arr[i][j] == -100) td_arr[i][j].style.backgroundColor = "maroon";
                else td_arr[i][j].style.backgroundColor = "white";
            }
        }
    }
}

// assign
btn1.onclick = function () {
    if (agent_[0] != 1) agent_[0] = 1;
    else agent_[0] = 0;
}

// clear
btn2.onclick = function () {
    clear_tb();
}

function clear_tb() {
    agent_ = [0, 0, 0, 0, 0];
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            mz_arr[i][j] = 0;
        }
    }
    exp_tb();
}

// Obstacle
btn3.onclick = function () {
    state = 1;
}

// Goal
btn4.onclick = function () {
    state = 100;
}

// Hell
btn5.onclick = function () {
    state = -100;
}
