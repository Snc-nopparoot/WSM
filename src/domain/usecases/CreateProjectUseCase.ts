import { Project } from '@domain/entities/Project';
import { ProjectRepository } from '@domain/repositories/ProjectRepository';
import { UserRepository } from '@domain/repositories/UserRepository';

export class CreateProjectUseCase {
  constructor(
    private projectRepository: ProjectRepository,
    private userRepository: UserRepository
  ) {}

  async execute(userId: number, projectData: {
    name: string;
    description: string;
    startDate: Date;
    endDate?: Date;
  }): Promise<Project> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // ตรวจสอบสิทธิ์ของผู้ใช้ในการสร้างโปรเจค
    // (อาจจะมี method ใน User entity เพื่อตรวจสอบสิทธิ์)
    // if (!user.canCreateProject()) {
    //   throw new Error('User does not have permission to create a project');
    // }

    const project = new Project(
      0, // ID จะถูกกำหนดโดยฐานข้อมูล
      projectData.name,
      projectData.description,
      projectData.startDate,
      projectData.endDate || null,
      'Planning', // สถานะเริ่มต้น
      new Date(),
      null,
      null
    );

    // บันทึกโปรเจคลงในฐานข้อมูล
    const savedProject = await this.projectRepository.create(project);

    // อาจมีการดำเนินการเพิ่มเติม เช่น ส่งการแจ้งเตือน หรือสร้าง default phases

    return savedProject;
  }
}