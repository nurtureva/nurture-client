export default function Name({ provider, children }) {
  const { photo, name, business_name: businessName, services } = provider;

  const photoList = [
    'https://nurture-provider-photos.s3.amazonaws.com/profile-1.png',
    'https://nurture-provider-photos.s3.amazonaws.com/profile-2.png'
  ];
  const photoSrc = photo
    ? photo
    : photoList[Math.floor(Math.random() * photoList.length)];

  return (
    <span className="provider-name">
      <img src={photoSrc} />
      <div className="name">
        <h3>{name}</h3>
        <p>{businessName}</p>
        <ul>
          <label>Type of care:</label>
          {services.map((service) => {
            return <li key={service.id}>{service.name}</li>;
          })}
        </ul>
        {children}
      </div>
    </span>
  );
}
