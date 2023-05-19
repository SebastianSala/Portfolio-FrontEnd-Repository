import { EventEmitter, Injectable } from '@angular/core';

import { EntityChange, Entity } from '../model/dataTypes';


@Injectable({
  providedIn: 'root'
})
export class ChangeEntityService {


  public entityChanged: EventEmitter<EntityChange> = new EventEmitter<EntityChange>();

  public entityCreated: EventEmitter<Entity> = new EventEmitter<Entity>();
  public entityUpdated: EventEmitter<Entity> = new EventEmitter<Entity>();
  public entityDeleted: EventEmitter<Entity> = new EventEmitter<Entity>();


  constructor() {

  }


  public changeEntity(entityChange: EntityChange): void {
    this.entityChanged.emit(entityChange);
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
