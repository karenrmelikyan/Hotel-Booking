import {useEffect, useState} from "react";

export default function useValidate(value, validators) {
    const [emptyErr, setEmptyErr] = useState(false);
    const [minLengthErr, setMinLengthErr] = useState(false);

    useEffect(() => {
        for (const validator in validators) {
            switch (validator) {
                case 'minLength':
                    value.length < validators[validator]
                        ? setMinLengthErr(true)
                        : setMinLengthErr(false)
                    break;

                case 'isEmpty':
                    value
                        ? setEmptyErr(false)
                        : setEmptyErr(true)
                    break;
                default: return;
            }
        }
    }, [value, validators])

    return [emptyErr, minLengthErr];
}