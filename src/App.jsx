import { Route, Routes } from 'react-router-dom'
import Homepage from './Homepage/Homepage.jsx'
import About from './About/About.jsx'
import Experience from './Experience/Experience.jsx'
import Skill from './Skill/Skill.jsx'
import Hobby from './Hobby/Hobby.jsx'
import Education from './Education/Education.jsx'
import Contact from './Contact/Contact.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/aboutme" element={<About />} />
      <Route path="/myexperience" element={<Experience />} />
      <Route path="/myskills" element={<Skill />} />
      <Route path="/myhobbies" element={<Hobby />} />
      <Route path="/myeducation" element={<Education />} />
      <Route path="/mycontact" element={<Contact />} />
    </Routes>
  )
}

export default App
