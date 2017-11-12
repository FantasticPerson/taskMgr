import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component'
import { NgModule } from '@angular/core'

const routes: Routes = [
    { path: '',redirectTo: '/login',pathMatch:'full' },
    { path: 'projcet',redirectTo: '/project',pathMatch:'full' },
    { path: 'tasklist',redirectTo: '/tasklists',pathMatch:'full' },    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
