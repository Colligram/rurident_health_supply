import React, { useState, useEffect, useRef } from 'react';
import { FiPlus, FiChevronDown } from 'react-icons/fi';
import { ProductMapping, productMappingService } from '../../services/productMappingService';

interface ProductAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSubcategoryChange?: (subcategory: string) => void;
  onShowAddModal: (productName: string) => void;
  placeholder?: string;
  className?: string;
}

export function ProductAutocomplete({
  value,
  onChange,
  onSubcategoryChange,
  onShowAddModal,
  placeholder = "Enter product name...",
  className = ""
}: ProductAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<ProductMapping[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allMappings, setAllMappings] = useState<ProductMapping[]>([]);
  const [hasExactMatch, setHasExactMatch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Load all mappings on component mount
  useEffect(() => {
    loadAllMappings();
  }, []);

  const loadAllMappings = async () => {
    try {
      const mappings = await productMappingService.getAllMappings();
      setAllMappings(mappings);
    } catch (error) {
      console.error('Error loading product mappings:', error);
    }
  };

  // Handle input changes and search
  useEffect(() => {
    if (value.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      setHasExactMatch(false);
      return;
    }

    const searchMappings = async () => {
      setLoading(true);
      try {
        const results = await productMappingService.searchMappings(value);
        setSuggestions(results);
        setShowSuggestions(true);
        
        // Check for exact match
        const exactMatch = results.find(
          mapping => mapping.productName.toLowerCase() === value.toLowerCase()
        );
        setHasExactMatch(!!exactMatch);
        
        // Auto-fill subcategory if exact match found
        if (exactMatch && onSubcategoryChange) {
          onSubcategoryChange(exactMatch.subcategory);
        }
      } catch (error) {
        console.error('Error searching mappings:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(searchMappings, 300); // Debounce
    return () => clearTimeout(timeoutId);
  }, [value, onSubcategoryChange]);

  // Handle clicking outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  const handleSuggestionClick = (mapping: ProductMapping) => {
    onChange(mapping.productName);
    if (onSubcategoryChange) {
      onSubcategoryChange(mapping.subcategory);
    }
    setShowSuggestions(false);
  };

  const handleAddNewClick = () => {
    onShowAddModal(value);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => value.trim().length >= 2 && setShowSuggestions(true)}
          className={`w-full px-3 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${className}`}
          placeholder={placeholder}
        />
        
        {/* Show + button when no exact match and value is not empty */}
        {value.trim() && !hasExactMatch && (
          <button
            type="button"
            onClick={handleAddNewClick}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded transition-colors"
            title="Add new product mapping"
          >
            <FiPlus className="w-4 h-4" />
          </button>
        )}

        {/* Show dropdown indicator when there are suggestions */}
        {suggestions.length > 0 && hasExactMatch && (
          <button
            type="button"
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
          >
            <FiChevronDown className={`w-4 h-4 transition-transform ${showSuggestions ? 'rotate-180' : ''}`} />
          </button>
        )}

        {/* Loading indicator */}
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-500 border-t-transparent"></div>
          </div>
        )}
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((mapping) => (
            <button
              key={mapping._id}
              type="button"
              onClick={() => handleSuggestionClick(mapping)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-gray-900">{mapping.productName}</div>
                  <div className="text-sm text-gray-600">
                    {mapping.subcategory}
                    {mapping.category && ` • ${mapping.category}`}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {showSuggestions && suggestions.length === 0 && value.trim().length >= 2 && !loading && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg"
        >
          <div className="px-4 py-3 text-center text-gray-500">
            <div className="mb-2">No existing products found</div>
            <button
              type="button"
              onClick={handleAddNewClick}
              className="inline-flex items-center px-3 py-1 text-sm bg-primary-50 text-primary-700 rounded hover:bg-primary-100 transition-colors"
            >
              <FiPlus className="w-3 h-3 mr-1" />
              Add "{value}" as new product
            </button>
          </div>
        </div>
      )}
    </div>
  );
}