import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

export function encryptPassword(password: string): string {
  return bcrypt.hashSync(password, salt);
}

export function isValidPassword(
  password: string,
  hashedPassword: string
): boolean {
  return bcrypt.compareSync(password, hashedPassword);
}
