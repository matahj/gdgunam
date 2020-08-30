import React, { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';

const Box = ({ position, color }) => {

    let [expand, setExpand] = useState(false);

    let refBox = useRef(); //para no rerenderizar Box
    useFrame(() => {
        refBox.current.rotation.x = refBox.current.rotation.y += 0.02;
    });  //Hook de animación, equivalente a ciclo de animate

    const handleClick = () => {
        setExpand(!expand);
        // refBox.current.scale.y = expand ? 2 : 1;
    }

    return (
        //Se quitá rotation={[1, 0, 0]} de mesh
        <mesh ref={refBox} scale={expand ? [1,2,1]:[1,1,1]} position={position} onClick={handleClick} >
            <boxGeometry attach='geometry' args={[1, 1, 1]} />
            <meshStandardMaterial attach='material' color={color} />
        </mesh>
    );

}

export default Box;