var list = [
    {"descricao": "Arroz", "qtde": "3", "vlrvenda":"22"},
    {"descricao": "Cerveja", "qtde": "12", "vlrvenda":"2.35"},
    {"descricao": "Carne", "qtde": "2", "vlrvenda":"25.5"},
];

function getTotal(list) {
    var total = 0;
    for (var key in list){
        total += list[key].qtde * list[key].vlrvenda;
    }
    return total;
}

function setList(list){
    var table = '<thead>\n' +
        '                <tr>\n' +
        '                    <td>Descrição</td>\n' +
        '                    <td>Quantidade</td>\n' +
        '                    <td>Valor Unit.</td>\n' +
        '                    <td>-</td>\n' +
        '                </tr>\n' +
        '            </thead>\n' +
        '            <tbody>';
    for (var key in list){
        table += '<tr>\n' +
            '                    <td>'+formatarDescricao(list[key].descricao)+'</td>\n' +
            '                    <td>'+list[key].qtde+'</td>\n' +
            '                    <td>'+formatarValor(list[key].vlrvenda)+'</td>\n' +
            '                    <td><button onclick="preencherCampos('+key+')" class="btn btn-primary">Editar</button> <button onclick="deletarItem('+key+')" class="btn btn-danger">Excluir</button></td>\n' +
            '                </tr>';
    }
    table += '</tbody>';
    document.getElementById('listTable').innerHTML = table;
}

function formatarDescricao(descricao) {
    var str = descricao.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

function formatarValor(valor) {
    var str = parseFloat(valor).toFixed(2);
    str = 'R$ ' + str;
    return str;
}

function adicionarItem() {
    if (!validarCampos()){
        return;
    }
    var descricao = document.getElementById('descricao').value;
    var qtde = document.getElementById('qtde').value;
    var vlrvenda = document.getElementById('vlrvenda').value;
    list.unshift({"descricao":descricao, "qtde":qtde, "vlrvenda":vlrvenda});
    resetarForm();
    setList(list);
    document.getElementById('mostrarErro').innerText = "Erro:"
}

function atualizarItem() {
    var id = document.getElementById('inputIdItem').value;
    var descricao = document.getElementById('descricao').value;
    var qtde = document.getElementById('qtde').value;
    var vlrvenda = document.getElementById('vlrvenda').value;
    list[id] = {"descricao":descricao, "qtde":qtde, "vlrvenda":vlrvenda};
    resetarForm();
    setList(list);
}

function resetarForm() {
    document.getElementById('inputIdItem').value = "";
    document.getElementById('descricao').value = "";
    document.getElementById('qtde').value = "";
    document.getElementById('vlrvenda').value = "";
    document.getElementById('btnAdicionar').style.display = "inline-block";
    document.getElementById('btnAlterar').style.display = "none";
}

function preencherCampos(id) {
    document.getElementById('inputIdItem').value = id;
    document.getElementById('descricao').value = list[id].descricao;
    document.getElementById('qtde').value = list[id].qtde;
    document.getElementById('vlrvenda').value = list[id].vlrvenda;
    document.getElementById('btnAdicionar').style.display = "none";
    document.getElementById('btnAlterar').style.display = "inline-block";
}

function deletarItem(id) {
    if(confirm("Deseja realmente excluir esse registro?")){
        if (id === 0){
            list.shift();
        }else if(id === list.length-1){
            list.pop();
        }else{
            var arrAuxIni = list.slice(0, id);
            var arrAuxFim = list.slice(id + 1);
            list = arrAuxIni.concat(arrAuxFim);
        }
        setList(list);
    }

}

function validarCampos() {
    var descricao = document.getElementById('descricao').value;
    var qtde = document.getElementById('qtde').value;
    var vlrvenda = document.getElementById('vlrvenda').value;
    var erros = "";

    if (descricao === ""){
        erros += "Informe um valor no campo Descrição";
    }

    if (erros != ""){
        document.getElementById('mostrarErro').style.display = "block";
        document.getElementById('mostrarErro').style.backgroundColor = "rgba(247, 36, 36, 0.65";
        document.getElementById('mostrarErro').style.color = "white";
        document.getElementById('mostrarErro').style.padding = "10px";
        document.getElementById('mostrarErro').style.margin = "10px";
        document.getElementById('mostrarErro').style.borderRadius = "13px";
        document.getElementById('mostrarErro').innerHTML = "<h3>Erro:</h3>" + erros;
        return 0;
    }
    return 1;
}

setList(list);
