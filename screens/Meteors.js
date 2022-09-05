import * as React from "react";
import { Text, View } from "react-native";

export default class Meteors extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text> Meteors Screen</Text>
      </View>
    );
  }
}
