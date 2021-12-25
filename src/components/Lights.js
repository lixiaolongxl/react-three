
import * as THREE from 'three'
//灯
const Lamp = (props)=>{
    return (
      <mesh {...props}>
        <pointLight 
          shadow-mapSize-height={2**10}
          shadow-mapSize-width={2**10}
          shadow-radius={10}
          castShadow/>
  
        {/* 平型光 */}
        {/* <directionalLight castShadow color="red" /> */}
        <sphereGeometry  args={[0.2,20,20]}/>
        <meshPhongMaterial emissive='yellow' side={THREE.DoubleSide}/>
      </mesh>
    )
  }
const Lights = ()=>{
    return (
        <>
            <directionalLight  
        position={[6,3,0]}
        intensity={2}
        shadow-mapSize-height={2**10}
        shadow-mapSize-width={2**10}
        shadow-radius={10}
        castShadow
      />
        {/* 灯 */}
        <Lamp position={[0, 3, 0]}/>
        <Lamp position={[6, 3, 0]}/>
        <Lamp position={[-6, 3, 0]}/>
        <ambientLight intensity={0.2}/>
        </>
    );
}
export default Lights;