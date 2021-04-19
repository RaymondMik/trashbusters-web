import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import ReactMapGL, { Marker } from 'react-map-gl';
import styled from 'styled-components';
import firebaseInit from '../../firebase';
import { DeleteFilled  } from '@ant-design/icons';

// @ts-ignore
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoicmF5bW9uZG1payIsImEiOiJja24wZW0wZ3UwanJwMnJxdXR2ZzFidHJ2In0.__xdgFYndktBbDUgv0DJPA';

import Colors from '../../constants';

const MapContainer = styled.div`
   position: fixed;
   top: 0;
   right: 0;
   left: 0;
   bottom: 0;
`

const LegendContainer = styled.div`
   position: absolute;
   top: 20px;
   left: 20px;
   z-index: 1;
   background-color: #fff;
   font-family: 'Roboto', sans-serif;
   font-weight: bold;
   font-size: .8rem;
   border-radius: .3rem;
   box-shadow: .5rem .5rem 1rem rgba(0,0,0,0.5);
   padding: .3rem 1rem .3rem 0;
`
interface PreviewPicturesContainer {
   hasPictureAfter: boolean;
 };

const PreviewContainer = styled.div<PreviewPicturesContainer>`
   position: absolute;
   top: 0px;
   left: 0px;
   opacity: 0;
   min-width: 320px;
   background-color: #fff;
   font-family: 'Roboto', sans-serif;
   transform: ${(props) => !props.hasPictureAfter ? "translate(-100px, -450px)" : "translate(-100px, -320px)"};
   border-radius: .3rem;
   box-shadow: 10px 10px 15px rgba(0,0,0,0.5);
   overflow: hidden;
   z-index: 1;
   transition-delay: .5s;
`

const PreviewPicturesContainer = styled.div<PreviewPicturesContainer>`
   display: flex;
   position: relative;
   width: 100%;
   padding: 0;
   margin: 0;
   & img {
      width: ${(props) => !props.hasPictureAfter ? "100%" : "50%" };
   }
`

const PreviewTextContainer = styled.div`
   padding: 0 1rem 1rem;
   & h4 {
      margin: 1rem 0 .2rem 0;
      padding: 0;
   }
   & p {
      font-size: .9rem;
      margin: 0 0 .2rem 0;
   }
`

const MarkerContainer = styled.div`
   position: relative;

   &:hover ${PreviewContainer} {
      @keyframes fadeIn {
         0% {
            opacity: 0;
         }
         100% {
            opacity: 1;
         }
      }
      animation: fadeIn .3s ease-in-out;
      animation-fill-mode: forwards;
   }
`
const Legend = () => (
   <LegendContainer>
      <ul>
         <li style={{ color: Colors.red }}>Da raccogliere</li>
         <li style={{ color: Colors.darkGrey }}>In raccoglimento</li>
         <li style={{ color: Colors.green }}>Raccolto</li>
      </ul>
   </LegendContainer>
);

const Preview = ({title, description, pictureBefore, pictureAfter}: any) => (
   <PreviewContainer hasPictureAfter={!!pictureAfter}>
      <PreviewPicturesContainer hasPictureAfter={!!pictureAfter}>
         <img src={pictureBefore} />
         {pictureAfter && <img src={pictureAfter} />}
      </PreviewPicturesContainer>
      <PreviewTextContainer>
         <h4>{title}</h4>
         <p>{description}</p>
      </PreviewTextContainer>
   </PreviewContainer>
);

const App = () => {
   const [viewport, setViewport] = useState({
      latitude: 45.9401482901509, 
      longitude: 13.620115243527838,
      zoom: 13
    });

    const [locations, setLocations] = useState<any>({});
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
         // @ts-ignore
         const mario = firebaseInit.database().ref("locations")
         mario.on("value", (snapshot: any) => { 
            setLocations(snapshot.val())
         });
   }, []);

   return (
    <MapContainer>
      <Legend />
      <ReactMapGL
         {...viewport}
         mapStyle="mapbox://styles/mapbox/outdoors-v11"
         width="100%"
         height="100%"
         onViewportChange={(viewport: any) => setViewport(viewport)}
         mapboxApiAccessToken="pk.eyJ1IjoicmF5bW9uZG1payIsImEiOiJja24wZW0wZ3UwanJwMnJxdXR2ZzFidHJ2In0.__xdgFYndktBbDUgv0DJPA"
      >
         {Object.keys(locations).length > 0 && Object.keys(locations).map((location, i): any => {
            let color;
            switch (true) {
               case !locations[location].isOpen:
                  color = Colors.green;
                  break;
               case locations[location].isOpen:
                  color = Colors.red;
                  break;
               default:
                  color = Colors.darkGrey
            }
            return (
               <MarkerContainer key={locations[location]._id}>
                  <Marker key={locations[location].title} latitude={Number(locations[location].latitude)} longitude={Number(locations[location].longitude)} offsetLeft={-20} offsetTop={-10}>
                     <DeleteFilled style={{ fontSize: "25px", color }} />
                     <Preview title={locations[location].title} description={locations[location].description} pictureBefore={locations[location].pictureBefore} pictureAfter={locations[location].pictureAfter} />
                  </Marker>
               </MarkerContainer>
            );
         })}
      </ReactMapGL>
    </MapContainer>
   );
};

export default hot(App);
