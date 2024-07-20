import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncrDecrServiceService {
  key = 'TheKey2SecurityIsKeepingASecret!'
  
  constructor(){}
  
  encryptData(password: string, key: string): string {
    return CryptoJS.AES.encrypt(password, this.key).toString();
  }

  decryptData(passwordToDecrypt: string, key: string): string {
    return CryptoJS.AES.decrypt(passwordToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }
}
