import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './index.css';
import { useNavigate } from 'react-router-dom';

// List 5 kecamatan
const kecamatanList = [
  { id: 1, nama: 'Klojen', lat: -7.982, lon: 112.630 },
  { id: 2, nama: 'Blimbing', lat: -7.939, lon: 112.647 },
  { id: 3, nama: 'Lowokwaru', lat: -7.952, lon: 112.611 },
  { id: 4, nama: 'Sukun', lat: -8.003, lon: 112.614 },
  { id: 5, nama: 'Kedungkandang', lat: -7.978, lon: 112.664 }
];

// Ganti ikon marker
const customIcon = new L.Icon({
  iconUrl: 'src/assets/map.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30]
});


function App() {
  const [cuaca, setCuaca] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    kecamatanList.forEach(async (kec) => {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${kec.lat}&longitude=${kec.lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&current=temperature_2m,precipitation&timezone=Asia%2FBangkok&forecast_days=3`
      );
      const data = await res.json();
      setCuaca((prev) => ({
        ...prev,
        [kec.id]: {
          daily: data.daily,
          current: data.current
        }
      }));
    });
  }, []);

  return (
    <container>
      <div className="w-full h-full">
        <MapContainer center={[-7.975, 112.633]} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {kecamatanList.map((kec) => (
          <Marker key={kec.id} position={[kec.lat, kec.lon]} icon={customIcon}>
            <Popup>
            <h2 className='text-base text-center font-bold'>{kec.nama}</h2><br />
              {cuaca[kec.id] ? (
                <>
                  <p className='text-base font-bold'>🌡️ Suhu saat ini: {cuaca[kec.id].current.temperature_2m}°C</p>
                  <hr />
                  <p className='text-base font-bold'>🌧️ Presipitasi saat ini: {cuaca[kec.id].daily.precipitation_sum} mm</p>
                  <hr />
                  <br />
                  <button className="button" onClick={() => navigate(`/cuaca/${kec.id}`)}>
                    Lihat detail
                  </button>
                </>
              ) : (
                <span>Loading data cuaca...</span>
              )}
            </Popup>
          </Marker>
        ))}
        </MapContainer>
      </div>
    </container>
  );
}

export default App;
