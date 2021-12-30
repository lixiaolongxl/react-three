// import React from 'react';
import ReactDOM from 'react-dom';
import React, { Suspense} from 'react'
import { Canvas,useThree,extend,useLoader } from '@react-three/fiber'
import './index.css';
import * as THREE from 'three'
import reportWebVitals from './reportWebVitals';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {DragControls} from 'three/examples/jsm/controls/DragControls'
import Cars from './components/Cars'
import CameraControls from './components/CameraControls'
import Buttons  from './components/Buttons'
import { Physics,useBox } from '@react-three/cannon'
import state from './state'
extend({OrbitControls})
extend({DragControls})
// 控制
const Orbit = ()=>{
  const {camera,gl} = useThree()
  return (
    <orbitControls attach='orbitControls' args={[camera,gl.domElement]}/>
  )
}
//正方体
function Box(props) {
  // const {gl,camera,scene} = useThree()
  // useEffect(()=>{
  //   console.log(gl,camera,scene);
    
  // },[])
  
  const [ref, api] = useBox(() => ({ ...props,mass: 1 }))
  // const ref = useRef()
  
  const texture = useLoader(
    THREE.TextureLoader,
    '/wood.jpeg');
  
  return (
    <mesh
      castShadow
      onClick={(e) => {
        window.activeMesh = e.object;
      }}
      {...props}
      api={api}
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
  const [ref, api] = useBox(() => ({args:[20, 0.1, 20] ,...props}))
  return (
    <mesh ref={ref} {...props} receiveShadow >
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
const Background = (props)=>{
  const {gl} = useThree()
  const texture = useLoader( THREE.TextureLoader,'/sky1.jpeg');
  // console.log(texture.image.height);
  
  const formatted = new THREE.WebGLCubeRenderTarget(
    texture.image.height
    ).fromEquirectangularTexture(gl,texture)
    // formatted 可以使用useMemo
    // console.log(formatted);
    
  return (
    <primitive attach="background" object={formatted}  />
  )
}

const hadleClick = e =>{
  state.activeMesh.material.color = new THREE.Color(e.target.style.background);
}
ReactDOM.render(
  <div style={{width: '100%', height: '100vh'}}>
    <div className="text">
      <div onClick={hadleClick} style={{background:'red',left:'100px'}}></div>
      <div onClick={hadleClick} style={{background:'green',left:'160px'}}></div>
      <div onClick={hadleClick} style={{background:'blue',left:'220px'}}></div>
    </div>
    <Buttons></Buttons>
    <Canvas 
      shadows  
      style={{backgroundColor: 'black'}} 
      camera={{position:[8,8,8]}}>
        <CameraControls/>
      <Orbit/>
      <ambientLight intensity={0.2}/>
      <axesHelper args={[5]}/>
      {/* 背景 */}
      <Suspense fallback={null}>
        <Background  />
      </Suspense>
      {/*  */}
      <Physics>
        <Cars/>
        {/* 地面 */}
        <Floor position={[0,-1,0]}/>
      </Physics>
      {/* 灯 */}
      <Lamp position={[0, 3, 0]}/>
      <Lamp position={[6, 3, 0]}/>
      <Lamp position={[-6, 3, 0]}/>
  </Canvas>
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
