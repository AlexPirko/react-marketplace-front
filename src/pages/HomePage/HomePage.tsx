import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';

import { dummyProducts } from 'pages/products';
import { PageWrapper } from 'App.styled';
import { ProductGroup, ProductGroupContainer } from './styled';
import { selectFavorites } from 'features/Favorites/selectors';
import ProductCard from 'components/ProductCard';

const HomePage: React.FC = () => {
    const idsInFavorites = useSelector(selectFavorites);

    return (
        <>
            <Helmet>
                <title>Main - My Marketplace</title>
            </Helmet>

            <PageWrapper>
                <ProductGroup>
                    <h2>Favorites</h2>

                    <ProductGroupContainer>
                        {dummyProducts.map((product) => (
                            <ProductCard {...product} key={product.id} isLiked={idsInFavorites.includes(product.id)} />
                        ))}
                    </ProductGroupContainer>
                </ProductGroup>
            </PageWrapper>
        </>
    );
};
export default HomePage;
