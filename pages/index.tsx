import { useState, useEffect } from 'react'
import axios from 'axios'
import UserCard from '../components/UserCard'
import SearchBar from '../components/SearchBar'
import styles from '../styles/Home.module.css'

const Home: React.FC = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [page])

  useEffect(() => {
    filterUsers()
  }, [searchTerm, users])

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`https://randomuser.me/api/`, {
        params: {
          page,
          results: 10,
          seed: 'abc',
          inc: 'name,login,picture',
        },
      })
      setUsers(response.data.results)
      setFilteredUsers(response.data.results)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const filterUsers = () => {
    if (!searchTerm) {
      setFilteredUsers(users)
      return
    }

    const filtered = users.filter((user: any) =>
      `${user.name.first} ${user.name.last}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    setFilteredUsers(filtered)
  }

  return (
    <div className={styles.container}>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ul className={styles.userList}>
        {filteredUsers.map(
          (user: any) => (
            console.log('User:', user),
            (<UserCard key={user.login.uuid} user={user} />)
          )
        )}
      </ul>
      <div className={styles.pagination}>
        <button
          className={styles.userButton}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          {'<'} Previous
        </button>
        <button className={styles.userButton} onClick={() => setPage(page + 1)}>
          Next {'>'}
        </button>
      </div>
    </div>
  )
}

export default Home
