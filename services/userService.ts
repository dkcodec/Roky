import axios from 'axios'

export const fetchUsers = async (page: number, searchTerm: string) => {
  const response = await axios.get(
    `https://randomuser.me/api/?page=${page}&results=10&seed=abc&name=${searchTerm}`
  )
  return response.data.results
}

export const fetchUserById = async (id: string) => {
  const response = await axios.get(`https://randomuser.me/api/?uuid=${id}`)
  return response.data.results[0]
}
