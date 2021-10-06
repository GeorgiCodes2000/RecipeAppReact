import { useParams } from 'react-router-dom';
import { useState } from "react";

const API_BY_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

function SingleMeal({handleFav}) {
     
    const {meal} = useParams();
     

    const [realMeal, setRealMeal] = useState(null);

    async function fetchById() {
        let response = await fetch(API_BY_ID+meal);
        let responseJson = await response.json();
        if(responseJson){
            setRealMeal(responseJson.meals[0]);     
        }
    }

    
    useState(()=>{
        fetchById();
        
    },[])

    if(realMeal){
    return(
        <div className="container-fluid">
            <div className="row ">
                <div className="col-md-6 home-pic bg-image d-flex justify-content-center align-items-end" style={{ backgroundImage: 'url(' + realMeal.strMealThumb + ')', backgroundSize: 'auto', backgroundRepeat: 'no-repeat'}}>
                    <div className="random-detail-box ">
                        <div className="random-detail-box-inner">
                            <h2>{realMeal.strMeal}</h2>
                            <h5>Category: {realMeal.strCategory}</h5>
                            <h6>From: {realMeal.strArea}</h6>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 d-flex flex-column justify-content-start align-items-center mt-3">
                    <h1>{realMeal.strMeal}</h1>
                    <button className="btn btn-danger" onClick={()=>handleFav(realMeal)}>Add to favourties</button>
                    <div className="cooker-pic-div">
                    <span  className="d-inline">How to cook it</span> <img className="ms-2 d-inline" src="https://cdn-icons-png.flaticon.com/512/1830/1830839.png" alt="cooker" height={50+'%'}/>
                    </div>
                    <p className="instructions">{realMeal.strInstructions}</p>
                    
                    
                </div>

            </div>
        </div>
    );
    }

    return null;
}

export default SingleMeal;