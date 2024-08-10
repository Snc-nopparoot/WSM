import bcrypt from 'bcrypt';

// จำนวนรอบของการ salt
const SALT_ROUNDS = 10;

// ฟังก์ชันสำหรับ hash รหัสผ่านโดยรวม key
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const saltedPassword = password + 'secret'; // หรือ key + password ตามที่ต้องการ
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(saltedPassword, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

// ฟังก์ชันสำหรับตรวจสอบรหัสผ่านโดยรวม key
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  try {
    const saltedPassword = password + 'secret'; // ต้องใช้วิธีการต่อเหมือนเดิม
    const match = await bcrypt.compare(saltedPassword, hashedPassword);
    return match;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};
