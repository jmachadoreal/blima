export const removeEmpty = (obj: any) => {
  Object.keys(obj).forEach(key => {
    const value = obj[key]
    if (value === null || value === undefined) {
      delete obj[key]
    }
  })

  return obj
}
