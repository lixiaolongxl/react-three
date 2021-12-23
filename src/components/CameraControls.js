import { useFrame } from '@react-three/fiber'
import state from '../state';

const CameraControls = ({})=>{
    useFrame(({camera,scene})=>{

        if(state.shouldUpdate){
            camera.position.lerp(state.cameraPos,0.1);
            scene.orbitControls.target.lerp(state.target,0.1)
            // target
            scene.orbitControls.update();

            let diff = camera.position.clone().sub(state.cameraPos).length()
            console.log(diff);
            
            if(diff<0.1){
                state.shouldUpdate = false;
            }
        }
       
    })

    return null;
}
export default CameraControls;
