
const undoSlike = []; 
const redoSlike = [];

function shraniSliko() {
    const state = canvas.toDataURL();
    undoSlike.push(state); 
	redoSlike.length =0;
}


function restoreState(state) {
    const img = new Image();
    img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0); 
        posodobiHistogram(histogramVrednosti); 
    };
    img.src = state; 
}




function grayscale(data) {
	for (let i = 0; i < data.length; i += 4) {
		let piksl = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
		data[i] = piksl;
		data[i + 1] = piksl;
		data[i + 2] = piksl;
	}
	console.log(data);
}

function treshold(data, t) {
	for (let i = 0; i < data.length; i += 4) {
		//let piksl = (data[i] + data[i+1] + data[i+2])/3;
		data[i] = (data[i] > t) ? 255 : 0;
		data[i + 1] = (data[i + 1] > t) ? 255 : 0;
		data[i + 2] = (data[i + 2] > t) ? 255 : 0;
	}
}

function odstranikanal(data, kanal) {
	poudarikanal(data, kanal, 0);
}

function poudarikanal(data, kanal, faktor) {
	for (let i = 0; i < data.length; i += 4) {
		let novipiksel = data[i + kanal] * faktor;
		if (novipiksel > 255) novipiksel = 255;

		data[i + kanal] = novipiksel;
	}
}

function svetlost(data, s) {
	for (let i = 0; i < data.length; i += 4) {
		for (let j = i; j < i + 3; j++) {
			data[j] = data[j] + s;

			if (data[j] > 255) data[j] = 255;
			else if (data[j] < 0) data[j] = 0;
		}
	}
}

function getPixel(data, x, y, s, v) {
	piksel = { i: (y * 4 * s) + (x * 4), data: [] };
	for (let i = 0; i < 4; i++) {
		piksel["data"][i] = data[(y * 4 * s) + (x * 4) + i];
	}
	return piksel;
}

function boxBlur(data, s, v) {
	let original = [...data];
	for (let i = 1; i < v - 1; i++) {
		for (let j = 1; j < s - 1; j++) {
			let sum = [0, 0, 0, 0];
			for (let y = -1; y < 2; y++) {
				for (let x = -1; x < 2; x++) {
					let piksl = getPixel(original, j + x, i + y, s, v);
					sum[0] += piksl.data[0];
					sum[1] += piksl.data[1];
					sum[2] += piksl.data[2];
					sum[3] += piksl.data[3];
				}
			}
			let piksll = getPixel(original, j, i, s, v); // tretnutn piksl
			data[piksll.i] = sum[0] / 12;
			data[piksll.i + 1] = sum[1] / 12;
			data[piksll.i + 2] = sum[2] / 12;
			data[piksll.i + 3] = sum[3] / 12;
		}
	}
}

function matrikaNaSliko(data, s, v, matrika) {
	let original = [...data];
	for (let i = 1; i < v - 1; i++) {
		for (let j = 1; j < s - 1; j++) {
			// Matrika = [[],[],[]]
			let tmp = [[], [], []];

			let sum = [0, 0, 0];
			for (let y = -1; y < 2; y++) {
				for (let x = -1; x < 2; x++) {
					tmp[1 + y][1 + x] = getPixel(original, j + x, i + y, s, v);
					for (let b = 0; b < 3; b++) {
						tmp[1 + y][1 + x].data[b] *= matrika[1 + y][1 + x];
						sum[b] += tmp[1 + y][1 + x].data[b];
					}
				}
			}
			let piksll = getPixel(original, j, i, s, v); // tretnutn piksl

			for (let b = 0; b < 3; b++) {
				if (sum[b] < 0) sum[b] = 0;
				else if (sum[b] > 255) sum[b] = 255;
				data[piksll.i + b] = sum[b];
			}
		}
	}
}

function gaus(data, s, v) {
	matrikaNaSliko(data, s, v, [[0.0947416, 0.118318, 0.0947416], [0.118318, 0.147761, 0.118318], [0.0947416, 0.118318, 0.0947416]]);
}

function laplec(data, s, v) {
	matrikaNaSliko(data, s, v, [[1, 1, 1], [1, -8, 1], [1, 1, 1]]);
}

function sobel(data, s, v) {
    let original = [...data];
    let gxKernel = [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1]
    ]; 
    let gyKernel = [
        [-1, -2, -1],
        [0, 0, 0],
        [1, 2, 1]
    ]; 

    for (let i = 1; i < v - 1; i++) {
        for (let j = 1; j < s - 1; j++) {
            let sumX = [0, 0, 0];
            let sumY = [0, 0, 0];

            
            for (let y = -1; y <= 1; y++) {
                for (let x = -1; x <= 1; x++) {
                    let piksl = getPixel(original, j + x, i + y, s, v);
                    for (let b = 0; b < 3; b++) {
                        sumX[b] += piksl.data[b] * gxKernel[y + 1][x + 1];
                        sumY[b] += piksl.data[b] * gyKernel[y + 1][x + 1];
                    }
                }
            }

            let piksll = getPixel(original, j, i, s, v);
            for (let b = 0; b < 3; b++) {
                let magnitude = Math.sqrt(sumX[b] ** 2 + sumY[b] ** 2);
                data[piksll.i + b] = Math.min(255, magnitude); 
            }
        }
    }
	greyscale(data); // dadmo sliko v greyscale ker je za ta filter značilen črno-beli efekt
}

function ostrenje(data, s, v) {
	let kopija = [...data];
	laplec(kopija, s, v);

	for (let i = 0; i < data.length; i += 4) {
		data[i] -= kopija[i];
		data[i + 1] -= kopija[i + 1];
		data[i + 2] -= kopija[i + 2];
	}
}

function unsharpMasking(data, s, v) {
	let kopija = [...data];
	gaus(kopija, s, v);

	for (let i = 0; i < data.length; i += 4) {
		kopija[i] = data[i] - kopija[i];
		data[i] += kopija[i];
		kopija[i + 1] = data[i + 1] - kopija[i + 1];
		data[i + 1] += kopija[i + 1];
		kopija[i + 2] = data[i + 2] - kopija[i + 2];
		data[i + 2] += kopija[i + 2];
	}
}

