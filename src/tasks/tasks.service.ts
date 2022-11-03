import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
@Injectable()
export class TasksService {
  // type is an array of Task
  private tasks: Task[] = [];

  // setip methods to interface with our service
  // define a method to communication with the controller
  getallTasks() {
    return this.tasks;
  }
  createTask(title: string, description: string): Task {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
