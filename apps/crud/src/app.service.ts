import { Injectable } from '@nestjs/common';
import { User } from '@app/database';

@Injectable()
export class CrudService {

  async findAllUsers(): Promise<Array<User>> {
    return await User.find({})
  }

  async insertUser(email: string, password: string): Promise<User> {
    const user = User.create();
    user.email = email;
    user.password = password;
    return await user.save()
  }

  async deleteUserById(id: string): Promise<User> {
    const userToDelete = await User.findOne({where: {id: parseInt(id)}})
    return await userToDelete.remove();
  }
}
