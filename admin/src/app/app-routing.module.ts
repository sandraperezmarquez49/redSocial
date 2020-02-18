import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEditUserComponent } from './pages/users/create-edit-user/create-edit-user.component';
import { ListPublicationComponent } from './pages/publications/list-publication/list-publication.component';
import { CreateEditPublicationComponent } from './pages/publications/create-edit-publication/create-edit-publication.component';

const routes: Routes = [
  // Default
  {
    path: '',
  component: ListPublicationComponent
  },
  //publicaciones
  {
    path: 'publicacion/crear',
    component: CreateEditPublicationComponent
  },
  {
    path: 'publicacion/editar/:id',
    component: CreateEditPublicationComponent
  },
  //usuarios
  {
    path: 'usuario',
    component: CreateEditUserComponent
  },
  {
    path: 'usuario/editar/:id',
    component: CreateEditUserComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
