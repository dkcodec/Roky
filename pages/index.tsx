import { useState, useEffect } from 'react'
import axios from 'axios'
import UserCard from '../components/UserCard'
import SearchBar from '../components/SearchBar'
import styles from '../styles/Home.module.css'

const Home = () => {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [page, searchTerm])

  const fetchUsers = async () => {
    const response = await axios.get(
      `https://randomuser.me/api/?page=${page}&results=10&seed=abc&name=${searchTerm}`
    )
    setUsers(response.data.results)
  }

  return (
    <div className={styles.container}>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ul className={styles.userList}>
        {users.map((user: any) => (
          <UserCard key={user.login.uuid} user={user} />
        ))}
      </ul>
      <div className={styles.pagination}>
        <button
          className={styles.userButton}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <button className={styles.userButton} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  )
}

export default Home
