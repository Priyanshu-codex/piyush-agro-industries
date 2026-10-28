'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { SMLVehicleItem, VehicleCategoryKey, SML_VEHICLES } from '@/constants/smlVehiclesData';

interface SMLShowcaseContextValue {
  isOpen: boolean;
  activeCategory: VehicleCategoryKey;
  selectedVehicle: SMLVehicleItem | null;
  searchQuery: string;
  openShowcase: (category?: VehicleCategoryKey, vehicleId?: string) => void;
  closeShowcase: () => void;
  setActiveCategory: (cat: VehicleCategoryKey) => void;
  setSelectedVehicle: (vehicle: SMLVehicleItem | null) => void;
  setSearchQuery: (query: string) => void;
}

const SMLShowcaseContext = createContext<SMLShowcaseContextValue | null>(null);

export function SMLShowcaseProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<VehicleCategoryKey>('all');
  const [selectedVehicle, setSelectedVehicle] = useState<SMLVehicleItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const openShowcase = useCallback((category: VehicleCategoryKey = 'all', vehicleId?: string) => {
    setActiveCategory(category);
    if (vehicleId) {
      const found = SML_VEHICLES.find(v => v.id === vehicleId);
      if (found) setSelectedVehicle(found);
    }
    setIsOpen(true);
    // Lock body scroll
    document.body.style.overflow = 'hidden';
  }, []);

  const closeShowcase = useCallback(() => {
    setIsOpen(false);
    setSelectedVehicle(null);
    setSearchQuery('');
    // Restore body scroll
    document.body.style.overflow = '';
  }, []);

  // Listen to Escape key globally to close showcase or selected vehicle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedVehicle) {
          setSelectedVehicle(null);
        } else if (isOpen) {
          closeShowcase();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedVehicle, closeShowcase]);

  // Support deep-linking via URL hash or search params
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkUrl = () => {
      const hash = window.location.hash;
      const params = new URLSearchParams(window.location.search);
      if (hash === '#sml-catalogue' || hash === '#sml-vehicles' || params.get('showcase') === 'sml') {
        const cat = params.get('category') as VehicleCategoryKey;
        const vId = params.get('vehicle');
        openShowcase(cat && SML_VEHICLES.some(v => v.category === cat) ? cat : 'all', vId || undefined);
      }
    };
    checkUrl();
  }, [openShowcase]);

  return (
    <SMLShowcaseContext.Provider
      value={{
        isOpen,
        activeCategory,
        selectedVehicle,
        searchQuery,
        openShowcase,
        closeShowcase,
        setActiveCategory,
        setSelectedVehicle,
        setSearchQuery,
      }}
    >
      {children}
    </SMLShowcaseContext.Provider>
  );
}

export function useOptionalSMLShowcase() {
  return useContext(SMLShowcaseContext);
}

export function useSMLShowcase() {
  const ctx = useContext(SMLShowcaseContext);
  if (!ctx) {
    throw new Error('useSMLShowcase must be used within an SMLShowcaseProvider');
  }
  return ctx;
}
