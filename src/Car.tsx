import React, {FC, useEffect, useRef, useState} from 'react';
import {useFrame, useLoader} from "@react-three/fiber";
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import {AUTO} from "./enum/enum";
import {mod} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";
import {ifError} from "assert";

const Auto: FC<{ carOption: AUTO }> = ({carOption}) => {
    const auto = useRef() as React.MutableRefObject<GLTF>;
    const [isLoaded, setIsLoaded] = useState(false);
    const [canAnimate, setCanAnimate] = useState(false);
    useEffect(() => {
      setIsLoaded(false)
    }, [carOption]);

    useEffect(() => {
        async function load() {
            let model = await new GLTFLoader().loadAsync(process.env.PUBLIC_URL + `models/${carOption}/scene.gltf`);
            return model;
        }

        load().then(r => auto.current = r).then(() => setIsLoaded(true)).then(() => console.log('car has been loaded'));
    }, [carOption])

    useEffect(() => {
        if (!isLoaded) return;
        switch (carOption) {
            case AUTO.MONSTER:
                auto.current.scene.scale.set(1, 1, 1);
                break;
            case AUTO.BLACK_CORVETTE:
                auto.current.scene.scale.set(1.5, 1.5, 1.5);
                auto.current.scene.position.set(1, 0, 0);
                break;
            case AUTO.BLUE_CORVETTE:
                auto.current.scene.scale.set(0.005, 0.005, 0.005);
        }
        auto.current.scene.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
                child.receiveShadow = true
                child.material.envMapIntensity = 20
                child.material.roughness = 0.4
            }
        });
    }, [auto.current]);

    useEffect(() => {
        isLoaded ? setCanAnimate(true) : setCanAnimate(false);
    }, [isLoaded]);

    useFrame(
        (state, delta) => {
        if (!isLoaded) return;
        let group = carOption === AUTO.MONSTER ? auto.current.scene.children[0].children[0].children[0].children[0] : auto.current.scene.children[0].children[0].children[0];
        let elapsedTime = state.clock.getElapsedTime() * 2;
        switch (carOption) {
            case AUTO.MONSTER:
                group.children[8].rotation.x = elapsedTime;
                group.children[9].rotation.x = elapsedTime;
                group.children[10].rotation.x = elapsedTime;
                group.children[11].rotation.x = elapsedTime;
                break;
            case AUTO.BLACK_CORVETTE:
                group.children[22].rotation.x = elapsedTime;
                group.children[23].rotation.x = elapsedTime;
                group.children[24].rotation.x = elapsedTime;
                group.children[25].rotation.x = elapsedTime;
                break;
            case AUTO.BLUE_CORVETTE:
                group.children[0].rotation.x = elapsedTime;
                group.children[2].rotation.x = elapsedTime;
                group.children[4].rotation.x = elapsedTime;
                group.children[6].rotation.x = elapsedTime;
                break;
        }
    } )

    return (
        <>
            {isLoaded && <primitive object={auto.current.scene}/>}
        </>
    );
};

export default Auto;