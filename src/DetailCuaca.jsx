import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './index.css';

const kecamatanList = [
    { id: 1, nama: 'Klojen', lat: -7.982, lon: 112.630 },
    { id: 2, nama: 'Blimbing', lat: -7.939, lon: 112.647 },
    { id: 3, nama: 'Lowokwaru', lat: -7.952, lon: 112.611 },
    { id: 4, nama: 'Sukun', lat: -8.003, lon: 112.614 },
    { id: 5, nama: 'Kedungkandang', lat: -7.978, lon: 112.664 }
  ];

function DetailCuaca() {
  const { id } = useParams();
  const kec = kecamatanList.find(k => k.id === parseInt(id));
  const [cuaca, setCuaca] = useState(null);

  useEffect(() => {
    if (kec) {
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${kec.lat}&longitude=${kec.lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Asia%2FBangkok&forecast_days=3`)
        .then(res => res.json())
        .then(data => setCuaca(data.daily));
    }
  }, [kec]);

  if (!kec) return <p>Kecamatan tidak ditemukan</p>;
  if (!cuaca) return <p>Loading cuaca...</p>;

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      <div className="bg-gray-500 rounded-xl shadow-lg p-6 w-full max-w-md group">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          Prakiraan Cuaca 3 Hari di {kec.nama}
        </h2>

        {cuaca.time.map((tanggal, i) => (
          <div key={i} className="mb-4">
            <p className="text-white font-semibold">{tanggal}</p>
            <p className="text-white text-sm">
              🌡️ Suhu terendah: {cuaca.temperature_2m_min[i]} °C - Suhu tertinggi: {cuaca.temperature_2m_max[i]} °C
            </p>
            <p className="text-white text-sm">
                🌧️ Presipitasi: {cuaca.precipitation_sum[i]} mm
            </p>
            <hr className="my-2 border-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetailCuaca;
