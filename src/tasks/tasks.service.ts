import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  // type is an array of Task
  private tasks: Task[] = [];

  // setip methods to interface with our service
  // define a method to communication with the controller
  getallTasks() {
    return this.tasks;
  }
  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    // define a temporary array to hold the result
    let tasks = this.getallTasks();
    // do something with status
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    // do something with search
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
    // return final result
  }
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  // get task by id service - find task which matches task.id === id
  getTaskById(id: string): Task {
    // try to get task
    const found = this.tasks.find((task) => task.id === id);
    // if not found, throw error
    if (!found) {
      throw new NotFoundException(`Task with '${id}' not found`);
    }
    // otherwise return found task
    return found;
  }
  // delete single task service - filter task where the task.id is not matching the id
  deleteTask(id: string): void {
    //  error handling for deleting a task which is not existing
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }
  // update single task status
  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
