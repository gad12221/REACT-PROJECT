import { BarLoader, CircleLoader, MoonLoader, RingLoader } from 'react-spinners'

const Spinner = () => {
  return (
    <div className='flex flex-col items-center gap-5 mt-2'>

      <MoonLoader
        color="#1bcac0"
        cssOverride={null}
        loading
        size={47}
        speedMultiplier={1}
      />
    </div>
  )
}

export default Spinner