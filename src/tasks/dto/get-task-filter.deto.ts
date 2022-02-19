import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';
export class GetTasksFilterDTO {
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
  @IsOptional()
  @IsString()
  search?: string;
}
