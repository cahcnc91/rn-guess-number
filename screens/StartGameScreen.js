import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import DefaultStyles from "../constants/default-styles";
import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import Colors from "../constants/colors";
import TitleText from "../components/TitleText";
import PrimaryButton from "../components/PrimaryButton";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState("");
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);


  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    }
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout)
    }
  });


  const numberInputHandler = (input) => {
    setEnteredValue(input.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0) {
      return Alert.alert("Invalid number", "Number has to be betwenn 1 -99", [
        { text: "Okay", style: "destructive", onPress: resetInputHandler },
      ]);
    }
    setConfirmed(true);
    setEnteredValue("");
    setSelectedNumber(parseInt(enteredValue));
    Keyboard.dismiss();
  };
  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.confirmedNumber}>
        <TitleText style={styles.text}>Start a New Game</TitleText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <PrimaryButton onPress={() => props.startGameHandler(selectedNumber)}>
          START GAME
        </PrimaryButton>
      </Card>
    );
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position">
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game</Text>
            <Card style={styles.inputContainer}>
              <Text style={DefaultStyles.bodyText}>Select a Number</Text>
              <Input
                style={styles.input}
                blurOnsubmit
                autoCorrect={false}
                keyboardType={"number-pad"}
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                <View style={{width: buttonWidth}}>
                  <Button
                    title="Reset"
                    onPress={() => resetInputHandler()}
                    color={Colors.accent}
                  ></Button>
                </View>
                <View style={styles.button}>
                  <Button
                    title="Confirm"
                    onPress={() => confirmInputHandler()}
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: Dimensions.get('window').width > 350 ? '70%' : '90%',
    maxWidth: "80%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  // button: {
  //   // width: 100,
  //   width: Dimensions.get("window").width / 4,
  // },
  input: {
    width: 50,
    textAlign: "center",
  },
  confirmedNumber: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default StartGameScreen;
