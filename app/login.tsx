import {TextInput, Button, SafeAreaView} from "react-native";
import { useAuth } from "@/context/login/login.context";
import Box from "@/atoms/box";
import Text from "@/atoms/text";
import { useState, useEffect } from "react";
//import Login from "@/class/class.login";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {login,isLogged,logout} = useAuth();
    const router = useRouter();

    const handlelogin = async (): Promise<void> => {
        console.log("username", username, "password",password);
       // const login = new Login({ username, password });
       // const response = await login.login();                
        login(username, password);
        router.replace("/(protected)/(tabs)");
    }

    useEffect(() => {
        const checkLogin = async () => {
            const isLoggedFromStorage = await checkloginfromstorage();
            console.log("Login from storage:", isLoggedFromStorage);
            
            // Se estiver logado, você pode redirecionar ou atualizar o estado
            if (isLoggedFromStorage) {
                
                router.replace("/(protected)/(tabs)");
                // Opção 1: Redirecionar direto
                // router.replace("/(protected)/(tabs)");
                
                // Opção 2: Atualizar o contexto (se tiver uma função para isso)
                // login(savedUsername, savedPassword); // ou alguma função de restore session
            }
        };
        
        checkLogin();
    }, []);

    const checkloginfromstorage = async (): Promise<boolean> => {
        const logged = await  AsyncStorage.getItem("loged");
        if(logged !== null){
            const islogged = JSON.parse(logged);
            return islogged;
        }else{
            return false;
        }
        return false;
    }


        return (
            <SafeAreaView style={{flex:1}}>
                <Box backgroundColor="success" width={"100%"} height={"100%"} alignItems="center" justifyContent="center">
                    <Box width={"50%"} height={"40%"} backgroundColor="primary" borderRadius="l" alignItems="center" justifyContent="center" gap="s">
                        <Text>Username:</Text>
                        <TextInput autoComplete="email" onChangeText={(text) => setUsername(text)} style={{width:"90%" , height:"10%", backgroundColor:"#ccc"}}></TextInput>
                        <Text>password:</Text>
                        <TextInput secureTextEntry={true} onChangeText={(text) => setPassword(text)} style={{width:"90%" , height:"10%", backgroundColor:"#ccc"}}></TextInput>                        
                    </Box>
                    <Button title="Login" color={"black"} onPress={handlelogin}/>
                    
                </Box>                
            </SafeAreaView>
        );
    }
