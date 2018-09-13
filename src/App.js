import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = { stationId: [], loading: true };

  componentDidMount() {
    this.getData();
    this.setTime();
  }

  setTime = () => {
    setInterval(this.getData, 30000);
  };

  getData = () => {
    console.log("fetching data");
    fetch("https://gbfs.citibikenyc.com/gbfs/en/station_status.json")
      .then(res => {
        return res.json();
      })
      .then(citiBikeData => {
        let eBikes = citiBikeData.data.stations;
        let stateArray = [];
        eBikes.map(stations => {
          if (stations.num_ebikes_available > 0) {
            stateArray.push(stations.station_id);
          }
          return this.setState({
            stationId: stateArray
          });
        });
      });
    this.setState({ loading: false });
  };

  renderStations() {
    let { stationId } = this.state;

    return (
      <React.Fragment>
        <h1>Find an electric citibike</h1>
        <h3>This page updates every 30 seconds</h3>
        <ol>
          {stationId.map((id, i) => {
            return <li key={i}>{id}</li>;
          })}
        </ol>
      </React.Fragment>
    );
  }

  render() {
    let { loading } = this.state;
    return <div className="App">{loading ? null : this.renderStations()}</div>;
  }
}

export default App;
