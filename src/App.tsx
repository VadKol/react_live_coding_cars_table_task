import React, { useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

type Car = {
  id: number;
  brand: string;
  rentPrice: number;
  colorId: number;
};

type Color = {
  id: number;
  name: string;
};

export const App: React.FC = () => {
  const [cars] = useState<Car[]>(carsFromServer);
  const [colors] = useState<Color[]>(colorsFromServer);
  const [filterBrand, setFilterBrand] = useState<string>('');
  const [filterColor, setFilterColor] = useState<number | null>(null);

  const handleBrandFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterBrand(e.target.value);
  };

  const handleColorFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const colorId = parseInt(e.target.value, 10);

    setFilterColor(colorId === 0 ? null : colorId);
  };

  const filteredCars = cars.filter(car => {
    if (filterBrand && car
      .brand.toLowerCase()
      .indexOf(filterBrand.toLowerCase()) === -1) {
      return false;
    }

    if (filterColor && car.colorId !== filterColor) {
      return false;
    }

    return true;
  });

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        value={filterBrand}
        onChange={handleBrandFilterChange}
      />

      <select value={filterColor || 0} onChange={handleColorFilterChange}>
        <option value={0}>Choose a color</option>
        {colors.map(color => (
          <option key={color.id} value={color.id}>
            {color.name}
          </option>
        ))}
      </select>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Rent price</th>
          </tr>
        </thead>
        <tbody>
          {filteredCars.map(car => (
            <tr key={car.id}>
              <td>{car.id}</td>
              <td>{car.brand}</td>
              <td style={{
                color: colors
                  .find(c => c.id === car.colorId)?.name,
              }}
              >
                {colors.find(c => c.id === car.colorId)?.name}
              </td>
              <td>{car.rentPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
