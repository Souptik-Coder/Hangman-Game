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

let wrong = 0, wordIndex, anim = true, currentWord;
window.onload = () => {
    wordIndex = Math.floor(Math.random() * words.length);
    currentWord = words[wordIndex][0].toUpperCase();
    const word_blank = id("word-blank");
    const blanks = word_blank.getElementsByTagName("span");
    const keys = id("keys");
    const hint = id("hint");
    const modal = document.querySelector(".modal");
    const key = document.getElementsByClassName("key");

    for (let i = 65; i <= 90; i++) {
        let button = document.createElement("button");
        button.classList.add("key");
        button.classList.add("enabled");
        button.innerText = String.fromCharCode(i);
        keys.appendChild(button);
    }

    for (let i = 0; i < currentWord.length; i++) {
        let dash = document.createElement("span");
        if (currentWord.charAt(i) === " ")
            dash.innerHTML = "&nbsp &nbsp &nbsp";
        else
            dash.innerHTML = "__&nbsp";
        word_blank.appendChild(dash)
    }

    Array.from(key).forEach((k) => {

        k.addEventListener("click", () => {
            if (k.className.includes("disabled"))
                return;

            if (!currentWord.toUpperCase().includes(k.innerText)) {
                k.classList.remove("enabled");
                k.classList.add("disabled");
                id(++wrong).style.opacity = 1;
                if (wrong === 10) id("xEyes").classList.remove("hide");
            } else {
                for (let i = 0; i < currentWord.length; i++) {
                    let c = currentWord.charAt(i);

                    if (c === k.innerText) {

                        blanks[i].innerHTML = c;

                        k.classList.remove("enabled");
                        k.classList.add("disabled");
                    }
                }
            }
            if (wrong === 5) {
                hint.classList.remove("disabled");
                hint.classList.add("enabled");

                if (anim)
                    hint.classList.add("anim");

            }
            if (wrong === 10) {
                endGame();
                return;
            }

            let blank_counter = 0;
            for (let i = 0; i < blanks.length; i++) {
                if (blanks[i].innerHTML.includes("_") || blanks[i].innerHTML.includes("&nbsp"))
                    blank_counter++;
            }
            if (blank_counter === 0) {
                endGame();
                return;
            }
        });
    });

    hint.addEventListener("click", () => {
        let body = document.querySelector(".modal-body");
        if (hint.className === "disabled")
            return;
        else {
            anim = false;
            hint.classList.remove("anim");
            modal.style.display = "block";
            let ht = document.createElement("p");
            if (body.hasChildNodes()) return;

            let hintText = words[wordIndex][1];

            if (hintText !== undefined)
                ht.innerText = hintText;
            else {
                for (let i = 0; i < blanks.length; i++) {
                    if (blanks[i].innerHTML.includes("_") || blanks[i].innerHTML.includes("&nbsp")) {
                        hintText = `Position ${i + 1} of the word is <b>${currentWord.toUpperCase().charAt(i)}</b>`;
                        break;
                    }
                }
            }
            ht.innerHTML = hintText;
            body.appendChild(ht);

        }
    });

}

function id(el) {
    return document.getElementById(el);
}

function hideModal() {
    document.querySelector(".modal").style.display = "none";
}

function hideInfo() {
    id("info").style.display = "none";
}

function showInfo() {
    id("info").style.display = "block";
}

function endGame() {
    let status = document.createElement("h5");
    status.innerHTML = wrong == 10 ? "You Lose!<br/>The word was " + currentWord : "Hurray you guessed that correct!<br/>The word was " + currentWord;

    id("status").appendChild(status);
    id("result").style.display = "block";
}