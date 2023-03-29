import React from 'react'
import { TouchableOpacity, Text, TextInput, Image } from 'react-native'
import { Container, Content, Icon, View } from 'native-base'

import styles from './styles'
import theme from '@theme/styles'

import Header from '@component/Header'

import { navigate } from '@utility/navigation'
import { __ } from '@utility/translation'
import request from '@utility/request'
import { bind } from '@utility/component'

export default class extends React.Component {
  render () {
    return <Container>
      <Header navLeftType='back' statusBarType='dark' />
      <Content contentContainerStyle={theme.layoutDf}>

        <View style={styles.profileContainer}>

          <View style={styles.profileDetail}>
            <View style={styles.profileHeader}>
              <Icon name='user' type='FontAwesome' style={[theme.extraHigantic, theme.dark]} />
              <View style={styles.profileHeaderInfo}>
                <Text style={styles.profileHeaderTitle}>{__('Profile')}</Text>
                <Text style={styles.profileHeaderText}>{__('Manage your profile informations')}</Text>
              </View>
            </View>
            <View style={styles.sectionWhite}>
              <View style={styles.editImg}>
                <View style={styles.bgImg}>
                  <Image source={{ uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }} style={styles.avatarImg} />
                  <TouchableOpacity style={styles.editBtn}>
                    <Icon name='pencil' type='EvilIcons' style={[theme.large, theme.greyDark]} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.profileForm}>
              <View>
                <View style={styles.formRow}>
                  <Text style={styles.formText}>{__('NAME')}</Text>
                  <View style={styles.formInfo}>
                    <TextInput
                      placeholder='Salma Hayeke'
                      placeholderTextColor='rgba(0,0,0,0.9)'
                      style={styles.formInput}
                    />
                    <Icon name='user' type='FontAwesome' style={[theme.extraHuge, theme.smoke]} />
                  </View>
                </View>
                <View style={styles.formRow}>
                  <Text style={styles.formText}>{__('PASSWORD')}</Text>
                  <View style={styles.formInfo}>
                    <TextInput
                      placeholder='salma.hayeke125@gmail.com'
                      placeholderTextColor='rgba(0,0,0,0.9)'
                      style={styles.formInput}
                    />
                    <Icon name='mail' type='Entypo' style={[theme.extraHuge, theme.smoke]} />
                  </View>
                </View>
                <View style={styles.formRow}>
                  <Text style={styles.formText}>{__('MOBILE NUMBER')}</Text>
                  <View style={styles.formInfo}>
                    <TextInput
                      placeholder='+91 954354248'
                      placeholderTextColor='rgba(0,0,0,0.9)'
                      keyboardType={'numeric'}
                      style={styles.formInput}
                    />
                    <Icon name='mobile' type='Entypo' style={[theme.extraHuge, theme.smoke]} />
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.saveBtn} onPress={() => { navigate('') }}>
                <Text style={styles.saveBtnText}>{__('SAVE')}</Text>
                <Icon name='arrowright' type='AntDesign' style={[theme.extraLarge, theme.light]} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Content>
    </Container>
  }
}
