import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputTextComponent} from './input-text/input-text.component';
import {ShowErrorsComponent} from './show-errors/show-errors.component';
import {InputMultipleSelectComponent} from './input-multiple-select/input-multiple-select.component';


@NgModule({
    declarations: [
        AppComponent,
        InputTextComponent,
        ShowErrorsComponent,
        InputMultipleSelectComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
