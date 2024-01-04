'use client';
import { createCategory } from '@/lib/actions/category.action';
import React from 'react';

export default function Popup() {
  const [popupActive, setPopupActive] = React.useState(false);
  const [newCategory, setNewCategory] = React.useState('');

  function handlePopup() {
    popupActive ? setPopupActive(false) : setPopupActive(true);
  }

  const handleAddCategory = () => {
    try {
      const addedCat = createCategory({
        categoryName: newCategory.trim(),
      }).then((category) => {
        if (category) {
          setPopupActive(false);
        }
      });
    } catch (error) {}
  };

  return (
    <>
      <div className="p-medium-14 w-full rounded-sm flex py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
        <button type="button" onClick={handlePopup}>
          Add New Category
        </button>
      </div>

      <div
        className={`${
          popupActive
            ? 'z-10 w-full h-full absolute top-0 left-0 items-center grid justify-center bg-gray-300 bg-opacity-75'
            : 'hidden'
        }`}
      >
        <div className="bg-white shadow rounded-md px-10 py-4">
          <h3>New Category</h3>
          <div>
            <input
              type="text"
              placeholder="Category Name"
              className="input-field mt-3"
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <button type="button" onClick={() => setPopupActive(false)}>
              Cancel
            </button>
            <button
              type="submit"
              onClick={() => React.startTransition(handleAddCategory)}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
