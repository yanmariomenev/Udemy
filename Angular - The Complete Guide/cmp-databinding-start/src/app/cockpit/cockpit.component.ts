import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IServerModel } from '../models/server.model';


@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<IServerModel>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<IServerModel>();
  newServerName = '';
  newServerContent = '';
  constructor() { }

  ngOnInit(): void {
  }

  onAddServer() {
    this.serverCreated.emit
    ({serverName: this.newServerName, serverContent: this.newServerContent});
  }

  onAddBlueprint() {
    this.blueprintCreated.emit
    ({serverName: this.newServerName, serverContent: this.newServerContent});
  }
}
