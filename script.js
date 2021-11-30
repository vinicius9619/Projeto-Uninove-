var diryJ,dirxJ,jogador,velJogador,posJx,posJy;
var velTiro;
var tamTelaW,tamTelaH;
var jogo;
var frames;
var velInimigo,tmpCriaInimigo;
var inimigoTotal;
var vidaPlaneta,barraPlaneta;
var ie,iSom;
var telaMsg;
var show;
var pontos;
var vPaineltxtPontos;
var pontos=100;

function teclaDw(){
	var tecla=event.keyCode;
	if(tecla==38){//Cima
		diryJ=-1;
	}else if(tecla==40){//Baixo
		diryJ=1;
	}
	if(tecla==37){//Esquerda
		dirxJ=-1;
	}else if(tecla==39){//Direita
		dirxJ=1;
	}
	if(tecla==32){//Espaço / Tiro
		//TIRO
		atira(posJx+17,posJy);
		const audio =document.querySelector('audio')
		audio.currentTime = 0
		audio.play();
	}
}
function teclaUp(){
	var tecla=event.keyCode;
	if((tecla==38)||(tecla==40)){
		diryJ=0;
	}
	if((tecla==37)||(tecla==39)){//Esquerda
		dirxJ=0;
	}
}
function criaInimigo(){
	if(jogo){
		var y=0;
		var x=Math.random()*tamTelaW;
		var inimigo=document.createElement("div");
		var att1=document.createAttribute("class");
		var att2=document.createAttribute("style");
		att1.value="inimigo";
		att2.value="top:"+y+"px;left:"+x+"px;";
		inimigo.setAttributeNode(att1);
		inimigo.setAttributeNode(att2);
		document.body.appendChild(inimigo);
	}
}
function controlaInimigo(){
	inimigoTotal=document.getElementsByClassName("inimigo");
	var tam=inimigoTotal.length;
	for(var i=0;i<tam;i++){
		if(inimigoTotal[i]){
			var pi=inimigoTotal[i].offsetTop;
			pi+=velInimigo;
			inimigoTotal[i].style.top=pi+"px";
			if(pi>tamTelaH){
				vidaPlaneta-=35;
				
				perigo(2,inimigoTotal[i].offsetLeft,null);
				inimigoTotal[i].remove();
			}
		}
	}
}

function reset(){
	pontos.value=0;
 }

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

function controleTiros(){
	var tiros=document.getElementsByClassName("tiro");
	var tam=tiros.length;
	for(var i=0;i<tam;i++){
		if(tiros[i]){
			var pt=tiros[i].offsetTop;
			pt-=velTiro;
			tiros[i].style.top=pt+"px";
			colisaoTiroInimigo(tiros[i]);
			if(pt<75){
				tiros[i].remove();
			}
		}
	}
}
function colisaoTiroInimigo(tiro){
	var tam=inimigoTotal.length;
	for(var i=0;i<tam;i++){
		if(inimigoTotal[i]){
			if(
				(
					(tiro.offsetTop<=(inimigoTotal[i].offsetTop+75))&& //Cima tiro com baixo bomba
					((tiro.offsetTop+39)>=(inimigoTotal[i].offsetTop)) //Baixo tiro com cima bomba
				)
				&&
				(
					(tiro.offsetLeft<=(inimigoTotal[i].offsetLeft+75))&& //Esquerda tiro com direita bomba
					((tiro.offsetLeft+39)>=(inimigoTotal[i].offsetLeft)) //Direita Tito  com esquerda Bomba
				)
			){  vPaineltxtPontos.value=pontos;
				pontos=pontos+100;
				
				criaExplosao(1,inimigoTotal[i].offsetLeft+0,inimigoTotal[i].offsetTop);
				inimigoTotal[i].remove();
				tiro.remove();
			}
		}
	}
				
}
function perigo(tipo,x){
	    if(document.getElementById("perigo"+(ie-1))){
	        document.getElementById("perigo"+(ie-1)).remove();
	    }
	    var perigo=document.createElement("div");
	    var som=document.createElement("audio");
	    //atributos para div
	    var att1=document.createAttribute("class");
	    var att2=document.createAttribute("style");
	    var att3=document.createAttribute("id");
	    //atributos para audio
	    var att5=document.createAttribute("src");
	    var att6=document.createAttribute("id");
	    att3.value="perigo"+ie;
	    if(tipo==2){
	        att1.value="perigo";
	         att2.value="top:"+(tamTelaH-100)+"px;left:"+(x-0)+"px;";
	     } 
	     att5.value="som/perigo.ogg";
	    att6.value="som"+iSom;
	    perigo.setAttributeNode(att1);
	    perigo.setAttributeNode(att2);
	    perigo.setAttributeNode(att3);
	    som.setAttributeNode(att5);
	    som.setAttributeNode(att6);
	    perigo.appendChild(som);
	    document.body.appendChild(perigo);
	    document.getElementById("som"+iSom).play();
		 ie++;
	    iSom++;
	
	}
	
function criaExplosao(tipo,x,y){ //Tipo 1=AR
	if(document.getElementById("explosaoInimigo"+(ie-2))){
		document.getElementById("explosaoInimigo"+(ie-2)).remove();
	}
	var explosaoInimigo=document.createElement("div");
	var img=document.createElement("img");
	var som=document.createElement("audio");
	//Atributos para div
	var att1=document.createAttribute("class");
	var att2=document.createAttribute("style");
	var att3=document.createAttribute("id");
	//Atributo para imagem
	var att4=document.createAttribute("src");
	//Atributos para audio
	var att5=document.createAttribute("src");
	var att6=document.createAttribute("id");

	att3.value="explosaoInimigo"+ie;
	if(tipo==1){
		att1.value="explosaoInimigo";
		att2.value="top:"+y+"px;left:"+x+"px;";
		att4.value="imagens/explosaoInimigo.gif?"+new Date();
	}
	att5.value="som/explosao.ogg?"+new Date();
	att6.value="som"+iSom;
	explosaoInimigo.setAttributeNode(att1);
	explosaoInimigo.setAttributeNode(att2);
	explosaoInimigo.setAttributeNode(att3);
	img.setAttributeNode(att4);
	som.setAttributeNode(att5);
	som.setAttributeNode(att6);
	explosaoInimigo.appendChild(img);
	explosaoInimigo.appendChild(som);
	document.body.appendChild(explosaoInimigo);
	document.getElementById("som"+iSom).play();
	ie++;
	iSom++;
}

function controlaJogador(){
	posJy+=diryJ*velJogador;
	posJx+=dirxJ*velJogador;
	jogador.style.top=posJy+"px";
	jogador.style.left=posJx+"px";
	
	var tamJW = 34;
    var tamJH = 44;

	if(posJy+ tamJH>=tamTelaH||posJy<=75) 
    {
		posJy+=(velJogador*diryJ)*(-1);
    }
    if(posJx+ tamJW>=tamTelaW||posJx<=0) 
    {
    posJx+=(velJogador*dirxJ)*(-1);
    }
}

function gerenciaGame(){
	barraPlaneta.style.width=vidaPlaneta+"px";
	if(vidaPlaneta<=0){
		jogo=false;
		clearInterval(tmpCriaInimigo);
		telaMsg.style.backgroundImage="url('imagens/gameover.gif')";
		telaMsg.style.display="block";
		show.style.display="none";
	}
}

function gameLoop(){
	if(jogo){
		//FUNÇÕES DE CONTROLE
	
		controlaJogador();
		controleTiros();
		controlaInimigo();
	
	}
	gerenciaGame();
	frames=requestAnimationFrame(gameLoop);
}

function reinicia(){
	vPaineltxtPontos=document.getElementById("pontos");
	inimigoTotal=document.getElementsByClassName("inimigo");
	var tam=inimigoTotal.length;
	for(var i=0;i<tam;i++){
		if(inimigoTotal[i]){
			inimigoTotal[i].remove();
		}
	}
	var tam=inimigoTotal.length;
	for(var i=0;i<tam;i++){
		if(inimigoTotal[i]){
			inimigoTotal[i].remove();
		}
	}	
	telaMsg.style.display="none";
	clearInterval(tmpCriaInimigo);
	cancelAnimationFrame(frames);
	vidaPlaneta=300;
	posJx=tamTelaW/2;
	posJy=tamTelaH/2;
	jogador.style.top=posJy+"px";
	jogador.style.left=posJx+"px";
	jogo=true;
	tmpCriaInimigo=setInterval(criaInimigo,900);
	
	gameLoop();
}
function mostrar(){
	show=document.getElementById("container");
	show.style.display="block";

}
function inicia(){
	jogo=false;
	vPaineltxtPontos=document.getElementById("pontos");
	
	
	//Ini Tela
	tamTelaH=window.innerHeight;
	tamTelaW=innerWidth;

	//Ini Jogador
	dirxJ=diryJ=0;
	posJx=tamTelaW/2;
	posJy=tamTelaH/2;
	velJogador=velTiro=10;
	jogador=document.getElementById("naveJogador");
	jogador.style.top=posJy+"px";
	jogador.style.left=posJx+"px";

	//Controles das bombas
	velInimigo= 3;
	//Controles do planeta
	vidaPlaneta=300;
	barraPlaneta=document.getElementById("barraPlaneta");
	barraPlaneta.style.width=vidaPlaneta+"px";

	//Controles de explosão
	ie=iSom=0;

	//Telas
	telaMsg=document.getElementById("telaMsg");
	telaMsg.style.backgroundImage="url('imagens/intro.gif')";
	telaMsg.style.display="block";
	document.getElementById("btnJogar").addEventListener("click",reinicia);
	document.getElementById("btnJogar").addEventListener("click",mostrar);
	clearInterval(tmpCriaInimigo);
	
}

window.addEventListener("load",inicia);
document.addEventListener("keydown",teclaDw);
document.addEventListener("keyup",teclaUp);