import { View, Text, ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-[#E5FCFF]">
      {/* Header */}
      <View className="bg-[#08415C] pt-16 pb-6 px-6">
        <Text className="text-white/70 text-sm">Bonjour 👋</Text>
        <Text className="text-white text-2xl font-bold mt-1">Étudiant</Text>
      </View>

      <ScrollView
        className="flex-1 px-4 pt-4"
        showsVerticalScrollIndicator={false}
      >
        {/* Widget accès rapide IA */}
        <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          <Text className="text-[#08415C] font-bold text-lg mb-3">
            Assistant IA
          </Text>
          <View className="flex-row gap-2">
            <View className="flex-1 bg-[#08415C] rounded-xl p-3 items-center">
              <Text className="text-white text-xs font-medium">
                Résumer PDF
              </Text>
            </View>
            <View className="flex-1 bg-[#ACACDE] rounded-xl p-3 items-center">
              <Text className="text-white text-xs font-medium">Quiz</Text>
            </View>
            <View className="flex-1 bg-[#C490D1] rounded-xl p-3 items-center">
              <Text className="text-white text-xs font-medium">
                Prof virtuel
              </Text>
            </View>
          </View>
        </View>

        {/* Widget documents récents */}
        <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          <Text className="text-[#08415C] font-bold text-lg mb-3">
            Documents récents
          </Text>
          {[
            'Cours React Native.pdf',
            'TP Base de données.pdf',
            'Slides NestJS.pdf',
          ].map((doc, i) => (
            <View
              key={i}
              className="flex-row items-center py-3 border-b border-gray-100"
            >
              <View className="w-10 h-10 bg-[#ABDAFC] rounded-lg items-center justify-center mr-3">
                <Text className="text-[#08415C] font-bold text-xs">PDF</Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 font-medium text-sm">{doc}</Text>
                <Text className="text-gray-400 text-xs">Aujourd&apos;hui</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Widget budget */}
        <View className="bg-white rounded-2xl p-4 mb-8 shadow-sm">
          <Text className="text-[#08415C] font-bold text-lg mb-3">
            Budget du mois
          </Text>
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-gray-400 text-xs">Dépensé</Text>
              <Text className="text-[#08415C] text-2xl font-bold">420€</Text>
            </View>
            <View className="items-end">
              <Text className="text-gray-400 text-xs">Budget total</Text>
              <Text className="text-gray-600 text-lg font-medium">800€</Text>
            </View>
          </View>
          <View className="mt-3 bg-gray-100 rounded-full h-2">
            <View className="bg-[#08415C] rounded-full h-2 w-1/2" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
