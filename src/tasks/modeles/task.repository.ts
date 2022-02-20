import { GetTasksFilterDTO } from './../dto/get-task-filter.deto';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { CreateTaskDTO } from '../dto/create-task.dto';
import { TaskStatus } from '../task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDTO): Promise<Task[]> {
    const query = this.createQueryBuilder('task');
    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDTO: CreateTaskDTO) {
    const { title, description } = createTaskDTO;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<DeleteResult> {
    return this.delete({ id });
  }
}
