import { useLoader } from '@react-three/fiber'
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
const Model = props=>{
    const model = useLoader(GLTFLoader,props.path)
    // console.log(model.scene)
    return (
        <primitive object={model.scene} {...props}/>
    )
}
export default Model;