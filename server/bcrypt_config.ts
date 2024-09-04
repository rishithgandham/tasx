import { compare, genSalt, hash } from 'bcrypt';

async function hashPassword(password: string) {
  const hashed = await hash(password, 10);
  return hashed;
}

async function comparePassword(password: string, hashedPassword: string) {
  const match = await compare(password, hashedPassword);
  return match;
}

export { hashPassword, comparePassword };
