import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';

import { PageWrapper } from 'App.styled';
import { ProductGroup, ProductGroupContainer } from './styled';
import { selectFavorites } from 'features/Favorites/selectors';
import ProductCard from 'components/ProductCard';
import { get } from 'helpers/request';
import { I_UniRes } from 'types/types';
import { useAppSelector } from 'store';

const HomePage: React.FC = () => {
  const idsInFavorites = useAppSelector(selectFavorites);

  const [products, setProducts] = useState<any[]>();

  useEffect(() => {
    get('/products').then((res: I_UniRes) => setProducts(res.data));
  }, []);

  if (!products) return <p>Loading</p>;

  return (
    <>
      <Helmet>
        <title>Main - My Marketplace</title>
      </Helmet>

      <PageWrapper>
        <ProductGroup>
          <h2>Favorites</h2>

          <ProductGroupContainer>
            {products.map((product) => (
              <ProductCard
                {...product}
                key={product.id}
                isLiked={idsInFavorites.includes(product.id)}
              />
            ))}
          </ProductGroupContainer>
        </ProductGroup>
      </PageWrapper>
    </>
  );
};
export default HomePage;
