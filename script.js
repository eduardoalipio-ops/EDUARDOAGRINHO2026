// Seleção de elementos do DOM
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const scoreDisplay = document.getElementById('score');
const finalScoreDisplay = document.getElementById('final-score');
const livesDisplay = document.getElementById('lives');
const gameContainer = document.getElementById('game-container');

// Variáveis de estado do jogo
let score = 0;
let lives = 3;
let gameInterval;
let gameActive = false;
let spawnRate = 1200; // Tempo em milissegundos para surgir novas ameaças
let fallDuration = 4; // Tempo em segundos que a ameaça leva para cair

// Tipos de poluentes (Emojis que representam as ameaças)
const threatsList = ['🗑️', '🛢️', '💨', '塑料', '🔋']; 

// Iniciar o Jogo
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

function startGame() {
    // Resetar variáveis
    score = 0;
    lives = 3;
    fallDuration = 4;
    spawnRate = 1200;
    gameActive = true;
    
    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;
    
    // Esconder telas de menu
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    
    // Limpar ameaças antigas se houver
    document.querySelectorAll('.threat').forEach(t => t.remove());
    
    // Iniciar loop de criação de ameaças
    clearInterval(gameInterval);
    gameInterval = setInterval(createThreat, spawnRate);
}

// Criar elemento poluidor
function createThreat() {
    if (!gameActive) return;

    const threat = document.createElement('div');
    threat.classList.add('threat');
    
    // Escolhe um emoji aleatório da lista de poluentes
    const randomThreat = threatsList[Math.floor(Math.random() * threatsList.length)];
    threat.textContent = randomThreat;
    
    // Posição X aleatória dentro do container (largura de 800px - 50px do tamanho do item)
    const randomX = Math.floor(Math.random() * 750);
    threat.style.left = `${randomX}px`;
    
    // Define a velocidade da queda usando a variável de tempo do CSS
    threat.style.animationDuration = `${fallDuration}s`;
    
    // Evento de clique para eliminar a ameaça (Defesa da Natureza)
    threat.addEventListener('mousedown', () => {
        if (!gameActive) return;
        score += 10;
        scoreDisplay.textContent = score;
        
        // Aumenta a dificuldade gradativamente a cada 100 pontos
        if (score % 100 === 0 && fallDuration > 1.5) {
            fallDuration -= 0.3;
            clearInterval(gameInterval);
            spawnRate = Math.max(500, spawnRate - 100);
            gameInterval = setInterval(createThreat, spawnRate);
        }
        
        threat.remove();
    });
    
    // Detectar quando a ameaça chega ao chão sem ser clicada
    threat.addEventListener('animationend', () => {
        threat.remove();
        if (gameActive) {
            lives--;
            livesDisplay.textContent = lives;
            
            // Efeito visual rápido de dano na tela
            gameContainer.style.borderColor = '#e74c3c';
            setTimeout(() => gameContainer.style.borderColor = '#27ae60', 200);
            
            if (lives <= 0) {
                endGame();
            }
        }
    });
    
    gameContainer.appendChild(threat);
}

// Fim de Jogo
function endGame() {
    gameActive = false;
    clearInterval(gameInterval);
    finalScoreDisplay.textContent = score;
    gameOverScreen.classList.remove('hidden');
}
