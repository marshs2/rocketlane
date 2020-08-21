import React from 'react'
import './RocketGrid.css'

import './BodyCell.css'

const BodyCell = ({ row, columns, clickOptions }) => {
  const addAlternateClass = (row) => {
    if (row['id'] % 2 === 0) {
      return 'rocket-row-even'
    }
    return 'rocket-row-odd'
  }

  return (
    <>
      <tr className={`rocket-row ${addAlternateClass(row)}`}>
        {columns.map((column, i) => {
          const conditionalParams = {}
          // If the click option is passed, only then make it clickable.
          // Also, call the respective callback being passed into.
          if (
            clickOptions &&
            column.name in clickOptions &&
            typeof clickOptions[column.name] === 'function'
          ) {
            conditionalParams['onClick'] = (event) =>
              clickOptions[column.name](event, row)
            conditionalParams['data-row'] = row['id']
          }
          return (
            <td key={i} {...conditionalParams}>
              {row[column.name]}
            </td>
          )
        })}
      </tr>
    </>
  )
}

export default BodyCell
