import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { TextWithoutLocale} from "~/components/Text";
import { Colors } from "~/constants/Theme";

export default function Home() {
    return (
        <SafeAreaView edges={["top"]} style={styles.container}>
            <TextWithoutLocale value="Home" type="h1" color="primary" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: Colors.white
    }
})