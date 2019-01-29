import { View as GraphicsView } from 'expo-graphics';
import ExpoTHREE, { THREE } from 'expo-three';
import React, {Fragment} from 'react';
import {Text, TouchableOpacity, AsyncStorage} from 'react-native'
import { Icon } from 'react-native-elements'
import 'three';
import 'prop-types';

// TAKES PROPS IN THIS FORMAT
// muscleVals={{abdominals: 0, biceps: 0, calves: 0, chest: 0, forearms: 1, glutes: 0, hamstrings: 7, lowerback: 0, midback: 0, quadriceps: 3, shoulders: 0, obliques: 10, triceps: 4, upperback: 0}}


export default class Model extends React.Component {
  componentDidUpdate(prevProps){
    if (this.props.muscleVals !== prevProps.muscleVals){
      this.recolourMuscles()
    }

  }
  assignUser = async () => {
		const user = await AsyncStorage.getItem('userAccount')
		const loggedInUser = JSON.parse(user)
		this.setState({loggedInUser: loggedInUser, gender: loggedInUser.isFemale ? 'female': 'male'}, ()=>{
      this.loadModel(this.state.gender)

    })
	}
  componentWillMount() {
  THREE.suppressExpoWarnings();
  this.assignUser()


	this.colorValues = {
		0 : new THREE.Color('#66D60A'),
		1 : new THREE.Color('#66D60A'),
		2 : new THREE.Color('#EDE902'),
		3 : new THREE.Color('#EDE902'),
		4 : new THREE.Color('#F48516'),
		5 : new THREE.Color('#F48516'),
		6 : new THREE.Color('#F48516'),
		7 : new THREE.Color('#D12121'),
		8 : new THREE.Color('#D12121'),
		9 : new THREE.Color('#532424'),
		10 : new THREE.Color('#532424')
  }}


  render() {
    return (
		
      <><GraphicsView
        onContextCreate={this.onContextCreate}
        onRender={this.onRender}
      /><TouchableOpacity style={{position: 'absolute', top: 10, left: 10}}  title='Spin' onPress={this.handleRotate}><Icon name='3d-rotation'/></TouchableOpacity></>
    );
  }

  onContextCreate = async ({
    gl,
    canvas,
    width,
    height,
    scale: pixelRatio,
  }) => {
    this.renderer = new ExpoTHREE.Renderer({ gl, pixelRatio, width, height });
    this.renderer.setClearColor(0xffffff)

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, width / height, 10, 1000);

    this.camera.lookAt(new THREE.Vector3(0, 100, 0))
    this.baseColor = this.colorValues[0]

    this.cameraRotation()
    this.establishLighting()
  };

  recolourMuscles = () => {
	if (this.props.muscleVals){
	muscleVals = this.props.muscleVals}
	else muscleVals = {abdominals: 0, biceps: 0, calves: 0, chest: 0, forearms: 0, glutes: 0, hamstrings: 0, lowerback: 0, midback: 0, quadriceps: 0, shoulders: 0, obliques: 0, triceps: 0, upperback: 0}
	const muscles = Object.keys(muscleVals)
	muscles.forEach((part)=>{
		if (this[part]){
			this[part].traverse((obj)=>{
				if (obj instanceof THREE.Mesh){
					obj.material.color = this.colorValues[muscleVals[part]]
				}
			})
		}
	})
  }
  handleRotate = () => {
    this.angleValue += 180
    this.desiredAngle = this.angleValue * Math.PI/180

  }
  cameraRotation = () => {
    this.angleValue = 270
    this.cameraAngle = 0
    this.orbitRange = 125
    this.camera.position.set(this.orbitRange, 120, 0) 
    this.orbitSpeed = 2*Math.PI/180
    this.desiredAngle = this.angleValue * Math.PI/180
  }
  establishLighting = () => {
    const backLight = new THREE.DirectionalLight(0xffffff, 0.5)
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
    this.camera.lookAt(new THREE.Vector3(0, 96, 0))}
    this.renderer.render(this.scene, this.camera);
  };
  loadModel = (gender) => {
    this.loadGlutes(gender)
    this.loadAbs(gender)
    this.loadBiceps(gender)
    this.loadCalves(gender)
    this.loadChest(gender)
    this.loadForearms(gender)
    this.loadHamstrings(gender)
    this.loadLowerback(gender)
    this.loadMidback(gender)
    this.loadQuads(gender)
    this.loadShoulders(gender)
    this.loadSideAbs(gender)
    this.loadTriceps(gender)
	this.loadUpperback(gender)
	this.loadBase(gender);
  };
  loadBase = async (gender) => {
    if (gender === 'female'){
      const base = await loadAsync(require(`./models/fe_base.obj`))
      this.scene.add(base);
      this.base = base;}
    else {
      const base = await loadAsync(require(`./models/male_base.obj`))
      this.scene.add(base);
	    this.base = base;
    }
  };
  loadAbs = async (gender) => {
    if (gender === 'female'){
      const abdominals = await loadAsync(require(`./models/fe_abs.obj`))
      this.scene.add(abdominals);
      this.abdominals = abdominals;
      this.abdominals.children[0].material.color = this.baseColor
    }
    else {
      const abdominals = await loadAsync(require(`./models/male_abs.obj`))
      this.scene.add(abdominals);
      this.abdominals = abdominals;
      this.abdominals.children[0].material.color = this.baseColor
    }
  };
  loadGlutes = async (gender) => {
    if (gender === 'female'){
      const glutes = await loadAsync(require(`./models/fe_glutes.obj`))
      this.scene.add(glutes);
      this.glutes = glutes;
      this.glutes.children[0].material.color = this.baseColor
    }
    else {
      const glutes = await loadAsync(require(`./models/male_glutes.obj`))
      this.scene.add(glutes);
      this.glutes = glutes;
      this.glutes.children[0].material.color = this.baseColor
    }
  };
  loadBiceps = async (gender) => {
    if (gender === 'female'){
      const biceps = await loadAsync(require(`./models/fe_biceps.obj`))
      this.scene.add(biceps);
      this.biceps = biceps;
      this.biceps.children[0].material.color = this.baseColor
      this.biceps.children[1].material.color = this.baseColor

    }
    else {
      const biceps = await loadAsync(require(`./models/male_biceps.obj`))
      this.scene.add(biceps);
      this.biceps = biceps;
      this.biceps.children[0].material.color = this.baseColor
      this.biceps.children[1].material.color = this.baseColor
    }
  };
  loadCalves = async (gender) => {
    if (gender === 'female'){
      const calves = await loadAsync(require(`./models/fe_calves.obj`))
      this.scene.add(calves);
      this.calves = calves;
      this.calves.children[0].material.color = this.baseColor
      this.calves.children[1].material.color = this.baseColor

    }
    else {
      const calves = await loadAsync(require(`./models/male_calves.obj`))
      this.scene.add(calves);
      this.calves = calves;
      this.calves.children[0].material.color = this.baseColor
      this.calves.children[1].material.color = this.baseColor
    }
  };
  loadChest = async (gender) => {
    if (gender === 'female'){
      const chest = await loadAsync(require(`./models/fe_chest.obj`))
      this.scene.add(chest);
      this.chest = chest;
      this.chest.children[0].material.color = this.baseColor

    }
    else {
      const chest = await loadAsync(require(`./models/male_chest.obj`))
      this.scene.add(chest);
      this.chest = chest;
      this.chest.children[0].material.color = this.baseColor
    }
  };
  loadForearms = async (gender) => {
    if (gender === 'female'){
      const forearms = await loadAsync(require(`./models/fe_forearms.obj`))
      this.scene.add(forearms);
      this.forearms = forearms;
      this.forearms.children[0].material.color = this.baseColor
      this.forearms.children[1].material.color = this.baseColor
    }
    else {
      const forearms = await loadAsync(require(`./models/male_forearms.obj`))
      this.scene.add(forearms);
      this.forearms = forearms;
      this.forearms.children[0].material.color = this.baseColor
      this.forearms.children[1].material.color = this.baseColor
    }
  };

  loadHamstrings = async (gender) => {
    if (gender === 'female'){
      const hamstrings = await loadAsync(require(`./models/fe_hamstrings.obj`))
      this.scene.add(hamstrings);
      this.hamstrings = hamstrings;
      this.hamstrings.children[0].material.color = this.baseColor
      this.hamstrings.children[1].material.color = this.baseColor
    }
    else {
      const hamstrings = await loadAsync(require(`./models/male_hamstrings.obj`))
      this.scene.add(hamstrings);
      this.hamstrings = hamstrings;
      this.hamstrings.children[0].material.color = this.baseColor
      this.hamstrings.children[1].material.color = this.baseColor
    }
  };
  loadLowerback = async (gender) => {
    if (gender === 'female'){
      const lowerback = await loadAsync(require(`./models/fe_lowerback.obj`))
      this.scene.add(lowerback);
      this.lowerback = lowerback;
      this.lowerback.children[0].material.color = this.baseColor
    }
    else {
      const lowerback = await loadAsync(require(`./models/male_lowerback.obj`))
      this.scene.add(lowerback);
      this.lowerback = lowerback;
      this.lowerback.children[0].material.color = this.baseColor
    }
  };
  loadMidback = async (gender) => {
    if (gender === 'female'){
      const midback = await loadAsync(require(`./models/fe_midback.obj`))
      this.scene.add(midback);
      this.midback = midback;
      this.midback.children[0].material.color = this.baseColor
    }
    else {
      const midback = await loadAsync(require(`./models/male_midback.obj`))
      this.scene.add(midback);
      this.midback = midback;
      this.midback.children[0].material.color = this.baseColor
    }
  };
  loadQuads = async (gender) => {
    if (gender === 'female'){
      const quadriceps = await loadAsync(require(`./models/fe_quads.obj`))
      this.scene.add(quadriceps);
      this.quadriceps = quadriceps;
      this.quadriceps.children[0].material.color = this.baseColor
      this.quadriceps.children[1].material.color = this.baseColor
    }
    else {
      const quadriceps = await loadAsync(require(`./models/male_quads.obj`))
      this.scene.add(quadriceps);
      this.quadriceps = quadriceps;
      this.quadriceps.children[0].material.color = this.baseColor
      this.quadriceps.children[1].material.color = this.baseColor

    }
  };
  loadShoulders = async (gender) => {
    if (gender === 'female'){
      const shoulders = await loadAsync(require(`./models/fe_shoulders.obj`))
      this.scene.add(shoulders);
      this.shoulders = shoulders;
      this.shoulders.children[0].material.color = this.baseColor
      this.shoulders.children[1].material.color = this.baseColor

    }
    else {
      const shoulders = await loadAsync(require(`./models/male_shoulders.obj`))
      this.scene.add(shoulders);
      this.shoulders = shoulders;
      this.shoulders.children[0].material.color = this.baseColor
      this.shoulders.children[1].material.color = this.baseColor
    }
  };
  loadSideAbs = async (gender) => {
    if (gender === 'female'){
      const obliques = await loadAsync(require(`./models/fe_sideabs.obj`))
      this.scene.add(obliques);
      this.obliques = obliques;
      this.obliques.children[0].material.color = this.baseColor
      this.obliques.children[1].material.color = this.baseColor



    }
    else {
      const obliques = await loadAsync(require(`./models/male_sideabs.obj`))
      this.scene.add(obliques);
      this.obliques = obliques;
      this.obliques.children[0].material.color = this.baseColor


    }
  };
  loadTriceps = async (gender) => {
    if (gender === 'female'){
      const triceps = await loadAsync(require(`./models/fe_triceps.obj`))
      this.scene.add(triceps);
      this.triceps = triceps;
      this.triceps.children[0].material.color = this.baseColor
      this.triceps.children[1].material.color = this.baseColor

    }
    else {
      const triceps = await loadAsync(require(`./models/male_triceps.obj`))
      this.scene.add(triceps);
      this.triceps = triceps;
      this.triceps.children[0].material.color = this.baseColor
      this.triceps.children[1].material.color = this.baseColor

    }
  };
  loadUpperback = async (gender) => {
    if (gender === 'female'){
      const upperback = await loadAsync(require(`./models/fe_upperback.obj`))
      this.scene.add(upperback);
      this.upperback = upperback;
      this.upperback.children[0].material.color = this.baseColor

    }
    else {
      const upperback = await loadAsync(require(`./models/male_upperback.obj`))
      this.scene.add(upperback);
      this.upperback = upperback;
      this.upperback.children[0].material.color = this.baseColor
    }
  }
}
