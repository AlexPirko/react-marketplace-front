import { Helmet } from 'react-helmet';
import { TestDiv } from './styled';

const HomePage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Main - My Marketplace</title>
            </Helmet>
            <TestDiv />
        </>
    );
};
export default HomePage;
