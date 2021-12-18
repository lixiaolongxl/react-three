// import React from 'react';
import ReactDOM from 'react-dom';
import React, { useRef, useState ,useEffect,Suspense} from 'react'
import { Canvas, useFrame,useThree,extend,useLoader } from '@react-three/fiber'
import './index.css';
import * as THREE from 'three'
import reportWebVitals from './reportWebVitals';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
extend({OrbitControls})
// 控制
const Orbit = ()=>{
  const {camera,gl} = useThree()
  return (
    <orbitControls args={[camera,gl.domElement]}/>
  )
}
//正方体
function Box(props) {
  // const {gl,camera,scene} = useThree()
  // useEffect(()=>{
  //   console.log(gl,camera,scene);
    
  // },[])

  const ref = useRef()
  const texture = useLoader(
    THREE.TextureLoader,
    '/wood.jpeg');
  useFrame((state, delta) => {
    ref.current.rotation.y += 0.01
    ref.current.rotation.x += 0.01
  })
  return (
    <mesh
      castShadow
      onClick={(e) => {
        window.activeMesh = e.object;
      }}
      {...props}
      ref={ref}>
      <sphereGeometry args={[1, 100, 100]} />
     
      <meshPhysicalMaterial  
        map={texture}
      />
    </mesh>
  )
}
//地面
const Floor = (props)=>{
  return (
    <mesh {...props} receiveShadow >
      <boxGeometry  args={[20, 0.1, 20]} />
      <meshPhongMaterial side={THREE.DoubleSide}/>
    </mesh>
  )
}
//灯
const Lamp = (props)=>{
  return (
    <mesh {...props}>
      <pointLight  castShadow/>

      {/* 平型光 */}
      {/* <directionalLight castShadow color="red" /> */}
      <sphereGeometry  args={[0.2,20,20]}/>
      <meshPhongMaterial emissive='yellow' side={THREE.DoubleSide}/>
    </mesh>
  )
}
//背景
const BackGround = (props)=>{
  const {gl} = useThree()
  const texture = useLoader( THREE.TextureLoader,'/sky.jpeg');
  const formatted = new THREE.WebGLCubeRenderTarget(
    texture.image.height
    ).fromEquirectangularTexture(gl,texture)
  return (
    <primitive attach="background" object={texture}/>
  )
}
ReactDOM.render(
  <div style={{width: '100%', height: '100vh'}}>
    
    <Canvas 
      shadows  
      style={{backgroundColor: 'black'}} 
      camera={{position:[8,8,8]}}>
      <Orbit/>
      <ambientLight intensity={0.2}/>
      <axesHelper args={[5]}/>
      {/*  */}
      <Suspense fallback={null}>
        <Box position={[-4, 1, 0]} />
      </Suspense>
      <Suspense fallback={null}>
        <Box position={[4, 1, 0]} />
      </Suspense>
      {/*  */}
      <Suspense fallback={null}>
        <BackGround  />
      </Suspense>
      {/* 地面 */}
      <Floor position={[0,-1,0]}/>
      {/* 灯 */}
      <Lamp position={[0, 5, 0]}/>
  </Canvas>
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
