import React from "react";
import { Tab } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";
import ProfileDescription from "./ProfileDescription";
import ProfileFollowings from "./ProfileFollowings";

const panes = [
  { menuItem: "About", render: () => <Tab.Pane><ProfileDescription /></Tab.Pane> },
  { menuItem: "Photos", render: () => <ProfilePhotos />},
  { menuItem: "Events", render: () => <Tab.Pane>Events content</Tab.Pane> },
  { menuItem: "Activities", render: () => <Tab.Pane>Activities content</Tab.Pane> },
  { menuItem: "Followers", render: () => <ProfileFollowings /> },
  { menuItem: "Following", render: () => <ProfileFollowings /> },
];

interface IProps {
  setActiveTab: (activeIndex: any) => void;
}

const ProfileContent: React.FC<IProps> = ({setActiveTab}) =>
{
  return (
      <Tab
         menu={{ fluid: true, vertical: true }}
         menuPosition='right'
         panes={panes} 
         onTabChange={(e, data) => setActiveTab(data.activeIndex)}
      />
  );
};

export default ProfileContent;
