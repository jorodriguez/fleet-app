import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { Icon, Text, View } from 'native-base'

import styles from './../styles'

import LinearGradient from 'react-native-linear-gradient'

import theme from '@theme/styles'
import { navigate } from '@utility/navigation'
import { __ } from '@utility/translation'

export default class extends React.Component {
  render () {
    
    const item = this.props.item;

    //const carImage = item.image ? { uri: item.image  } :  require("../../../../../assets/images/car-placeholder.png");
    const carImage =  require("../../../../../assets/images/car-placeholder2.png");

    return (
      <>
        <View style={styles.featureContainer}>
          <TouchableOpacity style={styles.featureContent} onPress={() => { navigate('PublicBooking',{ item }) }}>
          <Image source= {carImage} style={styles.featureImg} />
          <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.1)']} style={styles.linearGradient} />            
            
            <View style={styles.featureInfo}>
              <View>
                <Text style={styles.featureText}>{`${item.marca}  ${item.clase} ${item.modelo} ${item.color}` }</Text>
                <Text style={styles.featurePackageText}>{item.anio} {item.tipoTransmision} {item.tipoCilindraje} cil</Text>
                <Text style={styles.featurePackageText}>{item.tipoVehiculo}</Text>
              </View>
              <View style={styles.featureIcon}>
                <Icon name='arrowright' type='AntDesign' style={[theme.extraHuge, theme.light]} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </>
    )
  }
}
