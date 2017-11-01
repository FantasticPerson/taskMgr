import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component'
import { NgModule } from '@angular/core'

const routes: Routes = [
    { path: '',redirectTo: '/login',pathMatch:'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}