import React from 'react'
import { StatusBar, TouchableOpacity, Image, TextInput, CheckBox } from 'react-native'
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
      <View style={styles.bg} />
      <View style={styles.bgCover} />
      <View style={styles.bgLayout}>
        <TouchableOpacity style={styles.actBarBtn} onPress={() => { navigate('PublicIntro') }}>
          <Icon name='arrowleft' type='AntDesign' style={[theme.huge, theme.light]} />
        </TouchableOpacity>
        <Content contentContainerStyle={styles.layoutDf}>
          <View style={styles.accountContainer}>
            <Text style={styles.accountTitle}>{__('Create an Account')}</Text>
            <View>
              <Text style={styles.formText}>{__('NAME')}</Text>
              <View style={styles.formRow}>
                <TextInput
                  placeholder='Bravo Jack'
                  placeholderTextColor='rgba(211, 211, 217, 1)'
                  style={styles.formInput}
                />
                <Icon name='user' type='FontAwesome' style={[theme.huge, theme.smoke]} />
              </View>
              <Text style={styles.formText}>{__('EMAIL ADDRESS')}</Text>
              <View style={styles.formRow}>
                <TextInput
                  placeholder='someone@gmail.com'
                  placeholderTextColor='rgba(211, 211, 217, 1)'
                  style={styles.formInput}
                />
                <Icon name='mail' type='Foundation' style={[theme.huge, theme.smoke]} />
              </View>
              <Text style={styles.formText}>{__('MOBILE NUMBER')}</Text>
              <View style={styles.formRow}>
                <TextInput
                  placeholder='+44 64576892'
                  placeholderTextColor='rgba(211, 211, 217, 1)'
                  style={styles.formInput}
                />
                <Icon name='mobile1' type='AntDesign' style={[theme.huge, theme.smoke]} />
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
              <View style={styles.conditionInfo}>
                <CheckBox checked={false} color='green' />
                <View>
                  <Text style={styles.conditionText}>{__('I Agree Terms & Conditions')}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.createBtn} onPress={() => { navigate('PublicHome') }}>
                <Text style={styles.createBtnText}>{__('CREATE ACCOUNT')}</Text>
                <Icon name='arrowright' type='AntDesign' style={[theme.huge, theme.light]} />
              </TouchableOpacity>
              <View style={styles.signInInfo}>
                <Text style={styles.signInText}>{__('Already a Member?')}</Text>
                <TouchableOpacity onPress={() => { navigate('PublicSignIn') }}>
                  <Text style={styles.signInBtnText}>{__('Sign In')}</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </Content>

      </View>
    </Container>
  }
}
