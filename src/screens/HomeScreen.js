import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  ScrollView,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {fetchDogsList} from '../redux/actions/DogBreeds';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breedList: null,
      filtered: [],
      text: '',
      searchText: '',
      search: [],
    };
  }

  componentDidMount() {
    this.props.fetchDogsList();
  }

  componentDidUpdate(prevProps) {
    if (this.props.dogList) {
      if (this.props.dogList != prevProps.dogList) {
        this.setState({
          breedList: Object.keys(this.props.dogList),
        });
      }
    }
  }

  getBreedList() {
    const {breedList} = this.state;
    return breedList.map((name, k) => {
      return (
        <TouchableOpacity
          style={{
            borderColor: '#ddd',
            padding: 10,
            width: '100%',
          }}
          key={k}
          onPress={() =>
            this.props.navigation.navigate('Breed', {
              name: name,
            })
          }>
          <Text>{name}</Text>
        </TouchableOpacity>
      );
    });
  }

  searchBreed = e => {
    let item = Object.keys(this.props.dogList);
    var search = [];
    item.map((val, k) => {
      let tempText = e.toLowerCase();
      let result = val.includes(tempText);
      if (result) {
        search.push(val);
      }
    });

    this.setState({breedList: search});
  };

  render() {
    const {isFetching, dogList} = this.props;
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="dark-content" />
        {!isFetching ? (
          <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            {/* Search View */}
            <View style={{backgroundColor: '#f4f4f4'}}>
              <TextInput
                style={{
                  height: 50,
                  borderColor: 'gray',
                  borderWidth: 1,
                  paddingHorizontal: 15,
                  borderRadius: 25,
                  margin: 15,
                }}
                onChangeText={text => {
                  this.searchBreed(text);
                }}
                placeholder="Search Breed Here...."
              />
            </View>
            {/* List View */}
            {this.state.breedList && (
              <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  {this.getBreedList()}
                </View>
              </ScrollView>
            )}
          </SafeAreaView>
        ) : (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator color="#808080" size="large" />
          </View>
        )}
      </View>
    );
  }
}

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch => {
  return {
    fetchDogsList: () => dispatch(fetchDogsList()),
  };
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    dogList: state.dogList.message,
    isFetching: state.isFetching,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
