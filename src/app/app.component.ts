import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import {
  filter,
  interval,
  last,
  map,
  Observable,
  switchMap,
  takeWhile,
} from 'rxjs';
import { elementAt, tap } from 'rxjs/operators';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // Permet de référencer une instance d’un composant en déclarant une propriété du type du composant enfant, puis en la décorant du décorateur @ViewChild. Le décorateur prend en paramètre un type ou bien une chaîne de caractères.
  @ViewChild('terrainJeu') terrainJeu!: ElementRef;
  @ViewChild('invader1') invader1!: ElementRef;
  @ViewChild('')

  //position de départ du bloc
  top = 0;
  //Vitesse du jeu
  vitesseJeu = 100;
  //Vitesse du bloc
  vitesseBloc = 5;

  // Observables
  gameActions$: Observable<number>;
  countDown$: Observable<number>;
  // Décompte
  initialCountDown = 5;
  countDown!: number;
  msg: any;



  constructor() {
    // Vitesse du décompte
    this.countDown$ = interval(1000).pipe(
      map((resultat) => this.initialCountDown - resultat),
      tap((resultat) => (this.countDown = resultat)),
      takeWhile((resultat) => resultat >= 0),
      filter((resultat) => resultat === 0),
      tap((_) => this.initGame()),
      tap(console.log)
    );
    this.gameActions$ = this.countDown$.pipe(
      switchMap((countDown) => this.gameLoop())
    );

    this.gameActions$.subscribe();
  }

  ngOnInit() { }

  initGame() {
    this.countDown = this.initialCountDown;
    // Position de départ du bloc
    this.top = 0;
  }

  gameLoop() {
    // Retourne un Observable qui émet des nombres séquentiels à chaque intervalle de temps spécifié.
    return interval(this.vitesseJeu).pipe(
      // Tap permet d'effectuer de manière transparente des actions ou des effets secondaires, comme la journalisation.

      tap((_) => (this.top += this.vitesseBloc)),
      // Continue tant que le bloc n'est pas arrivé en bas
      takeWhile(
        (_) =>
          this.top + this.invader1.nativeElement.clientHeight <
          this.terrainJeu.nativeElement.clientHeight
      ),
      last(),
      // Affiche le message d'alerte lorsque l'observable est complété
      // tap((_) => alert('You loooooose')),
      map((_) => 0)
    );
  }



  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    const left = KEY_CODE.LEFT_ARROW;
    const right = KEY_CODE.RIGHT_ARROW;
    if (event.keyCode === right) {
      this.msg = "Vous avez appuyé sur la flèche droite " + event.code + ":" + KEY_CODE.RIGHT_ARROW;
    }
    else if (event.keyCode === left) {
      this.msg = "Vous avez appuyé sur la flèche droite " + event.code + ":" + KEY_CODE.RIGHT_ARROW;
    }
    else (event.keyCode != KEY_CODE.LEFT_ARROW && event.keyCode != KEY_CODE.RIGHT_ARROW)
    alert("Cette touche ne vous permet pas de bouger le bloc");
  }
}
