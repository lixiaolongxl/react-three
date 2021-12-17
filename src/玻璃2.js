// import React from 'react';
import ReactDOM from 'react-dom';
import React, { useRef, useState ,useEffect} from 'react'
import { Canvas, useFrame,useThree,extend } from '@react-three/fiber'
import './index.css';
import * as THREE from 'three'
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
    ref.current.rotation.y += 0.01
  })
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      castShadow
      receiveShadow
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[2, 2, 2]} />
      {/* <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} /> */}
      
      {/* meshStandardMaterial */}
      {/* meshPhysicalMaterial  */}
      {/*  */}
      <meshPhysicalMaterial  
        color="white" 
        transparent
        // opacity={0.5}
        fog={false}
        // wireframe
        roughness={1}
        // metalness={1} //材料的金属性对光的一面才显示颜色
        // side={THREE.DoubleSide}
        reflectivity={0.5} //反射率
        roughness={1}  //材质的粗糙程度。0.0表示平滑的镜面反射，1.0表示完全漫反射。默认值为1.0。如果还提供
        clearcoat={1} //玻璃材质
        transmission={0.5} //透射度（或光学透明度），0.0至1.0。默认为0.0。即使它们完全透射，薄，透明或半透明，塑料或玻璃材料也很大程度上是反射的。传动特性可用于模拟这些材料。当传输非零时，不透明度应设置为1。
      />
    </mesh>
  )
}
const Floor = (props)=>{
  return (
    <mesh {...props} receiveShadow >
      <boxGeometry  args={[20, 0.1, 20]} />
      <meshPhongMaterial side={THREE.DoubleSide}/>
    </mesh>
  )
}
// 灯
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
ReactDOM.render(
  <div style={{width: '100%', height: '100vh'}}>
    <Canvas 
      shadows  
      style={{backgroundColor: 'black'}} 
      camera={{position:[8,8,8]}}>
      <Orbit/>
      <ambientLight intensity={0.2}/>
      
      <fog attach='fog' args={['white',1,20]}/>
      <axesHelper args={[5]}/>
      {/*  */}
      <Box position={[0, 1, 0]} />
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
