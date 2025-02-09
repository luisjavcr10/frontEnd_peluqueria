const Input = ({type, value, onChange, bg, placeholder, readOnly, docType}) =>{
    const handleInputChange = (e) => {
        const newValue = e.target.value;
        
        if (type === "number") {
            // Validate document length based on docType
            if (docType === "DNI" && newValue.length > 8) {
                return;
            }
            if (docType === "RUC" && newValue.length > 11) {
                return;
            }
            
            // Only allow numbers
            if (/^\d*$/.test(newValue)) {
                onChange(e);
            }
        } else if (type === "text") {
            // Allow only letters, spaces, and accents for text
            if (/^[a-zA-ZÀ-ÿ\s]*$/.test(newValue)) {
                onChange(e);
            }
        } else {
            onChange(e);
        }
    };

    return(
        <input
          type={type}
          value={value}
          onChange={handleInputChange}
          readOnly={readOnly}
          maxLength={docType === "DNI" ? 8 : docType === "RUC" ? 11 : undefined}
          className={`w-full p-2 border ${bg} rounded-md focus:ring-2 focus:ring-sky-900 focus:outline-none`}
          placeholder={placeholder}
        />
    );
};

export default Input;