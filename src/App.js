 import { useState } from 'react';
import './App.css';
import HomePage from './Components/HomePage';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ShowCategoryList from './Components/ShowCategoryList';
import SearchList from './Components/SearchList';
import SingleMeal from './Components/SingleMeal';
import Favourites from './Components/Favourites';

function App() {

  const [categories, setCategories] = useState(null);

  const [search, setSearch] = useState('');

  const [searchResults, setSearchResults] = useState(null);

  const[favourites, setFavourites] = useState([]);

  async function fetchCategories() {
      let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      let responseJson = await response.json();
      let categories = responseJson.categories.map(el => {
        return el.strCategory;
      })
      setCategories(categories);
  }

  async function fetchSearch() {
    if(search){
      let response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + search);
      let responseJson = await response.json();
      if(responseJson){
        setSearchResults(responseJson.meals);
      }
    }
  }

  function handleSearch(e) {
    setSearch(e.target.value)
    if(e.target.value===''){
      setSearchResults(null);
    }
  }

  const handleFav = fav => {
    let found = favourites.find(el=>el.idMeal === fav.idMeal);
    if(!found){
      let favs = [...favourites, fav];
      setFavourites(favs);
      localStorage.setItem('favourites', JSON.stringify(favs));
    } 
  }

  const deleteFavMeal = el => {
    let newMeals = favourites.filter(meal=>meal.idMeal !== el.idMeal);
    setFavourites(newMeals);
    localStorage.setItem('favourites', JSON.stringify(newMeals));
  }

  useState(()=>
  {
    if(localStorage.getItem('favourites')){
      setFavourites(JSON.parse(localStorage.getItem('favourites')));
    }
    else{
      localStorage.setItem('favourites', favourites);
    }
  }, [])
  

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar handleSearch={handleSearch} fetchSearch={fetchSearch} search={search}/>
      
          <Route exact path='/'>
           {searchResults ? <SearchList search={search} searchResults={searchResults} setSearch={setSearch}/> : <HomePage fetchCategories={fetchCategories} categories={categories}/>}
          </Route>

          <Route exact path='/:category'>
            {!searchResults?<ShowCategoryList setSearch={setSearch}/>:<SearchList search={search} searchResults={searchResults} setSearch={setSearch}/>}
          </Route>

          <Route exact path='/meals/:meal'>
          {search?<SearchList search={search} searchResults={searchResults}  setSearch={setSearch}/>:null}
          {!search?<SingleMeal handleFav={handleFav}/>:null}  
          </Route>

          <Route  path='/favourites'>
            <Favourites favourites={favourites} deleteFavMeal={deleteFavMeal}/>
          </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
