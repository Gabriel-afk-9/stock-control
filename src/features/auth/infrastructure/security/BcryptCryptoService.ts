import bcrypt from 'bcryptjs';
import { ICryptoService } from '../../domain/services/ICryptoService';

export class BcryptCryptoService implements ICryptoService {
  async hash(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, 12);
  }

  async compare(plainText: string, hashedText: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashedText);
  }
}