import * as React from "react";
import { Text, View } from "react-native";

export default class ISSLocation extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text> ISSLocation Screen</Text>
      </View>
    );
  }
}
