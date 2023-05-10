
import React from 'react'
import { } from 'react-native'
import { Container, Content, Text, View } from 'native-base'

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
      <Header navLeftType='back' statusBarType='dark' showNavRight />
      <Content contentContainerStyle={theme.layoutDf}>
        <View style={styles.bgMainLayout}>
          <View style={styles.bgCover}>
            <Text style={styles.aboutTitle}>{__('Acerca de')}</Text>
            <Text style={styles.aboutText}>{__(' Esta aplicación esta destinada para el registro del kilometraje de la unidad o las unidades asignadas al usuario en sesión. ')}</Text>            
            <Text style={styles.aboutText}>{__(' Cualquier comentario o duda al respecto enviar un correo a jorodriguez@ihsa.mx')}</Text>            
          </View>
        </View>
      </Content>

    </Container>
  }
}
