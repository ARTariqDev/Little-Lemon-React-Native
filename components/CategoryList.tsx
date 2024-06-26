import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Category {
  id: number;
  name: string;
}

const categories: Category[] = [
  { id: 1, name: 'Salads' },
  { id: 2, name: 'Appetizers' },
  { id: 3, name: 'Main Course' },
  { id: 4, name: 'Desserts' },
  { id: 5, name: 'Drinks' },
];

const CategoryList: React.FC<{ onSelectCategory: (category: Category) => void }> = ({ onSelectCategory }) => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const toggleCategorySelection = (categoryId: number) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  return (
    <View style={styles.container}>
      {categories.map(category => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryButton,
            selectedCategories.includes(category.id) ? styles.selectedCategory : {},
          ]}
          onPress={() => toggleCategorySelection(category.id)}
        >
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CategoryList;
