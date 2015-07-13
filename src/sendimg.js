/**
 * Convert the image into float audio samples
 */

import {Complex} from "./math";
import {AudioOutput} from "./audio";
import {FFTSR} from "./fft";

class SpecView {


	constructor() {
		this.audio = new AudioOutput(null);
		this.sampleRate = this.audio.sampleRate;
		this.N = this.sampleRate / 4;
		this.trace(`samplerate: ${this.sampleRate}  N: ${this.N}`);
	}


	status(msg) {
		console.log("specview: "+ msg);
	}

	trace(msg) {
		console.log("specview: "+ msg);
	}

	prepare(grayImg) {


	}

	send() {

	}

}

export {SpecView};
