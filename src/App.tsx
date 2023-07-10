import React, {Suspense} from 'react';
import {Canvas} from "@react-three/fiber";
import {CubeCamera, Environment, OrbitControls, PerspectiveCamera} from "@react-three/drei";
import Ground from "./Ground";
import Auto from "./Car";
import Rings from "./Rings";

const Car = () => {
    return <>
        <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45}/>
        <PerspectiveCamera makeDefault position={[3, 2, 5]} fov={50}/>

        <color args={[0, 0, 0]} attach="background"/>
        <spotLight
            color={[1, 0.25, 0.7]}
            intensity={2}
            angle={0.6}
            penumbra={0.5}
            position={[5, 5, 0]}
            castShadow
            shadow-bias={-0.00001}
        />
        <spotLight
            color={[0.14, 0.5, 1]}
            intensity={1.5}
            angle={0.6}
            penumbra={0.5}
            position={[-5, 5, 0]}
            castShadow
            shadow-bias={-0.00001}
        />

        <Ground/>

        <CubeCamera resolution={256}  frames={120}>
            {(texture) => (
                <>
                    <Environment map={texture}/>
                    <Auto/>
                </>)}
        </CubeCamera>
        <Rings/>
    </>
}

const App = () => {
    return (
        <Suspense fallback={null}>
            <Canvas shadows>
                <Car/>
            </Canvas>
        </Suspense>
    );
}

export default App;