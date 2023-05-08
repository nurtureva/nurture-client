// import { useEffect, useState } from 'react';
// import './Provider.scss';
// import ProviderDetails from './ProviderDetails/ProviderDetails';
// import { Link } from 'react-router-dom';

// export default function Provider(props) {
//   const [provider, setProvider] = useState();
//   const [isLoading, setIsLoading] = useState(true);
//   const url = window.location.href.split('/');
//   const userId = url[url.length - 1];
//   const getProvider = async (id) => {
//     const providers = await fetch(
//       `${process.env.REACT_APP_BASE_URL}/providers/${id}`,
//       {
//         mode: 'cors',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       }
//     );

//     return providers.json();
//   };
//   useEffect(async () => {
//     if (!props.provider) {
//       const provider = await getProvider(userId);
//       setProvider(provider);
//     } else {
//       setProvider(props.provider);
//     }
//     setIsLoading(false);
//   }, []);
//   if (isLoading) return <div>loading...</div>;
//   return (
//     <Link
//       to={!props.view ? `/results/${provider.id}` : ''}
//       className="provider-container">
//       <ProviderDetails provider={provider} view={props.view} />
//     </Link>
//   );
// }
