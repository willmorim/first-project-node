import { inject, injectable } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      except_user_id: user_id,
    });

    return users;
  }
}

export default ListProvidersService;
