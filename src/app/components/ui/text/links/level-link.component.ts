import {Component, Input, OnInit} from '@angular/core';
import {ClientService} from "../../../../api/client.service";
import {NgIf} from "@angular/common";
import {Level} from "../../../../api/types/levels/level";
import {LevelAvatarComponent} from "../../photos/level-avatar.component";
import {LevelRouterLinkComponent} from "./level-router-link.component";

@Component({
  selector: 'app-level-link',
  standalone: true,
  imports: [
    NgIf,
    LevelAvatarComponent,
    LevelRouterLinkComponent
  ],
  template: `
    <span *ngIf=!level>...</span>
    <app-level-router-link [level]=level *ngIf=level>
      <app-level-avatar class="ml-1" [level]=level></app-level-avatar>
      {{ level.title }}
    </app-level-router-link>
  `,
  styles: ``
})
export class LevelLinkComponent implements OnInit {
  @Input({required: true}) public level: Level | null = null;
  @Input() public levelId: number | undefined;

  constructor(private client: ClientService) {
  }

  ngOnInit(): void {
    if (this.level != null) return;
    if (this.levelId == undefined) return;

    this.client.getLevelById(this.levelId).subscribe(data => {
      this.level = data;
    });
  }
}
