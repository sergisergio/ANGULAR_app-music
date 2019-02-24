# Pré-requis

[NODE.JS](https://nodejs.org/en/download/)  

[NPM](https://docs.npmjs.com/)
``` bash
npm install -g npm@latest
```

[ANGULAR/CLI](https://cli.angular.io/)
``` bash
npm install -g @angular/cli
```

[DOC ANGULAR](https://angular.io/)  
[DOC TYPESCRIPT](https://www.typescriptlang.org/docs/home.html)  
[DOC IONIC](https://ionicframework.com/docs/)  

## Créer le projet

Avec gestion des scss et sans la gestion des tests unitaires:
``` bash
ng new app-music --style=scss --skip-tests=true
```
Installation standard:
``` bash
cd app-music
ng serve --open
```
Aller sur http://localhost:4200
Ou sur un autre port
``` bash
ng serve -o --port 4201
```

## Créer un component
``` bash
ng generate component mycomponent
```

### Objectifs

- Développer une application de musique type catalogue de musiques indépendantes avec un petit moteur de recherche.  
- Espace sécurisé pour administrer le catalogue en mettant en place un CRUD.  
- Déploiement de l'application sur un serveur distant.

### Structure

- e2e: tests.  
- node_modules: dépendances comme Angular.  
- src: application.  
- angular.json: pour l'application Angular.  
- tsconfig.json: pour TypeScript.  

### Structure dans src

- css et html: vues ou templates.  
- spec.ts: fichiers de test.  
- ts: component principal.  
- app.module.ts: module principal.  
- assets globaux.  
- fichiers d'environnement.  
- index.html: point d'entrée de l'application. 
- main.ts: Bootstrap démarrage de l'application.  

Angular est construit à partir de components hiérarchiques écrits en Typescript.  
Ce sont les contrôleurs de l'application. Chaque component possède sa propre vue et ses propres CSS qui sont par défaut isolés dans le component lui-même.  
Les modules isolent les components dans des unités logiques de l'application: partie publique, partie privée, page d'inscription, etc...  
Les services séparent lalogique du code des Components: ils sont factorisables et réutilisables dans l'application.  
On fera de l'injection de dépendances pour consommer un service unique dans les Components.  
Les directives agissent sur les données dans les templates. 

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

- Dans le parent AppComponent, on place le sélecteur <app-albums></app-albums>  
- Ce sélecteur permet d'insérer le component enfant AlbumsComponent dans son component parent.  
- L'***interpolation*** permet de définir des données dans le TypeScript que l'on peut par la suite afficher dans le template à l'aide de double accolades {{ ... }}.  
- C'est du ***data-binding one-way*** (exemple: on passe un titre venant du fichier ts vers le template).  
- Pour importer les albums, il faut définir l'import dans AlbumsComponent puis définir la variable dans la classe.  
- Pour afficher ces albums dans la vue, on utilise la directive structurelle *ngFor.  

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

### Création d'un service  

- Il faut refactoriser le code afin d'alléger nos fichiers ts.  
- On va donc créer des services puis les injecter.  
 ``` bash
ng generate service album
```
Il faut importer le décorateur @Injectable pour indiquer que cette classe peut recevoir d'autres services par injection de dépendance.  
Le paramètre provideIn permet de préciser si on souhaite un service général ou spécifique à un module en particulier.  
Dans ce service, on crée des méthodes getAlbums(),getAlbum(id: string), getAlbumList(id: string).  

Puis on importe ce service dans les components concernés






