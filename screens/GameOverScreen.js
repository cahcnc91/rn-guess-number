import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import TitleText from "../components/TitleText";
import DefaultStylesheet from "../constants/default-styles";
import Colors from "../constants/colors";
import PrimaryButton from "../components/PrimaryButton";

const GameOverScreen = (props) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>Game Over!</TitleText>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/gameOver.png")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={{ paddingVertical: 20, alignItems: "center" }}>
          <Text style={DefaultStylesheet.bodyText}>
            Number of rounds:{" "}
            <Text style={styles.highlight}>{props.rounds}</Text>
          </Text>
          <Text style={DefaultStylesheet.bodyText}>
            Number was: <Text style={styles.highlight}>{props.userNumber}</Text>
          </Text>
        </View>
        <PrimaryButton onPress={props.newGameHandler}>NEW GAME</PrimaryButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10
  },
  imageContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
});

export default GameOverScreen;
