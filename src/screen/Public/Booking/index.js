import React from 'react'
import { TouchableOpacity, Image, ScrollView,  FlatList,TextInput} from 'react-native'
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { Container, Content, Icon, Text, View ,Alert,Card,CardItem, Button, Right,Left,Body,List,ListItem,Thumbnail,Input, Footer,Item} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import { Col, Row, Grid } from 'react-native-easy-grid';
import { } from 'rn-placeholder'
import moment from "moment";
import 'moment/min/moment-with-locales'
moment.locale('es'); 

import Modal from 'react-native-modalbox'
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import styles from './styles'
import theme from '@theme/styles'
import { COLOR, FAMILY, SIZE } from '@theme/typography';
import { navigate } from '@utility/navigation'
import { __ } from '@utility/translation'
import request from '@utility/request'
import { bind } from '@utility/component'

import Session from './Session'
import sessionList from './data/session'
import Header from '@component/Header'

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { ImageGallery } from '@georstat/react-native-image-gallery';
import PhotoEditor from 'react-native-photo-editor';

import { getUltimoRegistro } from './../../../services/KilometrajeVehiculoService';

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: '',
      tabSelected: 'appoint',
      PaymentTabSelected: 'card',
      visibleDailyReminder: false,
      isDisabled: false,
      isOpen: false,
      language: 'en',
      photos:[],
      photo: {url:'',name :'',type : '',uri: '', fileSize: 0, base64:'', source: {uri:''},      
      nota: ""},
      country: 'hatchback',
      isOpenGallery:false,
      indexPhotoSelected:1,
      sessionList: [],
      fetchingSessionList: true,
      item:null,
      loadingVehiculo:false,
      ultimoRegistro:null,
      
    }

    bind(this);
    
    this.fetchSessionList = this.fetchSessionList.bind(this)

    //this.renderVehicle = this.renderVehicle.bind(this)
    
    this.showDailyReminder = this.showDailyReminder.bind(this)
    this.onChangeDailyReminder = this.onChangeDailyReminder.bind(this)

    this.openGallery = this.openGallery.bind(this);
    this.closeGallery = this.closeGallery.bind(this);
    
    //this.focusListener =  this.focusListener.bind(this);
  }

  showDailyReminder () {
    this.setState({
      visibleDailyReminder: true
    })
  }

  onChangeDailyReminder () {
    this.setState({
      visibleDailyReminder: false
    })
  }

  openGallery(){
     //this.setState({isOpenGallery:true,indexPhotoSelected:index});
     this.setState({isOpenGallery:true});
  }
  
  closeGallery (){
      this.setState({isOpenGallery:false});
  }

  onValueChange () {
    this.setState({
      selected: ''
    })
  }

  async componentDidMount () {
    const language = await AsyncStorage.getItem('language')
    await this.promisedSetState({
      language
    });



    //await this.fetchSessionList()
    this.settingParams();
  }

  settingParams(){
    const { navigation } = this.props;
    const { route } = this.props;
    const { params }  = route;    
    const { item } = params;       
    
    console.log("@@@ITEM "+ JSON.stringify(item));

    this.setState({ item : item,loadingVehiculo:true},async ()=>{
      await this.init();
    });
   
    this.focusListener = navigation.addListener("didFocus", async () => {                          
      console.log("===Dentro del focusListener");
      const { route } = this.props;
      const { params }  = route;    
      const { item } = params;       
     
      this.setState({ item : item,loadingVehiculo:true},async ()=>{
        await this.init();
      });
    });  
  }

  async init(){
    console.log("@load vehicle "+this.state.item.uuid);
    
    //ultimo registro de km
     const list = await getUltimoRegistro(this.state.item.uuid);

     const ultimoRegistro = (list.length > 0) ? list[0] : null;

     console.log(ultimoRegistro);

    this.setState({ultimoRegistro:ultimoRegistro, loadingVehiculo:false});      

  }

/*Permisos*/
cameraPermission = async () => {

  const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

  if(granted === PermissionsAndroid.RESULTS.GRANTED) {
    // if get here, the user has accepted the permissions
    this.cameraLaunch();
  } else {
    // if get here, the user did NOT accepted the permissions
  }
}

cameraLaunch = async () => {

  console.log("@@lanznado la camara ");
try{
  let options = {
    storageOptions: {
      videoQuality: 'high',
      mediaType: 'photo',
      saveToPhotos: true,
      skipBackup: true,
      path: 'checklist',
    },
  };

  const camaraResponse = await launchCamera(options);

  if(camaraResponse.didCancel){
    console.log('User cancelled image picker');
  }else{
    if(camaraResponse.errorCode){
      console.log('ImagePicker Error: ', camaraResponse.error);
      Alert.alert("Error","Ups¡ al parecer hubó un error ["+camaraResponse.errorMessage+"]");
    }else{
      if (camaraResponse.customButton) {
          console.log('User tapped custom button: ', camaraResponse.customButton);  
      }else{
        this.addPhoto(camaraResponse);
      }
    }
  }

}catch(e){
  console.log("==== ERROR "+e);
}

  /*launchImageLibrary(options, (res) => {
    console.log('Response = ', res);
    if (res.didCancel) {
      console.log('User cancelled image picker');
    } else if (res.error) {
      console.log('ImagePicker Error: ', res.error);
    } else if (res.customButton) {
      console.log('User tapped custom button: ', res.customButton);
      alert(res.customButton);
    } else {
  
      this.addPhoto(res);
      
    }
  });*/
}




addPhoto = (res)=>{

  console.log("@addPhoto");
      
  //let array = this.state.photos;
  
  const assets = res.assets;

  const fotoKm = assets[0] || {};

  console.log(assets[0]);

  //-- solo una foto
  this.setState({
    photo: {
          url: fotoKm.uri,
          name : fotoKm.fileName,
          type : fotoKm.type,              
          uri: fotoKm.uri,                  
          fileSize: fotoKm.fileSize,
          base64: fotoKm.base64,
          source: {uri:fotoKm.uri},      
          nota: ""}
    });
    
  /*let assetsArray = assets.map(e => {
    return{
      url: e.uri,
      name : e.fileName,
      type : e.type,              
      uri: e.uri,                  
      fileSize: e.fileSize,
      base64: e.base64,
      source: {uri:e.uri},      
      nota: ""}
  });  
  
  array.unshift(...assetsArray);

  console.log(array);

  this.setState({photos:array});*/
  
}
/*
replacePhoto = (index,imagePath)=>{

  console.log("@replacePhoto");
      
  let array = this.state.photos;

  array[]
        
  let assetsArray = assets.map(e => {
    return{
      url: e.uri,
      name : e.fileName,
      type : e.type,              
      uri: e.uri,                  
      fileSize: e.fileSize,
      base64: e.base64,
      source: {uri:e.uri},      
      nota: ""}
  });  
  
  array.unshift(...assetsArray);

  console.log(array);

  this.setState({photos:array});
  
}*/

initEdit (index){
  
  try{
    //let photo = this.state.photos[index];
    let photo = this.state.photo;

    console.log("EDITAR LA FOTO"+JSON.stringify(photo));
    //move to other url
  
  
    let res = PhotoEditor.Edit({path: photo.uri,onDone:(imagePath)=>{ console.log("@ on done"+ imagePath) }});

    console.log(res);
  }catch(e){
    console.log("ERRO "+e);
  }
}


  async fetchSessionList () {
    await this.promisedSetState({
      fetchingSessionList: true
    })
    const list = await request(sessionList)
    await this.promisedSetState({
      sessionList: list,
      fetchingSessionList: false
    })
  }

  
  render () {

    const item = this.state.item;
    const ultimoRegistro = this.state.ultimoRegistro;

    const carImage =  require("../../../../assets/images/car-placeholder2.png");
    const tableroPlaceholder =  require("../../../../assets/images/tablero-km.png");


    return <Container>
      <Header navLeftType='back' statusBarTspe='dark' />
      <View style={styles.bookingContainer}>

        <View style={styles.bookingContent}>
            
            <View style={styles.bookingHeader}>                                           
              <Text style={styles.bookingHeaderlTitle}>{__('Kilometraje ')}</Text>            

              {
                this.state.loadingVehiculo ? 
                <ActivityIndicator animating={true} />
                :                 
                 <Text style={styles.bookingSubHeaderlTitle}>{`${item && item.marca} ${item && item.clase} ${item && item.modelo} ${item && item.color} `} </Text>                                 
              }              
          </View>
           
       </View>
      </View>

      <Content  contentContainerStyle={theme.layoutDf} refreshing={this.state.loadingVehiculo}>
                      
                          
        {/* padding:25, flex:1, justifyContent:"center",alignContent:"center",alignItems:"center",alignSelf:"center" */ 
            !this.state.photo.url ?
                      <Card  style={{padding:10}}>   
                          <CardItem cardBody>
                            <Image source={tableroPlaceholder} style={{height: 200, width: null,padding:25, flex:1, justifyContent:"center",alignContent:"center",alignItems:"center",alignSelf:"center" }}/>                          
                          </CardItem>        
                          <CardItem footer>
                            <Body>                            
                              <Text style={styles.bookingHeaderlTitleKm}>{`${ ultimoRegistro && ultimoRegistro.kilometraje }km`}</Text>            
                            </Body>                            
                            <Right>                            
                              <Text style={styles.dateLabel} >{moment(ultimoRegistro && ultimoRegistro.creado,'YYYY-MM-DDThh:mm:ss').fromNow()}</Text>                      
                            </Right>
                          </CardItem>      
                          <CardItem  footer button onPress={this.launchCamera} >
                                <Body>
                                  <Icon style={{color:COLOR.lightViolet}} name='camera' type="FontAwesome"  />                        
                                  <Text>Actualizar km</Text>
                                </Body>
                          </CardItem>         
                      </Card>
                       
                       :
                       <>
                       <ListItem thumbnail style={{paddingBottom:5}} onPress={()=>this.openGallery(0)}>                        
                              <Thumbnail  square                             
                               style={{height: 200, width: null, marginEnd:15, flex:1,justifyContent:"center",alignContent:"center",alignSelf:"center"}}
                               source={{ uri: e.uri}} />
                        </ListItem>                     
                        <ListItem icon>            
                            <Left >
                                <Icon  style={{color:"gray",fontSize:20}} name='gauge' type="Entypo" />                        
                            </Left>
                            <Body>
                                <TextInput
                                    placeholder='Escribe aquí el Km'     
                                    keyboardType='numeric'                
                                    style={styles.formInputKilometraje}
                                />  
                            </Body>
                            <Right >
                                  <Icon style={{color:COLOR.lightViolet}} name='camera' type="FontAwesome"  onPress={() => this.cameraLaunch()} />                        
                            </Right>
                            </ListItem>    
                      </>
        }               
                    
        
        <ImageGallery    
              initialIndex={0}                            
              thumbSize={50}
              images={[this.state.photo]}
              isOpen={this.state.isOpenGallery}                      
              close={this.closeGallery}           
        />       
                    
      </Content>


      <View style={theme.footer}>
        <TouchableOpacity style={theme.fBtn} onPress={() => { navigate('PublicHome') }}>
            <Icon name='car' type='FontAwesome5' style={theme.fBtnIcon} />            
        </TouchableOpacity>
        
        <View style={theme.botPop}>
          <TouchableOpacity style={theme.botPopBtn} onPress={() => { /*guardar*/  }}>
            <Icon  style={{color:"white",fontSize:25}} name='check' type="Entypo" />  
            <Text style={theme.botPopText}>{__('Guardar')}</Text>            
          </TouchableOpacity>
        </View>        
        <TouchableOpacity style={ theme.fBtn} onPress={() => { navigate('PublicMyAccount') }}>
        <Icon name='history' type='FontAwesome5' style={theme.fBtnIcon} />
        </TouchableOpacity>
      </View>

    </Container>
  }
}
