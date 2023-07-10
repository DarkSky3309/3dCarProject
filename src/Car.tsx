import React, {useEffect} from 'react';
import {useLoader} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

const Auto = () => {
        const auto = useLoader(
            GLTFLoader,
            process.env.PUBLIC_URL + 'models/car/scene.gltf'
        );
        useEffect(() => {
            auto.scene.scale.set(1, 1, 1);
            auto.scene.position.set(0, -0.035, 0);
            auto.scene.traverse(child => {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true
                    child.receiveShadow = true
                    child.material.envMapIntensity = 20
                    child.material.roughness = 0.4
                }
            });
        }, [auto]);
        return (
                <primitive object={auto.scene}/>
        );
    };

export default Auto;