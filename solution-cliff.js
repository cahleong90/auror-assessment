function interpolateString(inputString, values) {
    let output = "";
    for (let i = 0; i < inputString.length; i++) {
        // Handle escape sequence for opening bracket
        if (inputString.substring(i, i + 2) === "[[") {
            output += "[";
            i++; // Skip next character as it's part of escape sequence
            continue;
        }

        // Handle escape sequence for closing bracket
        if (inputString.substring(i, i + 2) === "]]") {
            output += "]";
            i++; // Skip next character as it's part of escape sequence
            continue;
        }

        // Handle token substitution
        if (inputString[i] === "[") {
            let endIndex = inputString.indexOf("]", i);
            if (endIndex !== -1) {
                let token = inputString.substring(i + 1, endIndex);
                // Replace token with value from object if exists, else keep the token as is
                output += values[token] !== undefined ? values[token] : `[${token}]`;
                i = endIndex;
            } else {
                // No closing ']', treat it as regular text
                output += inputString[i];
            }
        } else {
            output += inputString[i];
        }
    }
    return output;
}

test('replace a name', () => {
    expect(interpolate('Hello [name]', { 'name': 'Jim' })).toBe('Hello Jim');
});
test('don\'t replace a value when the brackets are escaped', () => {
    expect(interpolate('Hello [name] [[author]]', { 'name': 'Jim' })).toBe('Hello Jim [author]');
});