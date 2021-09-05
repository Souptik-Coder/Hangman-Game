const words = [["Hangman", "The game you are playing now"],
    ["Python", "A popular programming language"],
    ["HTML", "Markup language for creating web pages"],
    ["CSS", "Wep page styles"],
    ["PHP", "A very popular server scripting language"],
    ["JavaScript", "Make web-page dynamic without reload the web page"],
    ["Java", "Run 15 billion devices.\nA program can be run in Windows, Linux and Mac"],
    ["Titanic", "A famous english movie"],
    ["Love", "Something that connects two people"],
    ["Document", "A lot of text in the a file."],
    ["Playground", "There school kids go to play."],
    ["Raflesia", "World's largest flower"],
    ["Code", "var hw = 'Hello World';"],
    ["Samsung", "A company create Phone, Tv, Monitor, SSD, Memory chip"],
    ["Super Mario", "A very popular game in Nintendo 64 that have red hat"],
    ["Elon Musk", "The richest man in the world"],
    ["Clock", "Related to time"],
    ["Binary Clock", "A clock that only use 0 or 1."],
    ["Football", "The most popular sports in the world"],
    ["Girl", "Not boy but?"], ["Boy", "Not girl but?"],
    ["Female", "Other name as girl"],
    ["Male", "Other name as boy."],
    ["Smartphone", "Something you've always on you."],
    ["Playstation", "Gaming console"]];

let wrong = 0, wordIndex = Math.floor(Math.random() * words.length), anim = true,
    currentWord = words[wordIndex][0].toUpperCase();

window.onload = () => {
    const dashContainer = findElementById("dash-container");
    const dashes = dashContainer.getElementsByTagName("span");
    const keyContainer = findElementById("key-container");
    const hintButton = findElementById("get-hint-button");
    const hintDialogContainer = document.querySelector(".hint-dialog-container");
    const key = document.getElementsByClassName("key");
    const hintText = findElementById("hint-text")

    //Creates buttons from A-Z and append it to dom
    for (let i = 65; i <= 90; i++) {
        let button = document.createElement("button");
        button.classList.add("key");
        button.classList.add("enabled");
        button.innerText = String.fromCharCode(i);
        keyContainer.appendChild(button);
    }

    //Creates the dashes
    for (let i = 0; i < currentWord.length; i++) {
        let dash = document.createElement("span");
        dash.classList.add("dash")
        if (currentWord.charAt(i) === " ")
            dash.innerHTML = " ";
        else
            dash.innerHTML = "__";
        dashContainer.appendChild(dash)
    }

    //Adds onClickListener to every button from A-Z
    Array.from(key).forEach((k) => {

            k.addEventListener("click", () => {

                //Doesnt respond to a disabled button click
                if (k.className.includes("disabled"))
                    return;

                else if (!currentWord.toUpperCase().includes(k.innerText)) {
                    k.classList.remove("enabled");
                    k.classList.add("disabled");
                    findElementById(++wrong).style.opacity = "1";
                }
                //key selected matches a character of the currentWord
                else {
                    for (let i = 0; i < currentWord.length; i++) {
                        let c = currentWord.charAt(i);
                        if (c === k.innerText) {
                            dashes[i].innerHTML = c;
                        }
                    }
                    k.classList.remove("enabled");
                    k.classList.add("disabled");
                }

                //Enables the hint button after 5 wrong turns
                if (wrong === 5 && hintButton.classList.contains("disabled")) {
                    hintButton.classList.add("anim")
                    hintButton.classList.add("enabled")
                    hintButton.classList.remove("disabled");
                } else if (wrong === 10) {
                    endGame();
                    return;
                }
                if (countRemainingBlanks(dashes) === 0) {
                    endGame();
                }
            });
        }
    );

    hintButton.addEventListener("click", () => {
        if (hintButton.className !== "disabled")
            hintDialogContainer.style.display = "block";

        if (hintText.innerHTML == null || hintText.innerText === "") {
            hintButton.classList.remove("anim");

            let currentHint = words[wordIndex][1];
            if (currentHint !== undefined)
                hintText.innerText = currentHint;

            //If no hint is available then reveal a letter as hint
            else {
                for (let i = 0; i < dashes.length; i++) {
                    if (dashes[i].innerHTML.includes("_") || dashes[i].innerHTML.includes("&nbsp")) {
                        currentHint = `Position ${i + 1} of the word is <b>${currentWord.toUpperCase().charAt(i)}</b>`;
                        hintText.innerHTML = currentHint
                        break;
                    }
                }
            }
        }
    });
}

function findElementById(id) {
    return document.getElementById(id);
}

function hideModal() {
    document.querySelector(".hint-dialog-container").style.display = "none";
}

function hideInfo() {
    findElementById("how-to-play-dialog-container").style.display = "none";
}

function showInfo() {
    findElementById("how-to-play-dialog-container").style.display = "block";
}

function countRemainingBlanks(dashes) {
    let blank_counter = 0;
    for (let i = 0; i < dashes.length; i++) {
        if (dashes[i].innerHTML === "__")
            blank_counter++;
    }
    return blank_counter;
}

function endGame() {
    let status = document.createElement("h5");
    status.innerHTML = wrong === 10 ?
        "You Lose!<br/>The word was " + currentWord :
        "Hurray you guessed that correct!<br/>The word was " + currentWord;

    findElementById("status").appendChild(status);
    findElementById("result").style.display = "block";
}