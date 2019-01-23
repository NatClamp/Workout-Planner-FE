import { View as GraphicsView } from 'expo-graphics';
import ExpoTHREE, { THREE } from 'expo-three';
import React, {Fragment} from 'react';
import {Text, Button} from 'react-native'
import 'three';
import 'prop-types';


export default class Model extends React.Component {
  componentWillMount() {
    THREE.suppressExpoWarnings();
  }

  render() {
    return (
      <><GraphicsView
        onContextCreate={this.onContextCreate}
        onRender={this.onRender}
      /><Button title='Spin' onPress={this.handleRotate}></Button></>
    );
  }

  onContextCreate = async ({
    gl,
    canvas,
    width,
    height,
    scale: pixelRatio,
  }) => {
    // Change height or width below, eg ({ gl, pixelRatio, width:175, height: 300 })
    this.renderer = new ExpoTHREE.Renderer({ gl, pixelRatio, width, height });
    this.renderer.setClearColor(0xffffff)

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    this.camera.lookAt(new THREE.Vector3(0, 95, 0))



    this.baseColor = new THREE.Color('#98FB98')
    this.cameraRotation()
    this.loadModel()
    this.establishLighting()
  };
  handleRotate = () => {
    this.angleValue += 180
    this.desiredAngle = this.angleValue * Math.PI/180

  }
  cameraRotation = () => {
    this.angleValue = 90
    this.cameraAngle = 0
    this.orbitRange = 125
    this.camera.position.set(this.orbitRange, 120, 0) 
    this.orbitSpeed = 2*Math.PI/180
    this.desiredAngle = this.angleValue * Math.PI/180
  }

  establishLighting = () => {
    const backLight = new THREE.DirectionalLight(0xffffff, 0.2)
    backLight.position.set(100,0,-100).normalize()
    this.scene.add(backLight)
    const rightLight = new THREE.DirectionalLight(0xffffff, 0.7)
    rightLight.position.set(-100,100,-0).normalize()
    this.scene.add(rightLight)
    const FrontLight = new THREE.DirectionalLight(0xffffff, 0.5)
    FrontLight.position.set(100,0,100).normalize()
    this.scene.add(FrontLight)
    this.scene.add(new THREE.AmbientLight(0x404040));
    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(3, 3, 3);
    this.scene.add(light);
  }
  onRender = delta => {
    if (this.cameraAngle >= this.desiredAngle){this.orbitSpeed=0}
    else {this.orbitSpeed = 4*Math.PI/180
      this.cameraAngle += this.orbitSpeed;
    this.camera.position.x = Math.cos(this.cameraAngle) * this.orbitRange;
    this.camera.position.z = Math.sin(this.cameraAngle) * this.orbitRange;
    this.camera.lookAt(new THREE.Vector3(0, 90, 0))}
    // requestAnimationFrame( animate );
    this.renderer.render(this.scene, this.camera);
  };
  loadModel = () => {
    this.loadBase();
    this.loadGlutes()
    this.loadAbs()
    this.loadBiceps()
    this.loadCalves()
    this.loadChest()
    this.loadForearms()
    this.loadHamstrings()
    this.loadLowerback()
    this.loadMidback()
    this.loadQuads()
    this.loadShoulders()
    this.loadSideAbs()
    this.loadTriceps()
    this.loadUpperback()
  };
  loadBase = async () => {
    const base = await loadAsync(require('./models/fe_base.obj'))
    this.scene.add(base);
    this.base = base;
  };
  loadAbs = async () => {
    const abs = await loadAsync(require('./models/fe_abs.obj'))
    this.scene.add(abs);
    this.abs = abs;
    this.abs.children[0].material.color = this.baseColor
  };
  loadGlutes = async () => {
    const glutes = await loadAsync(require('./models/fe_glutes.obj'))
    this.scene.add(glutes);
    this.glutes = glutes;
    this.glutes.children[0].material.color = this.baseColor
  };
  loadBiceps = async () => {
    const biceps = await loadAsync(require('./models/fe_biceps.obj'))
    this.scene.add(biceps);
    this.biceps = biceps;
    this.biceps.children[0].material.color = this.baseColor
    this.biceps.children[1].material.color = this.baseColor

  };
  loadCalves = async () => {
    const calves = await loadAsync(require('./models/fe_calves.obj'))
    this.scene.add(calves);
    this.calves = calves;
    this.calves.children[0].material.color = this.baseColor
    this.calves.children[1].material.color = this.baseColor
  };
  loadChest = async () => {
    const chest = await loadAsync(require('./models/fe_chest.obj'))
    this.scene.add(chest);
    this.chest = chest;
    this.chest.children[0].material.color = this.baseColor
  };
  loadForearms = async () => {
    const forearms = await loadAsync(require('./models/fe_forearms.obj'))
    this.scene.add(forearms);
    this.forearms = forearms;
    this.forearms.children[0].material.color = this.baseColor
    this.forearms.children[1].material.color = this.baseColor
  };
  loadHamstrings = async () => {
    const hamstrings = await loadAsync(require('./models/fe_hamstrings.obj'))
    this.scene.add(hamstrings);
    this.hamstrings = hamstrings;
    this.hamstrings.children[0].material.color = this.baseColor
    this.hamstrings.children[1].material.color = this.baseColor
  };
  loadLowerback = async () => {
    const lowerback = await loadAsync(require('./models/fe_lowerback.obj'))
    this.scene.add(lowerback);
    this.lowerback = lowerback;
    this.lowerback.children[0].material.color = this.baseColor
  };
  loadMidback = async () => {
    const midback = await loadAsync(require('./models/fe_midback.obj'))
    this.scene.add(midback);
    this.midback = midback;
    this.midback.children[0].material.color = this.baseColor
  };
  loadQuads = async () => {
    const quads = await loadAsync(require('./models/fe_quads.obj'))
    this.scene.add(quads);
    this.quads = quads;
    this.quads.children[0].material.color = this.baseColor
    this.quads.children[1].material.color = this.baseColor

  };
  loadShoulders = async () => {
    const shoulders = await loadAsync(require('./models/fe_shoulders.obj'))
    this.scene.add(shoulders);
    this.shoulders = shoulders;
    this.shoulders.children[0].material.color = this.baseColor
    this.shoulders.children[1].material.color = this.baseColor
  };
  loadSideAbs = async () => {
    const sideabs = await loadAsync(require('./models/fe_sideabs.obj'))
    this.scene.add(sideabs);
    this.sideabs = sideabs;
    this.sideabs.children[0].material.color = this.baseColor
    this.sideabs.children[1].material.color = this.baseColor

  };
  loadTriceps = async () => {
    const triceps = await loadAsync(require('./models/fe_triceps.obj'))
    this.scene.add(triceps);
    this.triceps = triceps;
    this.triceps.children[0].material.color = this.baseColor
    this.triceps.children[1].material.color = this.baseColor
  };
  loadUpperback = async () => {
    const upperback = await loadAsync(require('./models/fe_upperback.obj'))
    this.scene.add(upperback);
    this.upperback = upperback;
    this.upperback.children[0].material.color = this.baseColor
  };
}