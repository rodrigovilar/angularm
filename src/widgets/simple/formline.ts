import { Component } from '@angular/core';

import { PropertyTypeComponent } from '../../meta/propertytype.component';
import { AngularmService } from '../../angularm.service';

@Component({
    selector: 'div [mgFormLine]',
    template:
        `<label for="{{propertyType.entityType.singular}}_{{propertyType.name}}"
            >{{propertyType.name | titleCase}}</label>
        <input
          type="{{configuration.inputType}}"
          id="{{propertyType.entityType.singular}}_{{propertyType.name}}"
          placeholder="{{propertyType.name | titleCase}}"
          [formControl]="mgFormControl">
        <br>`,
})
export class FormLineComponent extends PropertyTypeComponent { 
    constructor(angularm: AngularmService) {
        super(angularm);
    }
    
}
