import React, { useState, useEffect } from 'react';
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
   top: 0;
   left: 0;
   z-index: 10;
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
   <div>
      <p>{title}</p>
      <p>{description}</p>
      <img src={pictureBefore} height="50" />
      {pictureAfter && <img src={pictureAfter} height="50" />}
   </div>
);

const App = () => {
   const [viewport, setViewport] = useState({
      latitude: 45.9401482901509, 
      longitude: 13.620115243527838,
      zoom: 11
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
         {Object.keys(locations).length && Object.keys(locations).map((location, i): any => {
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
               <>
                  <Preview title={locations[location].title} description={locations[location].description} pictureBefore={locations[location].pictureBefore} pictureAfter={locations[location].pictureAfter} />
                  <Marker key={locations[location].title} latitude={Number(locations[location].latitude)} longitude={Number(locations[location].longitude)} offsetLeft={-20} offsetTop={-10}>
                     <DeleteFilled style={{ fontSize: "18px", color }} />
                  </Marker>
               </>
            );
         })}
      </ReactMapGL>
    </MapContainer>
   );
};

export default hot(App);
