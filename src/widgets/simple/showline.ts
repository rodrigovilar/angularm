import { Component } from '@angular/core';

import { PropertyComponent } from '../../meta/property.component';
import { AngularmService } from '../../angularm.service';

@Component({
    selector: 'p [mgShowLine]',
    template:
        `<strong>{{property.propertyType.name | titleCase}}:</strong> {{property.value}}`,
})
export class ShowLineComponent extends PropertyComponent { 
    constructor(angularm: AngularmService) {
        super(angularm);
    }
    
}
