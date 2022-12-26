import './User.css'

function User (props) {
  const { item } = props

  return (
    <div className='user'>
      <div className='username'>
        {item.username}
      </div>
      <div className='fullName'>
        {item.fullName}
      </div>
    </div>
  )
}

export default User
