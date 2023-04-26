
import React from 'react'
import { TouchableOpacity,RefreshControl } from 'react-native'
import { Container, Content, Icon, Text, View } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import { } from 'rn-placeholder'

import DateTimePicker from '@react-native-community/datetimepicker'

import styles from './styles'

import Featured from './Featured'
import Package from './Package'
import Membership from './Membership'
import Review from './Review'

import Header from '@component/Header'
import Footer from '@component/Footer'
import theme from '@theme/styles'
import { navigate } from '@utility/navigation'
import { __ } from '@utility/translation'
import request from '@utility/request'
import { bind } from '@utility/component'

import featuredList from './data/featured'
import packageList from './data/package'
import membershipList from './data/membership'
import reviewList from './data/review'
import {getAsignacionVehiculo} from '../../../services/AsignacionVehiculoService'



export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: '',
      visibleDailyReminder: false,
      isDisabled: false,
      isOpen: false,
      loading:false
    }

    this.state = {
      language: 'en',

      vehiculosAsignados: [],
      loadingVehiculosAsignados:false
       
    }

    bind(this);

    //this.showDailyReminder = this.showDailyReminder.bind(this)
    //this.onChangeDailyReminder = this.onChangeDailyReminder.bind(this)

  }


  async componentDidMount () {
    const language = await AsyncStorage.getItem('language')
    await this.promisedSetState({
      language
    })

    await this.getVehiculosAsignados();
    
  }

  async getVehiculosAsignados () {
    
    await this.promisedSetState({
      loadingVehiculosAsignados: true
    });

    const list = await getAsignacionVehiculo();

    await this.promisedSetState({
      vehiculosAsignados: list,
      loadingVehiculosAsignados: false
    });

  }

  _onRefresh = async () => {
    await this.getVehiculosAsignados();
  }

  render () {
    return <Container>
      <Header navLeftType='menu' navMiddleType='medium' title='COBRA' statusBarType='dark' />

      <Content contentContainerStyle={theme.layoutDf}  
        refreshControl={
          <RefreshControl
              refreshing={this.state.loadingVehiculosAsignados}
              onRefresh={this._onRefresh}
          />}
          >

        <Featured
          language={this.state.language}
          list={this.state.vehiculosAsignados}
          fetching={this.state.loadingVehiculosAsignados}
        />

{/*        <View style={styles.bookNowBtnInfo}>
          <TouchableOpacity style={styles.bookNowBtn} onPress={this.showDailyReminder}>
            <Text style={styles.bookNowBtnText}>{__('Registrar KM')}</Text>
            <Icon name='calendar' type='AntDesign' style={[theme.extraHuge, theme.light]} />
          </TouchableOpacity>
        </View>

        <Package
          language={this.state.language}
          list={this.state.packageList}
          fetching={this.state.fetchingPackageList}
        />

        <Membership
          language={this.state.language}
          list={this.state.membershipList}
          fetching={this.state.fetchingMembershipList}
        />

        <Review
          language={this.state.language}
          list={this.state.reviewList}
          fetching={this.state.fetchingReviewList}
        />
  */}

      </Content>
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
      
      <Footer currentScreen='Home' />


    </Container>
  }
}
