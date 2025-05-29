import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import axios from 'axios';

export default function App() {
  const [dadosClima, setDadosClima] = useState({});

  useEffect(() => {
    axios.get('https://cors-anywhere.herokuapp.com/https://api.hgbrasil.com/weather?key=e9966552&city_name=Recife,PE')      .then(response => {
        setDadosClima(response.data.results);
      })
      .catch(error => {
        console.error('Erro ao buscar clima:', error);
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <View style={estilos.cabecalho}>
        {dadosClima.condition_slug && (
          <Image
  source={{ uri: `https://assets.hgbrasil.com/weather/images/${dadosClima.condition_slug}.png` }}
  style={estilos.imagem}
/>

        )}
        <Text style={estilos.temperatura}>{dadosClima.temp || '--'}º</Text>
        <Text style={estilos.textoMenor}>{dadosClima.description || '---'}</Text>
        <Text style={estilos.textoMenor}>
          Máx: {dadosClima?.forecast?.[0]?.max || '--'}º  |  Mín: {dadosClima?.forecast?.[0]?.min || '--'}º
        </Text>
      </View>

      <View style={estilos.informacoes}>
        <Text>
          Umidade: {dadosClima.humidity || '--'}%   |   Nuvens: {dadosClima.cloudiness || '--'}%   |   Vento: {dadosClima.wind_speedy || '---'}
        </Text>
      </View>

      <View style={estilos.previsaoHoje}>
        <Text style={estilos.titulo}>Hoje - {dadosClima.date || '--/--'}</Text>
        <View style={estilos.linhaPrevisao}>
          <Text>Nascer: {dadosClima.sunrise || '--:--'}</Text>
          <Text>Pôr: {dadosClima.sunset || '--:--'}</Text>
          <Text>Lua: {dadosClima.moon_phase || '---'}</Text>
        </View>
      </View>

      <View style={estilos.proximaPrevisao}>
        <Text style={estilos.titulo}>Próxima Previsão</Text>
        {(dadosClima?.forecast?.slice(1, 3) || []).map((dia, index) => (
          <Text key={index}>
            {dia.weekday || '--'} - {dia.description || '--'} - {dia.max || '--'}º / {dia.min || '--'}º
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}


const estilos = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#7ecbff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  cabecalho: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagem: {
    width: 100,
    height: 100,
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