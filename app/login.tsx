import {TextInput, Button, SafeAreaView} from "react-native";
import { useAuth } from "@/context/login/login.context";
import Box from "@/atoms/box";
import Text from "@/atoms/text";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useAuth();
    const router = useRouter();

    const handlelogin = async (): Promise<void> => {                    
        login(username, password);
        router.replace("/(protected)/(tabs)");
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
