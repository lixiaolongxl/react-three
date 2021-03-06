// import React from 'react';
import ReactDOM from 'react-dom';
import React, { useRef, useState ,useEffect} from 'react'
import { Canvas, useFrame,useThree,extend } from '@react-three/fiber'
import './index.css';

import reportWebVitals from './reportWebVitals';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
extend({OrbitControls})

const Orbit = ()=>{
  const {camera,gl} = useThree()
  return (
    <orbitControls args={[camera,gl.domElement]}/>
  )
}
function Box(props) {
  const {gl,camera,scene} = useThree()
  useEffect(()=>{
    console.log(gl,camera,scene);
    
  },[])
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    // console.log(ref.current);
    
    ref.current.rotation.x += 0.01
    ref.current.rotation.y += 0.01
  })
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

ReactDOM.render(
  <div style={{width: '100%', height: '100vh'}}>
    <Canvas style={{backgroundColor: 'black'}} camera={{position:[3,3,3]}}>
      <Orbit/>
      <ambientLight intensity={0.1}/>
      <pointLight position={[10, 10, 10]} />
      <directionalLight color="red" position={[0, 0, 5]} />
      <Box position={[-1.2, 0, 0]} />
      {/* <Box position={[1.2, 0, 0]} /> */}
      <axesHelper args={[5]}/>
      {/* <mesh position={[0,0,0]}>
        <boxGeometry/>
        <meshBasicMaterial color="red"/>
      </mesh> */}
      {/* 点材质 */}
      {/* <points>
        <boxGeometry args={[1,1,1]}></boxGeometry>
        <pointsMaterial color='0xff0000' size={0.5}></pointsMaterial>
      </points> */}
      {/* 线材质 */}
      <line>
        <boxGeometry args={[1,1,1]}></boxGeometry>
        <pointsMaterial color='0xff0000' size={0.5}></pointsMaterial>
      </line>
      {/* 面材质 */}
      
  </Canvas>
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
