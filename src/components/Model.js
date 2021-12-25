import { useLoader } from '@react-three/fiber'
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
const Model = props=>{
    const model = useLoader(GLTFLoader,props.path)
    // console.log(model.scene)
    model.scene.traverse(child=>{
        if(child.isMesh){
            child.castShadow= true;
            child.receiveShadow = true;
            // 单个面可见
            child.material.side = THREE.FrontSide; //只渲染正面
        }
    })
    return (
        <primitive object={model.scene} {...props}/>
    )
}
export default Model;