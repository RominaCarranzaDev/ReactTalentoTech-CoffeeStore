import React, {useState, useEffect} from 'react'
import FieldValidator from '../utils/FieldValidators';
import styled from 'styled-components';

function FormField({ fieldType = "text", name, id, label, options = [], check = [], placeholder, onValid, required = false, ...attributes}) {
    const [value, setValue] = useState(attributes.value || "");
    const [error, setError] = useState("");
    const [checked, setChecked] = useState(false); 
    const [touched, setTouched] = useState(false);
    const [charCount, setCharCount] = useState(0);

    const validators = FieldValidator();

    useEffect(() => {
        if (attributes.value !== undefined) {
            setValue(attributes.value);
        }
        }, [attributes.value]);


    const validateValue = (value) => {
    const rules = Array.isArray(check) ? [...check] : [check];
    if (required && !rules.includes("required")) rules.unshift("required");
    if (!rules.includes(fieldType) && validators[fieldType]) rules.push(fieldType);

    for (const rule of rules) {
      const validator = validators[rule];
        if (validator) {
            const result = validator(value);
        if (!result.valid) {
            if (error !== result.error) setError(result.error);
            return false;
        }
      }
    }

    if (error) setError("");
    return true;
    };

    const handleChange = (e) => {
        if (fieldType === "checkbox") {
            const isChecked = e.target.checked;
            setChecked(isChecked);
            onValid?.(name, isChecked ? e.target.value : null, isChecked);
            return;
        }

        const val = e.target.value;
        setValue(val);
        const isValid = validateValue(val);
        onValid?.(name, val, isValid);
    };

    const handleBlur = (e) => {
        setTouched(true);
        const value = e.target.value;
        const isValid = validateValue(value);

        if (check.includes('price') && value) {
            const num = parseFloat(value.replace(",", "."));
            if (!isNaN(num)) {
                const fixed = num.toFixed(2);
                setValue(fixed);
                validateValue(fixed);
                onValid?.(e.target.name, parseFloat(fixed), true);
                return
            }
        } 

        onValid?.(e.target.name, value, isValid);
    };

    const inputMode = {
    price: "decimal",
    number:  "numeric",
    email: "email",
    url: "url",
    tel: "tel",
    search: "search",
    };

    const commonProps = {
        name,
        id: id || name,
        value: value,
        onChange: handleChange,
        onBlur: handleBlur,
        placeholder,
        required,
        className: touched ? (error ? "error" : "valid") : "",
        ...attributes,
    };
    return (
        <div className="form-field">
            {label && (
                <label htmlFor={id || name}>
                    {label} {required && <span className='required'>*</span>} 
                </label>
            )}

            {fieldType === "textarea" ? (
            <TextareaWrapper>
                <textarea
                {...commonProps}
                value={value}
                rows={attributes.rows || 3}
                maxLength={attributes.maxLength || 180}
                minLength={attributes.minLength}
                onChange={(e) => {
                    setValue(e.target.value);
                    setCharCount(e.target.value.length);
                    handleChange(e);
                }}
                onBlur={(e) => handleBlur(e)}
                ></textarea>
                <span className='character-counter' >{charCount} / {attributes.maxLength || 180}</span>
            </TextareaWrapper>
            ) : fieldType === "select" ? (
            <select {...commonProps} >
                <option value="" disabled>Seleccione una opción...</option>
                {options?.map((opt) => (
                    <option key={opt.value || opt} value={opt.value || opt}>
                    {opt.label || opt}
                    </option>
                ))}
            </select>
            ) : fieldType === "checkbox" ? (
            <input type="checkbox" checked={checked} {...commonProps} />
            ) : fieldType === "radio" ? (
            <div className="radio-group">
                {options.map((opt) => (
                    <label key={opt.value || opt} htmlFor={opt.id || opt.value}>
                    <input
                        type="radio"
                        name={opt.name}
                        id={opt.id}
                        value={opt.value || opt}
                        checked={value === (opt.value || opt)}
                        onChange={handleChange}
                    />
                    {opt.label || opt}
                    </label>
                ))}
            </div>
            ): fieldType === "range" ? (
            <div className="range-group">
                <input type="range" id={id || name} name={name} onChange={handleChange} />
                <output  htmlFor={id || name}></output>    
            </div>
            ) : (
            <input
                type={fieldType}
                inputMode={ inputMode[fieldType] || 'text'}
                value={value}
                {...commonProps}
                onBlur={handleBlur}
                />
            )}

            {error && (<small className="error">{error}</small>)}
        </div>
    )
} export default FormField;

const TextareaWrapper = styled.div`
    position: relative;

    & textarea {
        padding-bottom: 1rem;   
        }

    & .character-counter {
        position: absolute;
        right: .8rem;
        bottom: .5rem;
        font-size: small;
        color: var(--color-primary);
        pointer-events: none;
    }
`