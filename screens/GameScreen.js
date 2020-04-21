import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import PrimaryButton from "../components/PrimaryButton";
import { ScreenOrientation } from 'expo';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const random = Math.floor(Math.random() * (max - min)) + min;
  if (random === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return random;
  }
};

const renderListItem = (listLength, itemData) => {
  return (
    <View style={styles.listItem}>
      <Text>#{listLength - itemData.index}</Text>
      <Text>{itemData.item}</Text>
    </View>
  );
};

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(
    1,
    100,
    props.userChoice
  ).toString();

  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
  // ScreenOrientation.addOrientationChangeListener
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [rounds, setRounds] = useState(0);
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get("window").width)
  const [deviceHeight, setDeviceHeight] = useState(Dimensions.get("window").height)
  const currentLow = useRef(1);
  const currentHigh = useRef(99);

  const { userChoice, gameOverHandler } = props;

  useEffect(() => {
    const updateLayout = () => {
      setDeviceHeight(Dimensions.get("window").height);
      setDeviceWidth(Dimensions.get("window").width);
    }
        Dimensions.addEventListener('change', updateLayout);

        return () => {
          Dimensions.removeEventListener('change', updateLayout);
        }
  })

  useEffect(() => {
    if (currentGuess === userChoice) {
      gameOverHandler(rounds);
    }
  }, [currentGuess, gameOverHandler, userChoice]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("do not lie", "You know that this is wrong", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
      generateRandomBetween(1);
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setRounds((curRounds) => curRounds + 1);
    setPastGuesses((currentPastG) => [nextNumber.toString(), ...currentPastG]);
  };

  let listcontainerStyle = styles.listContainer;

  if(deviceWidth < 350){
    listcontainerStyle = styles.listContainerBig;
  }

  if (deviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text>Opponent's Guess</Text>
        <View style={styles.controls}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="md-remove" size={24} color="white" />
          </PrimaryButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <PrimaryButton
            title="GREATER"
            onPress={nextGuessHandler.bind(this, "greater")}
          >
            <Ionicons name="md-add" size={24} color="white" />
          </PrimaryButton>
        </View>
        <View style={styles.listContainer}>
          {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, i) => renderListItem(guess, pastGuesses.length - i))}
        </ScrollView> */}
          <FlatList
            keyExtractoritem={(item) => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </PrimaryButton>
        <PrimaryButton
          title="GREATER"
          onPress={nextGuessHandler.bind(this, "greater")}
        >
          <Ionicons name="md-add" size={24} color="white" />
        </PrimaryButton>
      </Card>
      <View style={listcontainerStyle}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, i) => renderListItem(guess, pastGuesses.length - i))}
        </ScrollView> */}
        <FlatList
          keyExtractoritem={(item) => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 10,
    width: 400,
    maxWidth: "90%",
  },
  listContainer: {
    width: "60%",
    flex: 1,
  },
  listContainerBig: {
    width: "80%"
  },
  list: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  controls: {
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%"
  }
});

export default GameScreen;
