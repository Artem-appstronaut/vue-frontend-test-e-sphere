const decodeHTML = (encoded: string) => {
  const txt = document.createElement('textarea')
  txt.innerHTML = encoded

  return txt.value
}

export default decodeHTML
