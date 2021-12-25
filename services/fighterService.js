const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {

    getAll() {
        const res = FighterRepository.getAll();
        if (!res)
            console.log('res')
        else
            return res;
    }

    getFighter(id) {
        const fighters = this.getAll();
        let fighter;
        for (let val of fighters) {
            if (':'+val.id === id) {
                fighter = val;
            }
        }
        const res = FighterRepository.getOne(fighter);
        if (!res)
            console.log('res')
        else
            return res;
    }
    add(fighter) {
        FighterRepository.create({...fighter, health: 100});
    }
    deleteUser(id) {
        FighterRepository.delete(id)
    }
    updateUser(id, data) {
        FighterRepository.update(id, data)
    }
    // TODO: Implement methods to work with fighters
}

module.exports = new FighterService();