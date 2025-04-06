var imageLoader = document.getElementById('upload');
    imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('slika');
var ctx = canvas.getContext('2d');

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);
			posodobiHistogram(histogramVrednosti);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);  
}


document.getElementById("download").addEventListener("click", () => {
    if (canvas.width === 0 || canvas.height === 0) {
        alert("Ni slike za prenos."); 
        return;
    }

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png"); // slika bo shranjena kot png zato da ne bo izgubila kvalitete
    link.download = "obdelana_slika.png"; 
    link.click();
});