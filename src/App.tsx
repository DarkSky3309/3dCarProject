import React, {Suspense} from 'react';
import {Canvas} from "@react-three/fiber";
import {OrbitControls, PerspectiveCamera} from "@react-three/drei";

const Car = () => {
    return <>
        <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45}/>
        <PerspectiveCamera makeDefault position={[3, 2, 5]} fov={50}/>

        <color args={[0,0,0]} attach="background"/>
        <spotLight
            color={[1,0.25,0.7]}
            intensity={1.5}
            angle={0.6}
            penumbra={0.5}
            position={[5,5,0]}
            castShadow
            shadow-bias={-0.00001}
        />
        <spotLight
            color={[0.14,0.5,1]}
            intensity={2}
            angle={0.6}
            penumbra={0.5}
            position={[-5,5,0]}
            castShadow
            shadow-bias={-0.00001}
        />

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