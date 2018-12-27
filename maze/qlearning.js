// q-learning
//  q(x,a) = q(x,a) + alpha*(r + q(x',a') - q(x,a))

let q_ = [];
for (let i = 0; i < row; i++) {
    let q_elm = [];
    for (let j = 0; j < col; j++) {
        q_elm[j] = [0, 0, 0, 0];
    }
    q_[i] = q_elm;
}

