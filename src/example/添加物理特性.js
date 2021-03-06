// import React from 'react';
import ReactDOM from 'react-dom';
import React, { useRef, useState ,useEffect,Suspense} from 'react'
import { Canvas, useFrame,useThree,extend,useLoader } from '@react-three/fiber'
import './index.css';
import * as THREE from 'three'
import reportWebVitals from './reportWebVitals';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {DragControls} from 'three/examples/jsm/controls/DragControls'

import { Physics,useBox } from '@react-three/cannon'
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
const BackGround = (props)=>{
  const {gl} = useThree()
  const texture = useLoader( THREE.TextureLoader,'/sky.jpeg');
  const formatted = new THREE.WebGLCubeRenderTarget(
    texture.image.height
    ).fromEquirectangularTexture(gl,texture)
    // formatted 可以使用useMemo
  return (
    <primitive attach="background" object={texture}/>
  )
}
//拖拽
const Dragable = (props)=>{
  const {gl,camera,scene} = useThree()
  const [children,setChildren] = useState([])
  const groupRef = useRef()
  const controlsRef = useRef()
  useEffect(()=>{
    setChildren(groupRef.current.children)
  },[])
  useEffect(()=>{
    controlsRef.current.addEventListener('hoveron',e=>{
      scene.orbitControls.enabled = false;
    })
    controlsRef.current.addEventListener('hoveroff',e=>{
      scene.orbitControls.enabled = true;
    })
    controlsRef.current.addEventListener('dragstart',e=>{
      e.object.api.mass.set(0); //表示受重力影响
    })
    controlsRef.current.addEventListener('dragend',e=>{
      e.object.api.mass.set(1); //表示不受重力影响
    })
    controlsRef.current.addEventListener('drag',e=>{
      e.object.api.position.copy(e.object.position)
      e.object.api.velocity.set(0,0,0);
    })
    // dragend dragend
  },[children])
  return (
    <group ref={groupRef}>
      <dragControls ref={controlsRef} args={[children,camera,gl.domElement]}/>
      {props.children}
    </group>
  )
}
const hadleClick = e =>{
  window.activeMesh.material.color = new THREE.Color(e.target.style.background);
}
ReactDOM.render(
  <div style={{width: '100%', height: '100vh'}}>
    <div className="text">
      <div onClick={hadleClick} style={{background:'red',left:'100px'}}>red</div>
      <div onClick={hadleClick} style={{background:'green',left:'160px'}}>green</div>
      <div onClick={hadleClick} style={{background:'yellow',left:'220px'}}>yellow</div>
    </div>
    <Canvas 
      shadows  
      style={{backgroundColor: 'black'}} 
      camera={{position:[8,8,8]}}>
      <Orbit/>
      <ambientLight intensity={0.2}/>
      <axesHelper args={[5]}/>
      {/*  */}
      <Physics>
        <Dragable>
          <Suspense fallback={null}>
            <Box position={[-4, 1, 0]} />
          </Suspense>
          <Suspense fallback={null}>
            <Box position={[4, 1, 0]} />
          </Suspense>
          
        </Dragable>
        {/*  */}
        <Suspense fallback={null}>
          <BackGround  />
        </Suspense>
        {/* 地面 */}
        <Floor position={[0,-1,0]}/>
      </Physics>
      
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
