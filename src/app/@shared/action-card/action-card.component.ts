import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CardType } from '../models/card';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-action-card',
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.scss'],
})
export class ActionCardComponent implements OnInit {
  @Input() cardType: string = '';
  @Input() saveButtonTitle = 'Save';
  @Input() editButtonTitle = 'Edit';
  @Input() deleteButtonTitle = 'Delete';
  @Input() deleteAllButtonTitle = 'Delete All';
  @Input() editAllButtonTitle = 'Edit All';
  @Input() saveAllButtonTitle = 'Save All';
  @Input() editDisabled?: boolean;
  @Input() name?: string;
  @Output() createNewEntity = new EventEmitter<string>();
  @Output() saveEdits = new EventEmitter<string>();
  @Output() setEntityEditOn = new EventEmitter<string>();
  @Output() deleteEntity = new EventEmitter<boolean>();
  @Output() deleteAll = new EventEmitter<boolean>();
  @Output() editAll = new EventEmitter<boolean>();
  @Output() saveAll = new EventEmitter<boolean>();
  controlName = new FormControl();

  constructor() {}

  ngOnInit(): void {
    if (this.name) {
      this.controlName.setValue(this.name);
    }
  }

  saveCurrentEdits(updatedEntityName: string | undefined): void {
    if (updatedEntityName) {
      this.saveEdits.emit(updatedEntityName);
    }
  }

  setActiveForEdit(name: string | undefined): void {
    this.setEntityEditOn.emit(name);
  }

  addNewEntity(entityName: string): void {
    this.createNewEntity.emit(entityName);
  }

  deleteSelectedEntity(): void {
    this.deleteEntity.emit(true);
  }

  deleteAllEntities(): void {
    this.deleteAll.emit(true);
  }

  editAllEntities(): void {
    this.editAll.emit(true);
  }

  saveAllEntities() {
    this.saveAll.emit(true);
  }
}
