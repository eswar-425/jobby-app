import './index.css'

const SkillsSection = props => {
  const {skillsDetails} = props
  const {imageUrl, name} = skillsDetails

  return (
    <li className="skills-item">
      <img src={imageUrl} alt={name} className="skill-img" />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default SkillsSection
