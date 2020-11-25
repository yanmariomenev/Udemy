import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IServerModel } from '../models/server.model';


@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<IServerModel>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<IServerModel>();
  // newServerName = '';
  // newServerContent = '';
  @ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(serverNameInput: HTMLInputElement) {
    this.serverCreated.emit({
     serverName: serverNameInput.value,
     serverContent: this.serverContentInput.nativeElement.value
    });
  }

  onAddBlueprint(serverNameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
     serverName: serverNameInput.value,
     serverContent: this.serverContentInput.nativeElement.value
    });
  }
}
