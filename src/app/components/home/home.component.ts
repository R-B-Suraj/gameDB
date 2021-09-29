import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/interfaces';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})





export class HomeComponent implements OnInit,OnDestroy {


  public sort: string = '';
  // games array
  public games: Array<Game> | undefined;



  // we have two subscriptions left hanging.. we don't want that because that would cause memory leak
  

  private routeSub: Subscription | undefined;
  private gameSub: Subscription | undefined;



  constructor(
    private httpService: HttpService,       // service we created
    private activatedRoute: ActivatedRoute , // angular service
    // we want to reroute our page to the details page... when a game is clicked
    private router: Router


  ) { }

  ngOnInit(): void {
    // life cycle hook   runs first when component is ready
    // we want to use the activated route params to subscribe to this event , this event returns
    // params which is a type of params
    // we want to check when the page loads if there is any game-search query in the url (someone might have searched through url)
    this.routeSub = this.activatedRoute.params.subscribe((params: Params)=>{
      if(params['game-search']) {
        this.searchGames('metacrit',params['game-search']);
        // if there is a game-search query into our url  if there is..
        // first parameter is sorting, metacrit is the rating method(the api provides metacrit, data updated, released options) 
        // second is game-search
      }
      else{
        this.searchGames('metacrit');
        // only sorting
      }
    });
  }


  // call the api and fetch
  // inside httpservice we created getGameList funciton which accepts only two parameters
  // ordering which is sort here,  and search ...and we expect it returns gamelist Observable<APIResponse<Game>> to which  we subscribe here
  // returned value is APIResponse of type Game  which we also created in interface

  // next step is to use the data correctly and feed that to html...
  searchGames(sort: string, search?: string): void{
    
    this.gameSub = this.httpService
    .getGameList(sort,search)
    .subscribe((gameList: APIResponse<Game>)=>{
      this.games = gameList.results;
      console.log(gameList);
    });
  }


  openGameDetails(id: string): void{
    // we call the router which we just injected to navigate to details page and send id as parameter
    // localhost/ details/id will be the url
    this.router.navigate(['details', id]);
  }



  // on destroy life cycle   ngOnDestroy  implements onDestroy  interface
  ngOnDestroy(): void{
    if(this.gameSub){
      this.gameSub.unsubscribe();
      // this is when the page is closing so there is no memory leak
    }

    if(this.routeSub){
      this.routeSub.unsubscribe();
    }
  }




}
