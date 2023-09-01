const Footer = () => {
  const date = new Date().getFullYear()

  return (
    <div className='px-10'>
      <p className='text-center text-xs text-gitGray font-mono'>{`${date} - Designed and developed with ❤️ - `}<a className='hover:text-gitBlue hover:underline' href='https://www.linkedin.com/in/gonzalo-arrayaran-778258186/' rel='noreferrer' target='_blank'>Gonzalo Arrayaran</a></p>
    </div>
  )
}

export default Footer
