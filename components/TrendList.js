import React from 'react'
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  View
} from 'react-native'

export class TrendList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isLoading: true }
  }

  componentDidMount() {
    return fetch(
      'https://github-trending-api.now.sh/repositories?language=javascript&since=weekly'
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson
          },
          function() {}
        )
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.TitleText}>{item.name}</Text>
              <Text style={styles.LinkText}>{item.url}</Text>
            </View>
          )}
          keyExtractor={({ name }, index) => name}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  TitleText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    padding: 5
  },
  LinkText: {
    fontSize: 14,
    color: 'rgba(96,120,109, 1)',
    padding: 5,
    marginBottom: 10
  }
})
