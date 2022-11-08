import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LogListComponent } from "./log-list.component";

const routes: Routes = [
    {
        path: '',
        component: LogListComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LogListRoutingModule {}