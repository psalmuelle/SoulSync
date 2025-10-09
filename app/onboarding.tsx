import Button from "@/components/ui/Button";
import { Colors } from "@/constants/Color";
import { Onboardings } from "@/constants/Onboarding";
import { storage } from "@/lib/mmkvStorage";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function Onboarding() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  const handleNext = async () => {
    if (currentPage < Onboardings.length - 1) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      pagerRef.current?.setPage(nextPage);
    } else {
      storage.set("hasOnboarded", true);
      router.replace("/create-account");
    }
  };

  const handleSkip = async () => {
    storage.set("hasOnboarded", true);
    router.replace("/create-account");
  };

  const handleBack = () => {
    if (currentPage > 0) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      pagerRef.current?.setPage(prevPage);
    }
  };
  return (
    <SafeAreaView style={styles.pageContainer}>
      <View
        style={[
          styles.topBar,
          {
            justifyContent: currentPage > 0 ? "space-between" : "flex-end",
          },
        ]}
      >
        {currentPage > 0 && (
          <Pressable onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.light.grey9} />
          </Pressable>
        )}

        <Pressable onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>

      <PagerView
        ref={pagerRef}
        initialPage={0}
        scrollEnabled={false}
        style={styles.pagerView}
      >
        {useMemo(
          () =>
            Onboardings.map((item, index) => (
              <View key={index} style={styles.page}>
                <View style={{ gap: 24 }}>
                  <Text style={styles.header}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
                <Image
                  source={item.image}
                  style={styles.image}
                  contentFit="cover"
                />
              </View>
            )),
          [Onboardings]
        )}
      </PagerView>

      <View style={styles.paginationContainer}>
        {Onboardings.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              {
                backgroundColor:
                  index === currentPage
                    ? Colors.light.grey11
                    : Colors.light.grey3,
                width: index === currentPage ? 24 : 8,
              },
            ]}
          />
        ))}
      </View>

      <Button onPress={handleNext}>
        {currentPage === Onboardings.length - 1 ? (
          <View style={styles.ctaContainer}>
            <Text style={styles.nextButtonText}>Get Started</Text>
            <Octicons name="arrow-right" size={24} color="white" />
          </View>
        ) : (
          <Text style={styles.nextButtonText}>Next</Text>
        )}
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.light.lightOrange,
  },
  pagerView: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
    borderRadius: 100,
  },
  skipButton: {
    padding: 8,
  },
  skipText: {
    fontFamily: "DMSans",
    fontSize: 16,
    color: Colors.light.grey5,
  },
  page: {
    gap: 24,
  },
  header: {
    fontFamily: "Recoleta",
    fontSize: 32,
    fontWeight: "500",
    color: Colors.light.grey11,
  },
  description: {
    fontFamily: "DMSans",
    fontWeight: "400",
    fontSize: 18,
    color: Colors.light.grey5,
  },
  image: {
    marginTop: 40,
    width: width * 0.9,
    height: height * 0.35,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
    gap: 8,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
  },
  nextButtonText: {
    fontFamily: "DMSans",
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
  ctaContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
