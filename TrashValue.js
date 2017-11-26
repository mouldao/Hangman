// Shuffle the pack

var chars = word.split('');
console.log(chars)
let randomarray = {}
function shuffle(array) {
    
    var currentIndex = array.length, temporaryValue, randomIndex ;
    randomarray = array.slice()
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = randomarray[currentIndex];
        randomarray[currentIndex] = randomarray[randomIndex];
        randomarray[randomIndex] = temporaryValue;
    }
}
shuffle(chars)
console.log(randomarray)
console.log(chars)