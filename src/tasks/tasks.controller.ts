import { CreateTaskDTO } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(
    @Body()
    createTasDTO: CreateTaskDTO,
  ): Task {
    return this.taskService.createTask(createTasDTO);
  }
}
