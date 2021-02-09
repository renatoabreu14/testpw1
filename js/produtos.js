var requestURL = "https://renato-sds2.herokuapp.com/products";

var request = new XMLHttpRequest();

request.open('GET', requestURL);

request.responseType = 'json';

request.send();

request.onload = function () {
    var produtos = request.response;
    mostrarProdutos(produtos);
}

function mostrarProdutos(produtos) {

    for (var i = 0; i < produtos.length; i++) {
        var myArticle = document.createElement('article');
        var myH2 = document.createElement('h2');
        var myPara1 = document.createElement('p');
        var myPara2 = document.createElement('p');
        var myPara3 = document.createElement('p');

        myH2.textContent = produtos[i].name;
        myPara1.textContent = 'Preço: ' + produtos[i].price;
        myPara2.textContent = 'Descrição: ' + produtos[i].description;
        myPara3.innerHTML = '<img src="'+produtos[i].imageUri+'" width="150px" height="150px">';

        myArticle.appendChild(myH2);
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        myArticle.appendChild(myPara3);

        document.getElementById('teste').appendChild(myArticle);
    }
}
