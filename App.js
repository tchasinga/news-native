import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Details from './Details.js';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true); // Create a loading state

  const fetchIdeas = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await axios.get('https://blogs-sharing-ideas-api.onrender.com/api/sharing/getallsharingideas');
      setIdeas(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  const renderIdea = ({ item, index }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { idea: item })}>
      <Animatable.View animation="fadeInUp" delay={index * 100} style={styles.card}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.publicrole}</Text>
        <Text style={styles.description}>{item.description}</Text>
        {item.imageUrls.length > 0 && (
          <Image source={{ uri: item.imageUrls[0] }} style={styles.image} />
        )}
      </Animatable.View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Button title="Refresh" onPress={fetchIdeas} />
      {loading ? ( // Show ActivityIndicator while loading is true
        <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
      ) : (
        <FlatList
          data={ideas}
          renderItem={renderIdea}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.list}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
