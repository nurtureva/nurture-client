import { useEffect, useRef, useState } from 'react';
import { useFormContext } from '../../utils/formContext';
import { confirmChoice } from '@/features/Admin/utils/helpers';
import { deletePhoto } from '../../utils/api';
import { Button } from '@/components';

interface ParamsObject {
  dbName: 'logo' | 'profile_photo';
  initialImage?: string;
  imageState: [
    File | undefined,
    React.Dispatch<React.SetStateAction<File | undefined>>
  ];
}
export const PhotoInput = ({ dbName }: ParamsObject) => {
  const {
    formState: { updateState },
    formData: { initialProvider, pictures }
  } = useFormContext();
  const photo = pictures[dbName];
  const [image, setImage] = useState(photo);
  const initialProviderGeneralInfo =
    initialProvider && !('general' in initialProvider)
      ? initialProvider
      : undefined;
  const initialImage = initialProviderGeneralInfo
    ? initialProviderGeneralInfo[dbName]
    : '';
  const [imageSrc, setImageSrc] = useState(
    initialImage ? import.meta.env.VITE_S3_URL + initialImage : ''
  );

  useEffect(() => {
    updateState({
      pictures: { [dbName]: image }
    });
  }, [image]);

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
