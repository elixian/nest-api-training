import { GetTasksFilterDTO } from './dto/get-task-filter.deto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  GetTasksFiltered(GetTasksFilterDTO): Task[] {
    const tasks = this.tasks;
    const { status, search } = GetTasksFilterDTO;
    if (status) {
      tasks.filter((n) => n.status === status);
    }
    if (search) {
      tasks.find(
        (n) => n.description.includes(search) || n.title.includes(search),
      );
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((n) => n.id === id);

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): Task[] {
    this.tasks = this.tasks.filter((n) => n.id !== id);
    return this.tasks;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
