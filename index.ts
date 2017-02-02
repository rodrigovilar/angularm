import { NgModule } from "@angular/core";

import { MetaModule } from './src/meta/meta.module';
import { PipesModule } from './src/pipes/pipes.module';

import { AngularmService } from "./src/angularm.service";


export * from './src/pipes/pipes.module';
export * from './src/meta/meta.module';
export * from './src/meta/entitytypes.component';
export * from './src/widgets/simple/entityline';
export * from './src/angularm.service';

export * from './src/widgets/router/list.entities.component';
export * from './src/widgets/router/show.entity.component';
export * from './src/widgets/router/new.entity.component';
export * from './src/widgets/router/edit.entity.component';
export * from './src/widgets/router/home.component';
export * from './src/widgets/router/not-found.component';
export * from './src/widgets/simple/flash.message.component';
export * from './src/widgets/simple/flash.message.service';
export * from './src/widgets/simple/create.entity.component';
export * from './src/widgets/simple/formline';
export * from './src/widgets/simple/edit.entity.form.component';
export * from './src/widgets/simple/edit.formline';
export * from './src/widgets/simple/entity.details.component';
export * from './src/widgets/simple/showline';
export * from './src/widgets/simple/listing.table.component';

@NgModule({
  imports: [
    MetaModule,
    PipesModule
  ],
  providers: [
    AngularmService,
  ],
  exports: [
    MetaModule,
    PipesModule
  ]
})
export class AngularmModule {}
