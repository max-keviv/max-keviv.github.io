import './Contact.css'
import linkedin from './linkedin.png'
function Contact(){
    return(
        <div className="Contact">
        <div className="jumbotron jumbotron-fluid">
  <div className="container">
    <h1 className="display-4">Contact</h1>
    <h6><a href='mailto:btk.vivekvishal@gmail.com'>btk.vivekvishal@gmail.com</a></h6>
    <h6><a href='tel:+916200892145'>6200892145</a></h6>
    <img className="img" src={linkedin} alt="https://www.linkedin.com/in/vishal-vivek"/>
    {/* <h6><a></a></h6> */}
    </div>
    </div>
    </div>
    )
}

export default Contact;