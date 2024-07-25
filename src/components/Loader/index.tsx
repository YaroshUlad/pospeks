import { forwardRef, ReactNode } from 'react'

import classNames from 'classnames'
import './styles.css'

import Spinner from '@/components/Loaders/Spinner'

interface LoaderProps {
  classname?: string
  children: ReactNode
}

const Loader = forwardRef<HTMLDivElement, LoaderProps>(({ classname, children }, ref) => {
  return (
    <div ref={ref} className={classNames('Loader', classname)}>
      {children}
    </div>
  )
})

Loader.displayName = 'Loader'

export default Object.assign(Loader, { Spinner })
