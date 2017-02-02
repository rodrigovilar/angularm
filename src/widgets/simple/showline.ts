import { Component } from '@angular/core';

import { PropertyComponent } from '../../meta/property.component';

@Component({
    selector: 'p [mgShowLine]',
    template:
        `<strong>{{property.propertyType.name | titleCase}}:</strong> {{property.value}}`,
})
export class ShowLineComponent extends PropertyComponent { }
