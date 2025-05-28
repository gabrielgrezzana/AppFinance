import react, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";



interface Login {
    isLogged: boolean;
    isReady: boolean;
    login: (username:string, password:string) => void;
    logout: () => void;
}

const AuthContext = createContext<Login>({} as Login);

interface LoginProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({children}: LoginProviderProps) => {
    const [isLogged, setIsLoggedIn] = useState(false)
    const [isReady, setIsReady] = useState(false);
    const router = useRouter();

    async function storeAuthState (newState: {isLoggedin:boolean}) {
      try{
        await AsyncStorage.setItem("loged",JSON.stringify(newState));
      }catch(error){
        console.log(error);
      }
    }

    const login = async (username:string, password:string) => {
        console.log(username," - ",password)
        setIsLoggedIn(true);
        console.log("salvando no async storage")
        storeAuthState({isLoggedin: true})        
        console.log("salvo")
        console.log("Usuario logado com sucesso!")
    }

    const logout = async () => {
        setIsLoggedIn(false);
        storeAuthState({isLoggedin: false})
        console.log("Usuario deslogado com sucesso!");
        //router.replace("/login");
    }

    useEffect(() => {
      
        async function loadAuthState(){
          try{
          const authState = await AsyncStorage.getItem("loged");
          if(authState){
            setIsLoggedIn(JSON.parse(authState));
          }      
          }catch(error){
            console.log(error);
          }finally{
            setIsReady(true);
          }            
        }
      loadAuthState();
    },[])

    return (
        <AuthContext.Provider value={{
          isLogged,
          isReady,
          login,
          logout
        }}>
          {children}
        </AuthContext.Provider>
      );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if(!context){
    throw new Error('useAuth deve ser usado dentro do provider.')
  }
  return context;
}




// const LoginContext = createContext(<Loading)
