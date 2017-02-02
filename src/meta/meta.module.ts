import { forwardRef, NgModule, Type } from '@angular/core';

import { ForeachEntityTypeDirective } from './foreach.entitytype.directive';
import { EntityTypeDirective } from './entitytype.directive';
// import { ForeachPropertyTypeDirective } from './foreach.property.type.directive';
// import { PropertyTypeDirective } from './property.type.directive';
// import { ForeachPropertyDirective } from './foreach.property.directive';
// import { PropertyDirective } from './property.directive';
import { ForeachEntityDirective } from './foreach.entity.directive';
import { EntityDirective } from './entity.directive';

export const META_DIRECTIVES = [
  forwardRef(() => ForeachEntityTypeDirective),
  forwardRef(() => EntityTypeDirective),
  // forwardRef(() => ForeachPropertyTypeDirective),
  // forwardRef(() => ForeachPropertyDirective),
  forwardRef(() => ForeachEntityDirective),
  // forwardRef(() => PropertyTypeDirective),
  forwardRef(() => EntityDirective),
  // forwardRef(() => PropertyDirective)
];

@NgModule({
    declarations: [
        META_DIRECTIVES
    ],
    exports: [
        META_DIRECTIVES
    ]
})
export class MetaModule { }
