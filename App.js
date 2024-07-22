import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, Button } from 'react-native';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';

const App = () => {
  const [ideas, setIdeas] = useState([]);

  const fetchIdeas = async () => {
    try {
      const response = await axios.get('https://blogs-sharing-ideas-api.onrender.com/api/sharing/getallsharingideas');
      setIdeas(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  const renderIdea = ({ item, index }) => (
    <Animatable.View animation="fadeInUp" delay={index * 100} style={styles.card}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subtitle}>{item.publicrole}</Text>
      <Text style={styles.description}>{item.description}</Text>
      {item.imageUrls.length > 0 && (
        <Image source={{ uri: item.imageUrls[0] }} style={styles.image} />
      )}
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <Button title="Refresh" onPress={fetchIdeas} />
      <FlatList
        data={ideas}
        renderItem={renderIdea}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
      />
      <StatusBar style="auto" />
    </View>
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
});

export default App;
