

import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View, Text,Image,Dimensions
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';


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
    return (      
      <View style={styles.container}>
                    <StatusBar  hidden={true} />
        <View>
          {/*<SimpleAnimation delay={100} duration={1500} fade>*/}
            <Image source={back} style={{ resizeMode:"contain",width:280 }}  />
          {/*</SimpleAnimation>*/}
        </View>        
        <ActivityIndicator color={"#fff"} />
        <StatusBar barStyle="default" />
        
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',    
    backgroundColor:"#000"
  }
});


