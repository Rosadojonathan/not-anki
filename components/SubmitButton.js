import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function SubmitButton({ onPress, style,text}) {
  return(
    <TouchableOpacity
                    onPress={onPress} style={style.submitBtn}
              >
      <Text style={style.submitBtnText}
        >{text}</Text>
    </TouchableOpacity>
  )
}
