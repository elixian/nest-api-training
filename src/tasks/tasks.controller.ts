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

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  // @Get()
  // getTasks(@Query() taskFilter: GetTasksFilterDTO): Task[] {
  //   if (Object.keys(taskFilter).length) {
  //     return this.taskService.GetTasksFiltered(taskFilter);
  //   }
  //   return this.taskService.getTasks();
  // }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskByID(id);
  }
  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.taskService.getTaskById(id);
  // }

  // @Post()
  // createTask(
  //   @Body()
  //   createTasDTO: CreateTaskDTO,
  // ): Task {
  //   return this.taskService.createTask(createTasDTO);
  // }

  // @Delete('/:id')
  // deleteTask(@Param('id') id: string): Task[] {
  //   return this.taskService.deleteTask(id);
  // }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDTO: UpdateTaskStatusDTO,
  // ): Task {
  //   const { status } = updateTaskStatusDTO;
  //   return this.taskService.updateTaskStatus(id, status);
  // }
}
