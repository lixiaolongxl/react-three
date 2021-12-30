import { useLoader } from '@react-three/fiber'
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
const Model = props=>{
    const model = useLoader(GLTFLoader,props.path)

    if(model.animations.length>0){
        console.log(props.path,model)
    }
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