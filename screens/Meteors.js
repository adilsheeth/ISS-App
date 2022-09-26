import axios from "axios";
import * as React from "react";
import { Alert, Text, View, FlatList, SafeAreaView, Platform, StatusBar } from "react-native";

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

  keyExtractor = (item, index) => {
    index.toString();
  }

  renderItem = (item) => {
    let meteor = item;
    if(meteor.threatScore <= 30){
      bg_img = require("../assets/meteor_bg1.png");
      speed = require("../assets/meteor_speed1.gif");
      size = 100;
    } else if(meteor.threatScore <= 75){
      bg_img = require("../assets/meteor_bg2.png");
      speed = require("../assets/meteor_speed2.gif");
      size = 150;
    } else {
      bg_img = require("../assets/meteor_bg3.png");
      speed = require("../assets/meteor_speed3.gif");
      size = 200;
    }
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

      meteors.sort(function (a,b){
        return b.threatScore - a.threatScore;
      });
      
      meteors = meteors.slice(0,5);
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea}>
            <FlatList 
              data={meteors} 
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              horizontal={true}
            />
          </SafeAreaView>
        </View>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  droidSafeArea: {
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  }
}

//API Key = krQdOEYR874N5EZyDlVOFC2n7jVKVsUsaXCkZAHU
