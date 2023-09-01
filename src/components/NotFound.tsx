import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

export const NotFound = () => {
  return (
    <div className='w-full flex item-center justify-center'>
      <div className='w-2/4 rounded-md flex flex-row items-center justify-center space-x-3 bg-gitRed p-2'>
        <FontAwesomeIcon fontSize='1.8rem' icon={faCircleExclamation} />
        <p className='text-center font-mono font-bold text-lg'>User Not Found</p>
      </div>
    </div>
  )
}
