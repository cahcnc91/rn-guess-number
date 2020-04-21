import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Colors from '../constants/colors';

const Header = props => {
  // ...Platform.select({
  //   ios: StyleSheet.iosHeader,
  //   android, sty;escape.androidHeader
  // })
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
         backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
         borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'white',
         borderBottomWidth: Platform.OS === 'ios' ? 1 : 0
     },
     headerTitle: {
         color:  Platform.OS === 'android' ? 'white' : Colors.primary,
         fontSize: 18,
         fontFamily: 'open-sans-bold'
     }
  });
  

  export default Header;