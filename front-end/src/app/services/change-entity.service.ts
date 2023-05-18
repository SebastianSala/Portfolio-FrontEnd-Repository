import { EventEmitter, Injectable } from '@angular/core';

import { Entity } from '../model/dataTypes';


@Injectable({
  providedIn: 'root'
})
export class ChangeEntityService {


  public entityChanged: EventEmitter<Entity> = new EventEmitter<Entity>();
  public entityCreated: EventEmitter<Entity> = new EventEmitter<Entity>();
  public entityUpdated: EventEmitter<Entity> = new EventEmitter<Entity>();
  public entityDeleted: EventEmitter<Entity> = new EventEmitter<Entity>();


  constructor() {

  }


  public changeEntity(entity: Entity): void {
    this.entityChanged.emit(entity);
  }

  public createEntity(entity: Entity): void {
    this.entityCreated.emit(entity);
  }
  
  public updateEntity(entity: Entity): void {
    this.entityUpdated.emit(entity);
  }
  
  public deleteEntity(entity: Entity): void {
    this.entityDeleted.emit(entity);
  }
  




}
