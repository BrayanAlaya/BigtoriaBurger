import { Routes } from "@angular/router";
import { UserComponent } from "../user/user.component";
import { UserAjustesComponent } from "../user-ajustes/user-ajustes.component";
import { BuyComponent } from "../buy/buy.component";

export const userRoutes: Routes = [
    {path: "", component: UserComponent},
    {path: "settings", component: UserAjustesComponent},
    {path: "buy-story", component: BuyComponent},
]