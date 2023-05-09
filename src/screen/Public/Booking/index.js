import React from 'react'
import { TouchableOpacity, Image, ScrollView,  FlatList,TextInput,Alert,StyleSheet,Dimensions,Keyboard} from 'react-native'

import { ActivityIndicator, MD2Colors, } from 'react-native-paper';
import { Container, Content, Icon, Text, View ,Card,CardItem, Button, Right,Left,Body,List,ListItem,Thumbnail,Input, Footer,Item,Toast} from 'native-base'
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


import { getUltimoRegistro, guardarKilometraje } from './../../../services/KilometrajeVehiculoService';
import { getImageUuid } from './../../../services/Adjuntos';

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
      loadingGuardar:false,
      loadingImagen:false,
      ultimoRegistro:null,
      kilometraje:"",
      responseOk:false,
      responseError:false,
      disabledButtonGuardar:false,
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
   // this.refs.ModalSucessful.close();

    //ultimo registro de km
     const list = await getUltimoRegistro(this.state.item.uuid);

     const ultimoRegistro = (list.length > 0) ? list[0] : null;
     
     this.setState({ultimoRegistro:ultimoRegistro, 
                    photo: {url:'',name :'',type : '',uri: '', fileSize: 0, base64:'', source: {uri:''}}, 
                    kilometraje:0,
                    disabledButtonGuardar:false,
                    loadingVehiculo:false}
                  );                  
  //  await this.cargarImageUuid();
  }


  async cargarImageUuid(){
    
    this.setState({ loadingImagen:true});

    const adjuntoDto = await getImageUuid(this.state.ultimoRegistro.idAlmacenamiento);

    const ultimoRegistro = this.state.ultimoRegistro;

    console.log("====> "+adjuntoDto);

    ultimoRegistro.base64 = adjuntoDto.encodeString;
    
    this.setState({ ultimoRegistro : ultimoRegistro,loadingImagen:false});

  }

  getImageSource () {   
    return `data:${this.state.ultimoRegistro && this.state.ultimoRegistro.tipo};base64,${this.state.ultimoRegistro && this.state.ultimoRegistro.base64}`;
  }


 /*Permisos*/
 cameraPermission = async () => {

  const granted = await PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.CAMERA );

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

  //  this.initEdit();
    
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

initEdit (){
  
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

iniciarGuardar (){
  //validar con el ultimo km
  if( this.state.kilometraje < this.state.ultimoRegistro.kilometraje){
      Alert.alert("Revisar","Revise su captura, el kilometraje capturado es menor al anterior.")    
      return;
  }

  Keyboard.dismiss();

  setTimeout(()=>{ 
    this.refs.ModalSucessful.open();
  },500);

  
 

  //--realizar el guardado  Z>>>>>>>>>>>>>>>>>>AQUI VOY
  /*Alert.alert(
    `Kilometraje `,
    `¿Confirma que desea actualizar el Kilometraje?`,
    [{
      text: "Cerrar",
      onPress: () => { },
      style: "cancel",
    },
    {
      text: `Aceptar`,
      onPress: () => {                    
        this.guardar();
      }
    },
    ], {
    cancelable: true,
    onDismiss: () => { }
  }
  );  */
}

async guardar (){
  
  console.log("@ guardar kilometraje");
  try{

  await this.promisedSetState({loadingGuardar: true,responseOk:false});

  const formData = new FormData();

  formData.append("foto",{
    name: this.state.photo.name,
    type: this.state.photo.type,
    uri:  this.state.photo.uri,
    fileSize: this.state.photo.fileSize        
  });
  
  formData.append('vehiculoUuid',`${this.state.item.uuid}`);   
  formData.append('kilometraje',`${this.state.kilometraje}`);   
  formData.append('nota',`${this.state.nota}`);   

  const response =  await guardarKilometraje(formData);  

  console.log(response);
  
  //await this.promisedSetState({loadingGuardar: false,responseOk:true});
  await this.promisedSetState({responseOk:true});

  setTimeout(()=>{ 
    this.setState({ loadingVehiculo:true,loadingGuardar: false},async ()=>{      
      this.refs.ModalSucessful.close();
      await this.init();            
      await this.cargarImageUuid();      
    });  
  },2500);

  //this.refs.ModalSucessful.open();

  //
/*
  this.setState({ loadingVehiculo:true},async ()=>{
    await this.init();
  });*/

  }catch(e){
    console.log(e);
    Alert.alert("¡Ups!","Sucedió un error al intentar subir la foto."+e);
    this.setState({responseError:true});
  }
}

buttonOk(){

  this.setState({ loadingVehiculo:true},async ()=>{
    await this.init();    
  });
 
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
                      <Card  style={{margin:20}} transparent>   
                          <CardItem cardBody>                            
                            {
                                (this.state.ultimoRegistro && this.state.ultimoRegistro.base64) ?                                
                                <Image source={{uri : this.getImageSource()}} style={{height: 200, width: null, padding:25, flex:1, justifyContent:"center",alignContent:"center",alignItems:"center",alignSelf:"center" }}/>                                                          
                                :                                
                                <View style={stylesImage.container} >                                  
                                    <Image                                         
                                        style={stylesImage.cover}
                                        blurRadius={3}
                                        source={tableroPlaceholder} 
                                        
                                        />                          
                                    <Button style={stylesImage.close} rounded iconLeft  onPress={()=>this.cargarImageUuid()} > 
                                                {
                                                  this.state.loadingImagen ?                                                  
                                                    <ActivityIndicator style={{padding:20}} color='white' size={"small"}></ActivityIndicator>                                                  
                                                   :
                                                   <>
                                                    <Icon  style={{color:"white",fontSize:15}} name='download' type="AntDesign" />  
                                                    <Text style={{color:"white",fontSize:12}} >{`${(this.state.ultimoRegistro && this.state.ultimoRegistro.pesoAdjunto) ? this.state.ultimoRegistro.pesoAdjunto:'-' }`}</Text>                                          
                                                   </>
                                                }                                          
                                          
                                    </Button>                                    
                                </View>
                            }
                          </CardItem>        
                          <CardItem footer>
                            <Body>                                                            
                                <Text style={styles.bookingHeaderlTitleKm}>{`${ ultimoRegistro && ultimoRegistro.kilometraje }km`}</Text>            
                            </Body>                            
                            <Right>                            
                              <Text style={styles.dateLabel} >{moment(ultimoRegistro && ultimoRegistro.creado,'YYYY-MM-DDThh:mm:ss').fromNow()}</Text>                      
                            </Right>
                          </CardItem>                                
                       </Card>                       
                       :
                       <>
                       <ListItem thumbnail style={{paddingBottom:5}} onPress={()=>this.openGallery()}>                        
                              <Thumbnail  square                             
                               style={{height: 200, width: null, marginEnd:15, flex:1,justifyContent:"center",alignContent:"center",alignSelf:"center"}}
                               source={{ uri: this.state.photo.uri}} />
                        </ListItem>                     
                        <ListItem icon>            
                            <Left >
                                <Icon  style={{color:"gray",fontSize:20}} name='gauge' type="Entypo" />                        
                            </Left>
                            <Body>
                                <TextInput
                                    autoFocus={true}
                                    placeholder='Escribe aquí el Km'     
                                    keyboardType='numeric'                
                                    autoCorrect={false}
                                    underlineColorAndroid='transparent'
                                    style={styles.formInputKilometraje}
                                    onChangeText={(kilometraje) => this.setState({ kilometraje })} 
                                    value={this.state.kilometraje}
                                />                                  
                            </Body>
                            <Right >
                                <Icon  style={{color:"gray",fontSize:25}} name='camera' type="FontAwesome" onPress={this.cameraLaunch} />  
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
        <TouchableOpacity style={theme.fBtn} onPress={() => { /* navigate('PublicHome') */}}>
            <Icon name='car' type='FontAwesome5' style={theme.fBtnIcon} />            
        </TouchableOpacity>
        
        <View style={theme.botPop}>
        {(this.state.photo.url && this.state.kilometraje) ?
            <TouchableOpacity style={theme.botPopBtn} onPress={() => {  this.iniciarGuardar() }}>
              <Icon  style={{color:"white",fontSize:25}} name='check' type="Entypo" />  
              <Text style={theme.botPopText}>{__('Guardar')}</Text>            
          </TouchableOpacity>
          :
          <TouchableOpacity style={theme.botPopBtnGuardar} disabled={this.state.loadingGuardar} onPress={() => {  this.cameraLaunch() }}>
            {
              this.state.loadingGuardar ?   
                    <ActivityIndicator color='white' size={'large'} animating={true} />
                    :
                    <>
                      <Icon  style={{color:"white",fontSize:25}} name='camera' type="FontAwesome" />              
                      <Text style={theme.botPopText}>{__('Iniciar')}</Text>            
                    </>
            }
            
          </TouchableOpacity>          
        }
        </View>        
        <TouchableOpacity style={ theme.fBtn} onPress={() => { /*navigate('PublicMyAccount')*/ }}>
             <Icon name='history' type='FontAwesome5' style={theme.fBtnIcon} />
        </TouchableOpacity>
      </View>


      <Modal
        ref={'ModalSucessful'}
        isOpen={this.state.isOpen}
        position={'center'}        
        swipeToClose={false}
        
        style={styles.mConfirmBox}>
        <TouchableOpacity style={styles.closeIcon} onPress={() => this.refs.ModalSucessful.close()}>
          <Icon name='close' type='AntDesign' style={[theme.huge, theme.grey]} />
        </TouchableOpacity>
        <ScrollView>
          <View style={styles.modalItem}>
            <View>
              {
                  (this.state.responseOk) ?
                    <>
                      <Image source={require('@asset/images/success-green.png')} resizeMode='contain' style={styles.confirmImg} />
                      <Text style={styles.modalText}>{  __('¡Todo bien!')}</Text>
                      <Text style={{ fontSize:15 ,...styles.modalText}}>{  __('Espere un momento...')}</Text>
                    </>
                  : <>
                      <Text style={styles.modalTitle}>{`${this.state.item && this.state.item.marca} ${this.state.item && item.clase} ${this.state.item && this.state.item.modelo} ${this.state.item && this.state.item.color} `} </Text> 
                      <Text style={styles.modalTitle}>{`Actualización`}</Text>
                      <Text style={styles.modalTitle}>{`${this.state.kilometraje} KM`}</Text>
                      <Text style={styles.modalText}>{  __('¿Confirma la actualización?')}</Text>
                    </>
              }                
              {
                  this.state.responseError && <Text style={{color:"red" ,...styles.modalTitle}}>{`Sucedió un error`}</Text>
              }
              {
                  this.state.loadingGuardar && <ActivityIndicator size={'small'} color="green"  />                   
              }
            </View>
            {/*<Text style={styles.modalTitle}>{__('¿Confirme la actualización?')}</Text>
            <Text style={styles.modalText}>{  __('¿Confirma la actualización?')}</Text>*/}
          </View>
          <Grid>
            <Col>
              <TouchableOpacity  disabled={this.state.loadingGuardar} style={this.state.loadingGuardar ? styles.confirmOrderBtnDisabled : styles.confirmOrderBtn } onPress={() => { this.guardar() /*navigate('PublicHome')*/}}>
              <View style={styles.confirmBtn}>                              
                <Text style={styles.confirmBtnText}>{__('Confirmar')}</Text>
              </View>
              {/*<View>
                <Icon name='check' type='AntDesign' style={[theme.extraLarge, theme.light]} />
              </View>*/}
              </TouchableOpacity>          
            </Col>
            <Col>
              <TouchableOpacity style={styles.closeOrderBtn} onPress={() => { this.refs.ModalSucessful.close() }}>
                <View style={styles.confirmBtn}>              
                    <Text style={styles.confirmBtnText}>{__('Cerrar')}</Text>              
                </View>              
              </TouchableOpacity>          
            </Col>
          </Grid>
          
        </ScrollView>
      </Modal>


      
   

    </Container>
  }
}

const stylesImage = StyleSheet.create({
  container: {
    margin: 5,    
    padding:5,
    width:null,
    height:200,
    flex:1,
    justifyContent:"center",
    alignContent:"center",
    alignItems:"center",
    alignSelf:"center",       
    
  },
  cover: {    
    borderRadius:5,  
    padding:25,
    flex: 1,
    justifyContent:"center",
    alignContent:"center",
    alignItems:"center",
    alignSelf:"center",
    backgroundColor: 'rgba(173, 164, 255, 0.8)',
    opacity:0.5,    
  },
  close: {    
    position: "absolute",            
    backgroundColor: 'rgba(255, 255, 255, 0.6)',    
    flex:1,
    justifyContent:"center",
    alignContent:"center",
    alignItems:"center",
    alignSelf:"center",       
    borderWidth:1,
    borderColor:"gray"
  }
});