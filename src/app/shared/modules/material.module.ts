import { NgModule } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    declarations: [
    ],
    imports: [
        MatProgressSpinnerModule,
        MatTableModule,
        MatCardModule
    ],
    exports: [
        MatProgressSpinnerModule,
        MatTableModule,
        MatCardModule
    ],
    providers: [
    ]
})
export class MaterialModule { }
