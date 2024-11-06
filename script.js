// script.js
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const symbols = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍒', '🍍', '🍉'];
    let cards = symbols.concat(symbols); // Duplicar para criar pares
    cards = shuffle(cards);

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    function createCard(symbol) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.addEventListener('click', flipCard);
        return card;
    }

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    function flipCard() {
        if (lockBoard || this === firstCard || this.classList.contains('flipped')) return;
        this.textContent = this.dataset.symbol;
        this.classList.add('flipped');
        
        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;

        if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            resetBoard();
        } else {
            setTimeout(() => {
                firstCard.textContent = '';
                secondCard.textContent = '';
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                resetBoard();
            }, 1000);
        }
    }

    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    function setupBoard() {
        cards.forEach(symbol => {
            board.appendChild(createCard(symbol));
        });
    }

    setupBoard();
});
