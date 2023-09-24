import { Suspense } from 'react';
import PublicRoutes from 'routes/PublicRoutes';
import PrivateRoutes from 'routes/PrivateRoutes';

const App = () => {
    return (
        <>
            <Suspense fallback={'Loading...'}>
                <PublicRoutes />
                {/* <PrivateRoutes /> */}
            </Suspense>
        </>
    );
};

export default App;
