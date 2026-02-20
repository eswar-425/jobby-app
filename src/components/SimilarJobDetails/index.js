import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobDetails = props => {
  const {similarDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarDetails

  return (
    <li className="similar-job-item-container">
      <div className="sample-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="company-name">Description</h1>
      <p className="company-description">{jobDescription}</p>
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
    </li>
  )
}

export default SimilarJobDetails
