# Space Invader avec Rxjs

## De quoi l'application est-elle composée ?

### 1) Affichage

L'affichage est fait à partir de l'HTML. Le fichier [index.html](../index.html) appelle à partir des balises `<app-root></app-root>`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Invaderproject</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>
```

Les balises `<app-root></app-root>` sont le lien entre le fichier index.html et le fichier app-component.ts grâce au décorateur @Component qui possède `<app-root></app-root>` comme `selector:`

```ts
  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
  })
```

- game-ground fait référence au **_@ViewChild_** se trouvant dans le fichier [app-component.ts](app.component.ts).

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="game-ground" #terrainJeu>
      <div class="invader" #invader1 [ngStyle]="{ top: top + 'px' }"></div>
      <div *ngIf="countDown >= 0" id="countDown">{{ countDown }}</div>
    </div>
  </body>
</html>
```

### 2) Fonctionnement de l'application

#### `Fichier app-component.ts`

```ts
 // Permet de référencer une instance d’un composant en déclarant une propriété du type du composant enfant, puis en la décorant du décorateur @ViewChild.
//  Le décorateur prend en paramètre un type ou bien une chaîne de caractères.
  @ViewChild('terrainJeu') terrainJeu!: ElementRef;
  @ViewChild('invader1') invader1!: ElementRef;
```
