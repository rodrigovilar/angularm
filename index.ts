import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MetaModule } from './src/meta/meta.module';
import { PipesModule } from './src/pipes/pipes.module';

import { AngularmService } from './src/angularm.service';

import { HomeComponent } from './src/widgets/router/home.component';
import { ListEntitiesComponent } from './src/widgets/router/list.entities.component';
import { ListingTableComponent } from './src/widgets/simple/listing.table.component';
import { EntityLineComponent } from './src/widgets/simple/entityline';
import { NewEntityComponent } from './src/widgets/router/new.entity.component';
import { CreateEntityComponent } from './src/widgets/simple/create.entity.component';
import { FormLineComponent } from './src/widgets/simple/formline';
import { ShowEntityComponent } from './src/widgets/router/show.entity.component';
import { EntityDetailsComponent } from './src/widgets/simple/entity.details.component';
import { ShowLineComponent } from './src/widgets/simple/showline';
import { EditEntityComponent } from './src/widgets/router/edit.entity.component';
import { EditEntityFormComponent } from './src/widgets/simple/edit.entity.form.component';
import { EditFormLineComponent } from './src/widgets/simple/edit.formline';
import { FlashMessageComponent } from './src/widgets/simple/flash.message.component';
import { FlashMessageService } from './src/widgets/simple/flash.message.service';
import { PageNotFoundComponent } from './src/widgets/router/not-found.component';

export * from './src/pipes/pipes.module';
export * from './src/meta/meta.module';
export * from './src/meta/entitytypes.component';
export * from './src/meta/entitytype.component';
export * from './src/meta/propertytype.component';
export * from './src/meta/entity.component';
export * from './src/meta/property.component';
export * from './src/angularm.service';
export * from './src/entitytype';

export * from './src/widgets/router/home.component';
export * from './src/widgets/router/list.entities.component';
export * from './src/widgets/simple/listing.table.component';
export * from './src/widgets/simple/entityline';
export * from './src/widgets/router/new.entity.component';
export * from './src/widgets/simple/create.entity.component';
export * from './src/widgets/simple/formline';
export * from './src/widgets/router/show.entity.component';
export * from './src/widgets/simple/entity.details.component';
export * from './src/widgets/simple/showline';
export * from './src/widgets/router/edit.entity.component';
export * from './src/widgets/simple/edit.entity.form.component';
export * from './src/widgets/simple/edit.formline';
export * from './src/widgets/simple/flash.message.component';
export * from './src/widgets/simple/flash.message.service';
export * from './src/widgets/router/not-found.component';

@NgModule({
  declarations: [
    HomeComponent, ListEntitiesComponent, ListingTableComponent, EntityLineComponent, NewEntityComponent, 
    CreateEntityComponent, FormLineComponent, ShowEntityComponent, EntityDetailsComponent, ShowLineComponent, 
    EditEntityComponent, EditEntityFormComponent, EditFormLineComponent,
    FlashMessageComponent, PageNotFoundComponent
  ],
  entryComponents: [
    HomeComponent, ListEntitiesComponent, ListingTableComponent, EntityLineComponent, NewEntityComponent, 
    CreateEntityComponent, FormLineComponent, ShowEntityComponent, EntityDetailsComponent, ShowLineComponent, 
    EditEntityComponent, EditEntityFormComponent, EditFormLineComponent,
    FlashMessageComponent, PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MetaModule,
    PipesModule
  ],
  providers: [
    AngularmService, FlashMessageService
  ],
  exports: [
    MetaModule,
    PipesModule,
    HomeComponent, ListEntitiesComponent, ListingTableComponent, EntityLineComponent, NewEntityComponent, 
    CreateEntityComponent, FormLineComponent, ShowEntityComponent, EntityDetailsComponent, ShowLineComponent, 
    EditEntityComponent, EditEntityFormComponent, EditFormLineComponent,
    FlashMessageComponent, PageNotFoundComponent
  ]
})
export class AngularmModule {}
