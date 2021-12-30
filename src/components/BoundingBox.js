import { useLoader } from '@react-three/fiber'
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { Physics,useBox } from '@react-three/cannon'
const BoundingBox = ({
    position=[0,0,0],
    offset=[0,0,0],
    dims=[1,1,1],
    visible=false,
    children
})=>{
    const [ref, api] = useBox(() => ({ args:dims,mass: 1,position: position}))
    return (
        <group ref={ref} api={api}>
            <mesh scale={dims} visible={visible}>
                <boxGeometry />
                <meshPhysicalMaterial wireframe/>
            </mesh>
            <group position={offset}>
                {children}
            </group>
        </group>
        
    )
}
export default BoundingBox;