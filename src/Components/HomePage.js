import { useState } from "react";
import { Link } from "react-router-dom";

 

function HomePage({fetchCategories, categories}) {

    const API_RANDO_MEAL = 'https://www.themealdb.com/api/json/v1/1/random.php'

    const [randomMeal, setRandomMeal] = useState();

    async function fetchRandomMeal() {
        let response = await fetch(API_RANDO_MEAL);
        let responseJson = await response.json();
        if(responseJson){
        setRandomMeal(responseJson.meals[0]);
        }
    }

    useState(()=>{
        fetchRandomMeal();
        fetchCategories();
    }, [])
        if(randomMeal && categories){
            console.log(categories);
            return (
                <div className="container-fluid">
                    <div className="row ">
                        <div className="col-md-6 home-pic bg-image d-flex justify-content-center align-items-end" style={{ backgroundImage: 'url(' + randomMeal.strMealThumb + ')', backgroundSize: 'auto', backgroundRepeat: 'no-repeat'}}>
                            <div className="random-detail-box">
                                <div className="random-detail-box-inner">
                                    <h5>Random Recipe</h5>
                                    <h2>{randomMeal.strMeal}</h2>
                                    <Link to={"meals/" + randomMeal.idMeal}>See details</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col d-flex justify-content-center home-page-categories">
                            <div className="container-fluid">
                                <h1>See Categories</h1>
                            </div>
                            <div className="container-fluid">
                                <ul class="list-group">
                                    {categories.map(el=>{
                                        return (
                                            <Link to={"/" + el} ><li className="list-group-item text-center">{el}</li></Link>
                                        )
                                    })}
                                
                                </ul>
                            </div>
                            
                        </div>
                    </div>
            </div>
            );
                    }
        else{
            return null;
        }
    }

export default HomePage;