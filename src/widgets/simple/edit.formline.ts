import { Component, OnInit, ViewChild } from '@angular/core';

import { PropertyComponent } from '../../meta/property.component';

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
export class EditFormLineComponent extends PropertyComponent { }
