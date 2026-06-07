export interface ICryptoService {
  compare(plainText: string, hash: string): Promise<boolean>;
}