let prm = [1, 2, 3, 4, 5, 6, 7];
let text;
let reader = new FileReader();

reader.onload = function (e) {
    text = reader.result;
    let prm2 = text.split(",").map(x => parseFloat(x));
    console.log(prm2);
    console.log(typeof prm2[6]);
}

function handleFileSelect(evt) {
    let files = evt.target.files;
    for (let i = 0, f; f = files[i]; i++) {
        reader.readAsText(f); // 'utf-8'
    }
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);

let blob = new Blob([prm], { type: "text/plain;charset=utf-8" });
saveAs(blob, "param_t3.txt");
