import { Helmet } from 'react-helmet';

import ProductCard from 'components/ProductCard';
import { selectFavorites } from 'features/Favorites/selectors';
import { dummyProducts } from 'pages/products';
import { ProductGroupContainer } from './styled';
import { PageWrapper } from 'App.styled';
import { useSelector } from 'react-redux';

const FavoritesPage: React.FC = () => {
    const idsInFavorites = useSelector(selectFavorites);

    return (
        <>
            <Helmet>
                <title>Favorites - My Marketplace</title>
            </Helmet>

            <PageWrapper>
                <h2>Favorites</h2>

                {idsInFavorites.length ? (
                    <ProductGroupContainer>
                        {dummyProducts
                            .filter((product) => idsInFavorites.includes(product.id))
                            .map((product) => (
                                <ProductCard {...product} key={product.id} isLiked={false} hideLikes={true} />
                            ))}
                    </ProductGroupContainer>
                ) : (
                    <p>Favorites page is empty</p>
                )}
            </PageWrapper>
        </>
    );
};

export default FavoritesPage;
