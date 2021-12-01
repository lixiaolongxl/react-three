// import React from 'react';
import ReactDOM from 'react-dom';
import React, { useRef, useState ,useEffect} from 'react'
import { Canvas, useFrame,useThree } from '@react-three/fiber'
import './index.css';

import reportWebVitals from './reportWebVitals';
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
  useFrame((state, delta) => (ref.current.rotation.x += 0.01))
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
  <Canvas>
  <ambientLight intensity={0.1}/>
  <pointLight position={[10, 10, 10]} />
  <directionalLight color="red" position={[0, 0, 5]} />
  <Box position={[-1.2, 0, 0]} />


  <mesh
  onClick={(e) => {
    e.stopPropagation();console.log('click',e);
  }}
  onContextMenu={(e) => console.log('context menu')}
  onDoubleClick={(e) => console.log('double click')}
  onWheel={(e) => console.log('wheel spins')}
  onPointerUp={(e) => console.log('up')}
  onPointerDown={(e) => console.log('down')}
  onPointerOver={(e) => console.log('over')}
  onPointerOut={(e) => console.log('out')}
  onPointerEnter={(e) => console.log('enter')} // see note 1
  onPointerLeave={(e) => console.log('leave')} // see note 1
  onPointerMove={(e) => console.log('move')}
  onPointerMissed={() => console.log('missed')}
  onUpdate={(self) => console.log('props have been updated')}
  visible userData={{ hello: 'world' }} position={[1, 2, 3]} rotation={[Math.PI / 2, 0, 0]}>
    <sphereGeometry args={[1, 5, 6]} />
    <meshStandardMaterial color="hotpink" transparent />
  </mesh>
  {/* <Box position={[1.2, 0, 0]} /> */}
</Canvas>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
