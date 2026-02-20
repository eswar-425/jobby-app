import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProfileSection extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    profileDetails: {},
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const profile = fetchedData.profile_details
      const updatedData = {
        profileImageUrl: profile.profile_image_url,
        name: profile.name,
        shortBio: profile.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfile = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails

    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-logo" />
        <h1 className="profile-name">{name}</h1>
        <p className="short-bio">{shortBio}</p>
      </div>
    )
  }

  clickRetry = () => {
    this.setState({apiStatus: apiStatusConstants.initial}, this.getProfile)
  }

  renderFailure = () => (
    <div className="loader">
      <button type="button" className="retry-btn" onClick={this.clickRetry}>
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.initial:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderProfile()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }
}

export default ProfileSection
