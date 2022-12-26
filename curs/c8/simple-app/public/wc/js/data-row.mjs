class DataRow extends HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.wrapper = document.createElement('div')
    this.wrapper.setAttribute('class', 'data-row')

    this.columns = []
    const style = document.createElement('style')
    style.textContent = `
      .data-row {
        color: lightgreen;
      }
    `

    this.shadowRoot.append(style, this.wrapper) 
  }

  connectedCallback () {
    this.data = JSON.parse(this.getAttribute('data-content'))
    this.columns = JSON.parse(this.getAttribute('columns'))
    this.wrapper.innerHTML = ''
    if (this.data) {
      Object.keys(this.data).forEach(e => {
        if (this.columns.indexOf(e) !== -1) {
          const cell = this.wrapper.appendChild(document.createElement('span'))
          cell.textContent = this.data[e]
        }
      })
      const btnDelete = document.createElement('button')
      btnDelete.innerHTML = 'del'
      btnDelete.onclick = () => {
        const evt = new Event('delete', { composed: true, bubbles: true })
        evt.id = this.data.id
        this.dispatchEvent(evt)
      }
      this.wrapper.appendChild(btnDelete)
    }
  }

  static get observedAttributes() {
    return ['data-content']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    this.data = JSON.parse(newValue)
    if (this.data) {
      this.wrapper.innerHTML = ''
      Object.keys(this.data).forEach(e => {
        if (this.columns.indexOf(e) !== -1) {
          const cell = this.wrapper.appendChild(document.createElement('span'))
          cell.textContent = this.data[e]
        }
      })
      const btnDelete = document.createElement('button')
      btnDelete.innerHTML = 'del'
      btnDelete.onclick = () => {
        const evt = new Event('delete', { composed: true, bubbles: true })
        evt.id = this.data.id
        this.dispatchEvent(evt)
      }
      this.wrapper.appendChild(btnDelete)
    }
  }
}

customElements.define('data-row', DataRow)
