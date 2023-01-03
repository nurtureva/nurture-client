import { useEffect, useState } from 'react';
import './Provider.css';
import ProviderDetails from './ProviderDetails/ProviderDetails';

export default function Provider(props) {
  const [provider, setProvider] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const photoList = [
    'https://photos.psychologytoday.com/ea525307-2554-4da1-8aeb-34a524253d5f/2/320x400.jpeg',
    'https://photos.psychologytoday.com/a8e44405-f458-467a-b574-6d03313f4e36/2/320x400.jpeg',
    'https://photos.psychologytoday.com/27e04795-8344-4d26-a74d-47ee3b0f0d4a/1/320x400.png',
    'https://photos.psychologytoday.com/4b4bc420-46cd-11ea-a6ad-06142c356176/2/320x400.jpeg',
    'https://photos.psychologytoday.com/4b4bc420-46cd-11ea-a6ad-06142c356176/2/320x400.jpeg',
    'https://photos.psychologytoday.com/7abf6d0d-410f-4ea4-937f-892baf780bf3/1/320x400.jpeg',
    'https://photos.psychologytoday.com/4511d9d1-46cd-11ea-a6ad-06142c356176/3/320x400.jpeg',
    'https://photos.psychologytoday.com/4a3d9f3b-46cd-11ea-a6ad-06142c356176/3/320x400.jpeg',
    ''
  ];
  const url = window.location.href.split('/');
  const userId = url[url.length - 1];
  const getProvider = async (id) => {
    const providers = await fetch(
      `${process.env.REACT_APP_BASE_URL}/providers/${id}`,
      {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return providers.json();
  };
  useEffect(async () => {
    if (!props.provider) {
      const provider = await getProvider(userId);
      setProvider(provider);
    } else {
      setProvider(props.provider);
    }
    setIsLoading(false);
  }, []);
  if (isLoading) return <div>loading...</div>;
  return (
    <div
      onClick={() => {
        if (!props.view) window.location = `${window.location}${provider.id}`;
      }}
      className="provider-container"
      title={`${provider?.name}\n------------------\n${provider?.overview}`}
      headStyle={{
        backgroundColor: '#c4d7ca',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px'
      }}>
      <ProviderDetails provider={provider} view={props.view} />
    </div>
  );
}
