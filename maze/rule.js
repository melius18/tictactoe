// mz_arr
// agent_
// state >> obstacle: 1, goal: 100, hell: -100

// start
btn6.onclick = function () {
    if (agent_[0] != 2) {
        alert("Assign position of agent!");
    }
    else {
        move(1);
    }
}

function move(dir) {
    // dir 0: south, 1: north, east, 2: south, 3: north
    let agent = JSON.parse(JSON.stringify(agent_));
    if (dir == 0 && agent_[1] > 0 && agent_[1] <= (col - 1)) agent[2]--;      // left
    else if (dir == 1 && agent_[1] > 0 && agent_[1] <= (row - 1)) agent[1]--; // up
    else if (dir == 2 && agent_[2] >= 0 && agent_[2] < (col - 1)) agent[2]++; // right
    else if (dir == 3 && agent_[1] >= 0 && agent_[1] < (row - 1)) agent[1]++; // down

    if (mz_arr[agent[1]][agent[2]] == 0) agent_ = agent;
    exp_tb();
}

window.onkeydown = function (e) {
    if (agent_[0] == 2) {
        if (e.keyCode == 37) move(0);       // left
        else if (e.keyCode == 38) move(1);  // up
        else if (e.keyCode == 39) move(2);  // right
        else if (e.keyCode == 40) move(3);  // down
    }
}