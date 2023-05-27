import { Button } from 'antd';
import { useState } from 'react';
import { DeleteFilled } from '@ant-design/icons';
import './OptionList.scss';
import { OptionsObject } from '@/types';
import { OptionEndpoint, addOption, deleteById } from '@/utils/api';
import { useLoaderData } from 'react-router-dom';
import { confirmChoice } from '../../utils/helpers';

const toCamelCase = (string: string) => {
  if (!string.includes('-')) return string;
  return string
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
};

export default function OptionList({
  title,
  endpoint
}: {
  title: string;
  endpoint: OptionEndpoint;
}) {
  const [name, setName] = useState('');
  const adminLoader = useLoaderData() as OptionsObject;
  const [optionList, setOptionList] = useState(
    adminLoader[toCamelCase(endpoint)]
  );

  const deleteOption = (id: number) => {
    confirmChoice(() => deleteById(endpoint, id));
    setOptionList(optionList.filter((option) => option.id !== id));
  };

  const createOption = async () => {
    const response = await confirmChoice(() => addOption(endpoint, name));
    const id: number = response.rows[0].id;
    const newOptionList = [...optionList];
    newOptionList.push({ name, id });
    setOptionList(newOptionList);
    setName('');
  };

  return (
    <div className={`options-list-container`}>
      <p>{title}</p>
      <ul className="options-list">
        {optionList.map((option) => {
          return (
            <li key={option.id}>
              <p>{option.name}</p>

              <DeleteFilled
                className="delete-icon"
                onClick={() => {
                  deleteOption(option.id);
                }}
              />
            </li>
          );
        })}
      </ul>
      <ul>
        <li className="add-option-container">
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Button onClick={createOption}>
            add {title.toLowerCase().substring(0, title.length - 1)}
          </Button>
        </li>
      </ul>
    </div>
  );
}
