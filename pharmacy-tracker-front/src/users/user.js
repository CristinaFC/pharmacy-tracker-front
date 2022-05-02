
class User {
    constructor(email, name, role, uid){
        this.email = email;
        this.name = name;
        this.role = role;
        this.uid = uid;
    }

}

export const userConverter = {
    toFirestore: (users) => {
        return {
            email: users.address,
            name: users.name,
            role: users.role,
            uid: users.uid,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(data.email, data.name, data.role, data.uid);
    }
};

export default User;