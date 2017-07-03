import { FormControl } from '@angular/forms';

import { PropertyType } from '../entitytype';
import { AbstractComponent } from "./abstract.component";

export abstract class PropertyTypeComponent extends AbstractComponent {

    public propertyType: PropertyType;
    public mgFormControl: FormControl;

};
