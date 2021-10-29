import './Header.css';

function Header(){
    return(
        <div className="header"><ul className="nav justify-content-end">
        <li className="nav-item">
          <a className="nav-link glow-button" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link glow-button" href="#">Projects</a>
        </li>
        <li className="nav-item">
          <a className="nav-link glow-button" href="#">About</a>
        </li>
        <li className="nav-item">
          <a className="nav-link glow-button" href="#">Contact</a>
        </li>
      </ul>
      <div className="dropdown ">
  <a className="btn glow-button" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
 <span> &#9776;</span>
 
  </a>

  <div className="dropdown-menu  btn-warning" aria-labelledby="dropdownMenuLink">
    <a className="dropdown-item  btn-success" href="#">Home</a>
 <a className="dropdown-item  btn-success" href="#">Projects</a>
    <a className="dropdown-item  btn-success" href="#">About</a>
    <a className="dropdown-item  btn-success" href="#">Contact</a>
  </div>
</div>
</div>
    )
}

export default Header;