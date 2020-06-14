import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router  } from '@angular/router';
import { List } from 'src/app/models/list.model'
import { Task } from 'src/app/models/task.model'

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  
  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }
  
    lists: List[];
    tasks: Task[];
    selectedListId: string;

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params);
        this.taskService.getTasks(params.listId).subscribe((tasks: Task[]) => {
          this.tasks = tasks;
        })
      }
    )

    this.taskService.getLists().subscribe((lists: List[]) => {
      this.lists = lists;
    })
  }

  onTaskClick(task: Task) {
    this.taskService.complete(task).subscribe(() => {
      task.completed = !task.completed;
    });
  }

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists']);
      console.log(res);
    })
  }

  onDeleteTaskClick(id: string) {
    this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
      this.tasks = this.tasks.filter(val => val._id !== id);
      console.log(res);
    })
  }

}
