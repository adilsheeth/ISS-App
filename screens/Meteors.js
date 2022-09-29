import axios from "axios";
import * as React from "react";
import { Alert, Text, View, FlatList, SafeAreaView, Platform, StatusBar, ImageBackground, Image, Dimensions } from "react-native";

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
    console.log(item);
    let meteor = item;
    item = item.item;
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
    return(
      <View>
        <ImageBackground source={{bg_img}} style={styles.backgroundImg}>
          <View style={styles.gifContainer}>
            <Image source={{speed}} style={{
              width: size,
              height: size,
              alignSelf: "center",
            }} />
            <View>
              <Text style={[styles.cardTitle, {marginTop: 400, marginLeft: 50}]}>
                {item.name}
              </Text>
              <Text style={[styles.cardText, {marginTop: 20, marginLeft: 50}]}>
                Closest to Earth - {item.close_approach_data[0].close_approach_date_full}
              </Text>
              <Text style={[styles.cardText, {marginTop: 5, marginLeft: 50}]}>
                Minimum Diameter (KM) - {item.estimated_diameter.kilometers.estimated_diameter_min}
              </Text>
              <Text style={[styles.cardText, {marginTop: 5, marginLeft: 50}]}>
                Maximum Diameter (KM) - {item.estimated_diameter.kilometers.estimated_diameter_max}
              </Text>
              <Text style={[styles.cardText, {marginTop: 5, marginLeft: 50}]}>
                Velocity (KM/H) - {item.close_approach_data[0].relative_velocity.kilometers_per_hour}
              </Text>
              <Text style={[styles.cardText, {marginTop: 5, marginLeft: 50}]}>
                Missing Earth By (KM) - {item.close_approach_data[0].miss_distance.kilometers}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
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
  },
  backgroundImg: {
    flex: 1,
    resizeMode: "cover",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  }, 
  cardTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    color: "white",
  },
  cardText: {
    color: "white",
  },
  gifContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  threatDetector: {
    height: 10,
    marginBottom: 10,
  },
  meteorDataContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    backgroundColor: "rgba(52,52,52,0.5)",
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    borderRadius: 10,
    padding: 10, 
  }
}

//API Key = krQdOEYR874N5EZyDlVOFC2n7jVKVsUsaXCkZAHU
