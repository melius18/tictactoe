// q-learning
// q(x,a) = q(x,a) + alpha*(r + q(x',a') - q(x,a))
let row = 13, col = 13;

let q_ = [];
for (let i = 0; i < row; i++) {
    let q_elm = [];
    for (let j = 0; j < col; j++) {
        q_elm[j] = [0, 0, 0, 0];
    }
    q_[i] = q_elm;
}

function set_q(i, j, v) {
    q_[i][j][0] = q_[i][j][1] = q_[i][j][2] = q_[i][j][3] = v;
}