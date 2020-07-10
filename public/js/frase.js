$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);
  
function fraseAleatoria() {
    $("#spinner").toggle();
    $.get("http://localhost:3000/frases",trocaFraseAleatoria)
    .fail(function () {  //.fail() usado em caso de falhas
        $("#erro").show(); //exibe a mensagem de erro se o ajax falhar
        setTimeout(() => {
            $("#erro").toggle();//após 2 segundos esconde a mensagem
        }, 2000);
       
    }).always(function () { //função pra sempre exibir o gif do spinner 

        $("#spinner").toggle();
    });
}

function trocaFraseAleatoria(data){
    var frase = $(".frase");
    tempo = $("#tempo-digitacao");
    var aleatorio = Math.floor(Math.random() * data.length);
   // console.log(aleatorio);
    
    frase.text(data[aleatorio].texto);
    //tempo.text(data[aleatorio].tempo);
    atualizaTamanhoFrase();
    atualizaTempoInicial((data[aleatorio].tempo))

}

function buscaFrase() {
    $("#spinner").toggle();
    var fraseId = $("#frase-id").val();
    console.log(fraseId);
    var dados = {id:fraseId};
    //chama o link ajax passa uma variável pra consultar em dados e depois chama a função trocaFrase
    $.get("http://localhost:3000/frases",dados,trocaFrase)
    .fail(function(){
        $("#erro").toggle();
        setTimeout(function() {
            $("#erro").toggle();
        }, 2000);
    }).always(function () { 
        $("#spinner").toggle();
     })
}


function trocaFrase(data) {
    var frase = $(".frase");//pega o campo frase
    frase.text(data.texto);//atribui o novo valor
    atualizaTamanhoFrase();//atualiza o tamanho da frase
    atualizaTempoInicial(data.tempo);//atribui o tempo
    
}