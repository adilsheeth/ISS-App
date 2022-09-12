import * as React from "react";
import { Text, View, SafeAreaView, Platform, StatusBar, TouchableOpacity, Image, ImageBackground } from "react-native";


export default class Home extends React.Component {
    render() { 
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <ImageBackground source={require("../assets/bg_image.png")} style={styles.backgroundImage}>

                    <View style={styles.titleBar}>
                        <Text style={styles.titleText}>
                            ISS Tracker App
                        </Text>
                    </View>
                    
                    <TouchableOpacity style={styles.routeCard} onPress={()=>{this.props.navigation.navigate("ISSLocation")}} >
                        <Image source={require("../assets/iss_icon.png")} style={styles.iconImage} />
                        <Text style={styles.routeText}>ISS Location</Text>
                        <Text style={styles.knowMore}>{"Know More -->" }</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.routeCard} onPress={()=>{this.props.navigation.navigate("Meteors")}} >
                        <Image source={require("../assets/meteor_icon.png")} style={styles.iconImage} />
                        <Text style={styles.routeText}>Meteors</Text>
                        <Text style={styles.knowMore}>{"Know More -->" }</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.routeCard} onPress={()=>{this.props.navigation.navigate("Updates")}}> 
                        <Image source={require("../assets/rocket_icon.png")} style={styles.iconImage} />
                        <Text style={styles.routeText}>Updates</Text>
                        <Text style={styles.knowMore}>{"Know More -->" }</Text>
                    </TouchableOpacity>

                </ImageBackground>
            </View>
        );
    }
}
 
const styles = {
    container: {
        flex: 1
    },
    titleText: {
        fontSize: 40,
        fontWeight: "bold",
        color: "white",
    },
    droidSafeArea: {
        marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    },
    titleBar: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center",
    },
    routeCard: {
        flex: 0.25,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 50,
        borderRadius: 30,
        backgroundColor: "white",
    },
    routeText: {
        fontSize: 35,
        fontWeight: "bold",
        color: "black",
        marginTop: 75,
        paddingLeft: 30,
    },
    knowMore: {
        paddingLeft: 30,
        color: "red",
        fontSize: 15,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
    },
    iconImage: {
        position: "absolute",
        height: 200,
        width: 200,
        resizeMode: "contain",
        right: 20,
        top: -80,
    }
}