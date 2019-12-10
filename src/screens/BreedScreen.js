import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {fetchSubBreeds, fetchBreedImage} from '../redux/actions/DogBreeds';

class BreedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const params = this.props.navigation.state.params;
    this.props.fetchSubBreeds(params.name);
    this.props.fetchBreedImage(params.name);

    this.props.navigation.setParams({
      name: params.name,
    });
  }

  render() {
    const params = this.props.navigation.state.params;
    const {subBreed, breedImage, isFetching} = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View>
          {/* Breed Name */}
          <Text style={{fontSize: 30}}>{params.name}</Text>
          {/* Sub breed details */}
          <View>
            {subBreed && subBreed.length > 0 ? (
              <View>
                <Text>Available Sub-breeds :</Text>
                {subBreed.map((name, k) => (
                  <Text
                    style={{
                      height: 20,
                      borderColor: 'gray',
                      borderWidth: 1,
                      paddingHorizontal: 15,
                      borderRadius: 25,
                      margin: 5,
                    }}
                    key={k}>
                    {name}
                  </Text>
                ))}
              </View>
            ) : (
              <Text>No Sub-breeds available</Text>
            )}
          </View>
          {/* Image */}
          <View>
            <Image
              source={{uri: breedImage}}
              style={{height: 200, width: 200}}
            />
          </View>
          {/* Change Image Button */}
          <View>
            <TouchableOpacity
              onPress={() => this.props.fetchBreedImage(params.name)}
              style={{
                padding: 10,
                borderColor: '#000',
                borderWidth: 1,
                borderRadius: 25,
                backgroundColor: 'green',
                alignItems: 'center',
                marginTop: 25,
              }}>
              {isFetching ? (
                <ActivityIndicator color="#808080" size="small" />
              ) : (
                <Text>Change Picture</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch => {
  return {
    fetchSubBreeds: data => dispatch(fetchSubBreeds(data)),
    fetchBreedImage: data => dispatch(fetchBreedImage(data)),
  };
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    subBreed: state.subBreed.message,
    breedImage: state.breedImage.message,
    isFetching: state.isFetching,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BreedScreen);
