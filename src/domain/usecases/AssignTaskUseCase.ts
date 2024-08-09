import { TaskAssignment } from '@domain/entities/TaskAssignment';
import { TaskRepository } from '@domain/repositories/TaskRepository';
import { UserRepository } from '@domain/repositories/UserRepository';
import { TaskAssignmentRepository } from '@domain/repositories/TaskAssignmentRepository';

export class AssignTaskUseCase {
  constructor(
    private taskRepository: TaskRepository,
    private userRepository: UserRepository,
    private taskAssignmentRepository: TaskAssignmentRepository
  ) {}

  async execute(taskId: number, userId: number, assignerId: number, role: string): Promise<TaskAssignment> {
    const task = await this.taskRepository.findById(taskId);
    if (!task) {
      throw new Error('Task not found');
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const assigner = await this.userRepository.findById(assignerId);
    if (!assigner) {
      throw new Error('Assigner not found');
    }

    // ตรวจสอบสิทธิ์ของผู้มอบหมายงาน
    // if (!assigner.canAssignTasks()) {
    //   throw new Error('Assigner does not have permission to assign tasks');
    // }

    // ตรวจสอบว่างานนี้ถูกมอบหมายให้ใครไปแล้วหรือไม่
    const existingAssignment = await this.taskAssignmentRepository.findByTaskId(taskId);
    if (existingAssignment.length > 0) {
      throw new Error('Task is already assigned');
    }

    const assignment = new TaskAssignment(
      0, // ID จะถูกกำหนดโดยฐานข้อมูล
      taskId,
      userId,
      new Date(),
      role,
      new Date(),
      null,
      null
    );

    // บันทึกการมอบหมายงานลงในฐานข้อมูล
    const savedAssignment = await this.taskAssignmentRepository.create(assignment);

    // อัพเดทสถานะของงาน (ถ้าจำเป็น)
    task.updateStatus('In Progress');
    await this.taskRepository.update(task);

    // อาจมีการส่งการแจ้งเตือนให้ผู้ได้รับมอบหมายงาน

    return savedAssignment;
  }
}