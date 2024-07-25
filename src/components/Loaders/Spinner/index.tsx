import './styles.css'

import SpinnerImage from '@/assets/images/loaders/loader-0.svg'

const Spinner = () => {
  return (
    <div className={'Spinner'}>
      <img src={SpinnerImage} alt='Indicator' />
    </div>
  )
}

export default Spinner
