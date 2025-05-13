import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
}

export const Logo: React.FC<Props> = ({ className }) => {
  return (
    <div className={clsx('flex items-center', className)}>
      <span className="text-blue-600 font-bold text-xl mr-2">SAVA</span>
      <span className="text-blue-500 text-sm">Servicios Financieros</span>
    </div>
  )
}
