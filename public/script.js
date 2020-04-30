const domCommands = document.querySelector('.commands');
const domInput = document.querySelector('input');
const domButton = document.querySelector('button');
const domError = document.querySelector('.error');

let resolved = true;

init();

function init() {
    domButton.addEventListener('click', function () {
        sendCommand();
    });

    domInput.onkeydown = function (e) {
        if (e.key == "Enter") sendCommand();
    };

    addLine("***");
    addLine("Coloque só números");
    addLine("eles podem ser");
    addLine("negativos ou positivos");
    addLine("***");
    addLine("Para ver resultados, coloque =");
    addLine("***");
    addLine("Boa sorte!!!");
}

function sendCommand() {
    let value = domInput.value;
    if (value == "=") {
        resolveCalculation();
    } else if (value.length == 0) {
        showError("Insira um número");
    } else if (!isNaN(value)) {
        if (resolved) {
            clearCommands();
            resolved = false;
        }

        if (value.charAt(0) == "+" ||
            value.charAt(0) == "-") {
            addLine(value);
        } else {
            addLine("+" + value);
        }
    } else {
        showError("Não é um número");
    }

    scrollEndPage();
    clearInput();
}

function resolveCalculation() {
    let lines = domCommands.childNodes;

    if (lines.length == 0) {
        showError("Insira os números antes...");
    } else {
        let result = 0;
        for (let i = 0; i < lines.length; i++) {
            result += Number(lines[i].innerHTML);
        }

        resolved = true;

        addLine("***");
        addLine("O resultado da conta é: ");
        addLine(result);
    }
}

function addLine(text) {
    let li = document.createElement("li");
    li.innerHTML = text;

    domCommands.appendChild(li);
}

function scrollEndPage() {
    document.documentElement.scrollTop = document.body.scrollTop = 9999999;
}

function clearCommands() {
    domCommands.innerHTML = "";
}

function clearInput() {
    domInput.value = "";
}

function showError(text) {
    domError.innerHTML = text;
    domError.style.opacity = 1;
    setTimeout(errorFade, 2000);
}

function errorFade() {
    let newOpacity = domError.style.opacity -= .02;
    if (newOpacity < 0) {
        domError.display = "none";
    } else {
        domError.style.opacity = newOpacity;
        setTimeout(errorFade, 40);
    }
}