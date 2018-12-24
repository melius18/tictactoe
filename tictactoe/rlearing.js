let state_id = [];      // input of value function
let state_val = [];     // output of value function
let alpha = 0.1;
let beta_g = 0.75;      // 0: rnd   1: greedy
let beta_n = 0.75;      // 0: rnd   1: greedy

function get_state_num(arr) {
    let bd_num = 0;
    for (let i = 0; i < arr.length; i++) {
        bd_num = bd_num + (arr[i] < 0 ? 2 : arr[i]) * Math.pow(3, i);
    }
    return bd_num;
}

function reward(point) {
    let state_seq_tmp = JSON.parse(JSON.stringify(state_seq));
    let idx = state_id.indexOf(state_seq_tmp.pop());
    state_val[idx] = state_val[idx] + alpha * (point - state_val[idx]);
    let idx2 = idx;
    let num = state_seq_tmp.length;
    for (let i = 0; i < num; i++) {
        idx = state_id.indexOf(state_seq_tmp.pop());
        state_val[idx] = state_val[idx] + alpha * (state_val[idx2] - state_val[idx]);
        idx2 = idx;
    }
    // console.log(state_id);
    // console.log(state_val);
}

function record_seq() {
    let bd_state_num = get_state_num(bd_arr);
    let idx = state_id.indexOf(bd_state_num);
    if (idx == -1) {
        state_id.push(bd_state_num);
        state_val.push(0);
    }
    state_seq.push(bd_state_num);
}

function grey_policy() {

    let rnd_num;
    do {
        rnd_num = Math.floor(Math.random() * 9.0);
        // console.log("3");
    } while (bd_arr[rnd_num] != 0)

    let max_num = -1;
    let max_val = state_val.length == 0 ? 0 : state_val.reduce(function (previous, current) {
        return previous > current ? (current - 1) : previous;
    });

    for (let i = 0; i < bd_arr.length; i++) {
        let bd_arr_tmp = JSON.parse(JSON.stringify(bd_arr));
        if (bd_arr[i] == 0) {
            bd_arr_tmp[i] = 1;
            let idx = state_id.indexOf(get_state_num(bd_arr_tmp));
            if (idx != -1 && state_val[idx] > max_val) {
                max_val = state_val[idx];
                max_num = i;
            }
        }
    }

    if (max_num == -1) max_num = rnd_num;

    let num;
    if (Math.random() > beta_g) num = rnd_num;
    else {
        // console.log("greedy_g");
        num = max_num;
    }
    return num;
}

function navy_policy() {

    let rnd_num;
    do {
        rnd_num = Math.floor(Math.random() * 9.0);
        // console.log("3");
    } while (bd_arr[rnd_num] != 0)

    let min_num = -1;
    let min_val = state_val.length == 0 ? 0 : state_val.reduce(function (previous, current) {
        return previous > current ? previous : (current + 1);
    });

    for (let i = 0; i < bd_arr.length; i++) {
        let bd_arr_tmp = JSON.parse(JSON.stringify(bd_arr));
        if (bd_arr[i] == 0) {
            bd_arr_tmp[i] = -1;
            let idx = state_id.indexOf(get_state_num(bd_arr_tmp));
            if (idx != -1 && state_val[idx] < min_val) {
                min_val = state_val[idx];
                min_num = i;
            }
        }
    }

    if (min_num == -1) min_num = rnd_num;

    let num;
    if (Math.random() > beta_n) num = rnd_num;
    else {
        // console.log("greedy_n");
        num = min_num;
    }
    return num;
}