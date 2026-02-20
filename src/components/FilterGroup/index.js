import './index.css'

const FilterGroup = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    changeEmployment,
    employmentList,
    changeSalary,
  } = props

  return (
    <>
      <hr className="hr-line" />
      <h1 className="company-name">Type of Employment</h1>
      <ul className="filter-top">
        {employmentTypesList.map(each => {
          const clickCheckbox = event => {
            if (event.target.checked) {
              employmentList.push(event.target.value)
            } else {
              employmentList.pop(event.target.value)
            }
            return changeEmployment(employmentList)
          }

          return (
            <li key={each.employmentTypeId} className="filter-item">
              <input
                value={each.employmentTypeId}
                type="checkbox"
                id={each.employmentTypeId}
                onClick={clickCheckbox}
                className="checkbox"
              />
              <label htmlFor={each.employmentTypeId} className="filter-name">
                {each.label}
              </label>
            </li>
          )
        })}
      </ul>
      <hr className="hr-line" />
      <h1 className="company-name">Salary Range</h1>
      <ul className="filter-top">
        {salaryRangesList.map(each => {
          const clickRadio = event => {
            changeSalary(event.target.value)
          }

          return (
            <li key={each.salaryRangeId} className="filter-item">
              <input
                value={each.salaryRangeId}
                type="radio"
                id={each.salaryRangeId}
                onChange={clickRadio}
                className="radio"
                name="filter"
              />
              <label htmlFor={each.salaryRangeId} className="filter-name">
                {each.label}
              </label>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default FilterGroup
