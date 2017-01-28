import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListEntitiesComponent } from './widgets/router/list.entities.component';
//import { ShowEntityComponent } from './show.entity.component';
//import { CreateEntityComponent } from './create.entity.component';
//import { EditEntityComponent } from './edit.entity.component';
import { HomeComponent } from './widgets/router/home.component';
import { PageNotFoundComponent } from './widgets/router/not-found.component';
//import { SimpleModule } from '../simple/simple.module';
//import { MetaModule } from '../../meta/meta.module';
//import { FlashMessageComponent } from './flash.message.component';
//import { FlashMessageService } from './flash.message.service';
import { PipesModule } from './pipes/pipes.module';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':entitytypename', component: ListEntitiesComponent },
//  { path: ':entitytypename/new', component: CreateEntityComponent },
//  { path: ':entitytypename/:key', component: ShowEntityComponent },
//  { path: ':entitytypename/:key/edit', component: EditEntityComponent },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    PipesModule,
//    MetaModule,
//    SimpleModule
  ],
  declarations: [
//    FlashMessageComponent,
    HomeComponent,
    PageNotFoundComponent,
    ListEntitiesComponent,
//    ShowEntityComponent,
//    CreateEntityComponent,
//    EditEntityComponent
  ],
  exports: [
    RouterModule,
    FormsModule,
//    FlashMessageComponent,
    HomeComponent,
    PageNotFoundComponent,
    ListEntitiesComponent,
//    ShowEntityComponent,
//    CreateEntityComponent,
//    EditEntityComponent
  ],
  providers: [
//    FlashMessageService
  ]
})
export class MetaRoutingModule { }
