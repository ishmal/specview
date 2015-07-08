import {SpecView} from "./sendimg";


class App {

	constructor() {

		this.specView = new SpecView();
		this.grayImage = {
			width: 50,
			height: 50,
			data: []   //rows of columns
		};
		this.setup();
		this.status("OK!");
	}


	prepare () {
		this.specView.prepare(this.grayImage);
	}

	send () {
		this.specView.send();
	}

	status(msg) {
		this.statusTxt.value = this.statusTxt.value + "\n" + msg;
	}

	loadIntoBuffer(imageObj) {
		var clr_canvas = document.getElementById('clr_img');
		var clrctx = clr_canvas.getContext('2d');
		var gray_canvas = document.getElementById('gray_img');
		var grayctx = gray_canvas.getContext('2d');

		var imageWidth = imageObj.width;
		var imageHeight = imageObj.height;
		this.grayImage.width = imageWidth;
		this.grayImage.height = imageHeight;
		this.grayImage.data = [];

		clrctx.drawImage(imageObj, 0, 0);

		var clrImgData = clrctx.getImageData(0, 0, imageWidth, imageHeight);
		var clrData = clrImgData.data;
		var grayImgData = grayctx.getImageData(0, 0, imageWidth, imageHeight);
		var grayData = grayImgData.data;

		// iterate over all pixels
		var i = 0;
		var j = 0;
		for (let row = 0; row < imageHeight; row++) {
			let r = new Float32Array(imageWidth);

			for (let col = 0; col < imageWidth; col++) {
				let red = clrData[i++];
				let green = clrData[i++];
				let blue = clrData[i++];
				let alpha = clrData[i++];
				let gray = (red + green + blue) * 0.33;
				grayData[j++] = gray;
				grayData[j++] = gray;
				grayData[j++] = gray;
				grayData[j++] = alpha;
				r[col] = gray;
			}
			this.grayImage.data[row] = r;
		}
		grayctx.putImageData(grayImgData, 0, 0);
	}

	setup() {
		var imageObj = new Image();
		let that = this;
		imageObj.onload = function() {
			that.loadIntoBuffer(this);
		};
		imageObj.src = "colonel.png";
		var prepareBtn = document.getElementById("prepareBtn");
		prepareBtn.onclick = function() { that.prepare(); };
		var sendBtn = document.getElementById("sendBtn");
		sendBtn.onclick = function() { that.send(); };
		this.statusTxt = document.getElementById("statusTxt");
	}
}

$(document).ready(function(){
	var app = new App();
});


