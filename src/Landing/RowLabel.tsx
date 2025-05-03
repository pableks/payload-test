import React from 'react'

export const RowLabel: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div>
      {data?.link?.label && <span>{data.link.label}</span>}
      {!data?.link?.label && <span>Link</span>}
    </div>
  )
}
