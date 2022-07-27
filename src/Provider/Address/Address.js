export default function Address(props) {
  //empty values from the db are 'null'. null doesn't get replaced with destructuring defaults (only undefined does)
  const address_1 = props.provider.address_1 || '';
  const address_2 = props.provider.address_2 || '';
  const city = props.provider.city || '';
  const state = props.provider.state || '';
  const zip = props.provider.zip || '';
  return (
    <a className="provider-address">
      {`${address_1} ${address_2} ${city ? city + ',' : ''} ${state} ${zip}`}
    </a>
  );
}
