import React from 'react'
import { TouchableOpacity, TextInput } from 'react-native'
import { Container, Content, Icon, Text, View } from 'native-base'

import styles from './styles'
import theme from '@theme/styles'

import { navigate } from '@utility/navigation'
import { __ } from '@utility/translation'
import request from '@utility/request'
import { bind } from '@utility/component'

import Header from '@component/Header'

export default class extends React.Component {
  render () {
    return <Container>
      <Header navLeftType='back' statusBarType='dark' />
      <Content contentContainerStyle={styles.layoutDf}>
        <View style={styles.bgLayout}>
          <View style={styles.bgCover}>
            <View style={styles.passwordContainer}>
              <View style={styles.passwordHeader}>
                <Icon name='lock' type='FontAwesome' style={[theme.extraBig, theme.dark]} />
                <View style={styles.changePasswordHeader}>
                  <Text style={styles.passwordHeaderTitle}>{__('Configuración')}</Text>
                  <Text style={styles.passwordHeaderText}>{__('Cambio de password')}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.formText}>{__('NUEVO PASSWORD')}</Text>
                <View style={styles.formRow}>
                  <TextInput
                    placeholder='* * * * * * * * * *'
                    placeholderTextColor='rgba(211, 211, 217, 1)'
                    style={styles.formInput}
                  />
                  <Icon name='lock' type='FontAwesome' style={[theme.huge, theme.smoke]} />
                </View>
                <Text style={styles.formText}>{__('CONFIRMA PASSWORD')}</Text>
                <View style={styles.formRow}>
                  <TextInput
                    placeholder='* * * * * * * * * *'
                    placeholderTextColor='rgba(211, 211, 217, 1)'
                    style={styles.formInput}
                  />
                  <Icon name='lock' type='FontAwesome' style={[theme.huge, theme.smoke]} />
                </View>
                <TouchableOpacity disabled style={styles.saveBtn}>
                  <Text style={styles.saveBtnText}>{__('SAVE')}</Text>
                  <Icon name='arrowright' type='AntDesign' style={[theme.huge, theme.light]} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Content>

    </Container>
  }
}
