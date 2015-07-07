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
 * Getting this to work with interpolation isn't easy
 */
function AudioOutput(par) {
    var self = this;

    var scriptNodes = {};
    var keep = (function () {
        var nextNodeID = 1;
        return function (node) {
            node.id = node.id || (nextNodeID++);
            scriptNodes[node.id] = node;
            return node;
        };
    }());

    var actx = new AudioContext();
    this.sampleRate = actx.sampleRate;

    
    var dataIdx = 0;
    var data = [];
    var dataLen = 0;
    var hasMoreData = false;
    
    this.send = function(audioData) {
    	dataIdx = 0;
    	data = audioData;
    	dataLen = data.length;
    	hasMoreData = true;
    };
    
    function needMoreSamples(e) {
		if (!hasMoreData) {
			return;
		}
		var output  = e.outputBuffer.getChannelData(0);
		var len = output.length;
		for (var i=0 ; i < len ; i++) {
			if (dataIdx >= dataLen) {
				output[i] = 0;
				hasMoreData = false;
			} else {
				output[i] = data[dataIdx++];
			}
		}
	}
    
    this.start = function() {
        var bufferSize = 4096;
        var outputNode = keep(actx.createScriptProcessor(bufferSize, 0, 1));
        outputNode.onaudioprocess = needMoreSamples;
        outputNode.connect(actx.destination);
    };

       
} //AudioOutput

export {AudioOutput};



