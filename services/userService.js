const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user
    getAll() {
        const res = UserRepository.getAll();
        if (!res)
            console.log('res')
        else
            return res;
    }
    getUser(id) {
        const users = this.getAll();
        let user;
        for (let val of users) {
            if (':'+val.id === id) {
                user = val;
            }
        }
        const res = UserRepository.getOne(user);
        if (!res)
            console.log('res')
        else
            return res;
    }
    add(user) {
        UserRepository.create(user);
    }
    deleteUser(id) {
        UserRepository.delete(id)
    }
    updateUser(id, data) {
        UserRepository.update(id, data)
    }
    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
}

module.exports = new UserService();