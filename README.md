***Application Angular dans le cadre de la pépinière Angular/Symfony.***
- Développer une application de musique type catalogue de musiques indépendantes avec un petit moteur de recherche.
- Espace sécurisé pour administrer le catalogue en mettant en place un CRUD.
- Déploiement de l'application sur un serveur distant.

![image](https://raw.githubusercontent.com/sergisergio/ANGULAR_app-music/master/app-music.png)

### Pré-requis

- [NODE.JS](https://nodejs.org/en/download/)

- [NPM](https://docs.npmjs.com/)
``` bash
npm install -g npm@latest
```

- [ANGULAR/CLI](https://cli.angular.io/)
``` bash
npm install -g @angular/cli
```
ou plus simplement
``` bash
npm i -g @angular/cli
```

[DOC ANGULAR](https://angular.io/)
[DOC TYPESCRIPT](https://www.typescriptlang.org/docs/home.html)
[DOC IONIC](https://ionicframework.com/docs/)

### Créer le projet

- Avec gestion des scss et sans la gestion des tests unitaires:
``` bash
ng new app-music --style=scss --skip-tests=true
```
- ou installation standard:
``` bash
ng new app-music
```

``` bash
cd app-music
ng serve -o
```
Aller sur http://localhost:4200
Ou sur un autre port
``` bash
ng serve -o --port 4201
```

### Créer un component
``` bash
ng generate component mycomponent
```

### Structure

- ***e2e***: tests.
- ***node_modules***: dépendances comme Angular.
- ***src***: application.
- ***angular.json***: pour l'application Angular.
- ***tsconfig.json***: pour TypeScript.

### Structure dans src

- ***css*** et ***html***: vues ou templates.
- ***spec.ts***: fichiers de test.
- ***ts***: component principal.
- ***app.module.ts***: module principal.
- ***assets*** globaux.
- fichiers d'***environnement***.
- ***index.html***: point d'entrée de l'application.
- ***main.ts***: Bootstrap démarrage de l'application.

Angular est construit à partir de ***components*** hiérarchiques écrits en Typescript.
Ce sont les contrôleurs de l'application. Chaque component possède sa propre vue et ses propres CSS qui sont par défaut isolés dans le component lui-même.
Les ***modules*** isolent les components dans des unités logiques de l'application: partie publique, partie privée, page d'inscription, etc...
Les ***services*** séparent la logique du code des Components: ils sont factorisables et réutilisables dans l'application.
On fera de l'injection de dépendances pour consommer un service unique dans les Components.
Les ***directives*** agissent sur les données dans les templates.

![Schéma Angular](http://www.learn-angular.fr/wp-content/uploads/2016/10/overview2.png)

### Installation des CSS ou SCSS

``` bash
npm install bootstrap --save
```

Modifier la partie architect du fichier angular.json

"styles": [
"src/styles.scss",
"./node_modules/bootstrap/dist/css/bootstrap.min.css"
],
"scripts": []
},

Relancer le serveur:
``` bash
ng serve -o
```

### Structure de la page principale

- page principale: liste les albums + possibilité d'afficher le détail d'un album.
- menu principal: lien connexion puis dashboard, lien de déconnexion.

### Les components

- Création de 2 components: albums et albums-details.
- Un component est une classe TypeScript décorée par le décorateur @Component. Un component est normalement associé à son template et à ses CSS, par défaut isolé des autres components.
- Hiérarchie:
  1) AlbumsComponent est un enfant de AppComponent qui est le component racine.
  2) AlbumDetailComponent est un enfant de AlbumsComponent.
- Ces components sont encapsulés dans l'unique module existant: AppModule.

Créer le component AlbumsComponent:
``` bash
ng generate component albums
```
ou
``` bash
ng g c albums
```

### Création des données

``` bash
ng generate class Album
```
On récupère la source des mocks-albums qu'on place dans le dossier src/app.

### Importer les données dans le component

- Dans le parent AppComponent, on place le sélecteur ***<app-albums></app-albums>***
- Ce sélecteur permet d'insérer le component enfant AlbumsComponent dans son component parent.
- L'***interpolation*** permet de définir des données dans le TypeScript que l'on peut par la suite afficher dans le template à l'aide de double accolades {{ ... }}.
- C'est du ***data-binding one-way*** (exemple: on passe un titre venant du fichier ts vers le template).
- Pour importer les albums, il faut définir l'import dans AlbumsComponent puis définir la variable dans la classe.
- Pour afficher ces albums dans la vue, on utilise la directive structurelle *ngFor.
``` bash
<div class="card" *ngFor="let album of albums; let index = index;">
```

### Component détails d'un album

- Communication dans l'autre sens: ***Event data binding***.
- Cela va nous permettre de réagir en fonction d'un évènement dans la page Web.
- On place un évènement (click) dans un élément du DOM puis on définit une méthode dans le fichier TypScript.

Création d'un autre component AlbumDetailsComponent.
``` bash
ng g c album-details
```
Communication du parent vers l'enfant: quand on sélectionne un album avec la méthode onSelect(album) depuis le component AlbumsComponent, on doit faire passer celui-ci au Component enfant AlbumDetailsComponent.
Puis on crée une variable selectedAlbum dans le component AlbumsComponent: quand on sélectionne un album, ce dernier est assigné à cette variable.
Enfin on passe cette variable au Component enfant AlbumDetailsComponent.
``` bash
<div class="col-sm-4 video">
<!-- AlbumDetails communication parent vers enfant -->
<app-album-details [album]="selectedAlbum" ></app-album-details>
</div>
```
La syntaxe [album] permet de faire passer la variable album au component enfant: c'est du ***property binding***.
La propriété "album" est liée au Component enfant AlbumDetailsComponent en utilisant le décorateur @Input(): il faut bien l'importer dans le component enfant.

@Input() = communication du parent vers l'enfant

### Introduction aux EventMitter et @Output

- Mise en place d'une méthode play sur le bouton Play: une fois ce bouton cliqué, cette méthode récupérera un album.
- On définit cette méthode dans AlbumDetailsComponent.
- On va préciser à Angular que l'on souhaite émettre un évènement vers le component parent.
- On importe la classe EventMitter et le décorateur @Output, puis on définit la propriété onPlay.
- On définit une propriété émettrice qui nous permettra d'émettre un album vers le parent.
- Puis on met dans le template album.component.html:
 ``` bash
<!-- onPlay méthode enfant et playParent méthode parent -->
<app-album-details [album]="selectedAlbum" (onPlay)="playParent($event)">
</app-album-details>
```
- La méthode playParent est une méthode du component AlbumsComponent. La propriété event est une convention d'écriture pour signaler que l'on récupère une propériété émise.
- Lorsqu'on cliquera sur le bouton play, dans un détail d'album dans la colonne de gauche, on affiche un tage [play] sur l'album cliqué, dans la liste des albums dans la colonne de droite.

@Output() = communication de l'enfant vers le parent

### Création d'un service

- Il faut refactoriser le code afin d'alléger nos fichiers ts.
- On va donc créer des services puis les injecter.
``` bash
ng generate service album
```
- Il faut importer le décorateur @Injectable pour indiquer que cette classe peut recevoir d'autres services par injection de dépendance.
- Le paramètre provideIn permet de préciser si on souhaite un service général ou spécifique à un module en particulier.
- Dans ce service, on crée des méthodes getAlbums(),getAlbum(id: string), getAlbumList(id: string).

- Puis on importe ce service dans les components concernés.
- Dans la méthode getAlbums, on ordonne les albums.
- Création d'une méthode count pour retourner le nombre d'albums.
- Création d'une méthode paginate.

### Template Driven Forms

Il y a 2 types de formulaire avec Angular:
- Template driven Forms: création dans le template du formulaire. Quand Angular parcourt le template et qu'il rencontre la balise form, il créera l'objet correspondant exploitable dans le Typescript.
- Reactive Form: création dynamique dans le TypeScript, elle offre plus de possibilités.

On va développer un moteur de recherche:
- Dans le template, dans la balise input, on doit mettre ngModel et u nattribut name sur chaque input pour justement câbler cela. Angular fera le lien entre le template et le TypeScript.
- La directive ngModel permet de définir et de contrôler un champ du formulaire dans Angular.
- Un simple attribut "name" pour sa part définit une clé:valeur qu'Angular exploitera pour récupérer la valeur de tel ou tel champ.
- On doit également définir l'évènement (ngSubmit) : une méthode dans le TypeScript permettra de récupérer l'objet formulaire du template dans le code TypeScript.
- Il faudra définir une référence locale pour accéder au formulaire dans le code HTML.

- Dans app.module.ts, on importe FormsModule.
- Création du component search et on place le sélecteur de ce component dans le template du component AlbumsComponent.
- Puis la partie HTML:
``` bash
<!--
Méthode onSubmit à définir dans le TypeScript.

2

Vous devez également définir une référence locale #formSearch.
Ainsi que les directives ngModel pour lié un champ à son nom (data-binding)
-->
<form class="form-inline my-2 my-lg-0"
(ngSubmit)="onSubmit(formSearch)"
#formSearch="ngForm"
>
<input name="word"
ngModel required
class="form-control mr-sm-2"
type="search"
placeholder="Search"
aria-label="Search"
>
<!-- Directive disabled pour désactiver le formulaire si il n'est pas valide -->
<button
[disabled]="formSearch.invalid"
class="btn btn-outline-success my-2 my-sm-0"
type="submit"
>
Search
</button>
</form>
```
- Il faut également importer NgForm: le type de l'objet form récupéré par Angular dans la méthode onSubmit (méthode appelée à la soumission grâce à l'évènement ngSubmit).
- Voici la méthode pour récupérer les valeurs d'un formulaire:
``` bash
onSubmit(form: NgForm): void {
console.log(form.value['word']); // récupération d'une valeur spécifique
}
```
- Création d'un eméthode dans le service AlbumService, afin d'effectuer une recherche sur les titres des albums à partir d'un mot saisi dans le formulaire (méthode search).
- Mise en place de la communication entre l'enfant et le parent, puis affichage de la recherche dans la page principale: qlbums.component.html. (L'enfant doit émettre le résultat de la recherche au parent).

### Router





