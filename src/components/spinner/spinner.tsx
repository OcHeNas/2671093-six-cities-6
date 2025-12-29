function Spinner(): JSX.Element {
  return (
    <div
      data-testid="spinner"
      style={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px'
      }}
    >
      Loading...
    </div>
  );
}

export default Spinner;

