import { View, Text, Alert } from 'react-native'
import React, { useEffect } from 'react'
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })

const App = () => {

  // rnBiometrics.createKeys()
  //     .then((resultObject) => {
  //         const { publicKey } = resultObject
  //         console.log('publicKey', publicKey)
  //     })

  const GetType = async () => {
    // rnBiometrics.createSignature({
    //     promptMessage: 'Sign in',
    //     payload: payload
    // })
    //     .then((resultObject) => {
    //         const { success, signature } = resultObject
    // 
    //         if (success) {
    //             console.log('signature', signature)
    //         }
    //     })

    rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
      .then((resultObject) => {
        const { success } = resultObject

        if (success) {
          console.log('successful biometrics provided')
          Alert.alert('Success', "successful biometrics provided")
        } else {
          Alert.alert('Error', "user cancelled biometric prompt")
          console.log('user cancelled biometric prompt')
        }
      })
      .catch(() => {
        Alert.alert('Error', "biometrics failed")
        console.log('biometrics failed')
      })

  }

  rnBiometrics.isSensorAvailable()
    .then((resultObject) => {
      const { available, biometryType } = resultObject

      if (available && biometryType === BiometryTypes.TouchID) {
        console.log('TouchID is supported')
      } else if (available && biometryType === BiometryTypes.FaceID) {
        console.log('FaceID is supported')
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        console.log('Biometrics is supported')
      } else {
        console.log('Biometrics not supported')
      }
    })

  useEffect(() => {
    GetType()
  }, [])

  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

export default App