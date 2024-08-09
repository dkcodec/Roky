import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import styles from '../../styles/User.module.css'
import Image from 'next/image'

const User = ({ user }: any) => {
  const router = useRouter()
  const { id } = router.query

  if (!user) return <div>Loading...</div>

  console.log('UserBYID:', user)

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Image
          src={user.picture.large}
          alt='User image'
          width={100}
          height={100}
          className={styles.image}
        />
        <h1>
          {user.name.first} {user.name.last}
        </h1>
      </div>
      <p>
        <b>Age:</b> {user.dob.age}
      </p>
      <p>
        <b>Gender:</b> {user.gender}
      </p>
      <p>
        <b>Email:</b> {user.email}
      </p>
      <p>
        <b>Phone:</b> {user.phone}
      </p>
      <p>
        <b>Address:</b> {user.location.street.name}, {user.location.city},{' '}
        {user.location.country}
      </p>
      <Link href='/' legacyBehavior>
        <a className={styles.backHome}>Back to Home</a>
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
      inc: 'name,dob,gender,email,phone,location,login,picture',
    },
  })
  const user = response.data.results[0]

  return {
    props: { user },
  }
}

export default User
