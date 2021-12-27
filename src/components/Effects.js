import { EffectComposer, DepthOfField} from '@react-three/postprocessing'
import {useState,useEffect} from 'react'
import { useThree } from '@react-three/fiber'
import { GodRays } from '@react-three/postprocessing'
const Effects = ()=>{
    return (
    <EffectComposer>
        {/* 添加远处模糊特效 */}
        <DepthOfField 
            focusDistance={4} 
            focalLength={0.01} 
            bokehScale={0.2} 
            height={480}
        />
    </EffectComposer>
    )
}
export default Effects;