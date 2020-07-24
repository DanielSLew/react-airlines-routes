import React from 'react';
import Data from '../data.js';

class FlightMap extends React.Component {
  render() {
    return(
      <svg className="map" viewBox="-180 -90 360 180">
        <g transform="scale(1 -1)">
          <image xlinkHref="equirectangular_world.jpg" href="equirectangular_world.jpg" x="-180" y="-90" height="100%" width="100%" transform="scale(1 -1)"/>
          
          {this.props.routes.map(route => {
            if (route.disabled) return;
            const src = Data.getAirportByCode(route.src);
            const dest = Data.getAirportByCode(route.dest);

            return (
              <g key={route.airline + route.src + route.dest}>
                <circle className="source" cx={src.long} cy={src.lat}>
                  <title>{src.name}</title>
                </circle> 
                <circle className="destination" cx={dest.long} cy={dest.lat}>
                  <title>{dest.name}</title>
                </circle>
                <path d={`M${src.long} ${src.lat} L ${dest.long} ${dest.lat}`} />
              </g>
            );
          })}
        </g>
      </svg>
    );
  }
}

export default FlightMap;