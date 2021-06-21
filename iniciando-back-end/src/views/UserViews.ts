// arquivo de 'responses' personalizadas de 'user'

import User from '../models/User';

interface ViewCreateUser {
  id: string;
  email: string;
}

interface ViewAuthenticateUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
}

export default {
  renderCreateUser(user: User): ViewCreateUser {
    // view para 'CreateUser'
    return {
      id: user.id,
      email: user.email,
    };
  },
  renderAuthenticateUser(user: User): ViewAuthenticateUser {
    // view para 'AuthenticateUser'
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  },
};
