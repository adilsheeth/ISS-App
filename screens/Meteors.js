import axios from "axios";
import * as React from "react";
import { Alert, Text, View } from "react-native";

export default class Meteors extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      meteors: {},
      
    }
  }

  componentDidMount() {
    this.getMeteors();
  }

  getMeteors = () => {
    axios
      .get(
        "https://api.nasa.gov/neo/rest/v1/feed?api_key=krQdOEYR874N5EZyDlVOFC2n7jVKVsUsaXCkZAHU"
      )
      .then((response) => {
        this.setState({
          meteors: response.data.near_earth_objects,
        });
        console.log(Object.keys(this.state.meteors));
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      })
  }

  render() {
    if (Object.keys(this.state.meteors).length == 0) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      let meteorArr = Object.keys(this.state.meteors).map((meteor_date) => {
        return this.state.meteors[meteor_date];
      });
      let meteors = [].concat.apply([], meteorArr);
      meteors.forEach(function (element) {
        let diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max) / 2;
        let threatScore = (diameter / element.close_approach_data[0].miss_distance.kilometers) * 1000000000;
      });
      return (
        <Text>Calculating Treat Score...</Text>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
}

//API Key = krQdOEYR874N5EZyDlVOFC2n7jVKVsUsaXCkZAHU
