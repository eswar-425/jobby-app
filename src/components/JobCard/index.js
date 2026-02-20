import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobCard} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    title,
    rating,
    packagePerAnnum,
  } = jobCard

  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="job-item">
        <div className="sample-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
              <p className="paragraph">{location}</p>
            </div>
            <div className="sample-container">
              <BsFillBriefcaseFill className="location" />
              <p className="paragraph">{employmentType}</p>
            </div>
          </div>
          <p className="rating">{packagePerAnnum}</p>
        </div>
        <hr className="hor" />
        <h1 className="company-name">Description</h1>
        <p className="company-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
