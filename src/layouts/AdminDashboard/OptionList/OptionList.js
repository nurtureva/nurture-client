import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { DeleteFilled } from '@ant-design/icons';
import './OptionList.scss';

export default function OptionList(props) {
  const [optionList, setOptionList] = useState([]);
  const [name, setName] = useState('');

  const getList = async () => {
    const list = await fetch(
      `${process.env.REACT_APP_BASE_URL}/${props.endpoint}`,
      {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return list.json();
  };

  const addOption = async () => {
    const id = await fetch(
      `${process.env.REACT_APP_BASE_URL}/${props.endpoint}`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newService: { name } })
      }
    );
    const newId = await id;
    const newList = [...optionList];
    newList.push({ name, id: newId });
    setName('');
    setOptionList(newList);
    return newList;
  };
  const deleteOption = async (id) => {
    const list = await fetch(
      `${process.env.REACT_APP_BASE_URL}/${props.endpoint}/${id}`,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const newList = optionList.filter((option) => option.id !== id);
    setOptionList(newList);
    return list.json();
  };
  useEffect(async () => {
    const list = await getList();

    setOptionList(list);
  }, []);

  return (
    <div className={`options-list-container ${props.endpoint}`}>
      <p>{props.name}</p>
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
              console.log(e.target.value);
              setName(e.target.value);
            }}
          />
          <Button onClick={addOption}>
            add {props.name.toLowerCase().substring(0, props.name.length - 1)}
          </Button>
        </li>
      </ul>
    </div>
  );
}
