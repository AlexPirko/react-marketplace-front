/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  addToFavorites,
  removeFromFavorites,
} from 'features/Favorites/reducer';
import { selectFavorites } from 'features/Favorites/selectors';
import { ReactComponent as HeartEmpty } from './img/heart-empty.svg';
import { ReactComponent as HeartFilled } from './img/heart-filled.svg';
import { PageWrapper } from 'App.styled';
import {
  Wrapper,
  LikeWrapper,
  ImagesWrapper,
  Image,
  InfoWrapper,
  PriceWrapper,
  PriceRegular,
  PriceRegularWhenDiscounted,
  PriceDiscounted,
} from './styled';
import type { I_ProductDetails } from 'pages/types';
import { get } from 'helpers/request';
import { I_UniRes } from 'types/types';
import { useAppDispatch, useAppSelector } from 'store';

const ProductDetailedPage: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const [productDetailed, setProductDetailed] = useState<I_ProductDetails>();

  useEffect(() => {
    get(`/products/${params.idOrSlug}`).then((res: I_UniRes) =>
      setProductDetailed(res.data)
    );
  }, [params.idOrSlug]);

  const idsInFavorites = useAppSelector(selectFavorites);

  const isLiked = useMemo(
    () => idsInFavorites.includes(productDetailed?.id!),
    [idsInFavorites, productDetailed]
  );

  const handleFavorites = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const { productId } = e.currentTarget.dataset;

      dispatch(
        !idsInFavorites.includes(+productId!)
          ? addToFavorites(+productId!)
          : removeFromFavorites(+productId!)
      );
    },
    [dispatch, idsInFavorites]
  );

  if (!productDetailed) return null;

  const { id, image, title, description, price, priceDiscounted } =
    productDetailed;

  return (
    <>
      <Helmet>
        <title>Product Page - My Marketplace</title>
      </Helmet>

      <PageWrapper>
        <Wrapper>
          <ImagesWrapper>
            <Image
              src={`${process.env.REACT_APP_API_URL}/images/products/${image}`}
            />

            <LikeWrapper data-product-id={id} onClick={handleFavorites}>
              {isLiked ? <HeartFilled /> : <HeartEmpty />}
            </LikeWrapper>
          </ImagesWrapper>

          <InfoWrapper>
            <h1>{title}</h1>

            <PriceWrapper>
              {Number.isInteger(priceDiscounted) ? (
                <>
                  <PriceDiscounted>$ {priceDiscounted}</PriceDiscounted>
                  <PriceRegularWhenDiscounted>
                    $ {price}
                  </PriceRegularWhenDiscounted>
                </>
              ) : (
                <PriceRegular>$ {price}</PriceRegular>
              )}
            </PriceWrapper>

            <p>{description}</p>
          </InfoWrapper>
        </Wrapper>
      </PageWrapper>
    </>
  );
};
export default ProductDetailedPage;
