
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
@Injectable()
export class StarService {
    constructor(private http: HttpClient) {   
      this.getCharacters('', null);    
      this.getSpecies('', null);   
    }
    peoples$: BehaviorSubject<Object> = new BehaviorSubject(null);
    species$: BehaviorSubject<Object> = new BehaviorSubject(null);
    peoples = [];
    species = [];
    getMovies() {
      return this.http.get('https://swapi.co/api/films/');
    }


    getCharacters(url: string, p_data: any) {
      if(url ==='') {
        url = 'https://swapi.co/api/people/';
      }
      if(p_data!==null) {
        for(let d of p_data)
        this.peoples.push(d)
      }
      return this.http.get(url).subscribe(data => {
        if(data.next!==null) {
          return this.getCharacters(data.next, data.results);
        } else {
           for(let d of data.results) {
              this.peoples.push(d);
            }
            this.peoples$.next(this.peoples);
            return this.peoples$
        }
      });
    }
    getSpecies(url: string, p_data: any) {
       if(url ==='') {
        url = 'https://swapi.co/api/species/';
      }
      if(p_data!==null) {
        for(let d of p_data)
        this.species.push(d)
      }
      return this.http.get(url).subscribe(data => {
                if(data.next!==null) {
          return this.getSpecies(data.next, data.results);
        } else {
            for(let d of data.results) {
              this.species.push(d);
            }
            this.species$.next(this.species);
            return this.species$
        }

      });
    }
    getPlanet(url) {
      return this.http.get(url);
    }
}