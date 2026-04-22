// Sistema de sonido corregido
const sounds = {
    background: new Audio('../assets/sound/circus.wav'),
    hit: new Audio('../assets/sound/patosound.wav')
};

const volumes = {
    background: 0.3,
    hit: 0.7
};

sounds.background.loop = true;
sounds.background.volume = volumes.background;
sounds.hit.volume = volumes.hit;

let isMuted = false;
let isBackgroundPlaying = false;

export function playSound(soundName) {
    if (isMuted || !sounds[soundName]) return;
    
    const soundClone = sounds[soundName].cloneNode();
    soundClone.volume = volumes[soundName] || 1;
    soundClone.play().catch(e => console.log("Audio de efecto bloqueado:", e));
}

export function playBackgroundMusic() {
    if (isMuted) return;
    
    sounds.background.play()
        .then(() => {
            isBackgroundPlaying = true;
        })
        .catch(e => console.log("Música bloqueada por el navegador:", e));
}

export function pauseBackgroundMusic() {
    sounds.background.pause();
    isBackgroundPlaying = false;
}

export function stopBackgroundMusic() {
    sounds.background.pause();
    sounds.background.currentTime = 0;
    isBackgroundPlaying = false;
}

export function toggleMute() {
    isMuted = !isMuted;
    if (isMuted) {
        sounds.background.pause();
    } else {
        if (isBackgroundPlaying) {
            sounds.background.play().catch(e => console.log(e));
        }
    }
    return isMuted;
}

console.log("El módulo de sonido se ha cargado correctamente");