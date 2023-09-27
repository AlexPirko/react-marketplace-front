import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// import { useAppDispatch, useAppSelector } from 'store';
// import { get } from 'helpers/request';
import { addToFavorites, removeFromFavorites } from 'features/Favorites/reducer';
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
import { useDispatch } from 'react-redux';
import { dummyProducts } from 'pages/products';
import { useSelector } from 'react-redux';
// import type { I_UniRes } from 'types';

const ProductDetailedPage: React.FC = () => {
    const params = useParams();
    const dispatch = useDispatch();

    const [productDetailed, setProductDetailed] = useState<I_ProductDetails>();

    useEffect(() => {
        const found = dummyProducts.find((product) => [String(product.id), product.slug].includes(params.idOrSlug));

        if (found) setProductDetailed(found);
    }, [params.idOrSlug]);

    const idsInFavorites = useSelector(selectFavorites);

    const isLiked = useMemo(() => idsInFavorites.includes(productDetailed?.id!), [idsInFavorites, productDetailed]);

    const handleFavorites = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            const { productId } = e.currentTarget.dataset;

            dispatch(
                !idsInFavorites.includes(+productId!) ? addToFavorites(+productId!) : removeFromFavorites(+productId!),
            );
        },
        [dispatch, idsInFavorites],
    );

    if (!productDetailed) return null;

    const { id, imgSrc, title, desc, priceRegular, priceDiscounted } = productDetailed;

    return (
        <>
            <Helmet>
                <title>Product Page - My Marketplace</title>
            </Helmet>

            <PageWrapper>
                <Wrapper>
                    <ImagesWrapper>
                        <Image src={`${process.env.REACT_APP_API_URL}/images/products/${imgSrc}`} />

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
                                    <PriceRegularWhenDiscounted>$ {priceRegular}</PriceRegularWhenDiscounted>
                                </>
                            ) : (
                                <PriceRegular>$ {priceRegular}</PriceRegular>
                            )}
                        </PriceWrapper>

                        <p>{desc}</p>
                    </InfoWrapper>
                </Wrapper>
            </PageWrapper>
        </>
    );
};
export default ProductDetailedPage;
