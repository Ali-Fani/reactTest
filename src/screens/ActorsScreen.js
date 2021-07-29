import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";

const ActorsScreen = () => {
  const [actors, setActors] = useState([]);
  const [actorDisabled, setActorDisabled] = useState(null);

  useEffect(() => {
    axios
      .get("http://webswitch.ir:3000/actors")
      .then((res) => {
        setActors(res.data.actors);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [actorDisabled]);

  const switchActor = (id, status) => {
    setActorDisabled(id);
    axios
      .post("http://webswitch.ir:3000/actors", {
        actorid: id,
        actorstatus: status === 0 ? 1 : 0,
      })
      .then((res) => {
        setActors(res.data.actors);
        setActorDisabled(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1>Actors List:</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Actor Id</th>
            <th>Actor Name</th>
            <th>Actor Status</th>
            <th>Status Color</th>
            <th>Switch Status</th>
          </tr>
        </thead>
        <tbody>
          {actors &&
            actors.map((actor) => (
              <tr key={actor.actorid}>
                <td>{actor.actorid}</td>
                <td>{actor.actorname}</td>
                <td>{actor.actorstatus}</td>
                <td>
                  {actorDisabled === actor.actorid ? (
                    <i className="far fa-lightbulb fa-3x"></i>
                  ) : actor.actorstatus === 0 ? (
                    <i className="far fa-lightbulb fa-3x text-info"></i>
                  ) : (
                    <i className="fas fa-lightbulb fa-3x text-warning"></i>
                  )}
                </td>

                <td
                  className="actor-switch-button"
                  onClick={() => switchActor(actor.actorid, actor.actorstatus)}
                >
                  <Button variant="info" className="rounded btn btn-sm">
                    Switch
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ActorsScreen;
