import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import styles from '../../styles/User.module.css'

const User = ({ user }: any) => {
  const router = useRouter()
  const { id } = router.query

  if (!user) return <div>Loading...</div>

  console.log('UserBYID:', user)

  return (
    <div className={styles.container}>
      <h1>
        {user.name.first} {user.name.last}
      </h1>
      <p>Age: {user.dob.age}</p>
      <p>Gender: {user.gender}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>
        Address: {user.location.street.name}, {user.location.city},{' '}
        {user.location.country}
      </p>
      <Link href='/' legacyBehavior>
        <a>Back to Home</a>
      </Link>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const { id } = context.params
  const response = await axios.get(`https://randomuser.me/api/`, {
    params: {
      seed: id,
      results: 1,
      inc: 'name,dob,gender,email,phone,location,login',
    },
  })
  const user = response.data.results[0]

  return {
    props: { user },
  }
}

export default User
