function tratamentoDeDados() {
  let dadosVar = document.getElementById('dados_variavel').value,
    array_dados_variavel = dadosVar.split(';').map(Number);
  array_dados_variavel = quickSort(array_dados_variavel);
  const quantidade_dados = array_dados_variavel.reduce((acumulador, atual) => {
    acumulador[atual] = acumulador[atual] ? acumulador[atual] + 1 : 1;
    return acumulador;
  }, {});

  let array_valores = [],
    valor_anterior;
  array_dados_variavel.forEach((dados_variavel) => {
    if (dados_variavel != valor_anterior) {
      array_valores.push({
        valor: dados_variavel,
        qtde: quantidade_dados[dados_variavel],
      });
    }
    valor_anterior = dados_variavel;
  });

  let total_dados = [];
  array_valores.forEach((t) => {
    total_dados.push(parseFloat(t.qtde));
  });

  let resultado = total_dados.reduce(
    (acumulador, item) => acumulador + item,
    0
  );

  let k = 0,
    l = 0;

  array_valores.forEach((element) => {
    element.fi = element.qtde;
    element.fr_porcento = (element.qtde * 100) / resultado;

    if (k == 0) {
      element.fa = parseFloat(element.qtde);
    } else if (k > 0) {
      element.fa =
        parseFloat(array_valores[k - 1].fa) + parseFloat(element.qtde);
    }
    k++;
    if (l == 0) {
      element.fa_porcento = parseFloat(element.fr_porcento);
    } else if (l > 0) {
      element.fa_porcento =
        parseFloat(array_valores[l - 1].fa_porcento) +
        parseFloat(element.fr_porcento);
    }
    l++;
  });

  return array_valores;
}

function media(valores) {
  let total_qtde = valores.reduce(
    (acumulador, item) => acumulador + item.qtde,
    0
  );
  let total_valores = valores.reduce(
    (acumulador, item) => acumulador + item.valor * item.qtde,
    0
  );
  let media = total_valores / total_qtde;

  return media;
}

function moda() {
  let dadosVar = document.getElementById('dados_variavel').value;
  let array_dados_variavel = dadosVar.split(';').map(Number);
  array_dados_variavel = quickSort(array_dados_variavel);
  let entrada = array_dados_variavel;
  let maior = null;
  let ocorrenciasMaior = -1;
  let contagem = 1;
  for (let i = 1; i <= entrada.length; i++) {
    if (i < entrada.length && entrada[i] == entrada[i - contagem]) contagem++;
    else if (contagem > ocorrenciasMaior) {
      maior = entrada[i - 1];
      ocorrenciasMaior = contagem;
    }
  }

  return maior;
}
function mediana() {
  let dadosVar = document.getElementById('dados_variavel').value;
  let array_dados_variavel = dadosVar.split(';').map(Number);
  array_dados_variavel = quickSort(array_dados_variavel);
  let md = array_dados_variavel;
  let valor_mediana = '';
  var posicao = md.length / 2;
  let qtde = md.length;
  let pos_elemento = '';

  if (qtde % 2 == 0) {
    if (md[posicao - 1] == md[posicao]) {
      valor_mediana = md[posicao];
      return valor_mediana;
    } else {
      valor_mediana = (md[posicao] + md[posicao - 1]) / 2;
      return valor_mediana;
    }
  } else {
    pos_elemento = Math.ceil(posicao) - 1;

    return md[pos_elemento];
  }
}
function desvioPadraoAmostra(valores, media) {
  // somatorio fi
  let somatorio_fi = valores.reduce(
    (acumulador, item) => acumulador + item.qtde,
    0
  );

  let somatorio_valores = valores.reduce(
    (acumulador, item) =>
      acumulador + Math.pow(item.valor - media, 2) * item.qtde,
    0
  );

  let desvio_padrao = Math.sqrt(somatorio_valores / (somatorio_fi - 1)).toFixed(
    2
  );

  return desvio_padrao;
}

function desvioPadraoPopulacao(valores, media) {
  let somatorio_fi = valores.reduce(
    (acumulador, item) => acumulador + item.qtde,
    0
  );

  let somatorio_valores = valores.reduce(
    (acumulador, item) =>
      acumulador + Math.pow(item.valor - media, 2) * item.qtde,
    0
  );

  let desvio_padrao = Math.sqrt(somatorio_valores / somatorio_fi).toFixed(2);

  return desvio_padrao;
}

function coeficienteVariacaoDiscreta(desvio_padrao, media) {
  let cv = Math.round((desvio_padrao / media) * 100);

  return cv;
}

function tabelaDiscreta() {
  const tipo_desvio = document.getElementById('tipo_desvio').value;
  let corpo = document.querySelector('tbody');

  corpo.innerHTML = '';
  let array_valores = tratamentoDeDados(),
    media_discreta = media(array_valores),
    valor_moda = moda(),
    valor_mediana = mediana(),
    desvio_padrao;
  if (tipo_desvio == 'populacao') {
    desvio_padrao = desvioPadraoPopulacao(array_valores, media_discreta);
  } else if (tipo_desvio == 'amostra') {
    desvio_padrao = desvioPadraoAmostra(array_valores, media_discreta);
  }
  coeficiente_variacao = coeficienteVariacaoDiscreta(
    desvio_padrao,
    media_discreta
  );

  let nome_tabela = document.getElementById('nome_tabela');

  nome_tabela.innerHTML = 'Quantitativa Discreta';

  texto_mediana.innerHTML = `Mediana: ${valor_mediana} <br>`;

  texto_media.innerHTML = `Media: ${media_discreta.toFixed(2)} <br>`;

  let texto_moda = document.getElementById('texto_moda');
  texto_moda.innerHTML = `Moda: ${valor_moda.toFixed(2)} <b>`;

  let texto_desvio_padrao = document.getElementById('texto_desvio_padrao');
  texto_desvio_padrao.innerHTML = `Desvio Padrão ${desvio_padrao} <b>`;

  let texto_coeficiente = document.getElementById('texto_coeficiente_variacao');
  texto_coeficiente.innerHTML = `Coeficiente de Variacao ${coeficiente_variacao.toFixed(
    2
  )} <b>`;

  array_valores.forEach((e) => {
    let linha = document.createElement('tr'),
      campoDados = document.createElement('tr'),
      campo_fr_porcento = document.createElement('td'),
      campo_fa = document.createElement('td'),
      campo_fa_porcento = document.createElement('td'),
      campoVariavel = document.createElement('td'),
      texto_fa = document.createTextNode(e.fa),
      texto_fr_porcento = document.createTextNode(Math.floor(e.fr_porcento)),
      texto_fa_porcento = document.createTextNode(Math.floor(e.fa_porcento)),
      textoVariavel = document.createTextNode(e.valor),
      texto_fi = document.createTextNode(e.fi);
    campoDados.appendChild(texto_fi);
    campoVariavel.appendChild(textoVariavel);
    campo_fr_porcento.appendChild(texto_fr_porcento);
    campo_fa.appendChild(texto_fa);
    campo_fa_porcento.appendChild(texto_fa_porcento);
    linha.appendChild(campoVariavel);
    linha.appendChild(campoDados);
    linha.appendChild(campo_fr_porcento);
    linha.appendChild(campo_fa);
    linha.appendChild(campo_fa_porcento);
    corpo.appendChild(linha);
  });
}

function TabelaNom() {
  let corpo = document.querySelector('tbody');

  corpo.innerHTML = '';
  array_valores = tratamentoDeDadosOrdinal();
  valor_moda = modaOrdinal();
  let valor_mediana = medianaNominal();

  texto_mediana.innerHTML = `Mediana: ${valor_mediana} <br>`;

  texto_media.innerHTML = 'Media: Nao tem <br>';

  let nome_tabela = document.getElementById('nome_tabela');
  nome_tabela.innerHTML = 'Qualitativa Nominal';

  let texto_moda = document.getElementById('texto_moda');
  texto_moda.innerHTML = `Moda: ${valor_moda} <b>`;

  let texto_desvio_padrao = document.getElementById('texto_desvio_padrao');
  texto_desvio_padrao.innerHTML = `Desvio Padrão: Nao tem <b>`;

  let texto_coeficiente = document.getElementById('texto_coeficiente_variacao');
  texto_coeficiente.innerHTML = `Coeficiente de Variacao: Nao tem <b>`;

  array_valores.forEach((e) => {
    let linha = document.createElement('tr'),
      campoDados = document.createElement('tr'),
      campo_fr_porcento = document.createElement('td'),
      campo_fa = document.createElement('td'),
      campo_fa_porcento = document.createElement('td'),
      campoVariavel = document.createElement('td'),
      texto_fa = document.createTextNode(e.fa),
      texto_fr_porcento = document.createTextNode(Math.floor(e.fr_porcento)),
      texto_fa_porcento = document.createTextNode(Math.floor(e.fa_porcento)),
      textoVariavel = document.createTextNode(e.valor),
      texto_fi = document.createTextNode(e.fi);
    campoDados.appendChild(texto_fi);
    campoVariavel.appendChild(textoVariavel);
    campo_fr_porcento.appendChild(texto_fr_porcento);
    campo_fa.appendChild(texto_fa);
    campo_fa_porcento.appendChild(texto_fa_porcento);
    linha.appendChild(campoVariavel);
    linha.appendChild(campoDados);
    linha.appendChild(campo_fr_porcento);
    linha.appendChild(campo_fa);
    linha.appendChild(campo_fa_porcento);
    corpo.appendChild(linha);
  });
}

function TabelaOrdinal() {
  let corpo = document.querySelector('tbody');

  corpo.innerHTML = '';
  array_valores = tratamentoDeDadosOrdinal();
  valor_moda = modaOrdinal();
  let valor_mediana = medianaNominal();

  texto_mediana.innerHTML = `Mediana: ${valor_mediana} <br>`;

  texto_media.innerHTML = 'Media: Nao tem <br>';

  let nome_tabela = document.getElementById('nome_tabela');
  nome_tabela.innerHTML = 'Qualitativa Ordinal';

  let texto_moda = document.getElementById('texto_moda');
  texto_moda.innerHTML = `Moda: ${valor_moda} <b>`;

  let texto_desvio_padrao = document.getElementById('texto_desvio_padrao');
  texto_desvio_padrao.innerHTML = `Desvio Padrão: Nao tem <b>`;

  let texto_coeficiente = document.getElementById('texto_coeficiente_variacao');
  texto_coeficiente.innerHTML = `Coeficiente de Variacao: Nao tem <b>`;

  array_valores.forEach((e) => {
    let linha = document.createElement('tr'),
      campoDados = document.createElement('tr'),
      campo_fr_porcento = document.createElement('td'),
      campo_fa = document.createElement('td'),
      campo_fa_porcento = document.createElement('td'),
      campoVariavel = document.createElement('td'),
      texto_fa = document.createTextNode(e.fa),
      texto_fr_porcento = document.createTextNode(Math.floor(e.fr_porcento)),
      texto_fa_porcento = document.createTextNode(Math.floor(e.fa_porcento)),
      textoVariavel = document.createTextNode(e.valor),
      texto_fi = document.createTextNode(e.fi);
    campoDados.appendChild(texto_fi);
    campoVariavel.appendChild(textoVariavel);
    campo_fr_porcento.appendChild(texto_fr_porcento);
    campo_fa.appendChild(texto_fa);
    campo_fa_porcento.appendChild(texto_fa_porcento);
    linha.appendChild(campoVariavel);
    linha.appendChild(campoDados);
    linha.appendChild(campo_fr_porcento);
    linha.appendChild(campo_fa);
    linha.appendChild(campo_fa_porcento);
    corpo.appendChild(linha);
  });
}

function graficoDiscreta() {
  array_valores = tratamentoDeDados();
  array_label = [];
  array_data = [];
  colors = [];

  array_valores.forEach((e) => {
    array_label.push(e.nome);
    array_data.push(e.fr_porcento);
    colors.push(getRandomColor());
  });
  let dadosVar = document.getElementById('dados_variavel').value;
  let nome = document.getElementById('nome_variavel').value;
  let array_dados_variavel = dadosVar.split(';').map(Number);
  array_dados_variavel = quickSort(array_dados_variavel);
  let ctx = document.getElementById('myChart');
  let grafico = new Chart(ctx, {
    type: 'bar',

    data: {
      labels: array_dados_variavel,
      datasets: [
        {
          label: nome,
          backgroundColor: colors,
          borderColor: 'rgba(0, 0, 0, 0.1)',
          data: array_data,
        },
      ],
    },
  });
}

function graficoQualitativa() {
  array_valores = tratamentoDeDados();
  array_label = [];
  array_data = [];
  colors = [];

  array_valores.forEach((e) => {
    array_label.push(e.nome);
    array_data.push(e.fr_porcento);
    colors.push(getRandomColor());
  });

  let dadosVar = document.getElementById('dados_variavel').value,
    nome = document.getElementById('nome_variavel').value;
  array_dados_variavel = dadosVar.split(';').map(Number);
  array_dados_variavel = quickSort(array_dados_variavel);
  let ctx = document.getElementById('myChart');
  let grafico = new Chart(ctx, {
    type: 'pie',

    data: {
      labels: array_dados_variavel,
      datasets: [
        {
          label: nome,
          backgroundColor: colors,
          borderColor: 'rgba(0, 0, 0, 0.1)',
          data: array_data,
        },
      ],
    },
  });
}

function tratamentoDeDadosContinua() {
  let dadosVar = document.getElementById('dados_variavel').value;
  let array_dados_variavel = dadosVar.split(';').map(Number);
  array_dados_variavel = quickSort(array_dados_variavel);

  let at = array_dados_variavel.slice(-1) - array_dados_variavel[0];

  let classe = [],
    qtde_classes = Math.floor(Math.sqrt(array_dados_variavel.length));
  classe[0] = qtde_classes - 1;
  classe[1] = qtde_classes;
  classe[2] = qtde_classes + 1;

  let aux = true,
    qtde_linha = 0,
    intervalo_classes = 0;
  while (aux) {
    at++;

    for (let j = 0; j < 3; j++) {
      if (at % classe[j] == 0 && at / classe[j] > 1) {
        aux = false;
        qtde_linha = classe[j];
        intervalo_classes = at / classe[j];
        break;
      }
    }
  }

  let array_final_continua = [];

  let valor_anterior = array_dados_variavel[0] - 1;

  for (let i = 0; i < qtde_linha; i++) {
    let limite_classe = valor_anterior + intervalo_classes;

    qtde_itens_intervalo = array_dados_variavel.filter(
      (item) => item >= valor_anterior && item < limite_classe
    );
    array_final_continua.push({
      valor: `${valor_anterior} |----- ${limite_classe}`,
      qtde: qtde_itens_intervalo.length,
      xi: Math.ceil((limite_classe + valor_anterior) / 2),
    });

    valor_anterior = valor_anterior + intervalo_classes;
  }

  let total_dados = [];
  array_final_continua.forEach((t) => {
    total_dados.push(parseFloat(t.qtde));
  });

  let resultado = total_dados.reduce(
    (acumulador, item) => acumulador + item,
    0
  );

  let k = 0,
    l = 0;

  array_final_continua.forEach((element) => {
    element.fi = element.qtde;
    element.fr_porcento = (element.qtde * 100) / resultado;

    if (k == 0) {
      element.fa = parseFloat(element.qtde);
    } else if (k > 0) {
      element.fa =
        parseFloat(array_final_continua[k - 1].fa) + parseFloat(element.qtde);
    }
    k++;
    if (l == 0) {
      element.fa_porcento = parseFloat(element.fr_porcento);
    } else if (l > 0) {
      element.fa_porcento =
        parseFloat(array_final_continua[l - 1].fa_porcento) +
        parseFloat(element.fr_porcento);
    }
    l++;
  });

  console.log(array_final_continua);
  return array_final_continua;
}

//criando tabela discreta
function tabelaContinua() {
  let corpo = document.getElementById('tbody_continua');
  //limpar tela
  corpo.innerHTML = '';
  let array_valores = tratamentoDeDadosContinua(),
    media_continua = mediaContinua(array_valores),
    valor_moda = moda(),
    valor_mediana = mediana(),
    desvio_padrao = desvioPadraoPopulacaoContinua(
      array_valores,
      media_continua
    ),
    coeficiente_variacao_continua = coeficienteVariacaoDiscreta(
      desvio_padrao,
      media_continua
    );

  let texto_desvio_padrao = document.getElementById('texto_desvio_padrao');
  texto_desvio_padrao.innerHTML = `Desvio Padrão ${desvio_padrao} <b>`;

  let texto_coeficiente = document.getElementById('texto_coeficiente_variacao');
  texto_coeficiente.innerHTML = `Coeficiente de Variacao ${coeficiente_variacao_continua.toFixed(
    2
  )} <b>`;

  let nome_tabela = document.getElementById('nome_tabela');

  nome_tabela.innerHTML = 'Quantitativa Continua';

  texto_mediana.innerHTML = `Mediana: ${valor_mediana} <br>`;

  texto_media.innerHTML = `Media: ${media_continua.toFixed(2)} <br>`;

  let texto_moda = document.getElementById('texto_moda');
  texto_moda.innerHTML = `Moda: ${valor_moda.toFixed(2)} <b>`;

  array_valores.forEach((e) => {
    let linha = document.createElement('tr'),
      campoDados = document.createElement('tr'),
      campo_fr_porcento = document.createElement('td'),
      campo_fa = document.createElement('td'),
      campo_fa_porcento = document.createElement('td'),
      campoVariavel = document.createElement('td'),
      campo_xi = document.createElement('td'),
      texto_xi = document.createTextNode(e.xi),
      texto_fa = document.createTextNode(e.fa),
      texto_fr_porcento = document.createTextNode(Math.floor(e.fr_porcento)),
      texto_fa_porcento = document.createTextNode(Math.floor(e.fa_porcento)),
      textoVariavel = document.createTextNode(e.valor),
      texto_fi = document.createTextNode(e.fi);
    campoDados.appendChild(texto_fi);
    campoVariavel.appendChild(textoVariavel);
    campo_fr_porcento.appendChild(texto_fr_porcento);
    campo_fa.appendChild(texto_fa);
    campo_fa_porcento.appendChild(texto_fa_porcento);
    campo_xi.appendChild(texto_xi);
    linha.appendChild(campoVariavel);
    linha.appendChild(campoDados);
    linha.appendChild(campo_fr_porcento);
    linha.appendChild(campo_fa);
    linha.appendChild(campo_fa_porcento);
    linha.appendChild(campo_xi);
    corpo.appendChild(linha);
  });
}

function mediaContinua(valores) {
  let total_qtde = valores.reduce(
    (acumulador, item) => acumulador + item.qtde,
    0
  );

  let total_valores = valores.reduce(
    (acumulador, item) => acumulador + item.xi * item.qtde,
    0
  );

  let media = total_valores / total_qtde;

  return media;
}

function desvioPadraoPopulacaoContinua(valores, media) {
  // somatorio fi
  let somatorio_fi = valores.reduce(
    (acumulador, item) => acumulador + item.qtde,
    0
  );

  let somatorio_valores = valores.reduce(
    (acumulador, item) => acumulador + Math.pow(item.xi - media, 2) * item.qtde,
    0
  );

  let desvio_padrao = Math.sqrt(somatorio_valores / somatorio_fi).toFixed(2);

  return desvio_padrao;
}

function graficoContinua() {
  let array_valores = tratamentoDeDadosContinua(),
    colors = [];

  array_valores.forEach((e) => {
    colors.push(getRandomColor());
  });
  var ctx = document.getElementById('myChart').getContext('2d'),
    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [0, 1, 2, 3, 4],
        datasets: [
          {
            label: 'Group A',
            data: [12, 19, 3, 5],
            backgroundColor: colors,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              display: false,
              barPercentage: 1.3,
            },
            {
              display: true,
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

function modaOrdinal() {
  let dadosVar = document.getElementById('dados_variavel').value;
  let array_dados_variavel = dadosVar.split(';');
  array_dados_variavel = quickSort(array_dados_variavel);
  let entrada = array_dados_variavel,
    maior = null,
    ocorrenciasMaior = -1,
    contagem = 1;
  for (let i = 1; i <= entrada.length; i++) {
    if (i < entrada.length && entrada[i] == entrada[i - contagem]) contagem++;
    else if (contagem > ocorrenciasMaior) {
      maior = entrada[i - 1];
      ocorrenciasMaior = contagem;
    }
  }

  return maior;
}

function troca(vet, i, j) {
  let aux = vet[i];
  vet[i] = vet[j];
  vet[j] = aux;
}

function quickSort(vet, fnComp, posIni = 0, posFim = vet.length - 1) {
  if (posFim > posIni) {
    const posPivot = posFim;
    let posDiv = posIni - 1;
    for (let i = posIni; i < posFim; i++) {
      if (vet[i] < vet[posPivot] && i != posDiv) {
        posDiv++;
        troca(vet, i, posDiv);
      }
    }
    posDiv++;
    troca(vet, posDiv, posPivot);

    quickSort(vet, fnComp, posIni, posDiv - 1);

    quickSort(vet, fnComp, posDiv + 1, posFim);
  }
  return vet;
}

function medianaNominal() {
  let dadosVar = document.getElementById('dados_variavel').value;
  let array_dados_variavel = dadosVar.split(';');
  array_dados_variavel = quickSort(array_dados_variavel);
  let md = array_dados_variavel,
    valor_mediana = '',
    posicao = md.length / 2,
    qtde = md.length,
    pos_elemento = '';

  if (qtde % 2 == 0) {
    if (md[posicao - 1] == md[posicao]) {
      valor_mediana = md[posicao];
      return valor_mediana;
    } else {
      valor_mediana = (md[posicao] + md[posicao - 1]) / 2;
      return valor_mediana;
    }
  } else {
    pos_elemento = Math.ceil(posicao) - 1;

    return md[pos_elemento];
  }
}

function tratamentoDeDadosOrdinal() {
  let dadosVar = document.getElementById('dados_variavel').value,
    array_dados_variavel = dadosVar.split(';');

  array_dados_variavel = quickSort(array_dados_variavel);

  const quantidade_dados = array_dados_variavel.reduce((acumulador, atual) => {
    acumulador[atual] = acumulador[atual] ? acumulador[atual] + 1 : 1;
    return acumulador;
  }, {});

  let array_valores = [],
    valor_anterior;
  array_dados_variavel.forEach((dados_variavel) => {
    if (dados_variavel != valor_anterior) {
      array_valores.push({
        valor: dados_variavel,
        qtde: quantidade_dados[dados_variavel],
      });
    }
    valor_anterior = dados_variavel;
  });

  let total_dados = [];
  array_valores.forEach((t) => {
    total_dados.push(parseFloat(t.qtde));
  });

  let resultado = total_dados.reduce(
    (acumulador, item) => acumulador + item,
    0
  );

  let k = 0,
    l = 0;

  array_valores.forEach((element) => {
    element.fi = element.qtde;
    element.fr_porcento = (element.qtde * 100) / resultado;

    if (k == 0) {
      element.fa = parseFloat(element.qtde);
    } else if (k > 0) {
      element.fa =
        parseFloat(array_valores[k - 1].fa) + parseFloat(element.qtde);
    }
    k++;
    if (l == 0) {
      element.fa_porcento = parseFloat(element.fr_porcento);
    } else if (l > 0) {
      element.fa_porcento =
        parseFloat(array_valores[l - 1].fa_porcento) +
        parseFloat(element.fr_porcento);
    }
    l++;
  });

  return array_valores;
}
