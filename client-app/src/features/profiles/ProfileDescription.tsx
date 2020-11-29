import React, { useContext, useState } from "react";
import { Grid, GridColumn, Header, Button } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import ProfileEditForm from "./ProfileEditForm";

const ProfileDescription = () => {
  const [editProfileMode, setEditProfile] = useState(false);
  const rootStore = useContext(RootStoreContext);
  const { profile } = rootStore.profileStore;

  return (
    <Grid>
      <GridColumn width={16}>
        <Header
          floated="left"
          icon="user"
          content={`About ${profile!.displayName}`}
        />
        <Button
          floated="right"
          basic
          content={editProfileMode ? "Cancel" : "Edit Profile"}
          onClick={() => setEditProfile(!editProfileMode)}
        />
      </GridColumn>
      <GridColumn width={16}>
        { editProfileMode ? <ProfileEditForm /> : <p>{profile?.bio}</p> }
      </GridColumn>
    </Grid>
  );
};

export default ProfileDescription;
