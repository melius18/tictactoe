// mz_arr
// agent_
// state >> obstacle: 1, goal: 100, hell: -100

let beta = 0.5; // probability of rnd

// start
btn6.onclick = function () {
    if (agent_[0] != 2) {
        alert("Assign position of agent!");
    }
    else {
        agent_[1] = agent_[3];
        agent_[2] = agent_[4];
        exp_tb();
        console.log(agent_, mz_arr[agent_[1]][agent_[2]]);
        setTimeout(function () {
            move_q();
        }, 50);
    }
}

function move(dir) {
    // dir 0: south, 1: north, east, 2: south, 3: north
    let agent = JSON.parse(JSON.stringify(agent_));
    let agentn;
    if (dir == 0 && agent_[2] > 0 && agent_[2] <= (col - 1)) agent[2]--;      // left
    else if (dir == 1 && agent_[1] > 0 && agent_[1] <= (row - 1)) agent[1]--; // up
    else if (dir == 2 && agent_[2] >= 0 && agent_[2] < (col - 1)) agent[2]++; // right
    else if (dir == 3 && agent_[1] >= 0 && agent_[1] < (row - 1)) agent[1]++; // down

    if (mz_arr[agent[1]][agent[2]] != 1) agentn = agent;
    agent_ = agentn;
    exp_tb();
    console.log(agent_, mz_arr[agent_[1]][agent_[2]]);
}

window.onkeydown = function (e) {
    if (agent_[0] == 2) {
        if (e.keyCode == 37) move(0);       // left
        else if (e.keyCode == 38) move(1);  // up
        else if (e.keyCode == 39) move(2);  // right
        else if (e.keyCode == 40) move(3);  // down
    }
}

let i = 0;
function move_q() {
    if (mz_arr[agent_[1]][agent_[2]] == 0) {
        i++;
        let m;
        if (Math.random() > beta) m = Math.floor(Math.random() * 4.0);
        else m = indexOfMax(q_[agent_[1]][agent_[2]]);
        setTimeout(function () {
            move(m);
            move_q();
        }, 30);
    }
}

function indexOfMax(arr) {
    if (arr.length === 0) return -1;

    var maxIndex = Math.floor(Math.random() * 4.0);
    var max = arr[maxIndex];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
}
