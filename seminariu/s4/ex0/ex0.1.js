import fetch from 'node-fetch'

function getObjectFromUrl (url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.text())
      .then(text => resolve(JSON.parse(text)))
      .catch(error => reject(error))
  })
}
// 2e0b398b 
async function getFlight (key) {
  let flight = {}
  try {
    const response = await getObjectFromUrl(`https://data-live.flightradar24.com/clickhandler/?version=1.5&flight=${key}`)
    flight  = {
      airline: response?.airline?.name,
      from: response?.airport?.origin?.name,
      to: response?.airport?.destination?.name
    }
  } catch (error) {
    console.warn(error)
  } finally {
    return flight
  }
}

async function getFlights () {
  const flights = []
  const object = await getObjectFromUrl('https://data-cloud.flightradar24.com/zones/fcgi/feed.js?faa=1&bounds=45.893,42.786,23.917,27.443&satellite=1&mlat=1&flarm=1&adsb=1&gnd=1&air=1&vehicles=1&estimated=1&maxage=14400&gliders=1&stats=1')
  for (const key in object) {
    if (typeof object[key] === 'object') {
      const flight = await getFlight(key)
      if (flight.airline && flight.from && flight.to) {
         flights.push(flight)
      }
    }
  }
  return flights.sort((first, second) => first.airline.toLowerCase() < second.airline.toLowerCase() ? -1 : (first.airline.toLowerCase() > second.airline.toLowerCase() ? 1 : 0))
}

async function main () {
  const flights = await getFlights()
  flights.forEach(flight => console.log(flight))
}

main()