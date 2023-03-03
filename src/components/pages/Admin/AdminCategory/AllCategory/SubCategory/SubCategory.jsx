import React from 'react'
import './SubCategory.scss'

export default function SubCategory({data}) {
  return (
    <div className="subCategoryItem">
    {data.name}
  </div>
  )
}
