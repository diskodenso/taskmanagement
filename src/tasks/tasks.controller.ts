import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  //   inject tasks service into controller with constructor and you can can use it in your function
  //   you can prefix parameter Names with an accessor like private or public
  constructor(private tasksService: TasksService) {}
  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getallTasks();
  }
  // first option is to retrieve the whole body - when request comes in and takes all the request body and assigns it to that arguments
  // this way you need to do validation so clients cant create new properties
  //   @Post()
  //   createTask(@Body() body) {
  //     console.log('body', body);
  //   }
  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.tasksService.createTask(title, description);
  }
}
