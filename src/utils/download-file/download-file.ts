export const downloadFile = (url: string, name: string) => {
  const a = document.createElement('a')

  a.href = url
  a.download = name
  a.click()
}
