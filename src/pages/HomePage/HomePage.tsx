import { PageWrapper } from 'App.styled';
import { Helmet } from 'react-helmet';
import { dummyProducts } from 'pages/products';
import { ProductGroup, ProductGroupContainer } from './styled';
import ProductCard from 'components/ProductCard';

const HomePage: React.FC = () => {
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
                            <ProductCard {...product} key={product.id} />
                        ))}
                    </ProductGroupContainer>
                </ProductGroup>
            </PageWrapper>
        </>
    );
};
export default HomePage;
