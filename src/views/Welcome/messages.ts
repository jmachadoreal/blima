import darkLocationAnimation from 'animation/dark/steps/location.json'
import darkNotificationAnimation from 'animation/dark/steps/notification.json'
import darkWelcomeAnimation from 'animation/dark/steps/welcome.json'
import lightLocationAnimation from 'animation/light/steps/location.json'
import lightNotificationAnimation from 'animation/light/steps/notification.json'
import lightWelcomeAnimation from 'animation/light/steps/welcome.json'

export default [
  {
    key: 0,
    description: 'Com o Blima, a previsão do tempo cabe no seu bolso.',
    lightAnimation: lightWelcomeAnimation,
    darkAnimation: darkWelcomeAnimation
  },
  {
    key: 1,
    description: 'Ative sua localização e obtenha informações da sua região.',
    lightAnimation: lightLocationAnimation,
    darkAnimation: darkLocationAnimation
  },
  {
    key: 2,
    description:
      'Ative as notificações para receber alertas de mudanças climáticas.',
    lightAnimation: lightNotificationAnimation,
    darkAnimation: darkNotificationAnimation
  }
]
