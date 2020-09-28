import { observable, computed, action, runInAction } from 'mobx';
import { IUser, IUserFormValues } from '../../models/user';
import agent from '../api/agent';
import { RootStore } from './rootStore';


export default class  UserStore {
    @observable user: IUser | null = null;

    @computed get isLoggedIn() { return !!this.user }

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action login = async (values: IUserFormValues) => {
        try {
            const user = await agent.User.login(values);
            runInAction(() => {
                this.user = user;
            });
            
            console.log(user);
        } catch(error) {
            console.log(error);
        }
    }
}