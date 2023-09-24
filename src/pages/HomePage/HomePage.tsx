import { PageWrapper } from 'App.styled';
import { Helmet } from 'react-helmet';

const HomePage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Main - My Marketplace</title>
            </Helmet>

            <PageWrapper>
                <h1>Main</h1>
            </PageWrapper>
        </>
    );
};
export default HomePage;
