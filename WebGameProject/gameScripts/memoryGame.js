const section = document.querySelector('section')

// Define the objects (cards)
const getObjects = () => [
    { imgSrc: "images/box.png", name: "box"},
    { imgSrc: "images/car.png", name: "car"},
    { imgSrc: "images/chick.png", name: "chick"},
    { imgSrc: "images/danger.png", name: "spider"},
    { imgSrc: "images/rock.png", name: "rock"},
    { imgSrc: "images/food.png", name: "food"},
    { imgSrc: "images/panda.png", name: "panda"},
    { imgSrc: "images/penguin.png", name: "penguin"},
    { imgSrc: "images/box.png", name: "box"},
    { imgSrc: "images/car.png", name: "car"},
    { imgSrc: "images/chick.png", name: "chick"},
    { imgSrc: "images/danger.png", name: "spider"},
    { imgSrc: "images/rock.png", name: "rock"},
    { imgSrc: "images/food.png", name: "food"},
    { imgSrc: "images/panda.png", name: "panda"},
    { imgSrc: "images/penguin.png", name: "penguin"}

]

function startGame() {

    cardData = assignCards();
    
    // Generate HTML for each card
    cardData.forEach(item => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";

        /// Attach info to cards ///

        // Attach image source for the cards
        face.src = item.imgSrc

        // Attach name 
        card.setAttribute('name', item.name)

        // Attach each card to the section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        // Flips the card on click
        card.addEventListener('click', (e) => {
            card.classList.toggle("flipCard");
            checkCards(e);
        })
    })



}

// randomize the order of cards
function assignCards() {
    const cardData = getObjects();
    // randomize order
    cardData.sort(() => Math.random() - 0.5)
    return cardData
}

// checks if two cards are the same or not
function checkCards(card) {
    const clickedCard = card.target;
    clickedCard.classList.add('flipped')

    const flippedCards = document.querySelectorAll('.flipped');
    const flipCard = document.querySelectorAll('.flipCard');

    let match
    // Check
    if (flippedCards.length === 2) {
        if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
            match = true;
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                card.style.pointerEvents = 'none';
            })
        }
        else {
            match = false;
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                // add timer to cards automatically flipping back when two are chosen
                setTimeout(() => card.classList.remove('flipCard'), 1500)
            })
        }
    }

    // Alert when player wins
    if (flipCard.length === 16) {
        section.classList.add('win');
        setTimeout(() => {
            alert("You win! Click Restart to Play Again.")
        }, 2000);
    }
}

function restart() {

    let cardData = assignCards();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card")
    section.classList.remove('win');

    cardData.forEach((item, index) => {
        cards[index].classList.remove('flipCard')

        // Put all pointer events back and update card info
        setTimeout(() => {
            cards[index].style.pointerEvents = 'all';
            faces[index].src = item.imgSrc;
            cards[index].setAttribute('name', item.name);
            section.style.pointerEvents = 'all'
        }, 1000)
        
    })
    startGame();


}

startGame()