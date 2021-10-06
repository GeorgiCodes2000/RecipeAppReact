import { Link } from 'react-router-dom';


function Favourites({favourites , deleteFavMeal}) {

    console.log(favourites);
    if(favourites){
        return(
            <div className="container-fluid text-center favourites">
            <h1>Favourites</h1>
            <div className="d-flex justify-content-around row my-2">
               {favourites.map(el=> {
                   return (
                   <div className="card" style={{width: 18+'rem'}} key={el.idMeal}>
                   <Link to={"meals/" + el.idMeal}><img className="card-img-top" src={el.strMealThumb} alt="Card"/>  </Link>
                           <div className="card-body">
                               <p className="card-text">{el.strMeal}</p>
                               <button className="btn btn-danger" onClick={()=>deleteFavMeal(el)}>Remove</button>
                       </div>
    </div>
  
    
                   )
               })}
            </div>
    
            </div>
       );
      }
    
      return null;
    }

export default Favourites;