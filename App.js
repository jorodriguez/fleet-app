import React from 'react'
import { Dimensions } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

/* Drawer Menu */

import DrawerContent from '@component/Menu/Left'

import PublicLanguage from '@screen/Public/Language'

/** Public **/

import PublicHome from '@screen/Public/Home'
import PublicMyAccount from '@screen/Public/MyAccount'
import PublicOrder from '@screen/Public/Order'
import PublicProfile from '@screen/Public/Profile'
import PublicPackage from '@screen/Public/Package'
import PublicMemberShip from '@screen/Public/MemberShip'
import PublicBooking from '@screen/Public/Booking'
import PublicVerifyEmail from '@screen/Public/VerifyEmail'
import PublicVerifyCode from '@screen/Public/VerifyCode'
import PublicSignIn from '@screen/Public/SignIn'
import PublicResetPassword from '@screen/Public/ResetPassword'
import PublicRateApp from '@screen/Public/RateApp'
import PublicIntro from '@screen/Public/Intro'
import PublicForgotPassword from '@screen/Public/ForgotPassword'
import PublicCreateAccount from '@screen/Public/CreateAccount'
import PublicChangePassword from '@screen/Public/ChangePassword'
import PublicPasswordSuccess from '@screen/Public/PasswordSuccess'
import PublicConfirmation from '@screen/Public/Confirmation'
import PublicAboutUs from '@screen/Public/AboutUs'
import PublicSplash from '@screen/Public/Splash'

/* Navigation */

import { navigationRef } from '@utility/navigation'
import { setDefaultLocale } from '@utility/translation'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const { width } = Dimensions.get('window')

const forFade = ({ current, closing }) => ({
  cardStyle: {
    opacity: current.progress
  }
})

const options = {
  cardStyleInterpolator: forFade
}

function DrawerRoot () {
  return (
    <Drawer.Navigator
      initialRouteName='PublicSplash'
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerStyle={{ width: width - 100 }}
    >
      <Drawer.Screen name='PublicSignIn' component={PublicSignIn} />
      <Drawer.Screen name='PublicSplash' component={PublicSplash}  />
      
     </Drawer.Navigator>
  )
}

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isAppInitiated: false
    }

    this.checkIsAppInitiated = this.checkIsAppInitiated.bind(this)
  }

  async componentDidMount () {
    await this.checkIsAppInitiated()
  }

  async checkIsAppInitiated () {
    await setDefaultLocale()
    this.setState({
      isAppInitiated: true
    })
  }

  render () {
    if (!this.state.isAppInitiated) {
      return null
    }

    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName='Drawer' headerMode='none'>
          <Stack.Screen name='Drawer' component={DrawerRoot} />

          <Drawer.Screen name='PublicSplash' component={PublicSplash}  options={options}/>
          <Stack.Screen name='PublicLanguage' component={PublicLanguage} options={options} />          

          
          <Stack.Screen name='PublicHome' component={PublicHome} options={options} />
          <Stack.Screen name='PublicMyAccount' component={PublicMyAccount} options={options} />
          <Stack.Screen name='PublicOrder' component={PublicOrder} options={options} />
          <Stack.Screen name='PublicProfile' component={PublicProfile} options={options} />
          <Stack.Screen name='PublicPackage' component={PublicPackage} options={options} />
          <Stack.Screen name='PublicMemberShip' component={PublicMemberShip} options={options} />
          <Stack.Screen name='PublicBooking' component={PublicBooking} options={options} />
          <Stack.Screen name='PublicVerifyEmail' component={PublicVerifyEmail} options={options} />
          <Stack.Screen name='PublicVerifyCode' component={PublicVerifyCode} options={options} />
          <Stack.Screen name='PublicSignIn' component={PublicSignIn} options={options} />
          <Stack.Screen name='PublicResetPassword' component={PublicResetPassword} options={options} />
          <Stack.Screen name='PublicRateApp' component={PublicRateApp} options={options} />
          <Stack.Screen name='PublicIntro' component={PublicIntro} options={options} />
          <Stack.Screen name='PublicForgotPassword' component={PublicForgotPassword} options={options} />
          <Stack.Screen name='PublicCreateAccount' component={PublicCreateAccount} options={options} />
          <Stack.Screen name='PublicChangePassword' component={PublicChangePassword} options={options} />
          <Stack.Screen name='PublicPasswordSuccess' component={PublicPasswordSuccess} options={options} />
          <Stack.Screen name='PublicConfirmation' component={PublicConfirmation} options={options} />
          <Stack.Screen name='PublicAboutUs' component={PublicAboutUs} options={options} />

        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
