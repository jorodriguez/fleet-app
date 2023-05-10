import React from 'react'
import { StatusBar, TouchableOpacity, Image, TextInput,Alert,Keyboard } from 'react-native'
import { Container, Content, Icon, Text, View,Input ,Spinner} from 'native-base'

import styles from './styles'
import theme from '@theme/styles'
import { SimpleAnimation } from 'react-native-simple-animations';

import { navigate } from '@utility/navigation'
import { __ } from '@utility/translation'
import request from '@utility/request'
import { bind } from '@utility/component';
import { login, cerrarSesion } from '../../../services/LoginService';
import { setUsuarioSesion, eliminarSesion } from '../../../services/Sesion';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.login = {
        auth: false,
        password: '',
        mensaje: '',
        token: ''
    };
    this.focusListener = null;
    this.state = {
        loading: false,
        email: '',
        password: '',
        secureTextEntry: true,
        buildVersion: "",
        
    };
}

componentDidMount() {
    //this.setState({ buildVersion: URL_SISCOP.BASE_VERSION });
    this.setState({ buildVersion:"By " });
     const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", async () => {
        this.init(); 
    });
    
}
  

  componentWillUnmount() {
   // this.focusListener.remove();
  }
 
 
  init =()=>{        
    this.setState({ email: "", password: "", secureTextEntry: true });
    this.login.auth = false;
    this.login.password = "";
    this.login.mensaje = "";
    this.login.token = "";        
}


onClickListener = () => {
        
  Keyboard.dismiss();



  if (this.state.email == '') {
      Alert.alert("Usuario Requerido", "Es necesario ingresar tu usuario ");
  } else {

      if (this.state.password == '') {
          Alert.alert("Clave Requerida", "Es necesario ingresar tu clave de acceso.");

      } else {
          this.setState({ loading: true });
          this.login.auth = false;                
          this.login.token = 'tokendummy';                
          login(this.state.email.toLowerCase(), this.state.password)
              .then(function (res) { return res.json(); })
              .then(this.handleLogin)
              .catch(this.handleErrorLogin);

      }
  }
  
}

handleLogin = async (data) => {
  /*setTimeout(() => {
      this.props.navigation.navigate('PublicSplash', { usuario: this.login.usuario });    
  }, 3000);        */
  this.login = data;
  console.log("analizando sesion");

  if (!!this.login.accessToken){

      let realizado = await setUsuarioSesion(this.login);

      if (realizado) {               
          console.log("Redireccionando a Splash");         
          
          console.log("Direccionando a splash");
          setTimeout(() => {
              //this.props.navigation.navigate('PublicSplash', { usuario: this.login.usuario });
              this.setState({ loading: false, email: "", password: "", secureTextEntry: true });                
              navigate('PublicSplash', { usuario: this.login.usuario });
        }, 3000); 
      } else {
           Alert.alert("Error", "Sucedió un detalle por favor contacte a nuestro equipo de soporte.") 
      }

  } else {
      this.setState({ loading: false });
      Alert.alert("El usuario o la constraseña son incorrectos.", "Por favor revisa tus credenciales de acceso.");
  }    
};

handleErrorLogin = (error) => {
  this.setState({ loading: false });
  Alert.alert("!Ops", "Lo sentimos hubó un error en el servicio, por favor ponte en contacto con el equipo de soporte. " + error);
  console.error(error);
};

onToggleShowPasswordPressed = () => {
  this.setState({ secureTextEntry: !this.state.secureTextEntry });
};



  render () {
    
    const fondo = require("../../../../assets/images/logo.png");
    const back = require("../../../../assets/images/logo.png"); 
    const logoCobra = require("@asset/images/cobra.png");    
    const carImagen = require("@asset/images/car.png");       

    return <Container >      
      <View style={styles.container}>            
      <StatusBar
                        animated={true}
                        backgroundColor="#E17017"                      
                        barStyle={'light-content'}
                        showHideTransition={'fade'}

                        hidden={true} />
        
        
      <TouchableOpacity style={styles.actBarBtn} onPress={() => { /*navigate('PublicIntro')*/ }}>
        <Image source={logoCobra} style={styles.logoCobra} />
      </TouchableOpacity>
      
            
        <Content contentContainerStyle={styles.layoutDf}>
        <SimpleAnimation delay={600} duration={2000} distance={100} friction={15} direction="up" movementType="slide">     
            <View style={styles.signInForm}>
          
              <View style={styles.containerTextoSiaSiscop}>
                  <Image source={logoCobra} style={{  width: 150,  height: 100,paddingBottom:20}} />
              </View>          
            
            <View>
              <Text style={styles.formText}>{__('USUARIO')}</Text>
             
              <View style={styles.inputContainer}>
                
                <TextInput style={styles.inputs}                                
                        placeholder="correo@grupocobra.mx"
                                keyboardType="email-address"
                                underlineColorAndroid='transparent'
                                autoCapitalize='none'
                                autoCorrect={false}
                                onChangeText={(email) => this.setState({ email })} 
                                value={this.state.email}
                                />
                  <Icon name='mail' type='Foundation' style={[theme.huge, theme.smoke]} />
                
              </View>

              <Text style={styles.formText}>{__('PASSWORD')}</Text>
              <View style={styles.inputContainer}>

                  <TextInput style={styles.inputs}
                                placeholder="******"
                                secureTextEntry={this.state.secureTextEntry}
                                autoCorrect={false}
                                underlineColorAndroid='transparent'
                                onChangeText={(password) => this.setState({ password })} 
                                value={this.state.password}
                                />
                                
                    <Icon name='lock' type='FontAwesome' style={[theme.huge, theme.smoke]} />

                
              </View>

              <TouchableOpacity onPress={() => { navigate('PublicForgotPassword') }}>
                <Text style={styles.forgotText}>{__('Forgot your password?')}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}  onPress={() =>  this.onClickListener()}>                
                    {!this.state.loading && <Text style={styles.loginText}>{__('LOGIN')}</Text>}
                      {this.state.loading && <Spinner color='#FFF' />}            
              </TouchableOpacity>

              <View style={styles.createAccountInfo}>
                <Text style={styles.customerText}>{__('New Customer?')}</Text>
                <TouchableOpacity onPress={() => { navigate('PublicCreateAccount') }}>
                  <Text style={styles.createBtnText}>{__('Create Account')}</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
          {/*<Image source={require('@asset/images/car.png')} style={styles.bgImg} />*/}
          </SimpleAnimation>
        </Content>

      </View>
    </Container>
  }
}

/*
<Container>
      
      <View style={styles.bgLayout}>        
        <Content contentContainerStyle={styles.layoutDf}>
          <View style={styles.signInForm}>
            <Text style={styles.signInTitle}>{__('Login')}</Text>
            <View>
              <Text style={styles.formText}>{__('EMAIL ADDRESS')}</Text>
              <View style={styles.formRow}>
                <TextInput
                  placeholder='tu usuario'                  
                  style={styles.formInput}
                />
                <Icon name='mail' type='Foundation' style={[theme.huge, theme.smoke]} />
              </View>
              <Text style={styles.formText}>{__('PASSWORD')}</Text>
              <View style={styles.formRow}>
                <TextInput
                  placeholder='* * * * * * * * * *'                  
                  style={styles.formInput}
                />
                <Icon name='lock' type='FontAwesome' style={[theme.huge, theme.smoke]} />
              </View>
              <TouchableOpacity onPress={() => { navigate('PublicForgotPassword') }}>
                <Text style={styles.forgotText}>{__('Forgot your password?')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.loginBtn} onPress={() => { navigate('PublicHome') }}>
                <Text style={styles.loginBtnText}>{__('LOGIN')}</Text>                
              </TouchableOpacity>
              <View style={styles.createAccountInfo}>
                <Text style={styles.customerText}>{__('New Customer?')}</Text>
                <TouchableOpacity onPress={() => { navigate('PublicCreateAccount') }}>
                  <Text style={styles.createBtnText}>{__('Create Account')}</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>          

          </Content>

          </View>
        </Container>
*/ 