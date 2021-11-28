var direcaoJX, direcaoJY, jog, velocidadeJ, posicaoJX, posicaoJY;
var tamTelaW, tamTelaH;
var jogo;
var frames;


//Pressionar as Teclas
function teclaDw() {

    var tecla = event.keyCode;
    if (tecla == 38) {//Cima
        
        direcaoJY = -1;
    }
    else if (tecla == 40) {//Baixo
        direcaoJY = +1;
    }
    if (tecla == 37) {//Esquerda
       direcaoJX = -1;
    }
    else if (tecla == 39) {//Direita
        direcaoJX = +1;
    }
    if (tecla == 32) {//TIRO
        atira(posicaoJX+17,posicaoJY);
    }

}

//Soltar Teclas
function teclaUp() {
    var tecla = event.keyCode;
    if ((tecla == 38) || (tecla == 40)) {//Cima ou Baixo
        direcaoJY = 0;
    }
    if ((tecla == 37) || (tecla == 39)) {//Esquerda ou Direita
       direcaoJX = 0;
    }

}
//Tiro
function atira(x,y){
 var t=document.createElement("div");
 var att1=document.createAttribute("class");
 var att2=document.createAttribute("style");
    att1.value="tiro";
    att2.value="top:"+y+"px;left:"+x+"px";
    t.setAttributeNode(att1);
    t.setAttributeNode(att2);
    document.body.appendChild(t);
}
//controles do jogador
function controlaJogador(){
    posicaoJY+= direcaoJY*velocidadeJ;
    posicaoJX += direcaoJX*velocidadeJ;
    jog.style.top = posicaoJY + "px";
    jog.style.left = posicaoJX + "px";

    var tamJW = 34;
    var tamJH = 44;
    //fundo fisico
    
    if(posicaoJY+ tamJH>=tamTelaH||posicaoJY<=120) 
    {
    posicaoJY+=(velocidadeJ*direcaoJY)*(-1);
    }
    if(posicaoJX+ tamJW>=tamTelaW||posicaoJX<=160) 
    {
    posicaoJX+=(velocidadeJ*direcaoJX)*(-1);
    }
}

function gameLoop() {
    if(jogo === true){

        controlaJogador();
    }
    frames = requestAnimationFrame(gameLoop);
}


//Inicio
function inicia() {
    jogo =true;
    
    tamTelaH = window.innerHeight;
    tamTelaW = 945;

    //Inicialização Jogador:
    direcaoJX = direcaoJY = 0;
    posicaoJX = tamTelaW/2;
    posicaoJY = tamTelaH/2;
    velocidadeJ = 5;
    jog = document.getElementById("naveJogador");
    jog.style.top = posicaoJY + "px";
    jog.style.left = posicaoJX + "px";
    gameLoop();

}
window.addEventListener("load", inicia);
document.addEventListener("keydown", teclaDw);
document.addEventListener("keyup", teclaUp);