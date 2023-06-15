import { useEffect, useRef, useState } from 'react';
import { useFormContext } from '../../utils/formContext';
import { confirmChoice } from '@/features/Admin/utils/helpers';
import { deletePhoto } from '../../utils/api';

interface ParamsObject {
  dbName: 'logo' | 'profile_photo';
  initialImage?: string;
  imageState: [
    File | undefined,
    React.Dispatch<React.SetStateAction<File | undefined>>
  ];
}
const PhotoInput = ({ dbName, imageState, initialImage }: ParamsObject) => {
  const [image, setImage] = imageState;
  const didMountRef = useRef(false);
  const [imageSrc, setImageSrc] = useState(
    initialImage ? import.meta.env.VITE_S3_URL + initialImage : ''
  );

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (didMountRef.current)
      setImageSrc(image ? URL.createObjectURL(image) : '');
    didMountRef.current = true;
  }, [image]);
  return (
    <>
      <input
        type="file"
        name={dbName}
        accept="image/*"
        onChange={(e) => {
          onImageChange(e);
        }}
      />

      {imageSrc ? (
        <>
          <img src={imageSrc} />
          <button
            onClick={(e) => {
              e.preventDefault();
              if (initialImage) {
                confirmChoice(() => {
                  deletePhoto(initialImage);
                  setImageSrc('');
                });
              } else {
                const imageInput = document.getElementsByName(
                  dbName
                )[0] as HTMLInputElement;
                imageInput.value = '';
                setImage(undefined);
              }
            }}>
            X
          </button>
        </>
      ) : (
        ''
      )}
    </>
  );
};

const PhotosContainer = () => {
  const { initialProvider, pictures, updateState } = useFormContext();
  const { logo, profile_photo } = pictures;
  const logoState = useState(logo);
  const profilePhotoState = useState(profile_photo);

  const initialProviderGeneralInfo =
    initialProvider && !('general' in initialProvider)
      ? initialProvider
      : undefined;
  const initialLogo = initialProviderGeneralInfo
    ? initialProviderGeneralInfo['logo']
    : '';
  const initialProfilePhoto = initialProviderGeneralInfo
    ? initialProviderGeneralInfo['profile_photo']
    : '';

  useEffect(() => {
    updateState({
      pictures: { profile_photo: profilePhotoState[0], logo: logoState[0] }
    });
  }, [logoState[0], profilePhotoState[0]]);

  return (
    <>
      <PhotoInput
        dbName="profile_photo"
        imageState={profilePhotoState}
        {...(initialProfilePhoto ? { initialImage: initialProfilePhoto } : {})}
      />
      <PhotoInput
        dbName="logo"
        imageState={logoState}
        {...(initialLogo ? { initialImage: initialLogo } : {})}
      />
    </>
  );
};

export default PhotosContainer;
