import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Colors from '../constants/colors';

const Header = props => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{props.title}</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
     header: {
         alignItems: 'center',
         justifyContent: 'center',
         width: '100%',
         height: 90,
         paddingTop: 36,
         backgroundColor: Colors.primary
     },
     headerTitle: {
         color: 'black',
         fontSize: 18,
         fontFamily: 'open-sans-bold'
     }
  });
  

  export default Header;