import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // Crear o inicializar el almacenamiento
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Guardar un valor con una clave
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  // Obtener un valor con una clave
  public async get(key: string): Promise<any> {
    return await this._storage?.get(key);
  }

  // Eliminar un valor por clave
  public async remove(key: string) {
    await this._storage?.remove(key);
  }
}
