import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from "react-three-fiber";
import {map,noise} from './PerlinNoise';

function Floor() {
    let refPlane = useRef();
    let [vertices, setVertices] = useState([]);
  
    useEffect(() => {
      generateTerrain();
    },[])
  
    let offset = 0.5;
    useFrame(() => {
      vertices.forEach((vertice,idx) => {
        let planeIndex = Math.floor((idx + offset) % vertices.length)
        refPlane.current.vertices[planeIndex].z = vertice;
      });
  
      offset += 0.5;
      refPlane.current.verticesNeedUpdate = true;
    })
  
    const generateTerrain = () => {
      let planeVertices = refPlane.current.vertices;
      let smooth = 5;
      for(let i = 0; i < planeVertices.length; i++) {
        let {x,y,z} = planeVertices[i];
        let noiseVal = map(noise(x/smooth, (z+y)/smooth), 0, 0.8, 0, 4);
        setVertices((old) => [...old, noiseVal]);
        refPlane.current.vertices[i].z = noiseVal;
      }
    }
  
    return (
      <mesh
        position={[0, 0.05, 0]}
        rotation={[(70 * Math.PI) / 180, 0, (90 * Math.PI) / 180]}
      >
        <planeGeometry ref={refPlane} attach="geometry" args={[15, 30, 100, 100]} />
        <meshBasicMaterial attach="material" color="red" wireframe />
      </mesh>
    );
  }

// const Floor = () => {
//     let refPlane = useRef();
//     let [vertices, setVertices] = useState([]);

//     useEffect( ()=>generateTerrain(), []); //Hook de react

//     const generateTerrain = () => {
//         let planeVertices = refPlane.current.vertices;

//         let smooth = 3;

//         for(let i=0; i<planeVertices.length ; i++ ){
//             let {x,y,z} = planeVertices[i];
//             let noiseVal = map( noise(x/smooth,(z+y)/smooth), 0, 0.8, 0, 4);
//             setVertices( (old) => [...old, noiseVal] );
//             refPlane.current.vertices[i].z = noiseVal;
//         }
//     }

//     return(

//         <mesh ref={refPlane} rotation={[ (70*Math.PI)/180, 0, (90*Math.PI)/180 ]} >
//             <planeGeometry attach='geometry' args={[15,30,32,32]} />
//             <meshBasicMaterial attach='material' color='red' wireframe />
//         </mesh>
//     );

// }

export default Floor;