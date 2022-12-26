import { SERVER } from './consts.mjs'

class DataStore {
  constructor (seed) {
    this.content = seed || []
  }

  async getItems () {
    const response = await fetch(`${SERVER}/books`)
    if (!response.ok) {
      throw response
    }
    const data = await response.json()
    this.content = data
  }

  async addItem (item) {
    const response = await fetch(`${SERVER}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
    if (!response.ok) {
      throw response
    } else {
      await this.getItems()
    }
  }

  async updateItem (id, item) {
    const response = await fetch(`${SERVER}/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
    if (!response.ok) {
      throw response
    } else {
      await this.getItems()
    }
  }
  
  async deleteItem (id) {
    const response = await fetch(`${SERVER}/books/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw response
    } else {
      await this.getItems()
    }
  }
}

export default DataStore