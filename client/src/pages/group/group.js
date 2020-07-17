import React from 'react';
import GroupMenu from '@/pages/group/groupMenu';
import GroupTabs from '@/pages/group/GroupTabs';
import './group.scss';

class Group extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render(){
      return(
        <div className="group">
          <GroupMenu></GroupMenu>
          <GroupTabs></GroupTabs>
        </div>
      )
  }
}
export default Group;