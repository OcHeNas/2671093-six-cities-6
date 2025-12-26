import { Link } from 'react-router-dom';

function NotFound(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--error">
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5em', marginBottom: '20px' }}>
            404
          </h1>

          <p style={{ marginBottom: '30px' }}>
            Страница не найдена
          </p>

          <Link
            to="/"
            className="button"
            style={{
              padding: '10px 30px',
              backgroundColor: '#4481c3',
              color: '#ffffff'
            }}
          >
            На главную
          </Link>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
