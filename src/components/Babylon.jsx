import React from "react";
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, StandardMaterial,Texture,Vector4} from "@babylonjs/core";
import SceneComponent from "./SceneComponent"; // uses above component in same directory
import "../styles.css"

let box;

const onSceneReady = (scene, imgUrl) => {
    // This creates and positions a free camera (non-mesh)
    const camera = new FreeCamera("camera1", new Vector3(0, 1, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());

    const canvas = scene.getEngine().getRenderingCanvas();

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new HemisphericLight("light", new Vector3(50, 10, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    var mat = new StandardMaterial("mat", scene);
    var texture = new Texture(imgUrl, scene);
    mat.diffuseTexture = texture;

    var options = {        
        wrap: true,
        size: 5,
    };

    box = MeshBuilder.CreateBox('box', options, scene);
    box.material = mat;
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene) => {
  if (box !== undefined) {
    const deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 2;
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
};

export default (props) => (
  <div>
    <SceneComponent style={{height: "500px"}} antialias onSceneReady={onSceneReady} imgUrl={props.imgUrl} onRender={onRender} id="my-canvas" />
    <br/><button className="back-button" onClick={props.handleBack}> Back </button>
  </div>
);