import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useParams } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';

 
 function ShowCategoryList({setSearch}) {

    const {category} = useParams();

    const [byCategory, setByCategory] = useState(null);

    async function fetchCategoryData() {
        let response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c='+category);
        let responseJson = await response.json();
        if(responseJson){
            setByCategory(responseJson.meals);
        }
    }

    useEffect(()=>{
        fetchCategoryData();
    }, [])

    if(byCategory){
        return(
            <div className="container-fluid">
            <div className="d-flex justify-content-around row my-2">
               {byCategory.map(el=> {
                   return (
                        <div className="card" style={{width: 18+'rem'}} key={el.idMeal} onClick={()=>setSearch('')}>
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

export default ShowCategoryList;