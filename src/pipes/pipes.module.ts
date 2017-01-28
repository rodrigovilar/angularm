import { NgModule } from '@angular/core';

import { TitleCase } from './titlecase.pipe';

@NgModule({
    declarations: [
        TitleCase
    ],
    exports: [
        TitleCase
    ]
})
export class PipesModule {}

export * from './titlecase.pipe';
