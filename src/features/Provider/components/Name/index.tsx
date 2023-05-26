import samplePhoto1 from '@/assets/profile-1.png';
import samplePhoto2 from '@/assets/profile-2.png';
import { ProviderObject } from '../../types';

export default function Name({
  provider,
  children
}: {
  provider: ProviderObject;
  children?: React.ReactNode;
}) {
  const {
    profile_photo,
    name,
    business_name: businessName,
    services
  } = provider;

  const photoList = [samplePhoto1, samplePhoto2];
  const photoSrc = profile_photo
    ? profile_photo
    : photoList[Math.floor(Math.random() * photoList.length)];

  return (
    <span className="provider-name">
      <img src={photoSrc} />
      <div className="name">
        <h3>{name}</h3>
        <p>{businessName}</p>
        <ul>
          <label>Type of care:</label>
          {services?.map((service) => {
            return <li key={service.id}>{service.name}</li>;
          })}
        </ul>
        {children}
      </div>
    </span>
  );
}
