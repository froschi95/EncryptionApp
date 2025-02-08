import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { TextInput, Button, Text, Card, IconButton } from "react-native-paper";
import * as Clipboard from "expo-clipboard";
import { encryptData, decryptData } from "@/services/cryptoService";

const { width } = Dimensions.get('window');

interface TabButtonProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

type TabMode = "encrypt" | "decrypt";

const Index: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [encrypted, setEncrypted] = useState<string>("");
  const [decrypted, setDecrypted] = useState<string>("");
  const [activeTab, setActiveTab] = useState<TabMode>("encrypt");

  const handleEncrypt = (): void => {
    const result = encryptData(input, key);
    setEncrypted(result);
    setDecrypted("");
  };

  const handleDecrypt = (): void => {
    const result = decryptData(encrypted, key);
    setDecrypted(result);
  };

  const clearAll = (): void => {
    setInput("");
    setKey("");
    setEncrypted("");
    setDecrypted("");
  };

  
  const formatResult = (text: string) => {
    return text.replace(/(.{40})/g, "$1\n");
  };

  const TabButton: React.FC<TabButtonProps> = ({ title, isActive, onPress }) => (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTabButton]}
      onPress={onPress}
    >
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Secure Message Encryption</Text>
          {/* <Text style={styles.subtitle}></Text> */}
        </View>
        <View style={styles.headerDecoration} />
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.tabContainer}>
            <TabButton
              title="Encrypt"
              isActive={activeTab === "encrypt"}
              onPress={() => setActiveTab("encrypt")}
            />
            <TabButton
              title="Decrypt"
              isActive={activeTab === "decrypt"}
              onPress={() => setActiveTab("decrypt")}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              label={activeTab === "encrypt" ? "Message to Encrypt" : "Message to Decrypt"}
              value={input}
              onChangeText={(text: string) => setInput(text)}
              mode="outlined"
              style={styles.input}
              multiline
              numberOfLines={4}
              outlineColor="#E0E0E0"
              activeOutlineColor="#2DD4BF"
              theme={{ colors: { primary: '#2DD4BF' } }}
            />

            <TextInput
              label="Secret Key"
              value={key}
              onChangeText={(text: string) => setKey(text)}
              mode="outlined"
              secureTextEntry
              style={styles.input}
              outlineColor="#E0E0E0"
              activeOutlineColor="#2DD4BF"
              theme={{ colors: { primary: '#2DD4BF' } }}
              right={<TextInput.Icon icon="key" color="#2DD4BF" />}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={() => {
                activeTab === "encrypt" ? handleEncrypt() : handleDecrypt();
                setInput("");
              }}
              style={[styles.actionButton, (!input || !key) && styles.buttonDisabled]}
              disabled={!input || !key}
              buttonColor="#2DD4BF"
            >
              {activeTab === "encrypt" ? "Encrypt Message" : "Decrypt Message"}
            </Button>

            <Button
              mode="outlined"
              onPress={clearAll}
              style={styles.clearButton}
              textColor="#2DD4BF"
            >
              Clear All
            </Button>
          </View>

          {(encrypted || decrypted) && (
            <Card style={styles.resultCard}>
              <Card.Content>
                <Text style={styles.resultLabel}>
                  {activeTab === "encrypt" ? "Encrypted Result:" : "Decrypted Result:"}
                </Text>
                <View style={styles.resultBox}>
                  <View style={styles.resultTextContainer}>
                    <Text style={styles.resultText}>
                      {activeTab === "encrypt"
                        ? formatResult(encrypted)
                        : formatResult(decrypted)}
                    </Text>
                  </View>
                  <IconButton
                    icon="content-copy"
                    size={20}
                    iconColor="#2DD4BF"
                    onPress={() => {
                      // clipboard functionality
                      Clipboard.setStringAsync(
                        activeTab === "encrypt" ? encrypted : decrypted
                      );
                    }}
                    style={styles.copyButton}
                  />
                </View>
              </Card.Content>
            </Card>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    position: "relative",
    padding: 24,
    paddingTop: 48,
    backgroundColor: "#0F172A",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 24,
  },
  headerContent: {
    alignItems: "center",
    marginBottom: 16,
  },
  headerDecoration: {
    position: "absolute",
    bottom: -20,
    left: width / 2 - 20,
    width: 40,
    height: 40,
    backgroundColor: "#2DD4BF",
    transform: [{ rotate: "45deg" }],
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 8,
  },
  card: {
    margin: 16,
    borderRadius: 16,
    elevation: 4,
    backgroundColor: "#FFFFFF",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 24,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: "#fff",
    elevation: 2,
  },
  tabText: {
    fontSize: 16,
    color: "#64748B",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#0F172A",
    fontWeight: "600",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  actionButton: {
    paddingVertical: 8,
    borderRadius: 12,
    elevation: 2,
    marginBottom: 12,
  },
  buttonDisabled: {
    backgroundColor: "#CBD5E1",
    elevation: 0,
  },
  clearButton: {
    borderColor: "#2DD4BF",
    borderRadius: 12,
    borderWidth: 2,
  },
  resultCard: {
    marginTop: 24,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    overflow: "hidden",
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 12,
  },
  resultBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  resultTextContainer: {
    flex: 1,
    flexWrap: "wrap",
  },
  resultText: {
    fontSize: 14,
    color: "#334155",
    lineHeight: 20,
    flexWrap: "wrap",
    width: "100%",
  },
  copyButton: {
    marginLeft: 8,
    backgroundColor: "#F1F5F9",
  },
});

export default Index;