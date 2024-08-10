import { ProgressUpdate } from '@domain/entities/ProgressUpdate';
import { TaskRepository } from '@domain/repositories/TaskRepository';
import { UserRepository } from '@domain/repositories/UserRepository';
import { ProgressUpdateRepository } from '@domain/repositories/ProgressUpdateRepository';

export class UpdateTaskProgressUseCase {
  constructor(
    private taskRepository: TaskRepository,
    private userRepository: UserRepository,
    private progressUpdateRepository: ProgressUpdateRepository
  ) {}

  async execute(taskId: number, userId: number, updateData: {
    description: string;
    percentageComplete: number;
    hoursSpent: number;
  }): Promise<ProgressUpdate> {
    const task = await this.taskRepository.findById(taskId);
    if (!task) {
      throw new Error('Task not found');
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // ตรวจสอบว่าผู้ใช้ได้รับมอบหมายงานนี้หรือไม่
    // (อาจต้องใช้ TaskAssignmentRepository เพิ่มเติม)
    if (!await this.isUserAssignedToTask(userId, taskId)) {
      throw new Error('User is not assigned to this task');
    }

    const progressUpdate = new ProgressUpdate(
      0, // ID จะถูกกำหนดโดยฐานข้อมูล
      taskId,
      userId,
      new Date(),
      updateData.description,
      updateData.percentageComplete,
      updateData.hoursSpent,
      new Date(),
      null,
      null
    );

    // บันทึกการอัพเดทความคืบหน้าลงในฐานข้อมูล
    const savedUpdate = await this.progressUpdateRepository.create(progressUpdate);

    // // อัพเดทสถานะของงาน (ถ้าจำเป็น)
    // if (updateData.percentageComplete === 100) {
    //   task.updateStatus('Completed');
    //   await this.taskRepository.update(task);
    // }

    // อาจมีการคำนวณและอัพเดทความคืบหน้าของ Phase และ Project ที่เกี่ยวข้อง

    return savedUpdate;
  }

  private async isUserAssignedToTask(userId: number, taskId: number): Promise<boolean> {
    // ตรวจสอบการมอบหมายงาน (ต้องมีการ implement เพิ่มเติม)
    return true; // Placeholder
  }
}