export default function Confirmation({ changePageState, provider }) {
  console.log(provider);
  return (
    <>
      <p>confirmation</p>
      <button
        onClick={() => {
          changePageState(2);
        }}>
        confirm
      </button>
    </>
  );
}
