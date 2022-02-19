import { GetTasksFilterDTO } from './dto/get-task-filter.deto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskRepository } from './modeles/task.repository';
import { Task } from './modeles/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  // private tasks: Task[] = [];

  // getTasks(): Task[] {

  //   return this.tasks;
  // }

  // GetTasksFiltered(GetTasksFilterDTO): Task[] {
  //   const tasks = this.tasks;
  //   const { status, search } = GetTasksFilterDTO;
  //   if (status) {
  //     tasks.filter((n) => n.status === status);
  //   }
  //   if (search) {
  //     tasks.find(
  //       (n) => n.description.includes(search) || n.title.includes(search),
  //     );
  //   }

  //   return tasks;
  // }
  async getTaskByID(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
    return found;
  }

  // getTaskById(id: string): Task {
  //   const found = this.tasks.find((n) => n.id === id);

  //   if (!found) {
  //     throw new NotFoundException();
  //   }

  //   return found;
  // }

  // createTask(createTaskDTO: CreateTaskDTO): Task {
  //   const { title, description } = createTaskDTO;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }

  // deleteTask(id: string): Task[] {
  //   this.tasks = this.tasks.filter((n) => n.id !== id);
  //   return this.tasks;
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
