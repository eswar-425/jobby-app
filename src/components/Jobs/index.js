import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ProfileSection from '../ProfileSection'
import JobCard from '../JobCard'
import FilterGroup from '../FilterGroup'
import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    searchInput: '',
    apiStatus: apiStatusConstant.initial,
    jobsList: [],
    employmentList: [],
    salaryRange: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstant.initial})
    const {searchInput, employmentList, salaryRange} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?search=${searchInput}&minimum_package=${salaryRange}&employment_type=${employmentList.join(
      ',',
    )}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        title: each.title,
        rating: each.rating,
        packagePerAnnum: each.package_per_annum,
      }))
      this.setState({
        apiStatus: apiStatusConstant.success,
        jobsList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  changeSearchInput = event => this.setState({searchInput: event.target.value})

  renderJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.initial:
        return this.renderLoader()
      case apiStatusConstant.success:
        return this.renderJobCard()
      case apiStatusConstant.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  changeJobs = () => {
    this.getJobs()
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobCard = () => {
    const {jobsList} = this.state

    if (jobsList.length === 0) {
      return (
        <div className="failure-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="failure-img"
          />
          <h1 className="failure-name">No Jobs Found</h1>
          <p className="failure-desc">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    }

    return (
      <ul className="job-card-container">
        {jobsList.map(each => (
          <JobCard key={each.id} jobCard={each} />
        ))}
      </ul>
    )
  }

  renderFailure = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-name">Oops! Something Went Wrong</h1>
      <p className="failure-desc">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry-btn" onClick={this.reload}>
        Retry
      </button>
    </div>
  )

  reload = () =>
    this.setState({apiStatus: apiStatusConstant.initial}, this.getJobs)

  changeEmployment = listOfEmp =>
    this.setState({employmentList: listOfEmp}, this.getJobs)

  changeSalary = salaryId =>
    this.setState({salaryRange: salaryId}, this.getJobs)

  render() {
    const {searchInput, employmentList} = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="side-container">
            <div className="search-container">
              <input
                type="search"
                value={searchInput}
                placeholder="Search"
                onChange={this.changeSearchInput}
                className="search"
              />
              <button
                type="button"
                onClick={this.changeJobs}
                data-testid="searchButton"
                className="search-btn"
              >
                <BsSearch className="search-icon" onClick={this.changeJobs} />
              </button>
            </div>
            <ProfileSection />
            <FilterGroup
              employmentTypesList={employmentTypesList}
              employmentList={employmentList}
              changeEmployment={this.changeEmployment}
              salaryRangesList={salaryRangesList}
              changeSalary={this.changeSalary}
            />
          </div>
          <div className="right-container">
            <div className="desktop-search">
              <input
                type="search"
                value={searchInput}
                placeholder="Search"
                onChange={this.changeSearchInput}
                className="search-input"
              />
              <button
                type="button"
                onClick={this.changeJobs}
                data-testid="searchButton"
                className="search-btn"
              >
                <BsSearch className="desktop-icon" />
              </button>
            </div>
            {this.renderJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
