import React from 'react';
import MapButton from css;

class MapButton extends React.Component {
  openMap = () => {
    window.open("public/map.html", "_blank");
  }

  render() {
    return (
      <button onClick={this.openMap}>Open Map</button>
    );
  }
}

export default MapButton;