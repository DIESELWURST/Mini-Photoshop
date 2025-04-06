



document.getElementById("gray").addEventListener("click", () => {
    shraniSliko(); 
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

    grayscale(data);

    imgData.data = data;
    ctx.putImageData(imgData, 0, 0);
    posodobiHistogram(histogramVrednosti);
});

document.getElementById("tresh").addEventListener("click", () => {
    shraniSliko(); 
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

    treshold(data, Number(document.getElementById("tresh-slider").value));

    imgData.data = data;
    ctx.putImageData(imgData, 0, 0);
    posodobiHistogram(histogramVrednosti);
});

document.getElementById("odstrani-r").addEventListener("click", () => {
    shraniSliko(); 
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

    odstranikanal(data, 0);

    imgData.data = data;
    ctx.putImageData(imgData, 0, 0);
    posodobiHistogram(histogramVrednosti);
});

document.getElementById("odstrani-g").addEventListener("click", () => {
    shraniSliko(); 
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

    odstranikanal(data, 1);

    imgData.data = data;
    ctx.putImageData(imgData, 0, 0);
    posodobiHistogram(histogramVrednosti);
});

document.getElementById("odstrani-b").addEventListener("click", () => {
    shraniSliko(); 
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

    odstranikanal(data, 2);

    imgData.data = data;
    ctx.putImageData(imgData, 0, 0);
    posodobiHistogram(histogramVrednosti);
});

document.getElementById("pud-r").addEventListener("click", () => {
    shraniSliko(); 
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

    poudarikanal(data, 0, Number(document.getElementById("pud-s-r").value));

    imgData.data = data;
    ctx.putImageData(imgData, 0, 0);
    posodobiHistogram(histogramVrednosti);
});

document.getElementById("spremeni_zeleno").addEventListener("click", () => {
    shraniSliko(); 
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

    poudarikanal(data, 1, Number(document.getElementById("zelena").value));

    imgData.data = data;
    ctx.putImageData(imgData, 0, 0);
    posodobiHistogram(histogramVrednosti);
});

document.getElementById("spremeni_modro").addEventListener("click", () => {
    shraniSliko(); 
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

    poudarikanal(data, 2, Number(document.getElementById("modra").value));

    imgData.data = data;
    ctx.putImageData(imgData, 0, 0);
    posodobiHistogram(histogramVrednosti);
});

document.getElementById("svetlost").addEventListener("click", () => {
    shraniSliko(); 
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

    svetlost(data, Number(document.getElementById("svetlost-slider").value));

    imgData.data = data;
    ctx.putImageData(imgData, 0, 0);
    posodobiHistogram(histogramVrednosti);
});

document.getElementById("box").addEventListener("click", () => {
    shraniSliko(); 
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

    boxBlur(data, canvas.width, canvas.height);

    imgData.data = data;
    ctx.putImageData(imgData, 0, 0);
    posodobiHistogram(histogramVrednosti);
});

document.getElementById("gaus").addEventListener("click", () => {
    shraniSliko();
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

    gaus(data, canvas.width, canvas.height);

    imgData.data = data;
    ctx.putImageData(imgData, 0, 0);
    posodobiHistogram(histogramVrednosti);
});

document.getElementById("sobel").addEventListener("click", () => {
    shraniSliko(); 
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

    sobel(data, canvas.width, canvas.height);

    imgData.data = data;
    ctx.putImageData(imgData, 0, 0);
    posodobiHistogram(histogramVrednosti);
});

document.getElementById("laplac").addEventListener("click", () => {
    shraniSliko(); 
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

    laplec(data, canvas.width, canvas.height);

    imgData.data = data;
    ctx.putImageData(imgData, 0, 0);
    posodobiHistogram(histogramVrednosti);
});

document.getElementById("ostr").addEventListener("click", () => {
    shraniSliko();
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

    ostrenje(data, canvas.width, canvas.height);

    imgData.data = data;
    ctx.putImageData(imgData, 0, 0);
    posodobiHistogram(histogramVrednosti);
});

document.getElementById("neostr").addEventListener("click", () => {
    shraniSliko(); 
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

    unsharpMasking(data, canvas.width, canvas.height);

    imgData.data = data;
    ctx.putImageData(imgData, 0, 0);
    posodobiHistogram(histogramVrednosti);
});

document.getElementById("undo").addEventListener("click", () => {
    if (undoSlike.length > 0) {
        redoSlike.push(canvas.toDataURL()); 
        const prejsnjaSlika = undoSlike.pop(); 
        restoreState(prejsnjaSlika); 
    } else {
        alert("To je osnovna slika."); 
    }
});


document.getElementById("redo").addEventListener("click", () => {
    if (redoSlike.length > 0) {
        const nextState = redoSlike.pop(); 
        undoSlike.push(canvas.toDataURL()); 
        restoreState(nextState); 
    } else {
        alert("To je bila zadnja spremeba.");
    }
});

