import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import Header from '../Header'
import SkillsSection from '../SkillsSection'
import SimilarJobDetails from '../SimilarJobDetails'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: {},
    lifeAtCompany: {},
    skillsList: [],
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }
      const updatedLifeAtJob = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }
      const updatedSimilar = data.similar_jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      const updatedSkills = data.job_details.skills.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
        name: each.name,
      }))
      this.setState({
        jobDetails: updatedDetails,
        lifeAtCompany: updatedLifeAtJob,
        skillsList: updatedSkills,
        similarJobs: updatedSimilar,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.initial:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  renderLoader = () => (
    <div className="job-loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {jobDetails, skillsList, lifeAtCompany, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails
    const {imageUrl, description} = lifeAtCompany

    return (
      <>
        <div className="job-item-container">
          <div className="sample-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div>
              <h1 className="company-name">{title}</h1>
              <div className="sample-container">
                <FaStar className="star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="details-container">
            <div className="sample-container">
              <div className="sample-container">
                <MdLocationOn className="location" />
                <p className="location">{location}</p>
              </div>
              <div className="sample-container">
                <BsFillBriefcaseFill className="location" />
                <p className="paragraph">{employmentType}</p>
              </div>
            </div>
            <p className="rating">{packagePerAnnum}</p>
          </div>
          <hr className="hor" />
          <div className="details-container">
            <h1 className="company-name">Description</h1>
            <button type="button" className="visit-btn">
              <a
                href={companyWebsiteUrl}
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                Visit
              </a>
              <FaExternalLinkAlt className="visit-link" />
            </button>
          </div>
          <p className="company-description">{jobDescription}</p>
          <h1 className="company-name">Skills</h1>
          <ul className="skills-container">
            {skillsList.map(each => (
              <SkillsSection key={each.name} skillsDetails={each} />
            ))}
          </ul>
          <h1 className="company-name">Life at Company</h1>
          <div className="life-container">
            <p className="life-description">{description}</p>
            <img src={imageUrl} alt="life at company" className="life-img" />
          </div>
        </div>
        <h1 className="similar-name">Similar Jobs</h1>
        <ul className="similar-container">
          {similarJobs.map(each => (
            <SimilarJobDetails key={each.id} similarDetails={each} />
          ))}
        </ul>
      </>
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
      <button type="button" className="retry-btn" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  retry = () =>
    this.setState({apiStatus: apiStatusConstants.initial}, this.getJobDetails)

  render() {
    return (
      <>
        <Header />
        <div className="job-details-container">{this.renderDetails()}</div>
      </>
    )
  }
}

export default JobItemDetails
