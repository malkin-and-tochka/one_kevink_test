import {useToast} from 'react-native-toast-notifications';

const useErrorHandler = () => {
  const toast = useToast();

  return () => toast.show('Error while processing request')
};

export default useErrorHandler;
