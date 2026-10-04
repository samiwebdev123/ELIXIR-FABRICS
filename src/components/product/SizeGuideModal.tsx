import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { STORE_PHONE } from '../../data/mockData';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultGender?: 'men' | 'women';
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  defaultGender = 'men',
}) => {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [gender, setGender] = useState<'men' | 'women'>(defaultGender);

  const menSizeChart = [
    { size: 'S (38)', chestIn: 38, chestCm: 96, shoulderIn: 17.5, shoulderCm: 44.5, lengthIn: 40, lengthCm: 101, sleeveIn: 24.5, sleeveCm: 62 },
    { size: 'M (40)', chestIn: 40, chestCm: 101, shoulderIn: 18.0, shoulderCm: 45.7, lengthIn: 42, lengthCm: 106, sleeveIn: 25.0, sleeveCm: 63.5 },
    { size: 'L (42)', chestIn: 42, chestCm: 106, shoulderIn: 18.5, shoulderCm: 47.0, lengthIn: 44, lengthCm: 111, sleeveIn: 25.5, sleeveCm: 64.7 },
    { size: 'XL (44)', chestIn: 44, chestCm: 112, shoulderIn: 19.2, shoulderCm: 48.8, lengthIn: 45, lengthCm: 114, sleeveIn: 26.0, sleeveCm: 66 },
    { size: 'XXL (46)', chestIn: 46, chestCm: 117, shoulderIn: 20.0, shoulderCm: 50.8, lengthIn: 46, lengthCm: 117, sleeveIn: 26.5, sleeveCm: 67.3 },
    { size: '3XL (48)', chestIn: 48, chestCm: 122, shoulderIn: 20.5, shoulderCm: 52.0, lengthIn: 46, lengthCm: 117, sleeveIn: 27.0, sleeveCm: 68.5 },
  ];

  const womenSizeChart = [
    { size: 'XS (34)', chestIn: 34, chestCm: 86, shoulderIn: 14.0, shoulderCm: 35.5, lengthIn: 38, lengthCm: 96, sleeveIn: 21.5, sleeveCm: 54.5 },
    { size: 'S (36)', chestIn: 36, chestCm: 91, shoulderIn: 14.5, shoulderCm: 36.8, lengthIn: 39, lengthCm: 99, sleeveIn: 22.0, sleeveCm: 55.8 },
    { size: 'M (38)', chestIn: 38, chestCm: 96, shoulderIn: 15.0, shoulderCm: 38.0, lengthIn: 40, lengthCm: 101, sleeveIn: 22.5, sleeveCm: 57.0 },
    { size: 'L (40)', chestIn: 40, chestCm: 101, shoulderIn: 15.5, shoulderCm: 39.3, lengthIn: 41, lengthCm: 104, sleeveIn: 23.0, sleeveCm: 58.4 },
    { size: 'XL (42)', chestIn: 42, chestCm: 106, shoulderIn: 16.0, shoulderCm: 40.6, lengthIn: 42, lengthCm: 106, sleeveIn: 23.5, sleeveCm: 59.6 },
    { size: 'XXL (44)', chestIn: 44, chestCm: 112, shoulderIn: 16.5, shoulderCm: 41.9, lengthIn: 42, lengthCm: 106, sleeveIn: 24.0, sleeveCm: 61.0 },
  ];

  const currentChart = gender === 'men' ? menSizeChart : womenSizeChart;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Size & Measurement Guide"
      subtitle="Pakistani Standard & Bespoke Atelier Sizing"
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Gender & Unit Selectors */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Gender Switch */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xl">
            <button
              onClick={() => setGender('men')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                gender === 'men' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500'
              }`}
            >
              Men&apos;s Sizing
            </button>
            <button
              onClick={() => setGender('women')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                gender === 'women' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500'
              }`}
            >
              Women&apos;s Sizing
            </button>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xl">
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                unit === 'in' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500'
              }`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                unit === 'cm' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500'
              }`}
            >
              Centimeters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-stone-200">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-neutral-500 font-medium">
                <th className="py-3 px-3">Size</th>
                <th className="py-3 px-3">Chest</th>
                <th className="py-3 px-3">Shoulder</th>
                <th className="py-3 px-3">Length</th>
                <th className="py-3 px-3">Sleeve</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-neutral-800">
              {currentChart.map((row) => (
                <tr key={row.size} className="hover:bg-stone-50/50">
                  <td className="py-3 px-3 font-semibold text-neutral-900">{row.size}</td>
                  <td className="py-3 px-3 tabular-nums">
                    {unit === 'in' ? `${row.chestIn}"` : `${row.chestCm} cm`}
                  </td>
                  <td className="py-3 px-3 tabular-nums">
                    {unit === 'in' ? `${row.shoulderIn}"` : `${row.shoulderCm} cm`}
                  </td>
                  <td className="py-3 px-3 tabular-nums">
                    {unit === 'in' ? `${row.lengthIn}"` : `${row.lengthCm} cm`}
                  </td>
                  <td className="py-3 px-3 tabular-nums">
                    {unit === 'in' ? `${row.sleeveIn}"` : `${row.sleeveCm} cm`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Custom Measurement Advice */}
        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 text-xs space-y-1.5">
          <h4 className="font-semibold text-neutral-900">Custom Made-to-Measure Service</h4>
          <p className="text-neutral-600 leading-relaxed">
            Unsure of your exact fit or require altered sleeve/kurta length? Select &apos;Custom Bespoke&apos; or contact our Karachi atelier on WhatsApp at{' '}
            <strong className="text-neutral-900">{STORE_PHONE}</strong> for instant fitting assistance.
          </p>
        </div>
      </div>
    </Modal>
  );
};
