
import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import { IoLocationSharp } from "react-icons/io5";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || 'your-access-token';


export default function ManageMap({ open, setOpen, latitude, longitude }) {

    
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '400px',
    latitude: latitude,
    longitude: longitude,
    zoom: 10,
  });

  const [selectedLocation, setSelectedLocation] = useState(null);
  
   
  return (
  
    <section className="flex justify-end items-center gap-1 font-play">
      {/* custom modal  */}
       {open && <section className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50  bg-black/20 flex justify-center items-center">
       
       <form className="w-[400px] md:w-[800px] h-[700px] p-7 bg-white" >
       <h2 className="text-center text-xl my-3 md:text-3xl text-gray-500 font-racing"> See Your Delivery Address !</h2>
       
     <div className='h-[80%]'>
           
       <ReactMapGL dragPan={true}
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken={import.meta.env.MAPBOX_ACCESS_TOKEN || 'your-access-token'}
      onViewportChange={(newViewport) => setViewport(newViewport)}
      onClick={() => setSelectedLocation(null)}
    >
      <Marker latitude={latitude} longitude={longitude} offsetLeft={20} offsetTop={10}>
      <div > <IoLocationSharp className='text-red-600' size={30}/></div>
      </Marker>

      {selectedLocation && (
        <Popup
          latitude={selectedLocation.latitude}
          longitude={selectedLocation.longitude}
          onClose={() => setSelectedLocation(null)}
        >
          <div>
            <h2>Selected Location</h2>
            <p>Latitude: {selectedLocation.latitude}</p>
            <p>Longitude: {selectedLocation.longitude}</p>
          </div>
        </Popup>
      )}
    </ReactMapGL>
     </div>

<button onClick={() => setOpen(!open)} className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mt-2 md:ml-3  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 relative z-50"> Close </button>
</form>
       
       </section>
}
    </section>
  )
}
