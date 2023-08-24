import { useState, useEffect } from "react";
import PasswordList from "./PasswordList";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Tooltip,
  IconButton,
  Typography,
} from "@mui/material";
import { FileCopy as FileCopyIcon } from "@mui/icons-material";
import "../styles/PasswordGenerator.css";

const generateRandomPassword = (
  length,
  includeNumbers,
  includeSpecial,
  includeAlphabets
) => {
  const numbers = "0123456789";
  const specialCharacters = "!@#$%^&*";

  let characters = "";
  if (includeAlphabets) {
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    characters += lowercaseLetters + uppercaseLetters;
  }
  if (includeNumbers) characters += numbers;

  if (includeSpecial) characters += specialCharacters;
  if (characters === "") {
    console.error("No character type selected for password generation.");
    return "";
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  return password;
};

const PasswordGenerator = () => {
  const [passwords, setPasswords] = useState([]);
  const [password, setPassword] = useState("");
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeAlphabets, setIncludeAlphabets] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(true);

  useEffect(() => {
    const storedPasswords = localStorage.getItem("passwords");
    if (storedPasswords) {
      setPasswords(JSON.parse(storedPasswords));
    }
  }, []);

  const handleGeneratePassword = () => {
    const newPassword = generateRandomPassword(
      12,
      includeNumbers,
      includeSpecial,
      includeAlphabets
    );
    setPassword(newPassword);

    // Update passwords state and store in local storage
    setPasswords((prevPasswords) => [
      newPassword,
      ...prevPasswords.slice(0, 4),
    ]);
    localStorage.setItem("passwords", JSON.stringify(passwords));
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <Container className="container">
      <div className="header">
        <Typography variant="h4">Random Password Generator</Typography>
        <Button
          variant="contained"
          onClick={handleGeneratePassword}
          className="password-button"
        >
          Generate Password
        </Button>
      </div>
      <div className="options">
        <FormControlLabel
          control={
            <Checkbox
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
            />
          }
          label="Include Numbers"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={includeAlphabets}
              onChange={() => setIncludeAlphabets(!includeAlphabets)}
            />
          }
          label="Include Alphabets"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={includeSpecial}
              onChange={() => setIncludeSpecial(!includeSpecial)}
            />
          }
          label="Include Special Characters"
        />
      </div>
      <div className="password-container">
        <TextField
          size="small"
          variant="outlined"
          value={password}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <Tooltip title="Copy to Clipboard">
                <IconButton onClick={handleCopyToClipboard}>
                  <FileCopyIcon />
                </IconButton>
              </Tooltip>
            ),
          }}
          fullWidth
        />
      </div>
      <div className="password-list">
        <PasswordList passwords={passwords} />
      </div>
    </Container>
  );
};

export default PasswordGenerator;