export default function FieldValidator() {
    const validators = {
    
    required(value) {
    return value?.toString().trim() ? { valid: true, value } 
    : { valid: false, error: "Este campo es obligatorio" };
    },

    textShort(value) {
    const maxValue = 50
    return (value.length > maxValue) ? { valid: false, error: `Máximo ${maxValue} caracteres` }
    : { valid: true, value };
    },

    textLong(value) {
      const maxValue = 150
      return (value.length > maxValue) ? { valid: false, error: `Máximo ${maxValue} caracteres`  } 
      : { valid: true, value};
    },

    number(value) {
      return (value === "" || isNaN(value)) ? { valid: false, error: "Debe ser un número" }
      : { valid: true, value: Number(value) };
    },

    price(value) {
        if (value === "") return { valid: false, error: "Campo obligatorio" };
        const num = parseFloat(value);
        if (isNaN(num)) return { valid: false, error: "Debe ser un número válido" };
        if (num < 0) return { valid: false, error: "Debe ser positivo" };
        const parts = value.toString().split(".");
        if (parts[1] && parts[1].length > 2) {
            return { valid: false, error: "Máximo 2 decimales permitidos" };
        }

        return { valid: true, value: Number(num.toFixed(2)) };
    },

    numberFloat(value, { min, max } = {}) {
        const num = parseFloat(value);
        if (isNaN(num))
          return { valid: false, error: "Debe ser un número válido" };
        if (min !== undefined &&  num < min)
          return { valid: false, error: `No puede ser menor que ${min}` };
        if (max !== undefined && num > max)
          return { valid: false, error: `No puede ser mayor que ${max}` };
        return { valid: true, value: num };
    },

    numberPositive(value) {
        const num = parseFloat(value);
        if (isNaN(num)) return { valid: false, error: "Debe ser un número válido" };
        if (num <= 0) return { valid: false, error: `Debe ser mayor o igual a cero` };
        return { valid: true, value: num };
    },

    email(value, { required = false } = {}) {
        if (required && !value.trim()) return { valid: false, error: "Campo obligatorio" };
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value) ? { valid: true, value }
        : { valid: false, error: "Correo electrónico inválido" };
    },

    password(value, { min = 0, max = 18 } = {}) {
      if (!value.trim()) return { valid: false, error: "Campo obligatorio" };
      if (value.length < min) return { valid: false, error: `Debe tener al menos ${min} caracteres` };
      if (value.length > max) return { valid: false, error: `Máximo ${max} caracteres` };
      return { valid: true, value };
    },

    };
    return validators;
}