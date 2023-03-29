import React, { Component } from 'react'
import { Image, TouchableOpacity, ScrollView } from 'react-native'
import { Text, Icon, View } from 'native-base'

import * as MENU from './Menu'

import styles from './styles'
import { closeDrawer, navigate } from '@utility/navigation'

import { __ } from '@utility/translation'
import request from '@utility/request'
import { bind } from '@utility/component'

class MenuLeft extends Component {
  constructor (props) {
    super(props)
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    }
    this.renderMenuList = this.renderMenuList.bind(this)
  }

  renderMenuList (menus) {
    return menus.map((menu) => {
      return <TouchableOpacity style={styles.item} underlayColor='transparent' onPress={() => {
        closeDrawer()
        navigate(menu.route)
      }}
      >
        <View style={styles.col}>
          <Icon name={menu.iconName} type={menu.iconType || 'FontAwesome'} style={styles.navBtnIcon} />
        </View>
        <Text style={styles.navBtnText}>{__(menu.name)}</Text>
      </TouchableOpacity>
    })
  }

  render () {
    return (
      <View style={styles.nav}>
        <View style={styles.navProfile}>
          <View style={styles.navCol}>
            <Image source={{ uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }} style={styles.navAvatar} />
            <View>
              <Text style={styles.navName}>{__('Salma Hayeke')}</Text>
              <Text style={styles.navDesc}>{__('New York')}</Text>
            </View>
          </View>
        </View>
        <View style={styles.navMenu}>
          <ScrollView>
            {this.renderMenuList(MENU.Data1)}
          </ScrollView>
        </View>
      </View>

    )
  }
}

export default MenuLeft
