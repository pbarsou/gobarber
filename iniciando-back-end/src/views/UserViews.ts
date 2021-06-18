import User from '../models/User';

interface ViewUser {
  id: string;
  email: string;
}

export default {
  render(user: User): ViewUser {
    return {
      id: user.id,
      email: user.email,
      // aqui vc poderá acrescentar futuramente novos campos que serão retornados
    };
  },
};
