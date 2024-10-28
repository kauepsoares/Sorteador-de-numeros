function sortear() {
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const de = parseInt(document.getElementById('de').value);
    const ate = parseInt(document.getElementById('ate').value);

    if (de >= ate) {
        exibirErro('Campo "Do número" deve ser inferior ao campo "Até o número".');
        return;
    }

    const totalNumerosDisponiveis = ate - de + 1;

    let listaNumerosSorteados = []

    if (!document.getElementById('repetir').checked) {
        if (quantidade > totalNumerosDisponiveis) {
            exibirErro('Não é possível sortear mais números únicos com as informações colocadas. Ajuste a quantidade ou o intervalo.');
            return;
        }
        listaNumerosSorteados = sortearNumerosUnicos(quantidade, de, ate);
    } else {
        listaNumerosSorteados = sortearNumerosRepetidos(quantidade, de, ate);
    }

    exibirResultado(listaNumerosSorteados);
    document.getElementById('btn-reiniciar').removeAttribute('disabled'); 
}


function sortearNumerosUnicos(quantidade, de, ate) {
    let numeros = [];
    while (numeros.length < quantidade) {
        let numeroSorteado = numeroAleatorio(de, ate);
        if (!numeros.includes(numeroSorteado)) {
            numeros.push(numeroSorteado);
        }
    }
    return numeros;
}

function sortearNumerosRepetidos(quantidade, de, ate) {
    let numeros = [];
    for (let i = 0; i < quantidade; i++) {
        numeros.push(numeroAleatorio(de, ate));
    }
    return numeros;
}

function exibirResultado(lista) {
    document.getElementById('resultado').innerHTML = `<label class="texto__paragrafo">Números sorteados: ${lista.join(', ')}</label>`;
}

function exibirErro(mensagem) {
    document.getElementById('resultado').innerHTML = `<label class="texto__paragrafo">${mensagem}</label>`;
}

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function limparCampo() {
    campos = document.querySelectorAll("input");
    campos.forEach(campo => campo.value = '');
}

function reiniciar() {
    limparCampo();
    document.getElementById('btn-reiniciar').setAttribute('disabled', true);
    document.getElementById('resultado').innerHTML = '<label class="texto__paragrafo">Números sorteados:  nenhum até agora</label>'
}
