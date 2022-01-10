import { NgModule } from '@angular/core';
import { TrackerOverviewComponent } from './tracker-overview/tracker-overview.component';
import { RouterModule, Routes } from '@angular/router';
import { EditTopicsComponent } from './edit-topics/edit-topics.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { EDIT_TOPIC_URL, LOGIN_URL, OVERVIEW_URL } from './routes';


const routes: Routes = [
  { path: LOGIN_URL, component: LoginComponent },
  {
    canActivate: [AuthGuard], path: '', 
    children: [
      { path: OVERVIEW_URL, component: TrackerOverviewComponent},
      { path: EDIT_TOPIC_URL, component: EditTopicsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }