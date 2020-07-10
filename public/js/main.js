
var tempo_inicial = $("#tempo-digitacao").text();



//essa função atualiza o valor do tempo usando ajax no arquivo frase.js
function atualizaTempoInicial(tempo) {
   tempo_inicial = tempo;
   tempo_inicial = $("#tempo-digitacao").text(tempo);

}

//FUNÇÃO CHAMADA QUANDO A PÁGINA HTML
// É TOTALMENTE CARREGADA NO BROWSER
//função que chama todas as outras na página
//$(document).ready() =  $(function) {}      ("atalho")

$(function () {
    console.log("carregou");

    atualizaTamanhoFrase();
    iniciaContadores();
    iniciaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
    
}

);


function atualizaTamanhoFrase(params) {
    var frase = $(".frase").text();
    var num_palavras = frase.split(" ").length;// pega o array de palavras e corta por espaço e conta
    var tam_frase = $("#tam-frase")
    tam_frase.text(num_palavras);
}

var campo = $(".campo_digitacao")

function iniciaContadores() {

    campo.on("input", function () {
        var conteudo = $(".campo_digitacao").val();//peguei o value do campo de textarea. o .val() acessa o valor dos inputs
        var contador_palavras = conteudo.split(/\S+/).length - 1; // cria uma lista splitada pelo espaço
        var tam_frase = $("#contador_palavras"); // pego o número de palavras
        tam_frase.text(contador_palavras);//seto as palavras contadas dentro do textarea

        var qtde_caracteres = conteudo.length;
        $("#contador_caractere").text(qtde_caracteres)

    });
}

function iniciaCronometro() {
    
    campo.one("focus", function () {//quando o usuário clica no campo 
        //pega o valor do id tempo-digitacao quando foco no campo
        var tempoRestante = $("#tempo-digitacao").text();
        var cronometroID = setInterval(function () {//o evento focus é acionado e chama a funcao anonima
            tempoRestante--;//  que decresce tempoRestante
            $("#tempo-digitacao").text(tempoRestante); //atribui a variavel ao campo tempo-digitacao
            if (tempoRestante < 1) { // se tempoRestante < 1 
              
                clearInterval(cronometroID) // para a funcao interval
                finalizaJogo();
            }

        }, 1000); //tempo em milissegundos
    });
}

function finalizaJogo() {
    campo.attr("disabled", true);//disabilita o campo
       //campo.css("background-color","lightgray")//muda a propriedade css
       campo.addClass("campo-desativado")// add uma classe css usando Jquery
       inserePlacar();
}

//PEGAR O CLIQUE BOTÃO Reiniciar - Forma1
//$("#reiniciar").on("click",function(){
//     console.log("cliquei");
//});

//forma 2 - quando clica no reiniciar chama a função 
//reinicia jogo


function inicializaMarcadores(params) {
    
    campo.on("input", function () {
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
        if (digitado == comparavel) {
            campo.addClass("borda-certa");
            campo.removeClass("borda-errada");
        }
        else {
            //console.log("Está Errado");
            campo.addClass("borda-errada");
            campo.removeClass("borda-certa");
        }

    })
}


//FUNÇÃO QUE EXIBE O PLACAR AO SER CHAMADA
$("#botao-placar").click(mostraPlacar);

function mostraPlacar() {
   // $(".placar").css("display","block");
   // $(".placar").toggle();// alterna em mostrar e ocultar placar
   //$(".placar").slideDown(2000);// efeito para exibir o placar
   $(".placar").stop().slideToggle(600); // abre e fecha o placar com efeito
   //com .strop() o jquery para uma animação corrente e executa o slideToggle
    
}

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");//no objeto placar busca o objeto tbody
    var usuario = "Alexandre" // adiciona o usuario alexandre
    var numPalavras = $("#contador_palavras").text(); // 
    //corpoTabela.append(linha);//adiciona linha no final da tabela
    var linha = novaLinha(usuario,numPalavras);//cria uma linha
    linha.find(".botao-remover").click(removeLinha); //busca um objeto pela classe e adiciona um evento
    corpoTabela.prepend(linha);//adiciona linha no início
    $(".placar").slideDown(500); // 
    scrollPlacar();
}

// FUNÇÃO PARA SCROLAR A PÁGINA
function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;
    
    console.log(posicaoPlacar);
    
    $(".body").animate(
    {
        scrollTop: posicaoPlacar+"px"

    },1000);
}


//funcao que cria elementos html com Jquery
function novaLinha(usuario,palavras) {
    var linha = $("<tr>");//cria uma linha com jquery
    var colunaUsuario = $("<td>").text(usuario)//cria uma coluna e add string usuario
    var colunaPalavras = $("<td>").text(palavras);//cria uma coluna e add string palavras
    var colunaRemover = $("<td>");//cria uma coluna 
    
    var link = $("<a>").addClass("botao-remover").attr("href","#");//cria uma tag a e adiciona uma classe e um atributo
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete"); //cria um icone e adiciona 2 classes e o texto da tag


    link.append(icone);//adiciona o icone dentro da tag a
    colunaRemover.append(link); //adiciona o link na colunaRemover

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);
    return linha;
}
//$(".botao-remover").click(function(event) { 
 
    

function removeLinha() {
    event.preventDefault();
    var linha  = $(this).parent().parent();
    linha.fadeOut(1000);// esmaece até o objeto ficar invisível
    setInterval(() => {
        linha.remove();
    }, 1000);
   
  
    
}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("")
    $("#contador_caractere").text(0)
    $("#contador_palavras").text(0)
    $("#tempo-digitacao").text(tempo_inicial);
    iniciaCronometro();
    campo.removeClass("campo-desativado");
    campo.removeClass("borda-certa");
    campo.removeClass("borda-errada");
    //pode usar tb o 'toggleClass' pra adicionar ou remover classe css 

}
