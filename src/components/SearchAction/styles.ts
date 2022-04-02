import { StyleSheet } from 'react-native'

import { CSS } from 'stitches-native'

import { colorMode } from 'helper/mode'

export const searcherStyles = StyleSheet.create({
  view: {
    position: 'relative',
    width: '100%'
  }
})

export const containerStyle: CSS = {
  borderWidth: 1
}

export const overlayStyle: CSS = {
  position: 'absolute',
  top: 0,
  left: 0,
  br: '$full',
  backgroundColor: colorMode('$white', '$dark')
}
