import React, { useState, useEffect } from 'react';

// look into @frontendmasters/pet module
// from there we want the ANIMAL constant which stores mock dummy data
// and we want the pet object which houses several helper functions

// $ equivalent to jQuery
// $.get, $.post, $.each
// jQuery.get, jQuery.post, jQuery.each

// $/jQuery is an object that houses several helper functions

import pet, { ANIMALS } from '@frontendmasters/pet';
import Results from './Results';
import useDropdown from './useDropdown';

console.log(pet);
// sets all defaults on first page render
const SearchParams = () => {
  // const below is a "hook"
  const [location, setLocation] = useState('Seattle, WA');
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown('Animal', 'Dog', ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds);
  const [pets, setPets] = useState([]);

  // adding ability to hit pet api and get pets back
  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    });
    // console.log(animals);
    // give animals or return empty array
    setPets(animals || []);
  }

  // this is scheduling funct to run AFTER render happens
  // replaces lifecycle methods (componentDidMount, etc)
  useEffect(() => {
    setBreeds([]);
    setBreed('');

    // captures animal and breed info from api
    // dependency array is checked so that we only request breeds if an animal is selected)
    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreed, setBreeds]);

  return (
    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="location"
            onChange={e => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
