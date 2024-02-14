import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage-service/storage.service';

export const authGuard = () => {
  const _authStorage = inject(StorageService);
  const router = inject(Router);

  if (Object.keys(_authStorage.getUser()).length !== 0) {
     // If [false], navigate
    return true;
  }
  // If [false], redirect to the login page
  return router.parseUrl('/account/registration');
};