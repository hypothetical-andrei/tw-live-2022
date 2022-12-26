import './PowerUser.css'

function User (props) {
  const { item } = props

  return (
    <div className='power-user'>
      <div className='username'>
        {item.username}
      </div>
      <div className='fullName'>
        {item.fullName}
      </div>
      Power user
    </div>
  )
}

export default User
