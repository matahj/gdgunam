import React, { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import {MeshWobbleMaterial} from 'drei';
import {useSpring, a} from 'react-spring/three';

const Boxdrei = ({ position, color }) => {

    let [expand, setExpand] = useState(false);

    let refBox = useRef(); //para no rerenderizar Box
    useFrame(() => {
        refBox.current.rotation.x = refBox.current.rotation.y += 0.02;
    });  //Hook de animación, equivalente a ciclo de animate

    const props = useSpring({
        scale: expand ? [1,2,1] : [1,1,1],
    }) //Hook de animación spring

    const handleClick = () => {
        setExpand(!expand);
        // refBox.current.scale.y = expand ? 2 : 1;
    }

    return (
        //Se quita rotation={[1, 0, 0]} de mesh
        //Se quita scale={expand ? [1,2,1]:[1,1,1]}
        <a.mesh ref={refBox} scale={props.scale} position={position} onClick={handleClick} >
            <boxGeometry attach='geometry' args={[1, 1, 1]} />
            {/* <meshStandardMaterial attach='material' color={color} /> */}
            <MeshWobbleMaterial attach='material' color={color} speed={3} factor ={0.5} />
        </a.mesh>
    );

}

export default Boxdrei;