export const getMainTranslation = (main: string) => {
  switch (main) {
    case 'Thunderstorm':
      return 'Trovoada'
    case 'Drizzle':
      return 'Chuva leve'
    case 'Rain':
      return 'Chuva'
    case 'Snow':
      return 'Neve'
    case 'Clear':
      return 'Ensolarado'
    case 'Clouds':
      return 'Nublado'
    default:
      return ' '
  }
}
