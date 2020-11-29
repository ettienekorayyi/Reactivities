import React, { useContext, useState } from "react";
import {
  Button,
  Form,
  Grid,
  GridColumn,
  Input,
  TextArea,
} from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";

const ProfileEditForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { profile, updateProfile } = rootStore.profileStore;
  const [userBio, setUserBio] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');

  const handleBioChange = ({ value }: any) => {
    setUserBio(value);
  };

  const handleNameChange = ({ value }: any) => {
    setDisplayName(value);
  };
  
  return (
    <Grid>
      <GridColumn width={16}>
        <Form>
          <Input
            placeholder={profile?.displayName}
            style={{ width: "57rem", margin: ".5rem" }}
            onChange={(e) => handleNameChange(e.target)}
          />
          <TextArea
            placeholder={profile?.bio}
            style={{ width: "57rem", margin: ".5rem" }}
            onChange={(e) => {
              handleBioChange(e.target);
            }}
          />
          <Button
            floated="right"
            positive
            content="Update Profile"
            color="green"
            onClick={() => updateProfile(displayName,userBio)}
          />
        </Form>
      </GridColumn>
    </Grid>
  );
};

export default ProfileEditForm;
