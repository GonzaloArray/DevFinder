import Header from './components/Header'
import SearchField from './components/SearchField'
import Card from './components/Card'
import History from './components/History'
import Footer from './components/Footer'
import { SearchIcon } from './icon/Search.icon'
import { NotFound } from './components/NotFound'
import { useGithubSearch } from './hook/useGithubSearch'

const App = () => {
  const {
    user,
    searchUser,
    history,
    isLoading,
    error,
    openModal,
    fav,
    handleSubmit,
    handleOnChange,
    handleFav,
    handleToggleModal,
    deleteHistory
  } = useGithubSearch()

  return (
    <main className='grid h-screen w-screen'>
      <div className='flex flex-col h-full p-5 sm:w-[520px] space-y-5 m-auto justify-center'>
        <div className='flex flex-col space-y-5'>
          <Header />
          <SearchField
            handleToggleModal={handleToggleModal}
            searchUser={searchUser}
            onHandleSubmit={handleSubmit}
            onHandlerChange={handleOnChange}
          />
        </div>
        {error && <NotFound />}
        {user.login && <Card data={user} isLoading={isLoading} />}
        <div className='flex item-center justify-center w-full' role='status'>
          {isLoading
            ? <SearchIcon />
            : (
              <p className='text-center font-mono text-white text-sm'>
                Search for a developer by their username
              </p>
              )}
        </div>
        <Footer />
      </div>
      <History
        cleanHistory={deleteHistory}
        closeModal={handleToggleModal}
        fav={fav}
        handleFav={handleFav}
        historyData={history}
        openModal={openModal}
      />
    </main>
  )
}

export default App
