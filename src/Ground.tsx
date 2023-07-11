import React, {useEffect} from 'react';
import {MeshReflectorMaterial} from "@react-three/drei";
import {useFrame, useLoader} from "@react-three/fiber";
import {RepeatWrapping, TextureLoader} from "three";

const Ground = () => {
    const [roughness, normal] = useLoader(TextureLoader, [
        process.env.PUBLIC_URL + '/terrain-textures/terrain-roughness.jpg',
        process.env.PUBLIC_URL + '/terrain-textures/terrain-normal.jpg'
    ])

    useEffect(() => {
        [roughness, normal].forEach(texture => {
            texture.wrapS = RepeatWrapping
            texture.wrapT = RepeatWrapping
            texture.repeat.set(5, 5)
        });

        normal.encoding = 3000
    }, [roughness, normal])

    useFrame((state, delta) => {
        let t = -state.clock.getElapsedTime() * 0.128;
        roughness.offset.set(0, t);
        normal.offset.set(0, t);
    })

    return (
        <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
            <planeGeometry args={[30, 30]}/>
            <MeshReflectorMaterial
                mirror={0}
                envMapIntensity={0}
                normalMap={normal}
                // normalScale={[0.15, 0.15]}
                roughnessMap={roughness}
                dithering={true}
                color={[0.015, 0.015, 0.015]}
                roughness={0.7}
                blur={[1000, 400]}
                mixBlur={30}
                mixStrength={80}
                mixContrast={1}
                resolution={1024}
                depthScale={0.01}
                minDepthThreshold={0.9}
                maxDepthThreshold={1}
                depthToBlurRatioBias={0.25}
                reflectorOffset={0.2}
            />
        </mesh>
    );
};

export default Ground;