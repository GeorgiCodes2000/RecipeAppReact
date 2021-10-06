import { Link } from 'react-router-dom';

function SearchList({search, searchResults, setSearch}) {

  
    
  if(searchResults){
    return(
        <div className="container-fluid">
        <h1 className="text-center mb-5">Results for {search}</h1>
        <div className="d-flex justify-content-around row my-2">
           {searchResults.map(el=> {
               return (
                <div className="card" style={{width: 18+'rem'}} key={el.idMeal}  onClick={()=>setSearch('')}>
                <Link to={"meals/" + el.idMeal}><img className="card-img-top" src={el.strMealThumb} alt="Card"/></Link>
                       <div className="card-body">
                           <p className="card-text">{el.strMeal}</p>
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

export default SearchList;