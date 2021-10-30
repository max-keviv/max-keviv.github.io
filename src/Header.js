import './Header.css';

function Header(){
    return(
        <div className="header"><ul className="nav justify-content-end">
        <li className="nav-item">
          <a className="nav-link glow-button" href="#"><h4>Home</h4></a>
        </li>
        <li className="nav-item">
          <a className="nav-link glow-button" href="#"><h4>Projects</h4></a>
        </li>
        <li className="nav-item">
          <a className="nav-link glow-button" href="#"><h4>About</h4></a>
        </li>
        <li className="nav-item">
          <a className="nav-link glow-button" href="#"><h4>Contact</h4></a>
        </li>
      </ul>
      <div className="dropdown ">
  <a className="btn glow-button" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
 <span><h3>&#9776;</h3></span>
 
  </a>

  <div className="dropdown-menu  btn-warning" aria-labelledby="dropdownMenuLink">
    <a className="dropdown-item  btn-success" href="/">Home</a>
 <a className="dropdown-item  btn-success" href="/projects">Projects</a>
    <a className="dropdown-item  btn-success" href="/about">About</a>
    <a className="dropdown-item  btn-success" href="/contact">Contact</a>
  </div>
</div>
</div>
    )
}

export default Header;