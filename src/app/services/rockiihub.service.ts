import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RockiihubService {
  public devices: any[] = [];
  public tags: any[] = [];
  constructor() {}
}
