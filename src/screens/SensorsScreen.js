import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import LoaderComponent from "../components/LoaderComponent";

const SensorsScreen = () => {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://webswitch.ir:3000/sensors")
      .then((res) => {
        setSensors(res.data.sensors);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h1>Sensors List:</h1>
      {loading ? (
        <LoaderComponent />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sensor Id</th>
              <th>Sensor Name</th>
              <th>Sensor Data</th>
              <th>Sensor Type</th>
              <th>Type Symbol</th>
            </tr>
          </thead>
          <tbody>
            {sensors.map((sensor) => (
              <tr key={sensor.sensorid}>
                <td>{sensor.sensorid}</td>
                <td>{sensor.sensorname}</td>
                <td>{sensor.sensordata}</td>
                <td>{sensor.sensortype}</td>
                <td>
                  {
                  sensor.sensortype === 2 && (sensor.sensordata >= 0 && sensor.sensordata <= 25) ? <i className="fas fa-battery-quarter fa-3x"></i> :
                  sensor.sensortype === 2 && (sensor.sensordata >= 26 && sensor.sensordata <= 50) ? <i className="fas fa-battery-half fa-3x"></i> : 
                  sensor.sensortype === 2 && (sensor.sensordata >= 51 && sensor.sensordata <= 75) ? <i className="fas fa-battery-three-quarters fa-3x"></i> : 
                  sensor.sensortype === 2 && (sensor.sensordata >= 76 && sensor.sensordata <= 100) ? <i className="fas fa-battery-full fa-3x"></i> :
                  
                  sensor.sensortype === 1 && (sensor.sensordata >= 0 && sensor.sensordata <= 25) ? <i className="fas fa-clock text-danger fa-3x"></i> :
                  sensor.sensortype === 1 && (sensor.sensordata >= 26 && sensor.sensordata <= 50) ? <i className="fas fa-clock text-warning fa-3x"></i> : 
                  sensor.sensortype === 1 && (sensor.sensordata >= 51 && sensor.sensordata <= 75) ? <i className="fas fa-clock text-info fa-3x"></i> : 
                  sensor.sensortype === 1 && (sensor.sensordata >= 76 && sensor.sensordata <= 100) ? <i className="fas fa-clock text-success fa-3x"></i> :
                  
                    null
                }
                  
                  </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default SensorsScreen;
