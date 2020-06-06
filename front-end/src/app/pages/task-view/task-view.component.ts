import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  
  constructor(private taskService: TaskService, private route: ActivatedRoute) { }
  
    lists: any[];
    tasks: any[];
    faPlus = faPlus;

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params);
        this.taskService.getTasks(params.listId).subscribe((tasks: any[]) => {
          this.tasks = tasks;
        })
      }
    )

    this.taskService.getLists().subscribe((lists: any[]) => {
      this.lists = lists;
    })
  }

}
