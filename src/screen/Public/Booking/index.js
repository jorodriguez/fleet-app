import React from 'react'
import { TouchableOpacity, Image, ScrollView, TextInput, FlatList } from 'react-native'
import { Container, Content, Icon, Text, View ,Alert } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import { } from 'rn-placeholder'

import Modal from 'react-native-modalbox'

import DropDownPicker from 'react-native-dropdown-picker'

import DateTimePicker from '@react-native-community/datetimepicker'

import styles from './styles'
import theme from '@theme/styles'

import { navigate } from '@utility/navigation'
import { __ } from '@utility/translation'
import request from '@utility/request'
import { bind } from '@utility/component'

import Session from './Session'
import sessionList from './data/session'

import Header from '@component/Header'

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

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
      country: 'hatchback',

      sessionList: [],
      fetchingSessionList: true
    }

    bind(this)

    this.fetchSessionList = this.fetchSessionList.bind(this)

    this.renderVehicle = this.renderVehicle.bind(this)
    this.renderPackage = this.renderPackage.bind(this)
    this.renderAppointment = this.renderAppointment.bind(this)
    this.renderPayment = this.renderPayment.bind(this)

    this.renderCard = this.renderCard.bind(this)
    this.renderStripe = this.renderStripe.bind(this)
    this.renderPayPal = this.renderPayPal.bind(this)

    this.showDailyReminder = this.showDailyReminder.bind(this)
    this.onChangeDailyReminder = this.onChangeDailyReminder.bind(this)
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

  onValueChange () {
    this.setState({
      selected: ''
    })
  }

  async componentDidMount () {
    const language = await AsyncStorage.getItem('language')
    await this.promisedSetState({
      language
    })

    await this.fetchSessionList()
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
      
  let array = this.state.photos;
  
  const assets = res.assets;

  console.log(assets[0]);
   
  let assetsArray = assets.map(e => {
    return{
      url: e.uri,
      name : e.fileName,
      type : e.type,              
      uri: e.uri,                  
      fileSize: e.fileSize,
      base64: e.base64,
      nota: ""}
  });  
  
  array.unshift(...assetsArray);

  console.log(array);

  this.setState({photos:array});
  
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

  renderCard () {
    return <View>
      <View style={styles.bookingItem}>
        <View style={styles.formRow}>
          <Text style={styles.formText}>{__('NAME ON CARD')}</Text>
          <TextInput placeholder='Carlos Cortes'
            placeholderTextColor='#000'
            style={styles.formInput} />
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formText}>{__('CARD NUMBER')}</Text>
          <TextInput placeholder='0000 3434 7867 9523'
            keyboardType='numeric'
            placeholderTextColor='#000'
            style={styles.formInput} />
        </View>
        <View style={styles.cardExpiryInfo}>
          <View style={styles.expiryInfo}>
            <Text style={styles.formText}>{__('EXPIRY DATE')}</Text>
            <TextInput
              placeholder='17 / 22'
              placeholderTextColor='#000'
              keyboardType='numeric'
              style={styles.formInput} />
          </View>
          <View style={styles.formRow2}>
            <Text style={styles.formText}>{__('CVV')}</Text>
            <TextInput
              placeholder='987'
              placeholderTextColor='#000'
              keyboardType='numeric'
              style={styles.formInput} />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.confirmOrderBtn} onPress={() => this.refs.ModalConfirm.open()}>
        <Text style={styles.confirmBtnText}>{__('PAY NOW $ 24')}</Text>
        <Icon name='arrowright' type='AntDesign' style={[theme.extraLarge, theme.light]} />
      </TouchableOpacity>
    </View>
  }
  renderStripe () {
    return <View>
      <View style={styles.bookingItem}>
        <View style={styles.formRow}>
          <Text style={styles.formText}>{__('NAME ON CARD')}</Text>
          <TextInput placeholder='Carlos Cortes'
            placeholderTextColor='#000'
            style={styles.formInput} />
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formText}>{__('CARD NUMBER')}</Text>
          <TextInput placeholder='0000 3434 7867 9523'
            keyboardType='numeric'
            placeholderTextColor='#000'
            style={styles.formInput} />
        </View>
        <View style={styles.cardExpiryInfo}>
          <View style={styles.expiryInfo}>
            <Text style={styles.formText}>{__('EXPIRY DATE')}</Text>
            <TextInput
              placeholder='17 / 22'
              placeholderTextColor='#000'
              keyboardType='numeric'
              style={styles.formInput} />
          </View>
          <View style={styles.formRow2}>
            <Text style={styles.formText}>{__('CVV')}</Text>
            <TextInput
              placeholder='987'
              placeholderTextColor='#000'
              keyboardType='numeric'
              style={styles.formInput} />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.confirmOrderBtn} onPress={() => this.refs.ModalConfirm.open()}>
        <Text style={styles.confirmBtnText}>{__('PAY NOW $ 24')}</Text>
        <Icon name='arrowright' type='AntDesign' style={[theme.extraLarge, theme.light]} />
      </TouchableOpacity>
    </View>
  }
  renderPayPal () {
    return <View style={styles.payPalInfo}>
      <TouchableOpacity>
        <Image style={styles.cardImg}
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCa_cqKVT4NMDmbRNZ2QI-wPvAdBd0sxUW9rcKcJ5kosPRvYEW&s' }} />
      </TouchableOpacity>
    </View>
  }
  renderVehicle () {
    return <View>
      <Text style={styles.packageTitle}>{__('What kind of car do you drive?')}</Text>
      <View style={styles.formRow3}>
        <Text style={styles.formText2}>{__('VEHICLE TYPE')}</Text>
        <View>

          <DropDownPicker
            items={[
              { label: 'Hatchback', value: 'hatchback' },
              { label: 'Coupé', value: 'coupé' },
              { label: 'Crossover', value: 'crossover' },
              { label: 'Convertible', value: 'convertible' }

            ]}
            defaultValue={this.state.country}

            containerStyle={{ height: 40 }}
            style={{ backgroundColor: '#fafafa' }}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            onChangeItem={item => this.setState({
              country: item.value
            })}
          />

        </View>
      </View>
      <View style={styles.formRow3}>
        <Text style={styles.formText2}>{__('CAR MAKE')}</Text>
        <TextInput
          placeholder='Ford'
          placeholderTextColor='rgba(36, 38, 68, 1)'
          style={styles.formInput2}
        />
      </View>
      <View style={styles.formRow3}>
        <Text style={styles.formText2}>{__('CAR MODEL')}</Text>
        <TextInput
          placeholder='Focus'
          placeholderTextColor='rgba(36, 38, 68, 1)'
          style={styles.formInput2}
        />
      </View>
      <View style={styles.formRow3}>
        <Text style={styles.formText2}>{__('COLOR')}</Text>
        <TextInput
          placeholder='Black'
          placeholderTextColor='rgba(36, 38, 68, 1)'
          style={styles.formInput2}
        />
      </View>
      <View style={styles.formRow3}>
        <Text style={styles.formText2}>{__('LICENSE PLATE')}</Text>
        <TextInput
          placeholder=''
          placeholderTextColor='rgba(36, 38, 68, 1)'
          style={styles.formInput2}
        />
      </View>
      <Text style={styles.rememberText}>{__('Can not remember? Leave it blank. You can update later.')}</Text>
      <TouchableOpacity style={styles.vehicleBtn} onPress={() => { navigate('') }}>
        <Text style={styles.vehicleBtnText}>{__('NEXT')}</Text>
        <Icon name='arrowright' type='AntDesign' style={[theme.extraLarge, theme.light]} />
      </TouchableOpacity>
    </View>
  }
  renderPackage () {
    return <View>
      <Text style={styles.packageTitle}>{__('Select Your Wash Package')}</Text>
      <TouchableOpacity style={styles.packageInfo} onPress={() => { navigate('') }}>
        <View>
          <Text style={styles.packageText}>{__('Exterior Only')}</Text>
          <Text style={styles.serviceText}>{__('180 WASH')}</Text>
          <Text style={styles.washText}>{__('Single Wash')}</Text>
        </View>
        <View style={styles.packageDetail}>
          <Text style={styles.dollarText}>{__('$')}</Text>
          <Text style={styles.priceText}>{__('12')}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.packageInfo, styles.selectPackage]} onPress={() => { navigate('') }}>
        <View>
          <Text style={styles.packageText}>{__('Full Service')}</Text>
          <Text style={styles.serviceText}>{__('360 WASH')}</Text>
          <Text style={styles.washText}>{__('Single Wash')}</Text>
        </View>
        <View style={styles.packageDetail}>
          <Text style={styles.dollatText}>{__('$')}</Text>
          <Text style={styles.priceText}>{__('24')}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.packageInfo} onPress={() => { navigate('') }}>
        <View>
          <Text style={styles.packageText}>{__('Full Service')}</Text>
          <Text style={styles.serviceText}>{__('ELITE WASH')}</Text>
          <Text style={styles.washText}>{__('Single Wash')}</Text>
        </View>
        <View style={styles.packageDetail}>
          <Text style={styles.dollatText}>{__('$')}</Text>
          <Text style={styles.priceText}>{__('48')}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.bookBtnInfo}>
        <TouchableOpacity style={styles.bookBtn} onPress={() => { navigate('') }}>
          <Icon name='arrowleft' type='AntDesign' style={[theme.extraLarge, theme.light]} />
          <Text style={styles.bookBtnText}>{__('PREVIOUS')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookBtn} onPress={() => { navigate('') }}>
          <Text style={styles.bookBtnText}>{__('NEXT')}</Text>
          <Icon name='arrowright' type='AntDesign' style={[theme.extraLarge, theme.light]} />
        </TouchableOpacity>
      </View>
    </View>
  }
  renderAppointment () {
    return <View>
      <View>
        <Text style={styles.packageTitle}>{__('Select Your Date')}</Text>
        <Text style={styles.dateLabel}>{__('Date')}</Text>
        <View style={styles.dateInfo}>
          <TextInput
            placeholder='13-01-2019'
            placeholderTextColor='#8e8e8e'
            keyboardType={'numeric'}
            style={styles.formInput}
          />
          <TouchableOpacity style={styles.timeIcon} onPress={this.showDailyReminder}>
            <Icon name='calendar' type='AntDesign' style={[theme.huge, theme.smokeDark]} />
          </TouchableOpacity>
        </View>
        <Text style={styles.packageTitle}>{__('Select Your Timing')}</Text>
        <View style={styles.sessionLayout}>
          <Session
            language={this.state.language}
            list={this.state.sessionList}
            fetching={this.state.fetchingSessionList}
          />
        </View>

      </View>
      <View style={styles.bookBtnInfo}>
        <TouchableOpacity style={styles.bookBtn} onPress={() => { navigate('') }}>
          <Icon name='arrowleft' type='AntDesign' style={[theme.extraLarge, theme.light]} />
          <Text style={styles.bookBtnText}>{__('PREVIOUS')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookBtn} onPress={() => { navigate('') }}>
          <Text style={styles.bookBtnText}>{__('NEXT')}</Text>
          <Icon name='arrowright' type='AntDesign' style={[theme.extraLarge, theme.light]} />
        </TouchableOpacity>
      </View>
    </View>
  }
  renderPayment () {
    let PaymentTabContent
    if (this.state.PaymentTabSelected === 'card') {
      PaymentTabContent = this.renderCard()
    } else if (this.state.PaymentTabSelected === 'stripe') {
      PaymentTabContent = this.renderStripe()
    } else if (this.state.PaymentTabSelected === 'paypal') {
      PaymentTabContent = this.renderPayPal()
    }
    return <View>
      <Text style={styles.packageTitle}>{__('Select Your Payment Method')}</Text>
      <View style={styles.tabInfo}>
        <TouchableOpacity style={this.state.PaymentTabSelected === 'card' ? styles.tabActive : styles.tab} onPress={() => this.setState({ PaymentTabSelected: 'card' })}>
          <Image source={require('@asset/images/visa.png')} style={this.state.PaymentTabSelected === 'card' ? styles.tabImgActive : styles.tabImg} />
        </TouchableOpacity>
        <TouchableOpacity style={this.state.PaymentTabSelected === 'stripe' ? styles.tabActive : styles.tab} onPress={() => this.setState({ PaymentTabSelected: 'stripe' })}>
          <Image source={require('@asset/images/stripe-pay-card-logo.png')} style={this.state.PaymentTabSelected === 'stripe' ? styles.tabImgActive : styles.tabImg} />
        </TouchableOpacity>
        <TouchableOpacity style={this.state.PaymentTabSelected === 'paypal' ? styles.tabActive : styles.tab} onPress={() => this.setState({ PaymentTabSelected: 'paypal' })}>
          <Image source={require('@asset/images/paypal.png')} style={this.state.PaymentTabSelected === 'paypal' ? styles.tabImgActive : styles.tabImg} />
        </TouchableOpacity>
      </View>
      <View style={styles.paymentCardTypeInfo}>
        {PaymentTabContent}
      </View>
    </View>
  }
  render () {
    let tabContent = this.renderVehicle();
    /*if (this.state.tabSelected === 'vehicle') {
      tabContent = this.renderVehicle()
    }     else if (this.state.tabSelected === 'package') {
      tabContent = this.renderPackage()
    } else if (this.state.tabSelected === 'appoint') {
      tabContent = this.renderAppointment()
    } else if (this.state.tabSelected === 'payment') {
      tabContent = this.renderPayment()
    }*/

    return <Container>
      <Header navLeftType='back' statusBarType='dark' />
      <View style={styles.bookingContainer}>

        <View style={styles.bookingContent}>
          <View style={styles.bookingHeader}>
            <Text style={styles.bookingHeaderlTitle}>{__('Kilometraje')}</Text>
            <Text style={styles.bookingHeaderlText}>{__('Registra el kilometraje de tu VH')}</Text>
          </View>
          <TouchableOpacity style={ styles.tabActive} onPress={() => this.cameraLaunch()}>
                    <Icon style={{ color: "white" }} size={35} name='camera' type="MaterialCommunityIcons" />
                    <Text>Toma Foto</Text>                                  
          </TouchableOpacity>          

         {
          this.state.photos.map(e=> <View style={styles.payPalInfo}>
            <TouchableOpacity>
              <Image style={styles.cardImg}
                source={{ uri: e.uri }} />
            </TouchableOpacity>
          </View> )
          }
          

          {/*<ScrollView horizontal
            showsHorizontalScrollIndicator={false}>
            <View style={styles.tabInfo}>
              <TouchableOpacity style={this.state.tabSelected === 'vehicle' ? styles.tabActive : styles.tab} onPress={() => this.setState({ tabSelected: 'vehicle' })}>
                <Text style={this.state.tabSelected === 'vehicle' ? styles.tabTextActive : styles.tabText}>{__('VEHICLE')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={this.state.tabSelected === 'package' ? styles.tabActive : styles.tab} onPress={() => this.setState({ tabSelected: 'package' })}>
                <Text style={this.state.tabSelected === 'package' ? styles.tabTextActive : styles.tabText}>{__('PACKAGE')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={this.state.tabSelected === 'appoint' ? styles.tabActive : styles.tab} onPress={() => this.setState({ tabSelected: 'appoint' })}>
                <Text style={this.state.tabSelected === 'appoint' ? styles.tabTextActive : styles.tabText}>{__('APPOINTMENT')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={this.state.tabSelected === 'payment' ? styles.tabActive : styles.tab} onPress={() => this.setState({ tabSelected: 'payment' })}>
                <Text style={this.state.tabSelected === 'payment' ? styles.tabTextActive : styles.tabText}>{__('PAYMENT')}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>*/}
        </View>
      </View>

      <Content contentContainerStyle={theme.layoutDf}>
        <View style={styles.bookingBg}>
          {tabContent}
        </View>
      </Content>

      <Modal
        ref={'ModalConfirm'}
        isOpen={this.state.isOpen}
        position={'center'}
        swipeToClose={false}
        style={styles.mConfirmBox}>
        <TouchableOpacity style={styles.closeIcon} onPress={() => this.refs.ModalConfirm.close()}>
          <Icon name='close' type='AntDesign' style={[theme.huge, theme.grey]} />
        </TouchableOpacity>
        <ScrollView>
          <View style={styles.modalItem}>
            <View>
              <Image source={require('@asset/images/success-green.png')} resizeMode='contain' style={styles.confirmImg} />
            </View>
            <Text style={styles.modalTitle}>{__('Confirmed')}</Text>
            <Text style={styles.modalText}>{__('Thank you. Your Payment has been successful.')}</Text>
          </View>
          <TouchableOpacity style={styles.confirmOrderBtn} onPress={() => this.refs.ModalConfirm.close()}>
            <View style={styles.confirmBtn}>
              <Text style={styles.confirmBtnText}>{__('BOOKING ID : # TB096534')}</Text>
            </View>
            <View>
              <Icon name='arrowright' type='AntDesign' style={[theme.extraLarge, theme.light]} />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </Modal>

      {
        this.state.visibleDailyReminder
          ? <DateTimePicker
            value={new Date('2020-06-12T14:42:42')}
            mode={'time'}
            display='spinner'
            onChange={this.onChangeDailyReminder}
          />
          : null
      }

    </Container>
  }
}
