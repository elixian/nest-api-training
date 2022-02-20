import { GetTasksFilterDTO } from './dto/get-task-filter.deto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { Task } from './modeles/task.entity';
import { DeleteResult } from 'typeorm';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() taskFilter: GetTasksFilterDTO): Promise<Task[]> {
    return this.taskService.getTasks(taskFilter);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskByID(id);
  }

  @Post()
  createTask(
    @Body()
    createTasDTO: CreateTaskDTO,
  ): Promise<Task> {
    return this.taskService.createTask(createTasDTO);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<DeleteResult> {
    return this.taskService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDTO: UpdateTaskStatusDTO,
  ): Promise<Task> {
    const { status } = updateTaskStatusDTO;
    return this.taskService.updateTaskStatus(id, status);
  }
}
