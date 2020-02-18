import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatSnackBar, MatTable } from '@angular/material';
import { VarsService } from 'src/app/services/vars.service';
import { ApiService } from "../../../services/api.service";
import { ConfirmsDialog } from 'src/app/templates/confirm-dialog/confirm-dialog';

import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

export interface PublicationsData {
    idPublicacion: number,
    descripcion: string,
    imagen:string,
    destacado: number,
    idUsuario: number,
}

@Component({
    selector: 'app-list-publication',
    templateUrl: './list-publication.component.html',
    styleUrls: ['./list-publication.component.scss']
})
export class ListPublicationComponent  implements OnInit, OnDestroy{
    
    // Behavior Subjects Vars
    user: object;
    
    // Subscriptions
    userSubs: any;
    
    loading: boolean = true;
    publicaciones: object[];
    filesUrl = this.vars.filesUrl;
    reArranged: boolean = false;
    
    
    constructor(
        private vars: VarsService,
        public api: ApiService,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar,
        ) { }
        
        ngOnInit() {
            this.user = this.vars.user.source['value'];
            this.getPublications();
        }
        
        onListDrop(event: CdkDragDrop<PublicationsData[]>) {
            this.reArranged = true;
            moveItemInArray(this.publicaciones, event.previousIndex, event.currentIndex);
        }
        
        
        getPublications(){
            this.loading = true;
            this.api.listPublic(null).subscribe(response => {
                if(response['status'] == '200'){
                    this.publicaciones = response['data'];
                } else {
                    this._snackBar.open('No se pudo listar las publicaciones', 'Entendido', {duration: 5000});
                }
                this.loading = false;
            });
        }
        
        
        
        delete(row, idx) {
            
            const dialogConfigs = {
                title: 'ELIMINAR PUBLICACIóN',
                subtitle: '¿Desea eliminar la publicación ' + row['idPublicacion'] +  '?',
                done: 'Borrar',
                cancel: 'Cancelar'
            }
            
            const dialogRef = this.dialog.open(ConfirmsDialog, {
                width: '40%',
                data: dialogConfigs
            });
            
            dialogRef.afterClosed().subscribe(result => {
                
                if (result) {
                    let params = 'idPublicacion=' + row['idPublicacion'];
                    params += '&imagen=' + row['imagen'];

                    this.api.deletePublic(params).subscribe(response => {
                        if(response['status'] == '200'){
                            this.publicaciones.splice(idx,1);
                            this._snackBar.open('La publicación fué eliminada correctamente ', 'Entendido', {duration: 5000});   
                        } else {
                            this._snackBar.open('La publicación no pudo ser eliminada', 'Entendido', {duration: 5000});
                        }
                    });
                    
                }
            });
        }
        
        ngOnDestroy() {
            
        }
        
    }
    