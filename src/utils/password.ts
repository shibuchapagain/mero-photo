import * as argon2 from 'argon2';

type IVerifyPassword = {
  hashedPassword: string;
  plainPassword: string;
};

/**
 * Hash a password using argon
 */
export async function hashPassword(password: string): Promise<string> {
  return await argon2.hash(password);
}

/**
 * Verify a password using argon
 */
export async function verifyPassword({ hashedPassword, plainPassword }: IVerifyPassword): Promise<boolean> {
  return await argon2.verify(hashedPassword, plainPassword);
}
