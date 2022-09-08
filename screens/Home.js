import * as React from "react";
import { Text, View } from "react-native";

export default class Home extends React.Component {
    render() { 
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Text>
                    Home Screenn.
                </Text>
            </View>
        );
    }
}
 
