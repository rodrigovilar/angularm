import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SampleComponent } from "./src/sample.component";
import { SampleDirective } from "./src/sample.directive";
import { TitleCase } from "./src/pipes/titlecase.pipe";
import { AngularmService } from "./src/angularm.service";

export * from './src/sample.component';
export * from './src/sample.directive';
export * from './src/pipes/titlecase.pipe';
export * from './src/angularm.service';
export * from './src/meta/entitytypes.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SampleComponent,
    SampleDirective,
    TitleCase
  ],
  exports: [
    SampleComponent,
    SampleDirective,
    TitleCase
  ]
})
export class AngularmModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AngularmModule,
      providers: [AngularmService]
    };
  }
}
