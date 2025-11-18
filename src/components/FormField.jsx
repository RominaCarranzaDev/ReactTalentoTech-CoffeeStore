import React, {useState} from 'react'
import FieldValidator from '../utils/FieldValidators';

function FormField({ fieldType = "text", name, id, label, options = [], check = [], placeholder, onValidChange, required = false, ...attributes}) {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [checked, setChecked] = useState(false); 
    const [touched, setTouched] = useState(false);
    const [charCount, setCharCount] = useState(0);

    const validators = FieldValidator();

    const validateValue = (val) => {
    const rules = Array.isArray(check) ? [...check] : [check];
    if (required && !rules.includes("required")) rules.unshift("required");
    if (!rules.includes(fieldType) && validators[fieldType]) rules.push(fieldType);

    for (const rule of rules) {
      const validator = validators[rule];
        if (validator) {
            const result = validator(val);
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
        onValidChange?.(name, isChecked ? e.target.value : null, isChecked);
        return;
    }

    const val = e.target.value;
    setValue(val);
    const isValid = validateValue(val);
    onValidChange?.(name, isValid ? val : null, isValid);
    };

    const handleBlur = () => {
    setTouched(true);
    if (check.includes('price') && value) {
        const num = parseFloat(value.replace(",", "."));
        if (!isNaN(num)) {
            const fixed = num.toFixed(2);
            setValue(fixed);
            validateValue(fixed);
            onValidChange?.(name, parseFloat(fixed), true);
        }
    } else {
      validateValue(value);
    }
    };

    const inputStyle = {
    border: `2px solid ${
      !touched ? "#ccc" : error ? "red" : "green"
    }`,
    outline: "none",
    padding: "6px 8px",
    borderRadius: "6px",
    transition: "border-color 0.3s ease",
    width: "100%",
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
        value,
        onChange: handleChange,
        onBlur: handleBlur,
        placeholder,
        style: inputStyle,
        required,
        ...attributes,
    };
    return (
        <div className="form-field">
            {label && (
                <label htmlFor={id || name}>
                    {label} {required && <span style={{ color: 'red', marginLeft: '1rem' }}>*</span>} 
                </label>
            )}

        {/* Renderizado condicional */}
            {fieldType === "textarea" ? (
            <div className="textarea-group" style={{ position: "relative" }}>
                <textarea
                {...commonProps}
                rows={attributes.rows || 3}
                maxLength={attributes.maxLength || 120}
                onChange={(e) => {
                    handleChange(e);
                    setCharCount(e.target.value.length);
                }}
                ></textarea>
                <span className='counter-character' >
                {charCount} / {attributes.maxLength || 120}
                </span>
            </div>
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
                    <label key={opt.value || opt}>
                    <input
                        type="radio"
                        name={name}
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
            {...commonProps}
            />
            )}

            {error && (
            <small className="error-message" style={{ color: "red", display: "block", marginTop: "4px" }}>
            {error}
            </small>
        )}
        </div>
    )
}

export default FormField