import React, {useEffect, useRef} from 'react';
import {useFrame, useLoader} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

const Auto = () => {

    const auto = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + 'models/BlackCorvett/scene.gltf'
    );
    useEffect(() => {
        //FOR MONSTER CAR
        // auto.scene.scale.set(1, 1, 1);

        //FOR CORVETT CAR
        // auto.scene.scale.set(0.006, 0.006, 0.006);

        // FOR BLACK CORVETT CAR
        auto.scene.scale.set(1.5, 1.5, 1.5);
        auto.scene.position.set(1, 0, 0);

        auto.scene.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
                child.receiveShadow = true
                child.material.envMapIntensity = 20
                child.material.roughness = 0.4
            }
        });
    }, [auto]);

    useFrame((state, delta) => {
        let elapsedTime = state.clock.getElapsedTime() * 2;
        //FOR MONSER CAR
        // let group = auto.scene.children[0].children[0].children[0].children[0];
        // group.children[8].rotation.x = elapsedTime;
        // group.children[9].rotation.x = elapsedTime;
        // group.children[10].rotation.x = elapsedTime;
        // group.children[11].rotation.x = elapsedTime;
        //FOR CORVETT CAR
        // let group = auto.scene.children[0].children[0].children[0];
        // group.children[0].rotation.x = elapsedTime;
        // group.children[2].rotation.x = elapsedTime;
        // group.children[4].rotation.x = elapsedTime;
        // group.children[6].rotation.x = elapsedTime;
        // FOR BLACK CORVETT CAR
        let group = auto.scene.children[0].children[0].children[0];
        group.children[22].rotation.x = elapsedTime;
        group.children[23].rotation.x = elapsedTime;
        group.children[24].rotation.x = elapsedTime;
        group.children[25].rotation.x = elapsedTime;

    })


    return (
        <primitive object={auto.scene}/>
    );
};

export default Auto;