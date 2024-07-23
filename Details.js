import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

const Details = ({ route }) => {
  const { idea } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{idea.name}</Text>
      <Text style={styles.subtitle}>{idea.publicrole}</Text>
      <Text style={styles.description}>{idea.description}</Text>
      {idea.imageUrls.map((url, index) => (
        <Image key={index} source={{ uri: url }} style={styles.image} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
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
    marginBottom: 10,
  },
});

export default Details;
