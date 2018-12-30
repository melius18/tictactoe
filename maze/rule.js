// mz_arr
// agent_
// state >> obstacle: 1, goal: 100, hell: -100

let alph = 0.1;
let beta = 0.5; // probability of rnd
let mcnt = 0;
let max_mcnt = 200;
let auto = 0;   // auto restart
let m_rd = -2;

// start
btn6.onclick = function () {
    mcnt = 0;
    if (agent_[0] != 2) {
        alert("Assign position of agent!");
    }
    else {
        agent_[1] = agent_[3];
        agent_[2] = agent_[4];
        exp_tb();
        // console.log(agent_, mz_arr[agent_[1]][agent_[2]]);
        console.log('auto', auto);
        setTimeout(function () {
            move_q();
        }, 30);
    }
}

function move(dir) {
    // dir 0: south, 1: north, east, 2: south, 3: north
    let agent = JSON.parse(JSON.stringify(agent_));
    let agentn = JSON.parse(JSON.stringify(agent_));
    if (dir == 0 && agent_[2] > 0 && agent_[2] <= (col - 1)) agent[2]--;      // left
    else if (dir == 1 && agent_[1] > 0 && agent_[1] <= (row - 1)) agent[1]--; // up
    else if (dir == 2 && agent_[2] >= 0 && agent_[2] < (col - 1)) agent[2]++; // right
    else if (dir == 3 && agent_[1] >= 0 && agent_[1] < (row - 1)) agent[1]++; // down

    if (mz_arr[agent[1]][agent[2]] != 1) agentn = agent;
    // q-learning
    // q(x,a) = q(x,a) + alpha*(r + q(x',a') - q(x,a))
    // q(x',a')
    let q2 = q_[agentn[1]][agentn[2]][indexOfMax(q_[agentn[1]][agentn[2]])];
    let q1 = q_[agent_[1]][agent_[2]][dir];
    q_[agent_[1]][agent_[2]][dir] = q1 + alph * (m_rd + q2 - q1);
    agent_ = agentn;
    exp_tb();
    // console.log(agent_, mz_arr[agent_[1]][agent_[2]]);
}

window.onkeydown = function (e) {
    if (agent_[0] == 2) {
        if (e.keyCode == 37) move(0);       // left
        else if (e.keyCode == 38) move(1);  // up
        else if (e.keyCode == 39) move(2);  // right
        else if (e.keyCode == 40) move(3);  // down
    }
}


// let i = 0;
function move_q() {
    if (mz_arr[agent_[1]][agent_[2]] == 0 && mcnt < max_mcnt) {
        // i++;
        mcnt++;
        let m;
        if (Math.random() > beta) m = Math.floor(Math.random() * 4.0);
        else m = indexOfMax(q_[agent_[1]][agent_[2]]);
        setTimeout(function () {
            move(m);
            move_q();
        }, 10);
    } else if (auto > 0) {
        auto--;
        setTimeout(function () {
            btn6.onclick();
        }, 100);
    }
}

function indexOfMax(arr) {
    if (arr.length === 0) return -1;

    let maxIndex = Math.floor(Math.random() * 4.0);
    let max = arr[maxIndex];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
}
