import React, { Suspense } from 'react';
import {Canvas, useLoader} from 'react-three-fiber';
import Box from './Box';
import Boxdrei from './Boxdrei';
import Floor from './Floor';
import { OrbitControls } from 'drei';

/////////////////////////////
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import gltfModel from '../PS-Controller-classic.glb';

const Model = () => {
    let gltf = useLoader(GLTFLoader, gltfModel);
    return <primitive scale={[0.5, 0.5, 0.5]} object={gltf.scene} />
}
/////////////////////////////

const Ej1 = () => {
    return(
        <div className="canvas">
            <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position={[10,10,10]} />
                {/* <mesh rotation={[1,0,0]} >
                    <boxGeometry attach='geometry' args={[1,1,1]} />
                    <meshStandardMaterial attach='material' color='red' />
                </mesh> */}

                <Box position={[-2,3,0]} color='red' />
                <Box position={[2,2,0]} color='#ffaa00' />

                <Boxdrei position={[-2,-3,0]} color='red' />
                <Boxdrei position={[2,-2,0]} color='#ffaa00' />

                <Floor />

                <Suspense fallback='Loading...'>
                    <Model />
                </Suspense>

                <OrbitControls />
            </Canvas>
        </div>
    );
}

export default Ej1;
