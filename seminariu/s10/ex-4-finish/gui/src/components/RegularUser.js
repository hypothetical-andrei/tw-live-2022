import './RegularUser.css'

function User (props) {
  const { item } = props

  return (
    <div className='regular-user'>
      <div className='username'>
        {item.username}
      </div>
      <div className='fullName'>
        {item.fullName}
      </div>
      Regular user
    </div>
  )
}

export default User
