import React from "react";
import { FloatingLabel, Form, FormControl, InputGroup } from "react-bootstrap";

export default function FormGroup({ label, type, fieldName, placeholder, register, value }) {
    return (
        <>
            {" "}
            <FloatingLabel label={label} className='mb-3'>
                <Form.Control
                    type={type}
                    placeholder={placeholder}
                    defaultValue={value}
                    {...register(fieldName)}
                />
            </FloatingLabel>
        </>
    );
}
