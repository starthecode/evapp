'use client';
import React, { startTransition } from 'react';
import { ICat } from '@/models/Category';
import { getAllCategory } from '@/lib/actions/category.action';

type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const categoriesData = [
  {
    _id: '001',
    name: 'Nextjs',
  },
  {
    _id: '002',
    name: 'python',
  },
];

export default function Dropdown({ value, onChangeHandler }: DropdownProps) {
  const [categories, setCategories] = React.useState<ICat[]>([]);

  React.useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategory();

      categoryList && setCategories(categoryList as ICat[]);
    };

    getCategories();
  }, []);

  return (
    <div>
      <select onChange={onChangeHandler} defaultValue={value}>
        <option>Categories</option>
        {categories.length > 0 &&
          categories.map((category) => (
            <option
              className="select-item p-14"
              key={category._id}
              value={category._id}
            >
              {category.name}
            </option>
          ))}
      </select>
    </div>
  );
}
