import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { CommonModule } from '@angular/common'; // Asegúrate de que está importado
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment'; //para firestore
import { AngularFireModule } from '@angular/fire/compat'; //para firestore
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; //para firestore
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; //para firestore
import { FormsModule } from '@angular/forms'; //para firestore
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { LoadingComponent } from './loading/loading.component';
import { FirebaseModule } from './firebase.module'; // Importa el nuevo módulo

//import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@NgModule({
  declarations: [AppComponent,
    LoadingComponent,],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    CommonModule,  // Agrega esto si no está presente
    AngularFirestoreModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    FirebaseModule, // Agrega el módulo FirebaseModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
