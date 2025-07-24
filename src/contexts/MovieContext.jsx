// this provides global state and helper functions. its a state manager for favorite movies

import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

// Provides state to components wrapped in it
// components can hook into this state
// children is a reserved prop. its anything inside the component.
// Browser route has children equal to App
// children get the use state of favorites and setFavorites. it absorbs that ability
export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // we access local storage with the favorites key
    const storedFavorites = localStorage.getItem("favorites");
    //  we store strings in a list then convert it/parse it
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
  }, []);

  //   anytime favorite state changes, update in local storage
  // only runs when add and remove a favorite.
  // doing some string conversion and above we deconvert that string and turn it back into an array/obj
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  //   how to get vaoue of previous value, and copy them over. state updater with arrays
  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  //   .filter creates a new array of movies that are not the ones we want to remove
  // the movies that remain in favorites are the ones we are not removing
  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  //   some checks if atleast one is equal to movieId we are looking for
  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  //   value gives us access to the functions we wrote
  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
