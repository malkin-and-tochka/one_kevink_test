import { NavigationContainer } from '@react-navigation/native';
import PostsScreen from '../presentation/screens/Posts/PostsScreen';
import { NavigationStackParams, POST, POSTS } from './navigationParams';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostScreen from '../presentation/screens/Post/PostScreen';

const Stack = createNativeStackNavigator<NavigationStackParams>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName={POSTS}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name={POSTS} component={PostsScreen} />
      <Stack.Screen
        name={POST}
        component={PostScreen}
      />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
