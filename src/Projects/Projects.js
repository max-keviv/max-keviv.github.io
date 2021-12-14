import './Projects.css'
import secret from "./secret_app.png"
import weather_img from "./weather.PNG"
import todo from "./to-do.PNG"
import sheets from "./google_sheet.PNG"
import AngularWeather from "./Weather-App.png"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 760 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 760, min: 0 },
    items: 1
  }
};
function Projects(){
    return(
        <div className="project">
        <div className="jumbotron jumbotron-fluid">
  <div className="container">
    <h1 className="display-4">Projects</h1>
    


{/* <div className='row'> */}
<Carousel responsive={responsive}>
    <div className="card" style={{width: "18rem"}}>
  <img className="card-img-top img-1" src={secret} alt="secret app" />
  <div className="card-body">
   <b> <h3 className="card-title">Secrets Sharing Anonymously Apps</h3></b>
    <p className="card-text">An application implement with MERN Technologies (Express, EJS, Node.js, MongoDB) to Store your anonymous message</p>
    
    <h5><a href="http://maxsecrets.herokuapp.com/" className="card-link">link</a></h5>
  </div>
</div>
<div className="card" style={{width: "18rem"}}>
  <img className="card-img-top img-2" src={weather_img} alt="img" />
  <div className="card-body">
    <b><h3 className="card-title">Express weather forecast App</h3></b>
    <p className="card-text">a simple weather search app for any place with
OpenWeatherMap API</p>
   <h5> <a href="http://arcane-woodland-41019.herokuapp.com/" className="card-link">link</a></h5>
  </div>
</div>
<div className="card" style={{width: "18rem"}}>
  <img className="card-img-top img-3" src={todo} alt="img" />
  <div className="card-body">
    <b><h3 className="card-title">To-Do-List App</h3></b>
    <p className="card-text">Created with CodeSandbox: a react app with To-Do-List Application</p>
    <h5><a href="https://244yo.csb.app/" className="card-link">link</a></h5>
  </div>
</div>
<div className="card" style={{width: "18rem"}}>
  <img className="card-img-top img-4" src={sheets} alt="img" />
  <div className="card-body">
    <b><h3 className="card-title">GoogleSheetApi App</h3></b>
    <p className="card-text">A tutorial web application for integration GoogleSheetApi with
Express</p>
    <h5><a href="https://googlesheetapi-tutorial.herokuapp.com/" className="card-link">link</a></h5>
  </div>
</div>
<div className="card" style={{width: "18rem"}}>
  <img className="card-img-top img-5" src={AngularWeather} alt="img" />
  <div className="card-body">
    <b><h3 className="card-title">AngularWeather App</h3></b>
    <p className="card-text">an angular app for a complete analysis of weather with
visualization of the past 7-day weather forecast data</p>
   <h5> <a href="http://angularweather-app.herokuapp.com/" className="card-link">link</a></h5>
  </div>
</div>
</Carousel>
  </div>
  </div>
</div>
        // </div>
    );
}

export default Projects;