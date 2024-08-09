import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

interface UserCardProps {
  user: any
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <li>
      <Link href={`/user/${user.login.uuid}`} legacyBehavior>
        <a className={styles.userCard}>
          <Image
            src={user.picture?.large}
            alt='User image'
            width={50}
            height={50}
            className={styles.userImage}
          />
          <span className={styles.userName}>
            {user.name.first} {user.name.last}
          </span>
        </a>
      </Link>
    </li>
  )
}

export default UserCard
