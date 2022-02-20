import {useMemo} from "react";
import {IUser} from "../../types/user";

export const useUsers = (users: IUser[], query: string) => {
    return useMemo(() => {
        if (query) {
            return [...users].filter(user => {
                const {firstName, lastName, patronymic} = user
                
                const fullName = `${firstName} ${lastName} ${patronymic}`

                return fullName.toLowerCase().includes(query.toLowerCase())
            })
        }
        
        return users;
    }, [users, query]);
}
