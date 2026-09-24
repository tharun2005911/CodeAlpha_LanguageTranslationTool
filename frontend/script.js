const sourceLanguage = document.getElementById("sourceLanguage");
const targetLanguage = document.getElementById("targetLanguage");

const inputText = document.getElementById("inputText");
const translateButton = document.getElementById("translateButton");
const translationResult = document.getElementById("translationResult");
const copyButton = document.getElementById("copyButton");
const swapButton = document.getElementById("swapButton");
const speakButton = document.getElementById("speakButton");


// Load available languages
fetch("http://127.0.0.1:8000/languages")
    .then(response => response.json())
    .then(languages => {

        languages.forEach(language => {

            // Source language option
            const sourceOption = document.createElement("option");

            sourceOption.value = language.code;
            sourceOption.textContent = language.name;

            sourceLanguage.appendChild(sourceOption);


            // Target language option
            const targetOption = document.createElement("option");

            targetOption.value = language.code;
            targetOption.textContent = language.name;

            targetLanguage.appendChild(targetOption);

        });

    })
    .catch(error => {

        console.error(error);

        translationResult.textContent =
            "Unable to load languages.";

    });


// Translate button
translateButton.addEventListener("click", () => {

    const text = inputText.value;
    const source = sourceLanguage.value;
    const target = targetLanguage.value;


    // Check if input is empty
    if (text.trim() === "") {

        translationResult.textContent =
            "Please enter some text.";

        return;
    }


    // Show loading message
    translationResult.textContent = "Translating...";

    translateButton.textContent = "Translating...";
    translateButton.disabled = true;


    // Send translation request to backend
    fetch("http://127.0.0.1:8000/translate", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            text: text,
            source_language: source,
            target_language: target
        })

    })

        .then(response => {

            if (!response.ok) {
                throw new Error("Translation request failed");
            }

            return response.json();

        })

        .then(data => {

            if (data.translated_text) {

                translationResult.textContent =
                    data.translated_text;

            } else {

                translationResult.textContent =
                    "Translation failed. Please try again.";

            }

            translateButton.textContent = "Translate";
            translateButton.disabled = false;

        })

        .catch(error => {

            console.error(error);

            translationResult.textContent =
                "An error occurred. Please try again.";

            translateButton.textContent = "Translate";
            translateButton.disabled = false;

        });

});


// Copy translation
copyButton.addEventListener("click", async () => {

    const translatedText = translationResult.textContent;

    if (
        translatedText.trim() === "" ||
        translatedText === "Your translation will appear here..."
    ) {

        copyButton.textContent = "No translation";

        setTimeout(() => {
            copyButton.textContent = "Copy Translation";
        }, 2000);

        return;
    }


    try {

        await navigator.clipboard.writeText(translatedText);

        copyButton.textContent = "Copied!";

        setTimeout(() => {
            copyButton.textContent = "Copy Translation";
        }, 2000);

    } catch (error) {

        console.error(error);

        copyButton.textContent = "Copy failed";

        setTimeout(() => {
            copyButton.textContent = "Copy Translation";
        }, 2000);

    }

});


// Swap languages
swapButton.addEventListener("click", () => {

    const temporaryLanguage = sourceLanguage.value;

    sourceLanguage.value = targetLanguage.value;

    targetLanguage.value = temporaryLanguage;

});

// Speak translation
speakButton.addEventListener("click", () => {

    const translatedText = translationResult.textContent;

    if (
        translatedText.trim() === "" ||
        translatedText === "Your translation will appear here..."
    ) {
        speakButton.textContent = "No translation";

        setTimeout(() => {
            speakButton.textContent = "Speak Translation";
        }, 2000);

        return;
    }

    const speech = new SpeechSynthesisUtterance(translatedText);

    speech.lang = targetLanguage.value;

    window.speechSynthesis.speak(speech);

});