function FirstChild (props) {
  const { childName, increase } = props

  return (
    <div>
      i am {childName}
      <input type='button' value='+' onClick={evt => increase()} />
    </div>
  )

}

export default FirstChild