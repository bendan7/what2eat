/* eslint-disable array-callback-return */
/* eslint-disable prefer-template */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-undef */
/* eslint-disable no-else-return */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable global-require */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React from 'react';
import { Text, View, Dimensions, Animated, PanResponder, ImageBackground } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import ScrollviewComp from './ScrollviewComp';
//import HomeScreen from './HomeScreen';


const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const Att = [];
let TotalNumOfRecipes = 0;

class ExploreScreen extends React.Component<Props> {

  constructor() {
    super();
    this.position = new Animated.ValueXY();

    this.state = {
      currentIndex: 0,
    };

    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp',
    });

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate,
      },
      ...this.position.getTranslateTransform(),
      ],
    };

    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp',
    });

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp',
    });
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp',
    });
  }

  componentWillMount() {
        this.props.navigation.addListener('willFocus', () => {
        //this.restart();
        console.log('restart()');
        while (Att.length > 0) {
          Att.pop();
        }
        this.initConection();
      });

    this.PanResponder = PanResponder.create({

      // eslint-disable-next-line no-unused-vars
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) { // LIKE CASE
          this.sendYesOrNo(1);
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          }); // DISLIKE CASE
        } else if (gestureState.dx < -120) {
          this.sendYesOrNo(0);
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        } else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4,
          }).start();
        }
      },
    });
  }
  
  async getNextAttToAsk() {
    console.log('RUN getNextAttToAsk()');
    await fetch(`http://${global.SERVER_IP}:${global.PORT_NUM}/get-next-att`, {
      method: 'POST',
      body: JSON.stringify({
      algoId: this.state.algoId,
      }),
      }).then((response) => response.json())
      .then((responseJson) => {
      console.log(responseJson);
      // push the next att that need to be ask into att
      //Users.push({ id: Users.length, name: responseJson.nextAtt, uri: { uri: String(responseJson.nextAttImage) } });
      Att.push({ id: Att.length, name: responseJson.nextAtt, uri: { uri: String(responseJson.nextAttImage) } });

      // in the first request this section save the total number of recipes
      if (Att.length === 1) {
            TotalNumOfRecipes = responseJson.numOfRelevantDishes;
      }
      this.setState({
        numOfRelevantDishes: responseJson.numOfRelevantDishes
      });
    })
    .catch((error) => {
        console.error(error.message + ' ::error:getNextAttToAsk');
    });
  }

  async initConection() {
    await fetch(`http://${global.SERVER_IP}:${global.PORT_NUM}/run-algo`, {
        method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      // updating the conaction id
      this.setState({
        algoId: Number(responseJson.algoId)
      }); 
      this.getNextAttToAsk();
    })
    .catch((error) => {
        console.error(error.message + ' ::error:getNextAttToAsk');
    });
  }

  async sendYesOrNo(ans) {
      console.log('sendYesOrNo(ans)');
      await fetch(`http://${global.SERVER_IP}:${global.PORT_NUM}/send-yes-or-no`, {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      ans: `${ans}`,
      name: `${Att[Att.length - 1].name}`,
      algoId: this.state.algoId
      }),
      }).then((response) => response.json())
      .then((responseJson) => {
        // the case that: num of recsipes<= threshold
        if (responseJson.areWeDone === true) {
          this.setState({ numOfRelevantDishes: responseJson.numOfRelevantDishes });
          this.props.navigation.goBack(null); //remove the 'explor layer'
          this.props.navigation.navigate('recently recipes', { algoId: this.state.algoId }); // navigate to 'recently recipes screen'
        } else {
        this.getNextAttToAsk();
        }
      })
      .catch((error) => {
         console.error(error.message + ' ---error:sendYesOrNo');
      });   
  }

  async restart() {
    await fetch(`http://${global.SERVER_IP}:${global.PORT_NUM}/restart-algo`, {
        method: 'GET'
    })
    .catch((error) => {
        console.error(error.message + ' ::error:/restart-algo');
    });
  }

  renderAtt() {
    return Att.map((item, i) => {
      if (i !== this.state.currentIndex) {
        return null;
      } else if (i === this.state.currentIndex) {
          return (
            <Animated.View
              {...this.PanResponder.panHandlers}
              key={item.id}
              style={[this.rotateAndTranslate, {
                height: SCREEN_HEIGHT - 20, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}
            >
              <Animated.View style={{
                opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}
              >
                <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>
              </Animated.View>

              <Animated.View style={{
                opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}
              >
                <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>
              </Animated.View>

              <ImageBackground
                style={{
                  flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20, justifyContent: 'center' }} 
                imageStyle={{ borderRadius: 20 }}
                source={item.uri}
              >
                  <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', height: null, width: null }}>
                    <Text style={{ fontSize: 30, color: 'black' }}>{ Att[Att.length - 1].name }</Text>
                    <Text style={{ fontSize: 20, color: 'black' }}>{TotalNumOfRecipes + '/' + this.state.numOfRelevantDishes }</Text>
                  </View>
                </ImageBackground>
            </Animated.View>
          );
        }
      }
    );
  }
      
  render() {
    return (
        <View style={{ flex: 1 }}>
          {this.renderAtt()}
        </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Explore: {
    screen: ExploreScreen,
    navigationOptions: {
   header: null
  }
  },
  ScrollviewRecipes: {
    screen: ScrollviewComp,
      navigationOptions: {
   header: null
  }
  }
});

export default createAppContainer(AppNavigator);
