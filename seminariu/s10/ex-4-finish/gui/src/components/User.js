import './User.css'
import RegularUser from './RegularUser'
import PowerUser from './PowerUser'

function User (props) {
  const { item } = props

  return (
    <div className='user'>
      {
        item.type === 'regular-user'
          ? (
            <RegularUser item={item} />
            )
          : (
            <PowerUser item={item} />
            )
      }
    </div>
  )
}

export default User
