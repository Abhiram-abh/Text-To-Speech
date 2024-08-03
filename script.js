let speech = new SpeechSynthesisUtterance();

let voices = [];
let voiceSelect = document.querySelector("select");

function populateVoiceList() {
    voices = window.speechSynthesis.getVoices();
    console.log('Voices loaded:', voices); 

    if (voices.length === 0) {
        console.error("No voices found.");
        return;
    }

    voiceSelect.innerHTML = '';

    voices.forEach((voice, i) => {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = voice.name;
        voiceSelect.appendChild(option);
    });

    speech.voice = voices[0];
}

populateVoiceList();

if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
    window.speechSynthesis.onvoiceschanged = populateVoiceList;
}

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
    console.log('Voice selected:', voices[voiceSelect.value].name); 
});

document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    console.log('Speaking text:', speech.text); 
    window.speechSynthesis.speak(speech);
});
