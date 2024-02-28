import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import stationData from './stations.json';
import { Icon } from 'leaflet';
import axios from 'axios';

const customIcon = new Icon({
  iconUrl: '/location.png',
  iconSize: [25, 41],
});

const App = () => {
  const [page, setPage] = useState('Home');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLinkClick = (linkName) => {
    setPage(linkName);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSubmit = () => {
    setLoading(true);
    axios.get(`http://localhost:3001/?startDate=${startDate}&endDate=${endDate}`)
      .then(response => {
        console.log('Response:', response);
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Chennai Metro Rail Limited</h1>
      <div style={{ textAlign: 'left' }}>
        <button onClick={() => handleLinkClick('Home')}>Home</button>
        <button onClick={() => handleLinkClick('Passenger Flow')}>Passenger Flow</button>
        <button onClick={() => handleLinkClick('Management Summary')}>Management Summary</button>
      </div>
      <h3>{page === 'Home' ? 'Welcome Admin!' : page}</h3>
      {page !== 'Home' && (
        <div>
          <label>
            Start Date:
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </label>
          <label>
            End Date:
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </label>
          <button onClick={handleSubmit}>Submit</button><br /><hr />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ height: "450px", width: "550px"}}>
              <MapContainer center={[13.0827, 80.2707]} zoom={12} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {Object.keys(stationData).map((line) =>
                  stationData[line].map((station) => (
                    <Marker position={station.coordinates} icon={customIcon}>
                      <Popup>
                        {station.idline}<br></br>
                        {station.name}
                      </Popup>
                    </Marker>
                  ))
                )}
              </MapContainer>
            </div>
            <div style={{ height: "450px", width: "550px"}}>
              {loading ? (
                <div>Loading Data...</div>
              ) : (
                data.length > 0 && (
                  <table>
                    <thead>
                      <tr>
                        {Object.keys(data[0]).map((key) => (
                          <th key={key}>{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index}>
                          {Object.values(item).map((value, i) => (
                            <td key={i}>{value}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );  
};

export default App;
