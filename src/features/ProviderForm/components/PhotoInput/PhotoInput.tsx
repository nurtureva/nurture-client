import { useEffect, useState } from 'react';
import { useFormContext } from '../../utils/formContext';
import { confirmChoice } from '@/features/Admin/utils/helpers';
import { deletePhoto } from '../../utils/api';
import { Button } from '@/components';

export const PhotoInput = ({
  dbName
}: {
  dbName: 'logo' | 'profile_photo';
}) => {
  const {
    formState: { updateState },
    formData: { newProvider: initialProvider, pictures }
  } = useFormContext();
  const [image, setImage] = useState(pictures[dbName]);
  const initialImage = initialProvider?.general[dbName];

  const [imageSrc, setImageSrc] = useState(
    initialImage ? import.meta.env.VITE_S3_URL + initialImage : ''
  );

  useEffect(() => {
    if (image) {
      setImageSrc(image ? URL.createObjectURL(image) : '');
      updateState({
        pictures: { ...pictures, [dbName]: image }
      });
    } else if (!initialImage) {
      setImageSrc('');
    }
  }, [image]);

  useEffect(() => {
    console.log(imageSrc);
  }, [imageSrc]);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

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
                  deletePhoto(initialProvider.general.id, initialImage);
                  updateState({
                    newProvider: {
                      ...initialProvider,
                      general: { [dbName]: undefined }
                    }
                  });
                  setImageSrc('');
                });
              } else {
                const imageInput = document.getElementsByName(
                  dbName
                )[0] as HTMLInputElement;
                imageInput.value = '';
              }
              setImage(undefined);
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
