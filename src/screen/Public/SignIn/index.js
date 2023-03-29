import React from 'react'
import { StatusBar, TouchableOpacity, Image, TextInput } from 'react-native'
import { Container, Content, Icon, Text, View } from 'native-base'

import styles from './styles'
import theme from '@theme/styles'

import { navigate } from '@utility/navigation'
import { __ } from '@utility/translation'
import request from '@utility/request'
import { bind } from '@utility/component'

export default class extends React.Component {
  render () {
    return <Container>
      <StatusBar backgroundColor='rgba(51, 50, 85, 1)' barStyle='light-content' />
      <View style={styles.bgCover} />
      <View style={styles.bgMainLayout} />
      <View style={styles.bgLayout}>
        <TouchableOpacity style={styles.actBarBtn} onPress={() => { navigate('PublicIntro') }}>
          <Icon name='arrowleft' type='AntDesign' style={[theme.huge, theme.light]} />
        </TouchableOpacity>
        <Content contentContainerStyle={styles.layoutDf}>
          <View style={styles.signInForm}>
            <Text style={styles.signInTitle}>{__('Login')}</Text>
            <View>
              <Text style={styles.formText}>{__('EMAIL ADDRESS')}</Text>
              <View style={styles.formRow}>
                <TextInput
                  placeholder='someone@gmail.com'
                  placeholderTextColor='rgba(211, 211, 217, 1)'
                  style={styles.formInput}
                />
                <Icon name='mail' type='Foundation' style={[theme.huge, theme.smoke]} />
              </View>
              <Text style={styles.formText}>{__('PASSWORD')}</Text>
              <View style={styles.formRow}>
                <TextInput
                  placeholder='* * * * * * * * * *'
                  placeholderTextColor='rgba(211, 211, 217, 1)'
                  style={styles.formInput}
                />
                <Icon name='lock' type='FontAwesome' style={[theme.huge, theme.smoke]} />
              </View>
              <TouchableOpacity onPress={() => { navigate('PublicForgotPassword') }}>
                <Text style={styles.forgotText}>{__('Forgot your password?')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.loginBtn} onPress={() => { navigate('PublicHome') }}>
                <Text style={styles.loginBtnText}>{__('LOGIN')}</Text>
                <Icon name='arrowright' type='AntDesign' style={[theme.huge, theme.light]} />
              </TouchableOpacity>
              <View style={styles.createAccountInfo}>
                <Text style={styles.customerText}>{__('New Customer?')}</Text>
                <TouchableOpacity onPress={() => { navigate('PublicCreateAccount') }}>
                  <Text style={styles.createBtnText}>{__('Create Account')}</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
          <Image source={require('@asset/images/car.png')} style={styles.bgImg} />

        </Content>

      </View>
    </Container>
  }
}
