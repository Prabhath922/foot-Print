import React,{useState} from "react";
import { StyleSheet,Text,View,TextInput,Button,Keyboard } from "react-native";

const WASTE_DATA: Record<string, { category: string; tip: string }> = {
    'banana peel': {
      category: 'Compostable',
      tip: 'Add to compost or green bin.'
    },
    'Plastic bottle': {
      category: 'Recyclable',
      tip: 'Rinse and put in blue bin.'
    },
    'broken glass': {
      category: 'Hazardous',
      tip: 'Wrap and label as sharp before trashing.'
    },
    'paper': {
      category: 'Recyclable',
      tip: 'Dry, clean paper goes in the recycling bin.'
    },
    'aluminum can': {
      category: 'Recyclable',
      tip: 'Rinse and recycle — aluminum is highly reusable.'
    },
    'food leftovers': {
      category: 'Compostable',
      tip: 'Add to compost bin if not oily or meaty.'
    },
    'plastic fork': {
      category: 'Trash',
      tip: 'Single-use plastics usually go in the trash unless specified.'
    },
    'battery': {
      category: 'Hazardous',
      tip: 'Take to a local battery recycling drop-off — never throw in trash.'
    }
  };
  

export default function App(){
    type ResultType={
        category:string,
        tip:string
    }|null;
    const[input,setInput]=useState('');
        const[result,setResult]=useState<ResultType>(null);

        const handleSearch=()=>{

            const key=input.trim().toLowerCase();

            if(WASTE_DATA[key]){
                setResult(WASTE_DATA[key]);
            }else {
                setResult({
                    category: 'trash',
                    tip:'please carefully look into the waste and dispose it accordingly or try entering again'
                })
            }
            Keyboard.dismiss();
        }
    return(
        <View style={styles.container}>
  <Text style={styles.title}>Waste Segregation Assistant</Text>

  <TextInput
    style={styles.input}
    placeholder="Enter item (e.g. banana peel)"
    onChangeText={setInput}
    value={input}
  />

  <Button title="Check" onPress={handleSearch} />

  {result && (
    <View style={styles.result}>
      <Text style={styles.category}>Category: {result.category}</Text>
      <Text style={styles.tip}>Tip: {result.tip}</Text>
    </View>
  )}
</View>

    )

}
const styles =StyleSheet.create({
    container: {
        flex: 1,                     
        backgroundColor: '#fff',     
        padding: 20,                 
        justifyContent: 'center',    
      },
      title: {
        fontSize: 24,                
        textAlign: 'center',         
        marginBottom: 20             
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginBottom: 10,
        borderRadius: 8,
      },
      result: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#e0f7e0',
        borderRadius: 10,
      },
      category: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      tip: {
        fontSize: 16,
        marginTop: 5,
      }
      
})