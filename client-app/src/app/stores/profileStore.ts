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