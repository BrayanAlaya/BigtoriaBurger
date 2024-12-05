import { Routes } from "@angular/router"
import { MainDashComponent } from "../main-dash/main-dash.component"
import { ListDashComponent } from "../list-dash/list-dash.component"
import { CreateFormDashComponent } from "../create-form-dash/create-form-dash.component"
import { UpdateFormDashComponent } from "../update-form-dash/update-form-dash.component"
import { SalesDashComponent } from "../sales-dash/sales-dash.component"

export const dashboardRoutes: Routes = [
    {path: "", component: MainDashComponent},
    {path: "list", component: ListDashComponent},
    {path: "create", component: CreateFormDashComponent},
    {path: "update", component: UpdateFormDashComponent},
    {path: "sales", component: SalesDashComponent},
]
