import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MetaRoutingModule } from './src/routing.module';
import { PipesModule } from './src/pipes/pipes.module';


import { SampleComponent } from "./src/sample.component";
import { SampleDirective } from "./src/sample.directive";
import { AngularmService } from "./src/angularm.service";


export * from './src/sample.component';
export * from './src/sample.directive';
export * from './src/pipes/pipes.module';
export * from './src/angularm.service';
export * from './src/meta/entitytypes.component';

@NgModule({
  imports: [
    CommonModule,
    MetaRoutingModule
  ],
  declarations: [
    SampleComponent,
    SampleDirective
  ],
  providers: [
    AngularmService
  ],
  exports: [
    SampleComponent,
    SampleDirective,
    MetaRoutingModule,
    PipesModule
  ]
})
export class AngularmModule {}
