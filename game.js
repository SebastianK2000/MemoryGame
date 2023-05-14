const cardColors = ["red", "red", "green", "green", "blue", 
"blue", "brown", "brown", "yellow", "yellow", "gray", "gray", 
"cadetblue", "cadetblue", "violet", "violet", 
"lightgreen", "lightgreen"];

// Pobranie wszystkich div-ów 
let cards = document.querySelectorAll("div");

cards = [...cards]; // 18 - Tworzymy tablicę z listy

const startTime = new Date().getTime(); // Pobieramy aktualną datę 

let activeCard = ""; // Która karta została aktualnie kliknięta
const activeCards =[]; // Tablica dla dwóch kart

const gameLength = cards.length / 2; // 9 - ilość wszystkich par 
let gameResult = 0;



const clickCard = function () {

    activeCard = this; // w co zostało kliknięte

    if (activeCard == activeCards[0]) return;

    activeCard.classList.remove("hidden"); // ukrycie karty która została kliknięta

    if(activeCards.length === 0) {
        activeCards[0] = activeCard; // przypisanie pozycji numer 1 
    
        return;
    } else {
        cards.forEach(card => card.removeEventListener("click", 
        clickCard))

        activeCards[1] = activeCard;

        setTimeout(function () {

            if(activeCards[0].className === activeCards[1].className) {

                console.log("Wygrana!")
                activeCards.forEach(card => card.classList.add("off"))
                gameResult++;
                cards = cards.filter(card => !card.classList.contains
                ("off"));
                if(gameResult == gameLength) {
                    const endTime = new Date().getTime();
                    const gameTime = (endTime - startTime) / 500
                    alert(`Udało się! WYGRANA! Twój czas to: ${gameTime} sekund!`)
                    location.reload();
                }
            } else {
                console.log("Przegrana")
                activeCards.forEach(card => card.classList.add("hidden"))
            }
            activeCard ="";  // aktywna karta pusta
            activeCards.length = 0; // długość tablicy na zero 
            cards.forEach(card => card.addEventListener("click", clickCard)) 
            // przywrócenie nasłuchiwaania 

        }, 500)
       
    }

};


// funkcja po starcie zainicjowana 
const init = function() {
    // losowanie klasy dla każdego diva

    cards.forEach(card => {
// pozycja z tablicy przechowującej kolory 

        const position = Math.floor(Math.random() * 
        cardColors.length);

        card.classList.add(cardColors[position]);
// usunięcie wylosowanego elementu

        cardColors.splice(position, 1);
    })

    setTimeout(function () {
        cards.forEach(card => {
            card.classList.add("hidden")
            card.addEventListener("click", clickCard)
        })
    }, 2000)
};

init()