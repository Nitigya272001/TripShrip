import React, {useState} from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'

function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        click() {
          map.locate()
        },
        locationfound(e) {
            console.log(e.latlng)
          setPosition({lat: 28.2389469, lng: 77.0243094})
          map.flyTo({lat: 28.2389469, lng: 77.0243094}, map.getZoom())
        },
      })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }


function Parking() {
    return (
        <div style={{padding:"10px"}}>
            <MapContainer style={{height:"500px", width:"90vw"}} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
            </MapContainer>
        </div>
    )
}

export default Parking
