import { Component } from '@angular/core';
import {StarService} from './star.service'
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  constructor(private httpService: StarService) {
  }
  movieName='';
  movieCharacter = '';
  movieSpecies = {name: '', count:''};
  moviePlanet = {name:'', counter: 0, pilots: ''};
  isVisible = false;
  isPeopleLoaded = false;
  isSpeciesLoaded = false;
  isMoviesLoaded = false;
  getData() {
    this.httpService.getMovies().subscribe(data => {
      const movies = data.results;
      let longCrawl = 0;
        for(let movie of movies) {
          if(movie.opening_crawl.length>longCrawl) {
            longCrawl = movie.opening_crawl.length
            this.movieName = movie.title;
          }
        }
        this.isMoviesLoaded = true;
    });
    this.httpService.peoples$.subscribe(data => {
      if(data) {
      let characters = data;
      let movieCounts = 0;
      for(let character of characters) {
        if(character.films.length>movieCounts) {
          movieCounts = character.films.length;
          this.movieCharacter = character.name;
        }
      }
      var aggregated = characters.filter(item => {
        return item.vehicles.length>0
      }).reduce((accumulator, object) => {
        const key = object['homeworld'];
        if (!accumulator[key]) {
          accumulator[key] = [];
        }
        accumulator[key].push(object);
        return accumulator;
      }, {})
      let result = [...Object.values(aggregated)].map(x => ({homeworld: x[0].homeworld, count: x.length, objects: x})).reduce((prev, current) => (prev.count > current.count) ? prev : current)
      this.httpService.getPlanet(result.homeworld).subscribe(data =>{
        this.moviePlanet = {
          name: data.name,
          counter: result.count,
          pilots: result.objects.map(item => (item.name)).join(', ')
        }
        this.isPeopleLoaded = true;
      })
      }
    })

    this.httpService.species$.subscribe(data => {
      if(data) {
        console.log(data)
      const species = data;
      let movieCounts = 0;
      for(let specie of species) {
        if(specie.films.length>movieCounts) {
          movieCounts = specie.films.length;
          this.movieSpecies = 
          {
            name: specie.name,
            count: movieCounts
          }
        }
      }
      this.isSpeciesLoaded = true;
      }
    });
    this.isVisible = !this.isVisible;
   
  }
}
