function makeGUI(gui,planeM){
	const warpFolder = gui.addFolder("Warp");
	// warpFolder.open();
	warpFolder.add(planeM.uniforms.warpAngleUVScale,"value",0,4,0.01).name("Angle Scale");
	warpFolder.add(planeM.uniforms.warpDistUVScale,"value",0,40,0.01).name("Distance Scale");
	warpFolder.add(planeM.uniforms.warpMaxDist,"value",-0.3,0.3).name("Max Distance");
	warpFolder.add(planeM.uniforms.warpOffset,"value",0,10,0.01).name("Offset");

	const ridgeNoiseFolder = gui.addFolder("Ridge Noise");
	// ridgeNoiseFolder.open();
	ridgeNoiseFolder.add(planeM.uniforms.ridgePower,"value",-1,4).name("Ridge Power");
	ridgeNoiseFolder.add(planeM.uniforms.ridgeThreshold,"value",0,1).name("Ridge Threshold");

	const fbmNoiseFolder = gui.addFolder("FBM Noise");
	// fbmNoiseFolder.open();
	fbmNoiseFolder.add(planeM.uniforms.numOctaves,"value",1,4,1).name("Octaves");
	fbmNoiseFolder.add(planeM.uniforms.aMult,"value",0.5,6,0.01).name("Offset Scale");
	fbmNoiseFolder.add(planeM.uniforms.noiseMult,"value",0,4,0.01).name("Noise Scale");
	fbmNoiseFolder.add(planeM.uniforms.lacunarity,"value",0,4,0.01).name("Lacunarity");
	fbmNoiseFolder.add(planeM.uniforms.gain,"value",0,4,0.01).name("Gain");

	const colorFolder = gui.addFolder("Color");
	// colorFolder.open();

	var inversions = {hue: false, saturation: false, brightness: false};

	function invertHue(){
	    var val = planeM.uniforms.hueInvert.value;
	    planeM.uniforms.hueInvert.value = 1.-val;
	}
	function invertSaturation(){
	    var val = planeM.uniforms.saturationInvert.value;
	    planeM.uniforms.saturationInvert.value = 1.-val;
	}
	function invertBrightness(){
	    var val = planeM.uniforms.brightnessInvert.value;
	    planeM.uniforms.brightnessInvert.value = 1.-val;
	}

	colorFolder.add(inversions,"hue").onChange(invertHue).name("Invert Hue Noise");
	colorFolder.add(planeM.uniforms.hueScale,"value",-2,2,0.04).name("Hue Scale");
	colorFolder.add(planeM.uniforms.hueOffset,"value",0,1,0.01).name("Hue Offset");

	colorFolder.add(inversions,"saturation").onChange(invertSaturation).name("Invert Sat. Noise");
	colorFolder.add(planeM.uniforms.saturationScale,"value",-2,2,0.04).name("Saturation Scale");
	colorFolder.add(planeM.uniforms.saturationOffset,"value",-1,1,0.01).name("Saturation Offset");

	colorFolder.add(inversions,"brightness").onChange(invertBrightness).name("Invert Brt. Noise");
	colorFolder.add(planeM.uniforms.brightnessScale,"value",-2,2,0.04).name("Brightness Scale");
	colorFolder.add(planeM.uniforms.brightnessOffset,"value",-1,1,0.01).name("Brightness Offset");

	const circleFolder = gui.addFolder("Circle");
	// circleFolder.open();
	circleFolder.add(planeM.uniforms.circleDiameter,"value",0,1).name("Circle Diameter");
	circleFolder.add(planeM.uniforms.circleSmooth,"value",0,1).name("Circle Smoothing");
}

export {makeGUI};