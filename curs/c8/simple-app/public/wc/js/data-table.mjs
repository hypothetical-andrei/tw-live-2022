class DataTable extends HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.wrapper = document.createElement('div')
    this.wrapper.setAttribute('class', 'data-table')
    const style = document.createElement('style')
    style.textContent = `
      .data-table {
        color: lightblue;
      }
    `
    this.shadowRoot.append(style, this.wrapper) 
    this.onAdd = this.getAttribute('onAdd')
    this.onUpdate = this.getAttribute('onUpdate')
    this.onDelete = this.getAttribute('onDelete')
  
  }

  connectedCallback () {
    this.data = JSON.parse(this.getAttribute('data-content'))
    const columns = this.getAttribute('columns')
    if (this.data) {
      this.wrapper.innerHTML = ''
      this.data.forEach(e => {
        const row = document.createElement('data-row')
        row.setAttribute('columns', JSON.stringify(columns))
        row.setAttribute('data-content', JSON.stringify(e))
        this.wrapper.appendChild(row)
      })
      const form = document.createElement('add-form')
      form.onAdd = this.onAdd
      this.wrapper.appendChild(form)
    }
  }

    static get observedAttributes() {
      return ['data-content']
    }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'data-content') {
      this.data = JSON.parse(newValue)
      const columns = this.getAttribute('columns')
      this.wrapper.innerHTML = ''
      this.data.forEach(e => {
        const row = document.createElement('data-row')
        row.setAttribute('columns', JSON.stringify(columns))
        row.setAttribute('data-content', JSON.stringify(e))
        this.wrapper.appendChild(row)
      })
      const form = document.createElement('add-form')
      this.wrapper.appendChild(form)
    }
  }
}

customElements.define('data-table', DataTable)
