import { lazy } from 'react';
import { Route, Navigate, Routes, useLocation } from 'react-router-dom';

import { checkPathMatch, paths } from './helpers';

const HomePage = lazy(() => import('pages/HomePage'));
const ProductDetailedPage = lazy(() => import('pages/ProductDetailedPage'));
const FavoritesPage = lazy(() => import('pages/FavoritesPage'));

const PublicRoutes: React.FC = () => {
    const location = useLocation();

    const isMatch = checkPathMatch(location.pathname, paths);

    return (
        <Routes>
            <Route path={paths.home} element={<HomePage />} />
            <Route path={paths.productDetailed} element={<ProductDetailedPage />} />
            <Route path={paths.favorites} element={<FavoritesPage />} />
            <Route path='*' element={!isMatch ? <Navigate to={paths.home} /> : null} />
        </Routes>
    );
};

export default PublicRoutes;
