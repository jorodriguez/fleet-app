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
import { getUsuarioSesion } from '../../../services/Sesion';

export default class extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
          loading:false,
          usuarioSesion:{}  
    }
  }


  async componentDidMount () {
    
    const sesion  = await getUsuarioSesion();
    console.log("SESION "+ JSON.stringify(sesion));
    this.setState({
      usuarioSesion:sesion.usuarioSesion
    });

  }


  render () {
    
    const userPlaceholder =  require("../../../../assets/images/user_placeholder.jpg");

    return <Container>
      <Header navLeftType='back' statusBarType='dark' />
      <Content contentContainerStyle={theme.layoutDf}>

        <View style={styles.profileContainer}>

          <View style={styles.profileDetail}>
            <View style={styles.profileHeader}>              
              <View style={styles.profileHeaderInfo}>
                <Text style={styles.profileHeaderTitle}>{__('My Perfil')}</Text>
                <Text style={styles.profileHeaderText}>{__('Información de mi cuenta')}</Text>
              </View>
            </View>
            <View style={styles.sectionWhite}>
              <View style={styles.editImg}>
                <View style={styles.bgImg}>                  
                  <Image source={userPlaceholder} style={styles.avatarImg} />
                  <TouchableOpacity style={styles.editBtn}>
                    <Icon name='pencil' type='EvilIcons' style={[theme.large, theme.greyDark]} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.profileForm}>
              <View>
                <View style={styles.formRow}>
                  <Text style={styles.formText}>{__('NOMBRE')}</Text>
                  <View style={styles.formInfo}>
                    <TextInput
                      placeholder={`${this.state.usuarioSesion.nombre}`}
                      placeholderTextColor='rgba(0,0,0,0.9)'
                      style={styles.formInput}
                    />
                    <Icon name='user' type='FontAwesome' style={[theme.extraHuge, theme.smoke]} />
                  </View>
                </View>
                <View style={styles.formRow}>
                  <Text style={styles.formText}>{__('CORREO')}</Text>
                  <View style={styles.formInfo}>
                    <TextInput
                      placeholder={`${this.state.usuarioSesion.email}`}
                      placeholderTextColor='rgba(0,0,0,0.9)'
                      style={styles.formInput}
                    />
                    <Icon name='mail' type='Entypo' style={[theme.extraHuge, theme.smoke]} />
                  </View>
                </View>
                <View style={styles.formRow}>
                  <Text style={styles.formText}>{__('NUMERO')}</Text>
                  <View style={styles.formInfo}>
                    <TextInput
                      placeholder='+52'
                      placeholderTextColor='rgba(0,0,0,0.9)'
                      keyboardType={'numeric'}
                      style={styles.formInput}
                    />
                    <Icon name='mobile' type='Entypo' style={[theme.extraHuge, theme.smoke]} />
                  </View>
                </View>
              </View>
              <TouchableOpacity disabled style={styles.saveBtn} onPress={() => { navigate('') }}>
                <Text style={styles.saveBtnText}>{__('ACTUALIZAR')}</Text>
                <Icon name='check' type='AntDesign' style={[theme.extraLarge, theme.light]} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Content>
    </Container>
  }
}
