import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITask } from '../model/task';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  TaskForm!: FormGroup;
  tasklist: ITask [] = [];
  inProgressList: ITask [] = [];
  doneList: ITask [] = [];
  index!: any;
  isUpdated= false;
  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.initFormTask();
  }
  initFormTask()
  {
    this.TaskForm = this.formBuilder.group({
      'item': ['', Validators.required]
    }
    )
  }
  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  addTask()
  {
    this.tasklist.push(
      {
        description: this.TaskForm.value.item,
        done: false
      }

      
    )
    this.TaskForm.reset()
  
    
  }
  delete(i : number)
  {
    this.tasklist.splice(i, 1)
  }
    
  deleteinProgressList(i: number)
  {
    this.inProgressList.splice(i,1)
  }

  deletedoneList(i : number){
      this.doneList.splice(i,1)
  }
  OnEdit(i: number, item: ITask) {
    this.TaskForm.controls['item'].setValue(item.description);
    this.index = i;
    this.isUpdated = true;
  }

  editTask() {
    this.tasklist[this.index].description= this.TaskForm.value.item;
    this.tasklist[this.index].done=false;
    this.TaskForm.reset();
    this.index = undefined; 
    this.isUpdated = false;
  }
  
}
