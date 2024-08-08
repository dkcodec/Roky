import Link from 'next/link'
import styles from '../styles/Home.module.css'

interface UserCardProps {
  user: any
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <li className={styles.userCard}>
      <Link href={`/user/${user.login.uuid}`} legacyBehavior>
        <a>
          {user.name.first} {user.name.last}
        </a>
      </Link>
    </li>
  )
}

export default UserCard
