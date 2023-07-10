import React, {useRef} from 'react';
import {useFrame} from "@react-three/fiber";
import {Color} from "three";

const Rings = () => {
    const itemsRef = useRef([]) as any;

    useFrame((state) => {
        for (let i = 0; i < itemsRef.current.length; i++) {
            let mesh = itemsRef.current[i];
            let z = (i - 7) * 3.5;
            mesh.position.z = z;
            let dist = Math.abs(z);
            mesh.scale.set(1 - dist * 0.04, 1 - dist * 0.04, 1 - dist * 0.04);

            let colorScale = 1
            if (dist > 2) {
                colorScale = 1 - (Math.min(dist, 12) - 2) / 10;
            }
            colorScale *= 0.5


            if (i % 2 === 1) {
                mesh.material.emissive = new Color(6, 0.15, 0.7).multiplyScalar(colorScale)
            } else {
                mesh.material.emissive = new Color(0.1, 0.7, 3).multiplyScalar(colorScale)
            }
        }
    })

    const array = new Array(14).fill(0).map((_, i) => (
        <mesh key={i}
              ref={mesh => (itemsRef.current[i] = mesh)}
              position={[0, 0, 0]}
              castShadow
              receiveShadow>
            <torusGeometry args={[3.35, 0.05, 16, 100]}/>
            <meshStandardMaterial emissive={[0.5, 0.5, 0.5]} color={[0, 0, 0]}/>
        </mesh>
    ));
    return (
        <>
            {array}
        </>
    )
};


export default Rings;