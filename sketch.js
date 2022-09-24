//variaveis GLOBAIS do jogo

var chao, chaoImagem, chaoInvisivel;



var pontos = 0;


var menina, meninacorrendo, pulando, morreu;
var chao
var chaoimagens
var Flores, flor, imagemflor
var Obstaculos, obstaculo, imagemObstaculo


var restart, restarImg;
var gameOver, gameOverImg;

var PLAY = 1;
var END = 0;
var gameState = PLAY;


//pré carrega as imagens e animações do jogo dentro da variavel;
function preload() {
 
  restarImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");

  meninacorrendo = loadAnimation("Run1.png","Run2.png","Run3.png","Run4.png","Run5.png");
  pulando = loadAnimation("Jump1.png","Jump2.png", "Jump3.png", "Jump4.png", "Jump5.png", "Jump6.png");
  morreu = loadAnimation("Dead.png");
  chaoimagens = loadImage("ground.png");
  imagemflor = loadImage("Flordoamor.png");
  imagemObstaculo= loadImage("obstaculo.png");
}

function setup() {
  createCanvas(650, 250)

  menina = createSprite(40, 50);
  menina.addAnimation("correndo", meninacorrendo);
  menina.addAnimation("pulando", pulando);
  menina.addAnimation("morreu", morreu);
  menina.scale = 0.25
  chao = createSprite(600, 228);
  chao.addImage(chaoimagens);
  Flores = new Group();
  Obstaculos = new Group();


  chaoInvisivel = createSprite(200,170,400,10);
  chaoInvisivel.visible = false;

  console.log(menina.y);

  //menina.debug = true;
  menina.setCollider("circle", 0,0,30);
  
  grupoNuvens = new Group();
  grupoObstaculos = new Group();

  gameOver = createSprite(300,70);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.1;
  gameOver.visible = false;

  restart = createSprite(300, 150);
  restart.addImage(restarImg);
  restart.scale = 0.1;
  restart.visible = false;

}



function draw() {
  background("skyblue");


  //concatenação = exibe duas coisas na tela
  textFont('cursive');
  textSize(20);
  fill("tomato")
  text("Pontuação: " + pontos, 500,50);
  
  if (gameState === PLAY) {

    chao.velocityX = -(4 + 1 * pontos/100);
    Flores.setVelocityXEach(-(4 + 1 * pontos/100))
    Obstaculos.setVelocityXEach(-(4 + 1 * pontos/100))

    

    
    //se a tecla do espaço for pressionada, o menina vai ir pra cima
      if (keyDown("space") && menina.y>40) { 
        menina.velocityY = -7;
        menina.changeAnimation("pulando");
        
      }


    //se o chao sair da tela, ele volta pro meio da tela
      if (chao.x < 0) { 
        chao.x = chao.width/2;
      }

      criarFlor();
      criarObstaculo()


      if (Flores.isTouching(menina)) {
        flor.destroy()
        pontos += 1
        
      }

      if (Obstaculos.isTouching(menina)) {
        gameState = END;
        
      }

  } else if(gameState === END) {
    chao.velocityX = 0;
    Flores.setVelocityXEach(0);
    Obstaculos.setVelocityXEach(0);

    Flores.setLifetimeEach(-1);
    Obstaculos.setLifetimeEach(-1);

    menina.changeAnimation("morreu");

    gameOver.visible = true;
    restart.visible = true;

    if(mousePressedOver(restart)){
      reset();
    }


  }


  

  //aplica gravidade
  menina.velocityY = menina.velocityY + 0.5;

  //faz o menina colidir
  menina.collide(chaoInvisivel);

  drawSprites();
}


function criarFlor(){
  if (frameCount%150===0) {
      flor = createSprite(650, 190, 20,10);
      flor.velocityX = -5;
      flor.scale = 0.03;
      flor.lifetime = 250;
      flor.addImage(imagemflor);
      Flores.add(flor);
} 
}

function criarObstaculo(){
  if (frameCount%200===0) {
     obstaculo = createSprite(650, 190, 20,10);
     obstaculo.velocityX = -5;
     obstaculo.scale = 0.02;
     obstaculo.lifetime = 250;
     obstaculo.addImage(imagemObstaculo);
     Obstaculos.add(obstaculo);
} 
}


function reset(){

  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  menina.changeAnimation("correndo", meninacorrendo);

  Flores.destroyEach();
  Obstaculos.destroyEach();

  pontos = 0;

}