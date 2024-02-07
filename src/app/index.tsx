import { View, FlatList, SectionList, Text } from "react-native";
import { Link } from "expo-router";

import { useState, useRef } from "react";

import { CATEGORIES, MENU, ProductProps } from "@/utils/data/products";

import { Header } from "@/components/header";
import { Product } from "@/components/product";
import { CategoryButton } from "@/components/category-button";
import { useCartStore } from "@/stores/card-store";

export default function Home() {
  const cardStore = useCartStore();

  const cardQuantityItems = cardStore.products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const sectionListRef = useRef<SectionList<ProductProps>>(null);

  const [category, setCaregory] = useState(CATEGORIES[0]);

  function handleCategorySelect(selectedCategory: string) {
    setCaregory(selectedCategory);

    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === selectedCategory
    );

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      });
    }
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Cardapio" cardQuantityItems={cardQuantityItems} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === category}
            onPress={() => handleCategorySelect(item)}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
      />

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-white text-xl font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
