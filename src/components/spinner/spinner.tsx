function Spinner(): JSX.Element {
  return (
    <div style={{
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
