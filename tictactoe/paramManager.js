let reader1 = new FileReader();
let reader2 = new FileReader();

reader1.onload = function (e) {
    let text = reader1.result;
    state_id = text.split(",").map(x => parseFloat(x));
}

reader2.onload = function (e) {
    let text = reader2.result;
    state_val = text.split(",").map(x => parseFloat(x));
}

function handleFileSelect1(evt) {
    let files = evt.target.files;
    for (let i = 0, f; f = files[i]; i++) {
        reader1.readAsText(f); // 'utf-8'
    }
}

function handleFileSelect2(evt) {
    let files = evt.target.files;
    for (let i = 0, f; f = files[i]; i++) {
        reader2.readAsText(f); // 'utf-8'
    }
}

document.getElementById('file1').addEventListener('change', handleFileSelect1, false);
document.getElementById('file2').addEventListener('change', handleFileSelect2, false);

// save files
btn7.onclick = saveFiles;

function saveFiles() {
    // state_id , input of value function
    // state_val, output of value function
    let blob_id = new Blob([state_id], { type: "text/plain;charset=utf-8" });
    saveAs(blob_id, "param_id.txt");
    let blob_val = new Blob([state_val], { type: "text/plain;charset=utf-8" });
    saveAs(blob_val, "param_val.txt");
}