function PropsChild (props) {
    const { item } = props

    return (
        <div>
            i have id {item.id} and content {item.description}
        </div>
    )
  }
  
  export default PropsChild
  