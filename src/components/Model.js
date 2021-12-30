import { useLoader } from '@react-three/fiber'
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
const Model = props=>{
    const model = useLoader(GLTFLoader,props.path)
    let mixer;
    if(model.animations.length>0){
        mixer = new THREE.AnimationMixer(model.scene);
        model.animations.forEach((clip)=>{
            const action = mixer.clipAction(clip);
            action.play();
        });
        // console.log(props.path,model)
    }
    useFrame((scene,delta)=>{
        // console.log(delta);
        
        mixer?.update(delta);
    })
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