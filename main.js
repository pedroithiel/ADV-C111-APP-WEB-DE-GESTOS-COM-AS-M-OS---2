//https://teachablemachine.withgoogle.com/models/Y_ea8kang/model.json
Webcam.set({
    width: 345,
    height: 295,
    image_format: "png",
    png_quality: 90,
});
Camera = elemento("camera")
Webcam.attach("#camera");
previsao = "";
function tirarFoto() {
    Webcam.snap(function (data_uri) {
        elemento("Captura").innerHTML = "<img id = 'capturaTela' src ='" + data_uri + "'>"
    })
}
console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Y_ea8kang/model.json", modelLoaded);

function modelLoaded() {    
    console.log("model loaded!")
}

function CapturaTela() {
    img = elemento("capturaTela");
    classifier.classify(img, objetos);
}

function speak() {
    var API = window.speechSynthesis;
    speakData1 = "A primeira previsão é " + previsao;
    var textoFalado = new SpeechSynthesisUtterance(speakData1)
    API.speak(textoFalado);
}
function objetos(error, results) {
    if (error) {
        console.log(error)
        alert("tire a foto novamente, algum erro ocorreu.")
    } else {
        console.log(results);
        elemento("nome").innerHTML = results[0].label;
        previsao = results[0].label;
        speak()

        if (results[0].label == "OK") {
            elemento("emojis").innerHTML = "&#128076;"
        }

        if (results[0].label == "Me liga") {
            elemento("emojis").innerHTML = "&#129305;"
        }

        if (results[0].label == "Joinha") {
            elemento("emojis").innerHTML = "&#128077;"
        }

        if (results[0].label == "Mão") {
            elemento("emojis").innerHTML = "&#9995;"
        }

        if (results[0].label == "V") {
            elemento("emojis").innerHTML = "&#9996;"
        }

    }
}

function elemento(nome) {
    return document.getElementById(nome)
}
