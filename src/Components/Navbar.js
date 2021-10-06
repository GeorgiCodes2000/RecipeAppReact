import { Fragment, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

function Navbar({fetchSearch, search, handleSearch}) {

  let history = useHistory();

   

  useEffect(()=>{
    fetchSearch();
    if(search.length>0){
      history.push("/");
    }
    
  },[search])
 
    return(
        <Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link to="/" className="navbar-brand">Simple Recipes</Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="#">Home</Link>
              </li>
              <li className="nav-item">
              <Link to="favourites" className="nav-link active" aria-current="page" href="#">Favourites</Link>
            </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={handleSearch} autoFocus />
            </form>
          </div>
        </div>
      </nav>
        </Fragment>
    );
}

export default Navbar;