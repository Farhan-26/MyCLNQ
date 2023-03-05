import React, {Suspense} from 'react';
import Loader from './src/component/loader';

const Home = React.lazy(() => import('./src/screens/home'));

//  this is api file link :    https://we.tl/t-LX1cSq1iu0

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Home />
    </Suspense>
  );
};

export default App;
