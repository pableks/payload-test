import React from 'react'

interface LinkData {
  label?: string
  [key: string]: unknown
}

interface RowLabelProps {
  data: {
    link?: LinkData
    [key: string]: unknown
  }
}

export const RowLabel: React.FC<RowLabelProps> = ({ data }) => {
  return (
    <div>
      {data?.link?.label && <span>{data.link.label}</span>}
      {!data?.link?.label && <span>Link</span>}
    </div>
  )
}
