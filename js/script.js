// Define the keys for the keyboard
const keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];
  
  // Get the keyboard container element
  const keyboardContainer = document.getElementById('keyBoard');
  
  // Loop through each row of keys
  keys.forEach(row => {
    // Create a div element for the row
    const rowElement = document.createElement('div');
    
    // Loop through each key in the row
    row.forEach(key => {
      // Create a button element for the key
      const keyElement = document.createElement('button');
      keyElement.setAttribute("id",key)
      
      // Set the text content of the button to the key character
      keyElement.textContent = key;
      
      // Add a click event listener to the button
      keyElement.addEventListener('click', () => {
        document.getElementById("userguss").value += key;
      });
      
      // Add the key button to the row
      rowElement.appendChild(keyElement);
    });
    
    // Add the row to the keyboard container
    keyboardContainer.appendChild(rowElement);
  });
  


// End of the keyboard

let score = 0
// counting the user mistakes
let mistakes

// function that return a random item from the array
function getRandomItem(){
    let Randomindex = Math.floor(Math.random() * fruits.length);
    return fruits[Randomindex];
}
let fruits
let item
let placeholders
let itemArr
let collectionOfLetters

function setGame(){
    mistakes = 0


    fruits = ["kiwi", "apple", "mango","carrot","brocoli","onion","ketchup", "banana", "apricot", "cherry", "figs", "jujube", "orange", "papaya", "plum"];
    //getting a random item
    item = document.getElementById("guessed").value = getRandomItem();
    itemArr = Array.from(item)

    //create a placeholder for the correct words

    placeholders = document.getElementById("correctLetters");

    for(i in item){
        const LetterPlaceholder = document.createElement("div");
        LetterPlaceholder.setAttribute("class","col letter")
        placeholders.appendChild(LetterPlaceholder);
    }
    collectionOfLetters = document.getElementsByClassName('letter')

}


setGame()

// set the user score

function setScore(score){
    document.getElementById('score').innerText = score;
}


setScore(score);

let userGuess = '';


// checking the user input
function checkGuess(){
            userGuess = (document.getElementById("userguss").value).toLowerCase();

            var IsthereLetter = false;
            for(i in userGuess){
                for(j in itemArr){
                    // I'm checking if the item includes that letter
                    if(userGuess[i] === itemArr[j]){
                        collectionOfLetters[j].innerText = userGuess[i];
                        IsthereLetter = true;
                    }
                }
                }
        
                clearUserGuess();

                if(IsthereLetter === false){
                    mistakes ++;
                    (document.getElementById('Hangman')).style.display = " block";
                    try{
                    (document.getElementById(`mistake-${mistakes}`)).style.display = " block";
                    }
                    catch(err){
                            // Do nothing (catch the error and move on)

                    }
                }
                var Guess = '';
                for( i in collectionOfLetters){
                    if(collectionOfLetters[i].innerText !== undefined){
                        Guess += collectionOfLetters[i].innerText;
                    }
                }

                if(Guess.length == item.length && Guess === item){

                        correctAnswer()
                    }

                if(mistakes >= 5){
                    endGame();
                    score --;
                    setScore(score);
                }

                disableLetters(userGuess)
            }


function disableLetters(disabledLetters){
    let disabledLettersArry =  Array.from(disabledLetters)

    let newArry = disabledLettersArry.filter(letter => { return letter.trim().length > 0 })

    newArry.forEach(button => document.getElementById(button).disabled = true )
}


function correctAnswer(){
    (document.getElementById('Hangman')).style.display = " none";
    changeType('text')
    score ++;
    setScore(score);
    showWinIcon();
    endGame();
}


function showWinIcon(){
    let image = document.getElementById("winner");
    image.style.display = " block";
}


function changeType(word){
    document.getElementById("guessed").type = word;
}


function clearUserGuess(){

    document.getElementById("userguss").value = " ";

}


function endGame(read_Only = true, disable = true, word = 'text' ){
            document.getElementById('userguss').readOnly = read_Only;
            document.getElementById("check").disabled = disable;
            changeType(word);
}


function enableLetters(){

    for(i of keys){
        i.forEach(letter =>{ 
            document.getElementById(letter).disabled = false;
        })
    }
}

function clearInputs(){
    document.getElementById('guessed').innerText = '';
    document.getElementById('userguss').innerText = '';
    changeType('password')
    for(i of collectionOfLetters){
        i.innerHTML = ''
    }

}


function clearPicturs(){
    document.getElementById('Hangman').style.display = " none";
    for(let i = 1 ; i <= 5 ; i++){
        (document.getElementById(`mistake-${i}`)).style.display = " none";
    }
    document.getElementById("winner").style.display = " none";

}


function removeOladPlaceholders() {
    while (placeholders.firstChild) { // remove all the children of the placeholders one by one untill no children left
        placeholders.removeChild(placeholders.firstChild);
    }
}


function PlayAgain(){
    clearPicturs()
    enableLetters()
    removeOladPlaceholders()
    changeType('password')
    clearInputs()
    endGame(false, false,'password')
    setGame()
    mistakes = -1
    checkGuess()

}