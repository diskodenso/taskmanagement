import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatus } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  //   inject tasks service into controller with constructor and you can can use it in your function
  //   you can prefix parameter Names with an accessor like private or public
  constructor(private tasksService: TasksService) {}
  // get tasks by search/filter function with query parameters
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    // if we have any filters defined, call tasksService.getTasksWithFilters otherwise just get all tasks
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getallTasks();
    }
  }
  // get task by id controller
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }
  // first option is to retrieve the whole body - when request comes in and takes all the request body and assigns it to that arguments
  // this way you need to do validation so clients cant create new properties
  //   @Post()
  //   createTask(@Body() body) {
  //     console.log('body', body);
  //   }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  // use void as a type cause we dont want to return anything
  deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }

  // update task status controller
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatus: UpdateTaskStatus,
  ): Task {
    const { status } = updateTaskStatus;
    return this.tasksService.updateTaskStatus(id, status);
  }
}
