/**
 * Jdigi
 *
 * Copyright 2015, Bob Jamison
 *
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


/**
 * HTML5 audio output class
 */
class AudioOutput {

    constructor(par) {
        this.par = par;
        this.scriptNodes = {};
        this.keep = (function () {
            var nextNodeID = 1;
            return function (node) {
                node.id = node.id || (nextNodeID++);
                this.scriptNodes[node.id] = node;
                return node;
            };
        }());
        this.ctx = new AudioContext();
        this.sampleRate = this.ctx.sampleRate;
        this.dataIdx = 0;
        this.data = [];
        this.dataLen = 0;
        this.hasMoreData = false;
    }

    send(audioData) {
    	this.dataIdx = 0;
    	this.data = audioData;
    	this.dataLen = data.length;
    	this.hasMoreData = true;
    }

    //might be a 'this' problem here
    needMoreSamples(e) {
		if (!hasMoreData) {
			return;
		}
		let output  = e.outputBuffer.getChannelData(0);
		let olen = output.length;
		let didx = this.dataIdx;
		let dlen = this.dataLen;
		let d = this.data;
		for (let i=0 ; i < olen ; i++) {
			if (didx >= dlen) {
				output[i] = 0;
				hasMoreData = false;
			} else {
				output[i] = d[didx++];
			}
		}
		this.dataIdx = didx;
	}
    
    start() {
        let bufferSize = 4096;
        let outputNode = this.keep(this.ctx.createScriptProcessor(bufferSize, 0, 1));
        outputNode.onaudioprocess = this.needMoreSamples;
        /*
        let filterNode = this.ctx.createBiquadFilter();
        filterNode.type = "lowpass";
        filterNode.frequency.value = 1600;   //freq in Hz
        filterNode.gain.value = 25;
        outputNode.(filterNode);
        filterNode.connect(this.ctx.destination);
        */
        outputNode.connect(this.ctx.destination);
    }

} //AudioOutput

export {AudioOutput};



