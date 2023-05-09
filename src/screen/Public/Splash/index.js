

import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View, Text,Image,Dimensions
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { COLOR, FAMILY, SIZE } from '@theme/typography'

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default  class extends React.Component{

  constructor(props) {
    super(props);
    
  }

  async componentDidMount() {    
    console.log("@montado splash");
    const { navigation } = this.props;

    this.focusListener = navigation.addListener("didFocus", async () => {      
        await this._bootstrapAsync();      
    });

    await this._bootstrapAsync();
  }

  componentWillUnmount() {
    //this.focusListener.remove();
  }
  
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    console.log("Revisando sesion");
    const logeado = await AsyncStorage.getItem('logeado');
    setTimeout(()=>{
      this.props.navigation.navigate(logeado ? 'PublicHome' : 'PublicSignIn');
    },2000);    
  };

  render() {    
    const back = require("../../../../assets/images/logo.png");
    const logoCobra = require("@asset/images/cobra.png");    
    return (      
      <View style={styles.container}>
             <StatusBar
                        animated={true}
                        backgroundColor="#E17017"                      
                        barStyle={'light-content'}
                        showHideTransition={'fade'}
                        hidden={true} />
                        
            <Image source={logoCobra} style={{ resizeMode:"contain",width:200 }}  />                
            <ActivityIndicator color={"#fff"} />                
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    height:"100%",
    justifyContent: 'center',
    alignItems: 'center', 
    alignSelf:"center",
    alignContent:"center",
    backgroundColor: COLOR.darkViolet
  }
});


