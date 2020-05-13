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
    addLine("para multiplicar adicione x antes do numero (ex: x2)");
    addLine("para dividir adicione / antes do numero (ex: /2)");
    addLine("***");
    addLine("Para ver resultados, coloque =");
    addLine("***");
    addLine("Boa sorte!!!");
}

function sendCommand() {
    let value = domInput.value;
    let numb = +(value.substr(1));

    if (value == "=") {
        resolveCalculation();
    } else if (!isNaN(numb)) {
        if (resolved) {
            clearCommands();
            resolved = false;
        }
        if ((value.charAt(0) == "+") || 
            (value.charAt(0) == "-") || 
            (value.charAt(0) == "x") && (isNumber(numb)) || 
            (value.charAt(0) == "/") && (isNumber(numb)) 
           ) {
            addLine(value);
        } else if (!isNumber(value)) {
            showError("Não é um número");
        } else {
            addLine("+" + value);
        }
    } else if (value.length == 0) {
        showError("Insira um número");
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
            if (lines[i].innerHTML.charAt(0) == "x") {
                result *= Number(lines[i].innerHTML.substr(1));
            } else if (lines[i].innerHTML.charAt(0) == "/") {
                result /= Number(lines[i].innerHTML.substr(1));
            } else {
                result += Number(lines[i].innerHTML);
            }
        }

        resolved = true;
        if (isNaN(result)) {
            addLine("***");
            addLine("Algo deu errado na sua conta")
        } else {
            addLine("***");
            addLine("O resultado da conta é: ");
            addLine(result);
        }
    }
}

function addLine(text) {
    let li = document.createElement("li");
    li.innerHTML = text;

    domCommands.appendChild(li);
}

function scrollEndPage() {
    document.documentElement.scrollTop = document.body.scrollTop = 99*99;
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

function isNumber(n) { //retorna true se a variavel tiver apenas numeros
    return !isNaN(parseFloat(n)) && isFinite(n);
}