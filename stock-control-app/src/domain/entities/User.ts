export type UserRole = 'ALMOXARIFE' | 'REQUISITOR';

export interface UserProps {
  id?: string;
  email: string;
  password?: string;
  name: string;
  role: UserRole;
}

export class User {
  constructor(private props: UserProps) {}

  get id() { return this.props.id; }
  get email() { return this.props.email; }
  get password() { return this.props.password; }
  get name() { return this.props.name; }
  get role() { return this.props.role; }
}