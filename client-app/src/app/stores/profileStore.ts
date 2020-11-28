import { IPhoto, IProfile } from './../../models/profile';
import { action, observable, runInAction, computed } from 'mobx';
import { RootStore } from './rootStore';
import agent from '../api/agent';
import { toast } from 'react-toastify';

export default class ProfileStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable profile: IProfile | null = null;
    @observable loadingProfile = true;
    @observable uploadingPhoto = false;
    @observable loadingUpdate = false;
    @observable loading = false;
    @observable followings: IProfile[] = [];

    @computed get isCurrentUser() {
        if (this.rootStore.userStore.user && this.profile) {
            return this.rootStore.userStore.user?.displayName === this.profile.displayName;
        } else {
            return false;
        }
    }

    @action loadProfile = async (username: string) => {
        this.loadingProfile = true;
        try {
            
            const profile = await agent.Profiles.get(username);
            //const profiless = await agent.Profiles.getz(username);
            console.log(profile!.userName);
            runInAction(() => {
                this.profile = profile;
                this.loadingProfile = false;
            });
        } catch (error) {
            runInAction(() => {
                this.loadingProfile = false;
            });
            console.log(error);
        }
    }
    // Put request remaining
    @action updateProfile = async (displayName: string, bio: string) => {
        this.loadingProfile = true;
        try {
            await agent.Profiles.update(displayName, bio);
            runInAction(() => {
                this.rootStore.userStore.user!.displayName = displayName;
                this.profile!.displayName = displayName;

                this.profile!.bio = bio;
                this.loadingProfile = false;
            });
        } catch (error) {
            runInAction(() => {
                this.loadingProfile = false;
            });
            console.log(error);
        }
    }

    @action follow = async (username: string) => {
        this.loading = true;
        try {
            console.log(username)
            await agent.Profiles.follow(username); // username is undefined
            runInAction(() => {
                this.profile!.following = true;
                this.profile!.followersCount++;
                this.loading = false;
            });
        } catch (error) {
            toast.error('Problem following user');
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    @action unfollow = async (username: string) => {
        this.loading = true;
        try {
            await agent.Profiles.unfollow(username);
            runInAction(() => {
                this.profile!.following = false;
                this.profile!.followersCount--;
                this.loading = false;
            });
        } catch (error) {
            toast.error('Problem unfollowing user');
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    @action loadFollowings = async (predicate: string) => {
        this.loading = true;
        try {
            const profiles = await agent.Profiles.listFollowings(this.profile!.userName, predicate);
            console.log(`load followings: ${this.profile!.userName}`);
            runInAction(() => {
                this.followings = profiles;
                this.loading = false;
            });
        } catch (error) {
            toast.error('Problem loading followings');
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    @action uploadPhoto = async (file: Blob) => {
        this.uploadingPhoto = true;
        try {
            const photo = await agent.Profiles.uploadPhoto(file);
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos.push(photo);
                    if (photo.isMain && this.rootStore.userStore.user) {
                        this.rootStore.userStore.user.image = photo.url;
                    }
                }
                this.uploadingPhoto = false;
            });
        } catch (error) {
            console.log(error);
            toast.error('Problem uploading the photo.');
            runInAction(() => {
                this.uploadingPhoto = false;
            });
        }
    }

    @action setMainPhoto = async (photo: IPhoto) => {
        this.loading = true;
        try {
            await agent.Profiles.setMainPhoto(photo.id);
            runInAction(() => {
                this.rootStore.userStore.user!.image = photo.url;
                this.profile!.photos.find(a => a.isMain)!.isMain = false;
                this.profile!.photos.find(a => a.id === photo.id)!.isMain = true;
                this.profile!.image = photo.url;
                this.loading = false;
            });
        } catch (error) {
            toast.error('Problem setting photo as main');
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    @action deletePhoto = async (photo: IPhoto) => {
        this.loading = true;
        try {
            await agent.Profiles.deletePhoto(photo.id);
            runInAction(() => {
                this.profile!.photos = this.profile!.photos.filter(a => a.id !== photo.id);
                this.loading = false;
            });
        } catch (error) {
            toast.error('Problem setting photo as main');
            runInAction(() => {
                this.loading = false;
            });
        }
    }
}