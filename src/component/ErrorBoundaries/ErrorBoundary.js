import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

import { eliminarSesion,getUsuarioSesion } from '../../services/Sesion';

export class ErrorBoundary extends React.Component {
    state = {
        error: false
      }

      static getDerivedStateFromError (error) {
        
        console.log("===================================ERROR "+error);

        return { error: true };
      }
    
      componentDidCatch (error, errorInfo) {
        // deal with errorInfo if needed

        console.log("ERROR "+error);
        console.log("info "+errorInfo);
      }

      render () {   
        if (this.state.error) {
          return (<Text>error</Text>         
          )
        } else {
          return this.props.children;
        }
      }
   
 
}


export default ErrorBoundary;