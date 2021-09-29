import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
 
  constructor(private http: HttpClient) { }


  // getGameList funciton receives tweo arguments of tylpe string of which search is not necessary
  // it returns Observable<APIResponse<Game>>  interfaces are created
  // to consume an API its not enough to only set the url.. it requires some headers and parameters with the requests
  // we won't set up for each and every request.. we wil do theat in application level using interceptors
  getGameList(
    ordering: string,
    search?: string,
  ): Observable<APIResponse<Game>> {
    // set parameters for this funciton
    let params = new HttpParams().set('ordering' , ordering);

    if(search){
        params = new HttpParams().set('ordering',ordering).set('search',search);

    }

    // base url of our service is going to be created inside the environment file and 
    // the rout fot this call is games  sending the parameters params...
    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`,{
      params: params,
    });
  }





  getGameDetails(id: string): Observable<Game>{
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailerRequest = this.http.get(`${env.BASE_URL}/games/${id}/movies`);
    const gameScreenshotsRequest = this.http.get(`${env.BASE_URL}/games/${id}/screenshots`);


    // retrieve all the get methods and combine them.. and use pipe to map the responses
    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailerRequest,
    }).pipe(
      map((resp: any)=>{
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
        trailers: resp['gameTrailerRequest']?.results
        };
      })
    );

  }






}
 