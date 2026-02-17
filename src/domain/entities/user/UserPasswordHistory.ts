// Prop Types Domain
interface UserPasswordHistoryPropsDomain {
  id: string;
  userId: string;
  passwordHash: string;
  createdAt: Date;
}

// Prop Types Create
interface UserPasswordHistoryPropsCreate {
  userId: string;
  passwordHash: string;
}

// Entity
export class UserPasswordHistory {
  // Identity
  private readonly id: string;

  // Data
  private readonly userId: string;
  private readonly passwordHash: string;

  // Audit
  private readonly createdAt: Date;

  // Constructor
  private constructor(props: UserPasswordHistoryPropsDomain) {
    this.id = props.id;
    this.userId = props.userId;
    this.passwordHash = props.passwordHash;
    this.createdAt = props.createdAt;
  }

  // Factory for NEW UserPasswordHistory
  static create(props: UserPasswordHistoryPropsCreate): UserPasswordHistory {
    return new UserPasswordHistory({
      id: '',
      userId: props.userId,
      passwordHash: props.passwordHash,
      createdAt: new Date(),
    });
  }

  // From persistence
  static fromPersistence(raw: {
    _id: string;
    userId: string;
    passwordHash: string;
    createdAt: Date;
  }): UserPasswordHistory {
    return new UserPasswordHistory({
      id: raw._id.toString(),
      userId: raw.userId,
      passwordHash: raw.passwordHash,
      createdAt: raw.createdAt,
    });
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getPasswordHash(): string {
    return this.passwordHash;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  // To persistence
  toPersistence(): {
    userId: string;
    passwordHash: string;
    createdAt: Date;
  } {
    return {
      userId: this.userId,
      passwordHash: this.passwordHash,
      createdAt: this.createdAt,
    };
  }
}
