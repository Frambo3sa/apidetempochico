import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { SvgUri } from 'react-native-svg';

export default function App() {
  const [dadosClima, setDadosClima] = useState({});
  const [cidade, setCidade] = useState('Recife');
  const [estado, setEstado] = useState('PE');

  const buscarClima = () => {
    if (!cidade || !estado) {
      Alert.alert('Erro', 'Digite cidade e estado!');
      return;
    }

    axios.get(`https://cors-anywhere.herokuapp.com/https://api.hgbrasil.com/weather?key=e9966552&city_name=${cidade},${estado}`)
      .then(response => {
        setDadosClima(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar clima:', error);
        Alert.alert('Erro', 'Não foi possível buscar o clima.');
      });
  };

  useEffect(() => {
    buscarClima();
  }, []);

  const { results } = dadosClima;

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.areaBusca}>
        <TextInput
          style={styles.input}
          placeholder="Digite a cidade"
          value={cidade}
          onChangeText={setCidade}
        />
        <TextInput
          style={styles.input}
          placeholder="UF"
          value={estado}
          maxLength={2}
          onChangeText={setEstado}
        />
        <Button title="Buscar" onPress={buscarClima} />
      </View>

      <View style={styles.cabecalho}>
        {results?.forecast?.[0]?.condition && (
          <SvgUri
            width="150"
            height="150"
            uri={`https://cors-anywhere.herokuapp.com/https://assets.hgbrasil.com/weather/icons/conditions/${results.forecast[0].condition}.svg`}
          />
        )}

        <Text style={styles.temperatura}>{results?.temp || '--'}º</Text>
        <Text style={styles.textoMenor}>{results?.description || '---'}</Text>
        <Text style={styles.textoMenor}>
          Máx: {results?.forecast?.[0]?.max || '--'}º  |  Mín: {results?.forecast?.[0]?.min || '--'}º
        </Text>
      </View>

      <View style={styles.informacoes}>
        <Text>
          Umidade: {results?.humidity || '--'}%   |   Nuvens: {results?.cloudiness || '--'}%   |   Vento: {results?.wind_speedy || '---'}
        </Text>
      </View>

      <View style={styles.previsaoHoje}>
        <Text style={styles.titulo}>Hoje - {results?.date || '--/--'}</Text>
        <View style={styles.linhaPrevisao}>
          <Text>Nascer: {results?.sunrise || '--:--'}</Text>
          <Text>Pôr: {results?.sunset || '--:--'}</Text>
          <Text>Lua: {results?.moon_phase || '---'}</Text>
        </View>
      </View>

      <View style={styles.proximaPrevisao}>
        <Text style={styles.titulo}>Próxima Previsão</Text>
        {results?.forecast?.slice(1, 3).map((dia, index) => (
          <Text key={index}>
            {dia.weekday || '--'} - {dia.description || '--'} - {dia.max || '--'}º / {dia.min || '--'}º
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#7ecbff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  areaBusca: {
    width: '100%',
    marginBottom: 20,
    gap: 10,
    flexDirection: 'row',
    color: '#7ecbff',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cabecalho: {
    alignItems: 'center',
    marginBottom: 20,
  },
  temperatura: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  textoMenor: {
    fontSize: 16,
    color: '#fff',
  },
  informacoes: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  previsaoHoje: {
    backgroundColor: '#d0efff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  linhaPrevisao: {
    gap: 5,
  },
  proximaPrevisao: {
    backgroundColor: '#d0efff',
    padding: 15,
    borderRadius: 10,
    width: '100%',
  },
});