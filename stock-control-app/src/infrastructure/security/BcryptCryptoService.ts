import { compare } from 'bcryptjs';
import { ICryptoService } from "../../application/services/ICryptoService";

export class BcryptCryptoService implements ICryptoService {
  async compare(plainText: string, hash: string): Promise<boolean> {
    return await compare(plainText, hash);
  }
}