import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'store';
import { paths } from 'routes/helpers';
import Button from 'components/Button';
import Input from 'components/Input';
import { selectIsLogged } from 'features/App/selectors';
import { selectFavorites } from 'features/Favorites/selectors';
import UserDropdownMenu from './UserDropdownMenu';
import logoPng from '../../assets/img/logo.png';

import {
    Wrapper,
    LeftSide,
    Logo,
    Burger,
    SearchWrapper,
    BtnSearch,
    RightSide,
    BtnOrders,
    BtnFavorites,
    BtnNotifications,
    BtnCart,
} from './styled';

const Header: React.FC = () => {
    const isLogged = useAppSelector(selectIsLogged);

    const favorites = useAppSelector(selectFavorites);

    const [searcInput, setSearchInput] = useState<string>('');

    const changeSearchInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    }, []);

    return (
        <Wrapper>
            <LeftSide>
                <Link to={paths.home}>
                    <Logo src={logoPng} />
                </Link>

                <Button>
                    <Burger>
                        <div />
                        <div />
                        <div />
                    </Burger>
                    <span>Catalog</span>
                </Button>
            </LeftSide>

            <SearchWrapper>
                <Input value={searcInput} onChange={changeSearchInput} isGhost placeholder='Search product' />
                <BtnSearch />
            </SearchWrapper>

            <RightSide>
                {isLogged ? (
                    <>
                        <BtnOrders />
                        <BtnFavorites count={favorites.length} />
                        <BtnNotifications />
                        <BtnCart />
                        <UserDropdownMenu />
                    </>
                ) : (
                    <Link to={paths.login}>LogIn</Link>
                )}
            </RightSide>
        </Wrapper>
    );
};

export default Header;
