import { Injectable, EventEmitter } from '@angular/core';

import { GlobalClick, globalClick } from "../model/GlobalClick";
// import "../model/GlobalClick.ts"

@Injectable({
  providedIn: 'root'
})
export class EventHandlerService {

  constructor() { }

  // parentEvent = new EventEmitter<boolean>();
  parentEvent = new EventEmitter<GlobalClick>();

}
