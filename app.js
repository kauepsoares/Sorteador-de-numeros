function sortear() {
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const valorMinimo = parseInt(document.getElementById('de').value);
    const valorMaximo = parseInt(document.getElementById('ate').value);

    if (valorMinimo >= valorMaximo) {
        exibirErro('Campo "Do número" deve ser inferior ao campo "Até o número".');
        return;
    }

    const totalNumerosDisponiveis = valorMaximo - valorMinimo + 1;

    let listaNumerosSorteados = []

    if (!document.getElementById('repetir').checked) {
        if (quantidade > totalNumerosDisponiveis) {
            exibirErro('Não é possível sortear mais números únicos com as informações colocadas. Ajuste a quantidade ou o intervalo.');
            return;
        }
        listaNumerosSorteados = sortearNumerosUnicos(quantidade, valorMinimo, valorMaximo);
    } else {
        listaNumerosSorteados = sortearNumerosRepetidos(quantidade, valorMinimo, valorMaximo);
    }

    exibirResultado(listaNumerosSorteados);
    document.getElementById('btn-reiniciar').removeAttribute('disabled'); 
}


function sortearNumerosUnicos(quantidade, valorMinimo, valorMaximo) {
    let numeros = [];
    while (numeros.length < quantidade) {
        let numeroSorteado = numeroAleatorio(valorMinimo, valorMaximo);
        if (!numeros.includes(numeroSorteado)) {
            numeros.push(numeroSorteado);
        }
    }
    return numeros;
}

function sortearNumerosRepetidos(quantidade, valorMinimo, valorMaximo) {
    let numeros = [];
    for (let i = 0; i < quantidade; i++) {
        numeros.push(numeroAleatorio(valorMinimo, valorMaximo));
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
