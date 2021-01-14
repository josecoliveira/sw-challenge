import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';

function App() {
  const [mglt, setMglt] = useState();
  const [loading, setLoading] = useState(true);
  const [starships, setStarships] = useState({});
  const [stops, setStops] = useState([]);

  useEffect(() => {
    fetch("https://swapi.dev/api/starships/")
      .then(response => response.json())
      .then(data => {
        setStarships(data.results);
        setLoading(false);
      });
  }, []);

  const convertToHours = s => {
    const [ts, unit] = s.split(" ");
    const t = parseFloat(ts);
    if (unit.includes("year")) {
      return t * 8760;
    } else if (unit.includes("month")) {
      return t * 720;
    } else if (unit.includes("week")) {
      return t * 168;
    } else if (unit.includes("day")) {
      return t * 24;
    }
  }

  const calculate = () => {
    const stopsAux = [];
    starships.forEach(starship => {
      const consumablesInHours = convertToHours(starship.consumables);
      const maxLengthWithoutResuply = parseFloat(starship.MGLT) * consumablesInHours;
      stopsAux.push({
        name: starship.name,
        stops: Math.floor(mglt / maxLengthWithoutResuply)
      });
    });
    setStops(stopsAux);
  };

  const renderLoading = () => (
    <Container className="content">
      <p>Loading...</p>
    </Container>
  );

  const renderStops = () => (
    stops.map((stop, index) => (
      <p key={stop.name}>{stop.name}: {stop.stops}</p>
    ))
  );

  const renderContent = () => (
    <Container className="content">
      <Row>
        <Col md={12} style={{"paddingBottom": "30px"}}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Megalights</Form.Label>
              <Form.Control
                type="number"
                onChange={event => setMglt(parseFloat(event.target.value))}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                    console.log("test")
                    calculate();
                  }
                }}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={calculate}
            >
              Apply
            </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {renderStops()}
        </Col>
      </Row>
    </Container>
  );

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="\">nata.house Challenge</Navbar.Brand>
      </Navbar>
      {loading
        ? renderLoading()
        : renderContent()
      }
    </div>
  );
}

export default App;
