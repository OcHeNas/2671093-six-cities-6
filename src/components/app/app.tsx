import Main from '../../pages/Main/main.tsx';

type AppProps = {
  offersCount: number;
}

function App({offersCount}: AppProps): JSX.Element {
  return (
    <Main offersCount={offersCount}/>
  );
}

export default App;
