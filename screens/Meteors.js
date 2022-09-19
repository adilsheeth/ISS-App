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
      });
    
  }

  render() {
    return (
      <View style={styles.container} >
        <Text> Meteors Screen</Text>
      </View>
    );
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
