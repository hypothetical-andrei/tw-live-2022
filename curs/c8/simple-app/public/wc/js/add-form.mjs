class AddForm extends HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.wrapper = document.createElement('div')
    this.wrapper.setAttribute('class', 'add-form')
    const style = document.createElement('style')
    style.textContent = `
      .add-form {
        color: lightgreen;
      }
    `

    this.content = this.wrapper.appendChild(document.createElement('div'))
    this.content.innerHTML = `
      <div>
        <input type="text" id="title" />
        <input type="text" id="content" />
        <input type="button" value="+" id="btn"/>
      </div>
    `
    this.shadowRoot.append(style, this.wrapper) 

  }

  connectedCallback () {
    const title = this.shadowRoot.getElementById('title')
    const content = this.shadowRoot.getElementById('content')
    const btn = this.shadowRoot.getElementById('btn')
    btn.onclick = async () => {
      const payload = {
        title: title.value,
        content: content.value
      }
      const evt = new Event('add', { composed: true, bubbles: true })
      evt.payload = payload
      this.dispatchEvent(evt)    
    }
  }

}

customElements.define('add-form', AddForm)
