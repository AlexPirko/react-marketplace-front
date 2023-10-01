import { Suspense } from 'react';
import { useLocation } from 'react-router-dom';

import { paths } from 'routes/helpers';
import PublicRoutes from 'routes/PublicRoutes';
// import PrivateRoutes from 'routes/PrivateRoutes';
import Header from 'features/Header';
import { AppStyles, Footer } from 'App.styled';

const App = () => {
    const location = useLocation();

    const notIsAuthPage = ![paths.login, paths.register].includes(location.pathname);

    return (
        <>
            <AppStyles />

            {notIsAuthPage && <Header />}

            <Suspense fallback={'Loading...'}>
                <PublicRoutes />
                {/* <PrivateRoutes /> */}
            </Suspense>

            {notIsAuthPage && (
                <Footer>
                    <div>Marketplace</div>
                </Footer>
            )}
        </>
    );
};

export default App;
