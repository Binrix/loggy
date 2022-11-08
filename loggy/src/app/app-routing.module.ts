import { NgModule } from "@angular/core";
import { NgModel } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./log-list/log-list.module').then(m => m.LogListModule)
    }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}