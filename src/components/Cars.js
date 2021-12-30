 
 import Model from './Model'
 import BoundingBox from './BoundingBox'
 import React, { useRef, useState ,useEffect,Suspense} from 'react'
 import { useThree } from '@react-three/fiber'

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
        e.object.api?.mass.set(0); //表示受重力影响
        // console.log(e.object)
      })
      controlsRef.current.addEventListener('dragend',e=>{
        e.object.api?.mass.set(1); //表示不受重力影响
      })
      controlsRef.current.addEventListener('drag',e=>{
        e.object.api?.position.copy(e.object.position)
        e.object.api?.velocity.set(0,0,0);
      })
      // dragend dragend
    },[children])
    return (
      <group ref={groupRef}>
        <dragControls
        transformGroup={props.transformGroup}
         ref={controlsRef} args={[children,camera,gl.domElement]}/>
        {props.children}
      </group>
    )
  }
 const Cars = ({})=>{
    return (
        <Suspense fallback={null}>
          <Dragable transformGroup>
            <BoundingBox 
              // visible 
              dims={[3,2,6]}
              offset={[0,-0.4,0.8]}
              position={[4,5,0]}>
              <Model 
                scale={new Array(3).fill(0.01)}
                // position={[4,-0.5,0]}
                path={'./tesla_model_3/scene.gltf'}/>
            </BoundingBox>
            
          </Dragable>
          <Dragable transformGroup>
            <BoundingBox 
              // visible 
              dims={[3,2,7]}
              offset={[0,-0.8,0.1]}
              position={[-4,5,0]}>
              <Model 
                scale={new Array(3).fill(0.01)}
                // position={[-4,-0.8,0]}
                path={'./tesla_model_s/scene.gltf'}/>
            </BoundingBox>
            
          </Dragable>
          <Dragable transformGroup>
            <BoundingBox
             dims={[3,2,7]}
             offset={[0,-0.8,0.1]}
             position={[0,0,0]}
            >
              <Model 
                scale={new Array(3).fill(1)}
                // position={[0,0,0]}
                path={'./robot_dog__4kriggedasset/scene.gltf'}/>
            </BoundingBox>
              
          </Dragable>
              
        </Suspense>
    )
 }
 export default Cars;