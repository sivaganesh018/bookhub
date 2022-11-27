import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="contact-us-container">
    <div className="contact-us-icons">
      <FaGoogle className="social-icons" />
      <FaTwitter className="social-icons" />
      <FaInstagram className="social-icons" />
      <FaYoutube className="social-icons" />
    </div>
    <p className="contact-us-text">Contact Us</p>
  </div>
)

export default Footer
