import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Place } from './places.model';
import { map, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _places = new BehaviorSubject<Place[]>(
    [
      new Place(
        'p1',
        'Manhattan Mansion',
        'In the heart of New York City.',
        'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
        149.99
      ),
      new Place(
        'p2',
        "L'Amour Toujours",
        'A romantic place in Paris!',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Paris_Night.jpg/1024px-Paris_Night.jpg',
        189.99
      ),
      new Place(
        'p3',
        'The Foggy Palace',
        'Not your average city trip!',
        'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
        99.99
      )
    ]
  );

  get places(){
    return this._places.asObservable();
  }

  constructor(private http: HttpClient) { }

  getPlace(id: string) {
    return this.places.pipe(take(1), map(places => {
      return {...places.find(p => p.id === id)}
    }));
  }

  addPlaces() : Observable<any>{
    return this.http.post('url', {...this._places});
  }
}
