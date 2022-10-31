import fetch from 'node-fetch'

function getObjectFromUrl (url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.text())
      .then(text => resolve(JSON.parse(text)))
      .catch(error => reject(error))
  })
}

function getCountryBounds (country) {
  return new Promise((resolve, reject) => {
    getObjectFromUrl(`https://nominatim.openstreetmap.org/search?q=${country}&format=json`)
      .then(object => resolve({
        minLatitude: object[0].boundingbox[0],
        maxLatitude:  object[0].boundingbox[1],
        minLongitude: object[0].boundingbox[2],
        maxLongitude: object[0].boundingbox[3]
      }))
  })
}

function main () {
  getCountryBounds('romania')
    .then(bounds => console.log(bounds))
}

main()