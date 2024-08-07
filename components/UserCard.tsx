import Link from 'next/link'
import styles from '../styles/Home.module.css'

interface UserCardProps {
  user: any
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <li className={styles.userCard}>
      <Link href={`/user/${user.login.uuid}`} legacyBehavior>
        <span className={styles.userLinks}>
          {user.name.first} {user.name.last}
        </span>
      </Link>
    </li>
  )
}

export default UserCard
