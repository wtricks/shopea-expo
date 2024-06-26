import { useState } from "react";

import BaseInput, { Props } from "~/components/Input"

export default function SecureInput({value, onTextChange, ...props}: Props) {
    const [show, setShow] = useState(false);

    return (
        <BaseInput
            {...props}
            onIconPress={() => setShow(!show)}
            value={value}
            rightIcon={!show ? "eyeOpen" : "eyeClose"}
            onTextChange={onTextChange}
            secureTextEntry={!show}
            leftIcon="lock"
        />
    )
}