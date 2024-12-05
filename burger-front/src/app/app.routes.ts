import { Routes } from '@angular/router';
import { VenderComponent } from './pages/vender/vender.component';
import { HomeComponent } from './pages/home/home.component';
import { dashboardRoutes } from './pages/dashboard/dashboard.routes';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PayComponent } from './pages/pay/pay.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserDashComponent } from './pages/user-dash/user-dash.component';
import { userRoutes } from './pages/user-dash/user.routes';
import { PassRecoverComponent } from './pages/pass-recover/pass-recover.component';
import { userAdminGuard } from './guards/user-admin.guard';
import { userAuthGuard } from './guards/user-auth.guard';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "sell", component: VenderComponent},
    {path: "dash", component: DashboardComponent, canActivate: [userAdminGuard] ,children: dashboardRoutes},
    {path: "user", component: UserDashComponent, canActivate: [userAuthGuard] ,children: userRoutes},
    {path: "pay", component: PayComponent},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "password-recover", component: PassRecoverComponent},
];
