import { Option } from '@/types';

export const OptionList = ({
  idList,
  fullList,
  title
}: {
  idList: string[] | undefined;
  fullList: Option[] | undefined;
  title: string;
}) => {
  if (!idList?.length) return <></>;
  return (
    <li>
      <label>{title}:</label>
      <ul>
        {idList?.map((optionId) => {
          const fullOption = fullList?.find(
            (option) => option.id === Number(optionId)
          );
          if (!fullOption) return;
          return <li key={optionId}>{fullOption.name}</li>;
        })}
      </ul>
    </li>
  );
};
