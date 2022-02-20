import { GetTasksFilterDTO } from './dto/get-task-filter.deto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { TaskRepository } from './modeles/task.repository';
import { Task } from './modeles/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  // private tasks: Task[] = [];

  getTasks(filterDto: GetTasksFilterDTO): Promise<Task[]> {
    return this.taskRepository.find(filterDto);
  }

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

  createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createTask(createTaskDTO);
  }

  deleteTask(id: string): Promise<DeleteResult> {
    return this.taskRepository.deleteTask(id);
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskByID(id);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
