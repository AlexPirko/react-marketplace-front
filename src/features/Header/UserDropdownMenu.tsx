import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { paths } from 'routes/helpers';
import { useAppSelector } from 'store';
import DropdownPanel from 'components/DropdownPanel';
import { selectUserData } from 'features/UserData/selectors';
import UserAvatar from './UserAvatar';
import { UserProfileDropdown } from './styled';

const UserDropdownMenu: React.FC = () => {
  const navigate = useNavigate();

  const { nameFirst, nameLast, displayName } = useAppSelector(selectUserData);

  const handleLogout = useCallback(() => navigate(paths.logout), [navigate]);

  return (
    <DropdownPanel
      toggler={(props: any) => <UserAvatar onClick={props.onClick} />}
      toLeft
    >
      <UserProfileDropdown>
        <div>
          <strong>{displayName || nameFirst + ' ' + nameLast}</strong>
        </div>

        <hr />
        <div>Orders</div>
        <div>Returns</div>
        <div>Favorites</div>
        <div>Reference</div>
        <div>Support</div>
        <div>Settings</div>
        <hr />

        <div onClick={handleLogout}>LogOut</div>
      </UserProfileDropdown>
    </DropdownPanel>
  );
};
export default UserDropdownMenu;
