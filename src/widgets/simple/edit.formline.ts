import { Component, OnInit, ViewChild } from '@angular/core';

import { PropertyComponent } from '../../meta/property.component';
import { AngularmService } from '../../angularm.service';

@Component({
    selector: 'div [mgEditFormLine]',
    template:
        `<label
            for="{{property.propertyType.entityType.singular}}_{{property.propertyType.name}}"
        >{{property.propertyType.name | titleCase}}</label>
        <input
            type="{{configuration.inputType}}"
            id="{{property.propertyType.entityType.singular}}_{{property.propertyType.name}}"
            placeholder="{{property.propertyType.name | titleCase}}"
            [formControl]="mgFormControl"
            [(ngModel)]="property.value">
        <br>`,
})
export class EditFormLineComponent extends PropertyComponent {
    constructor(angularm: AngularmService) {
        super(angularm);
    }
    
 }
