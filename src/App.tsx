import React, {
  Dispatch,
  FC,
  SetStateAction,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { Canvas } from "@react-three/fiber";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import Ground from "./Ground";
import Auto from "./Car";
import Rings from "./Rings";
import { Boxes } from "./Boxes";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import FloatingGrid from "./FloatingGrid";
import { AUTO } from "./enum/enum";
import ModalWindow from "./ModalWindow";
import { Vector2 } from "three";

const Car: FC<{
  carOption: AUTO;
  setSelectedDetail: Dispatch<SetStateAction<any>>;
}> = ({ carOption, setSelectedDetail }) => {
  const camera = useRef<typeof PerspectiveCamera>();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (!camera.current) return;
    setIsLoaded(true);
  }, [camera.current]);
  return (
    <>
      <OrbitControls
        minDistance={3}
        maxDistance={7}
        target={[0, 0.35, 0]}
        maxPolarAngle={1.45}
      />
      <PerspectiveCamera
        ref={camera}
        makeDefault
        position={[3, 2, 5]}
        fov={50}
      />

      <color args={[0, 0, 0]} attach="background" />
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

      <Ground />
      {isLoaded && (
        <CubeCamera resolution={256} frames={Infinity}>
          {(texture) => (
            <>
              <Environment map={texture} />
              <Auto
                setSelectedDetail={setSelectedDetail}
                camera={camera.current}
                carOption={carOption}
              />
            </>
          )}
        </CubeCamera>
      )}

      <Rings />

      <Boxes />

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
          offset={new Vector2(0.0005, 0.0012)}
          radialModulation={false}
          modulationOffset={1}
        />
      </EffectComposer>

      <FloatingGrid />
    </>
  );
};

const App = () => {
  const [carOption, setCarOption] = useState<AUTO>(AUTO.BLACK_CORVETTE);
  const [selectedDetail, setSelectedDetail] = useState<any>("");
  const [warning, setWarning] = useState(false);
  const [mobile, setMobile] = useState(window.outerWidth < 720);
  const handleCarOption = (carOption: AUTO) => {
    setCarOption(carOption);
  };
    useEffect(() => {
        alert("It takes some time to load model. It can lag sometimes, but just because of high quality model")

    }, []);
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <Car carOption={carOption} setSelectedDetail={setSelectedDetail} />
      </Canvas>
      <div className={"btns"}>
        <button
          className={"btn gradient-box"}
          onClick={() => {
            setSelectedDetail(null)
            handleCarOption(AUTO.BLACK_CORVETTE);
          }}
        >
          Black Corvette
        </button>
        <button className={"btn"} onClick={() => setWarning(true)}>
          Blue Corvette
        </button>
      </div>
      {!warning && selectedDetail && (
        <ModalWindow selectedDetail={selectedDetail} />
      )}
      {warning && (
        <div className={"warning"}>
          <div className={"warning__content"}>
            <div style={{ fontSize: "26px" }}>Are you sure?</div>
            <div>Blue corvette has 10 time more polygons than black</div>
            <div className={"warning__content__btns"}>
              <button className={"btn"} onClick={() => setWarning(false)}>
                No
              </button>
              <button
                className="btn"
                onClick={() => {
                  setWarning(false);
                  setSelectedDetail(null)
                  setCarOption(AUTO.BLUE_CORVETTE);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {mobile && (
        <div className={"warning"}>
          <div className={"warning__content"} style={{ gap: "40px" }}>
            <div style={{ fontSize: "48px" }}>You should use desktop</div>
            <div style={{ fontSize: "32px" }}>
              Some functional not available on phones
            </div>
            <div>
              <button
                style={{ fontSize: "32px" }}
                className="btn"
                onClick={() => setMobile(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default App;
