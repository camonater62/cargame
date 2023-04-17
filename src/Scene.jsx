import {
    Environment,
    OrbitControls,
    PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import { Track } from "./Track";
import { Ground } from "./Ground";
import { Car } from "./Car";

export function Scene() {
    const [thirdPerson, setThirdPerson] = useState(false);
    const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);

    useEffect(() => {
        function keydownHandler(e) {
            if (e.key === "t") {
                if (thirdPerson) {
                    setCameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01]);
                } 
                setThirdPerson(!thirdPerson);
            }
        }

        window.addEventListener("keydown", keydownHandler);
        return () => window.removeEventListener("keydown", keydownHandler);
    }, [thirdPerson]);

    return (
        <Suspense fallback={null}>
            <Environment
                files={process.env.PUBLIC_URL + "/textures/envmap.hdr"}
                background={"both"}
            />
            <PerspectiveCamera
                makeDefault
                position={[-6, 3.9, 6.21]}
                fov={40}
            />
            {!thirdPerson && <OrbitControls target={[-2.64, -0.71, 0.03]} />}
            <Track />
            <Ground />
            <Car thirdPerson={thirdPerson}/>
        </Suspense>
    );
}
