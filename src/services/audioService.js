
import { Howl } from 'howler';

let currentHowl = null;

export function playTrack(src) {
	if (currentHowl) {
		currentHowl.stop();
	}
	currentHowl = new Howl({ src: [src], html5: true });
	currentHowl.play();
}

export function pauseTrack() {
	if (currentHowl) {
		currentHowl.pause();
	}
}

export function isPlaying() {
	return currentHowl && currentHowl.playing();
}
