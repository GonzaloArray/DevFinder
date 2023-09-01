export const getUserGithub = async (searchUser: string) => {
  try {
    const res = await fetch(`https://api.github.com/users/${searchUser}`)

    if (res.ok) {
      const userData = await res.json()

      return userData
    } else {
      throw new Error(`GitHub API error: ${res.status} - ${res.statusText}`)
    }
  } catch (error) {
    return null
  }
}
