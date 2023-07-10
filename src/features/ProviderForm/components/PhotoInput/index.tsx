import { useEffect, useRef, useState } from 'react';
import { useFormContext } from '../../utils/formContext';
import { confirmChoice } from '@/features/Admin/utils/helpers';
import { deletePhoto } from '../../utils/api';
import FormItem from '../FormItem';
import { Button } from '@/components/Button/Button';

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
  const [imageSrc, setImageSrc] = useState(
    initialImage ? import.meta.env.VITE_S3_URL + initialImage : ''
  );

  useEffect(() => {
    console.log(imageSrc);
  }, [imageSrc]);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (!initialImage) setImageSrc(image ? URL.createObjectURL(image) : '');
  }, [image]);
  return (
    <span className="photo-input-container">
      <input
        type="file"
        id={`file-${dbName}`}
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
        <label htmlFor={`file-${dbName}`}>
          <Button type="secondary">Upload File</Button>
        </label>
      )}
    </span>
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
      <FormItem
        name="Profile photo"
        description="A square photo or a photo with your face centered works best (.jpg, max file size ___)">
        <PhotoInput
          dbName="profile_photo"
          imageState={profilePhotoState}
          {...(initialProfilePhoto
            ? { initialImage: initialProfilePhoto }
            : {})}
        />
      </FormItem>
      <FormItem
        name="Logo"
        description="A square or circular file works best (.jpg, max file size ___)">
        <PhotoInput
          dbName="logo"
          imageState={logoState}
          {...(initialLogo ? { initialImage: initialLogo } : {})}
        />
      </FormItem>
    </>
  );
};

export default PhotosContainer;
