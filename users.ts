type User = {
    id: number,
    username: string,
    role: "member" | "contributor" | "admin"
}

// Partial<T> makes all properties in T optional
type UpdatedUser = Partial<User>;
let nextUserId: number = 1;

const users: User[] = [
    { id: nextUserId++, username: "john_doe", role: "member" },
    { id: nextUserId++, username: "jane_smith", role: "contributor" },
    { id: nextUserId++, username: "alice_jones", role: "admin" },
    { id: nextUserId++, username: "charlie_brown", role: "member" }
];

function updateUser(id: number, updates: UpdatedUser): User | undefined {
    const foundUser: User | undefined = users.find(user => user.id === id);
    if(!foundUser) {
        console.error(`User with id ${id} does not exist.`);
        return;
    }
    Object.assign(foundUser, updates);
}

// Omit<T, K> makes properties specified in K optional for type T
// K can be a union type, e.g. "id" | "role"
function addNewUser(newUser: Omit<User, "id">): User {
    let user: User = { id: nextUserId++, ...newUser }
    Object.assign(user, newUser);
    users.push(user);
    return user;
}

updateUser(1, { username: "new_john_doe"})
updateUser(4, { role: "contributor"})
addNewUser({ username: "joe_schmoe", role: "member"})

console.log(users);
