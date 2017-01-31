import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListEntitiesComponent } from './widgets/router/list.entities.component';
import { ShowEntityComponent } from './widgets/router/show.entity.component';
import { CreateEntityComponent } from './widgets/router/create.entity.component';
import { EditEntityComponent } from './widgets/router/edit.entity.component';
import { HomeComponent } from './widgets/router/home.component';
import { PageNotFoundComponent } from './widgets/router/not-found.component';
//import { SimpleModule } from '../simple/simple.module';
//import { MetaModule } from '../../meta/meta.module';
import { FlashMessageComponent } from './widgets/router/flash.message.component';
import { FlashMessageService } from './widgets/router/flash.message.service';
import { PipesModule } from './pipes/pipes.module';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':entitytypename', component: ListEntitiesComponent },
  { path: ':entitytypename/new', component: CreateEntityComponent },
  { path: ':entitytypename/:key', component: ShowEntityComponent },
  { path: ':entitytypename/:key/edit', component: EditEntityComponent },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    PipesModule,
//    MetaModule,
//    SimpleModule
  ],
  declarations: [
    FlashMessageComponent,
    HomeComponent,
    PageNotFoundComponent,
    ListEntitiesComponent,
    ShowEntityComponent,
    CreateEntityComponent,
    EditEntityComponent
  ],
  exports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlashMessageComponent,
    HomeComponent,
    PageNotFoundComponent,
    ListEntitiesComponent,
    ShowEntityComponent,
    CreateEntityComponent,
    EditEntityComponent
  ],
  providers: [
    FlashMessageService
  ]
})
export class MetaRoutingModule { }
