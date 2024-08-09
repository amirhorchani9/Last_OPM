import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path : '',
        redirectTo : 'signin',
        pathMatch : 'full'
      },
      {
        path: 'signup',
        loadChildren: () => import('./auth-signup/auth-signup.module').then(m => m.AuthSignupModule)
      },
      {
        path: 'signin',
        loadChildren: () => import('./auth-signin/auth-signin.module').then(m => m.AuthSigninModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
