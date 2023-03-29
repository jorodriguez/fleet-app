
import React from 'react'
import { StatusBar, TouchableOpacity, Text } from 'react-native'
import { Container, Content, Icon, View } from 'native-base'

import styles from './styles'
import theme from '@theme/styles'

import Header from '@component/Header'
import Footer from '@component/Footer'

import { navigate } from '@utility/navigation'
import { __ } from '@utility/translation'
import request from '@utility/request'
import { bind } from '@utility/component'

export default class extends React.Component {
  render () {
    return <Container>
      <Header navLeftType='back' statusBarType='dark' />

      <Content contentContainerStyle={theme.layoutDf}>
        <View style={styles.myAccountContainer}>
          <View style={styles.myAccountHeader}>
            <View>
              <Text style={styles.myAccountHeaderTitle}>{__('Hi Salma!')}</Text>
              <Text style={styles.myAccountHeaderText}>{__('Welcome to WECARCARE')}</Text>
            </View>
            <View style={styles.myAccountContent}>
              <View style={[styles.myAccountInfo, styles.bgBlue]}>
                <View>
                  <Text style={styles.numText}>{__('SPENT')}</Text>
                  <Text style={styles.priceText}>{__('AMOUNT')}</Text>
                </View>
                <View style={styles.priceDetail}>
                  <Text style={styles.dollarText}>{__('$')}</Text>
                  <Text style={styles.priceNumText}>{__('120')}</Text>
                </View>
              </View>
              <View style={[styles.myAccountInfo, styles.bgYellow]}>
                <View>
                  <Text style={styles.numText}>{__('NO. OF')}</Text>
                  <Text style={styles.priceText}>{__('WASH')}</Text>
                </View>
                <View>
                  <Text style={styles.priceNumText}>{__('28')}</Text>
                </View>
              </View>
              <View style={[styles.myAccountInfo, styles.bgRed]}>
                <View>
                  <Text style={styles.numText}>{__('NO. OF')}</Text>
                  <Text style={styles.priceText}>{__('SERVICE')}</Text>
                </View>
                <View>
                  <Text style={styles.priceNumText}>{__('07')}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.settingInfo} onPress={() => { navigate('PublicOrder') }}>
              <View>
                <Text style={styles.settingTitle}>{__('ORDERS')}</Text>
                <Text style={styles.settingText}>{__('MANAGE TOUR ORDERS')}</Text>
              </View>
              <View>
                <Icon name='file-invoice-dollar' type='FontAwesome5' style={[theme.extraHigantic, theme.dark]} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingInfo} onPress={() => { navigate('PublicProfile') }}>
              <View>
                <Text style={styles.settingTitle}>{__('PROFILE')}</Text>
                <Text style={styles.settingText}>{__('MANAGE YOUR PROFILE INFOS')}</Text>
              </View>
              <View>
                <Icon name='user' type='FontAwesome' style={[theme.extraHigantic, theme.dark]} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingInfo} onPress={() => { navigate('PublicChangePassword') }}>
              <View>
                <Text style={styles.settingTitle}>{__('SETTINGS')}</Text>
                <Text style={styles.settingText}>{__('MANAGE YOUR SETTINGS')}</Text>
              </View>
              <View>
                <Icon name='gears' type='FontAwesome' style={[theme.extraHigantic, theme.dark]} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Content>

      <Footer currentScreen='Profile' />
    </Container>
  }
}
