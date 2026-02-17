// User Inactive Error
export class UserInactiveError extends Error {
  constructor() {
    super('User account is inactive');
    this.name = 'UserInactiveError';
  }
}
