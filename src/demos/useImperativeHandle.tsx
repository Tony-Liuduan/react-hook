import React from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';

function FancyInput(props: any, ref: any) {
    const inputRef = useRef<HTMLInputElement>();
    useImperativeHandle(ref, () => ({
        parentFocus: () => {
            inputRef.current.focus();
        }
    }));
    return <input ref={inputRef} />;
}
const FancyInputComponent = forwardRef(FancyInput);

function DemoUseImperativeHandle() {
    const ref = useRef<any>();

    setTimeout(() => {
        ref.current.parentFocus();
    }, 1000);

    return <FancyInputComponent ref={ref}></FancyInputComponent>;
}

export default DemoUseImperativeHandle;