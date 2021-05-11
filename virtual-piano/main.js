// script for keyboard playing
let audio = new Audio();
window.addEventListener('keydown', playSoundForBoard);
window.addEventListener('keyup', removeClassForBoard);

function playSoundForBoard(event) { 
    let audioSource = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    let key = document.querySelector(`div[data-key="${event.keyCode}"]`);
    let repeat = event.repeat;
    if (!audio || repeat) {return};
    key.classList.add('piano-key-playing');
    audio.src = audioSource.src;
    audio.play();
}

function removeClassForBoard(event) {
    const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${event.keyCode}"]`);
    if (!audio) {return};
    key.classList.remove('piano-key-playing');
}

// script for mouse playing
const piano = document.querySelector('.piano');
let mouseUp = false;

piano.addEventListener('mousedown', doWhenMouseDown);
piano.addEventListener('mouseup', doWhenMouseUp);
piano.addEventListener('mouseout', doWhenMouseOut);
window.addEventListener('mouseup', chanegeMouseUpFlaf);

function doWhenMouseDown(event) {
    if (event.target.classList.contains('piano-key')) {
        isMouseUp = false;
        const note = event.target.dataset.note;
        const src = `assets/audio/${note}.mp3`;
        playMouseAudio(src, note);
        piano.addEventListener('mouseover', doWhenMouseOver);
    }

    function doWhenMouseOver(event) {
        if (isMouseUp) {return};
        if (event.target.classList.contains('piano-key')) {
            const note = event.target.dataset.note;
            const src = `assets/audio/${note}.mp3`;
            setTimeout(playMouseAudio, 5, src, note)
        }
    }

    function playMouseAudio(src, note) {
        audio.src = src;
        audio.play();
        const key = document.querySelector(`div[data-note="${note}"]`);
        key.classList.add('piano-key-playing');
    }
}

function doWhenMouseUp(event) {
    if (event.target.classList.contains('piano-key')) {
        const note = event.target.dataset.note;
        removeMouseClass(note);
    }
}

function removeMouseClass(note) {
    const key = document.querySelector(`div[data-note="${note}"]`);
    key.classList.remove('piano-key-playing');
}

function doWhenMouseOut(event) {
    if (event.target.classList.contains('piano-key')) {
        const note = event.target.dataset.note;
        setTimeout(removeMouseClass, 5, note);
    }
}

function chanegeMouseUpFlaf() {
    isMouseUp = true;
}

// script for Notes/Letters switch buttons
let btnNotes = document.querySelector('.btn-notes');
let btnLetters = document.querySelector('.btn-letters');
let pianoKeys = document.querySelectorAll('.piano-key');
let pianoPlate = document.querySelector('.piano');

btnNotes.onclick = function() {
    btnNotes.classList.add('btn-active');
    btnLetters.classList.remove('btn-active');
    pianoKeys.forEach(element => {
        element.classList.remove('piano-key-switch-to-letter');
    });
    pianoPlate.classList.remove('piano-key-switch-to-letter');
};

btnLetters.onclick = function() {
    btnLetters.classList.add('btn-active');
    btnNotes.classList.remove('btn-active');
    pianoKeys.forEach(element => {
        element.classList.add('piano-key-switch-to-letter');
    });
    pianoPlate.classList.add('piano-key-switch-to-letter');
};

// script for fullscrean
const fullscreenBtn = document.querySelector('.fullscreen');

fullscreenBtn.addEventListener('click', toggleFullScreen);

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    }
    else if (document.exitFullscreen) {
        document.exitFullscreen();
    };
}
