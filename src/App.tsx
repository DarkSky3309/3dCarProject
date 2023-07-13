import React, {Dispatch, FC, SetStateAction, Suspense, useEffect, useRef, useState} from 'react';
import * as THREE from "three";
import {Canvas} from "@react-three/fiber";
import {CubeCamera, Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Ground from "./Ground";
import Auto from "./Car";
import Rings from "./Rings";
import {Boxes} from "./Boxes";
import {Bloom, ChromaticAberration, EffectComposer} from "@react-three/postprocessing";
import {BlendFunction} from "postprocessing";
import FloatingGrid from "./FloatingGrid";
import {AUTO} from "./enum/enum";

const Car: FC<{
    carOption: AUTO,
    setSelectedDetail: Dispatch<SetStateAction<any>>
}>
    = ({carOption, setSelectedDetail}) => {
    const camera = useRef<THREE.PerspectiveCamera>();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        if (!camera.current) return;
        setIsLoaded(true)
    }, [camera.current]);
    return <>
        <OrbitControls minDistance={3} maxDistance={7} target={[0, 0.35, 0]} maxPolarAngle={1.45}/>
        <PerspectiveCamera ref={camera} makeDefault position={[3, 2, 5]} fov={50}/>

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
        {
            isLoaded &&
            <CubeCamera resolution={256} frames={Infinity}>
                {(texture) => (
                    <>
                        <Environment map={texture}/>
                        <Auto setSelectedDetail={setSelectedDetail} camera={camera.current} carOption={carOption}/>
                    </>
                )}
            </CubeCamera>
        }


        <Rings/>

        <Boxes/>

        <EffectComposer>
            <Bloom
                blendFunction={BlendFunction.ADD}
                intensity={1}
                width={300}
                height={300}
                kernelSize={5}
                luminanceThreshold={0.15}
                luminanceSmoothing={0.025}
            />
            <ChromaticAberration
                blendFunction={BlendFunction.NORMAL}
                offset={new THREE.Vector2(0.0005, 0.0012)}
                radialModulation={false}
                modulationOffset={1}
            />
        </EffectComposer>

        <FloatingGrid/>
    </>
}

const App = () => {
    const [carOption, setCarOption] = useState<AUTO>(AUTO.BLACK_CORVETTE);
    const [selectedDetail, setSelectedDetail] = useState<any>();

    const handleCarOption = (carOption: AUTO) => {
        setCarOption(carOption);
    }



    return (
        <Suspense fallback={null}>
            <Canvas shadows>
                <Car carOption={carOption} setSelectedDetail={setSelectedDetail}/>
            </Canvas>
            <div className={'btns'}>
                    <button className={'btn gradient-box'} onClick={() => handleCarOption(AUTO.BLACK_CORVETTE)}>Black Corvette</button>
                    <button className={'btn'} onClick={() => handleCarOption(AUTO.MONSTER)}>Monster</button>
                    <button className={'btn'} onClick={() => handleCarOption(AUTO.BLUE_CORVETTE)}>Blue Corvette</button>
            </div>
            {selectedDetail && <div className={'detail'}>
                <div className={'detail__content'}>
                    <div className={'detail__content__title'}>{selectedDetail}</div>
                </div>
            </div>}
        </Suspense>
    );
}

export default App;